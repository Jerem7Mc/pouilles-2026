import { pourcentage } from '../partage/monnaie'
import { NOMBRE_JOURS, numeroJour, position } from '../partage/voyage'
import { CATEGORIES, estCategorieId } from './categories'
import type { CategorieId, Depense, Enveloppes, LigneEnveloppe, Rythme } from './types'

/**
 * Fonctions pures : toute la logique de budget est ici, testable sans Vue,
 * sans DOM et sans stockage.
 */

export function total(depenses: readonly Depense[]): number {
  return depenses.reduce((somme, depense) => somme + depense.centimes, 0)
}

export function totalEnveloppes(enveloppes: Enveloppes): number {
  return CATEGORIES.reduce((somme, categorie) => somme + (enveloppes[categorie.id] ?? 0), 0)
}

export function totalParCategorie(depenses: readonly Depense[]): Record<CategorieId, number> {
  const cumul = Object.fromEntries(CATEGORIES.map((c) => [c.id, 0])) as Record<CategorieId, number>
  for (const depense of depenses) cumul[depense.categorie] += depense.centimes
  return cumul
}

export function totalParDate(depenses: readonly Depense[]): Record<string, number> {
  const cumul: Record<string, number> = {}
  for (const depense of depenses) {
    cumul[depense.date] = (cumul[depense.date] ?? 0) + depense.centimes
  }
  return cumul
}

export function etatEnveloppes(
  depenses: readonly Depense[],
  enveloppes: Enveloppes,
): LigneEnveloppe[] {
  const cumul = totalParCategorie(depenses)
  return CATEGORIES.map((categorie) => {
    const enveloppe = enveloppes[categorie.id] ?? 0
    const depense = cumul[categorie.id]
    return {
      id: categorie.id,
      label: categorie.label,
      icone: categorie.icone,
      depense,
      enveloppe,
      reste: enveloppe - depense,
      pourcentage: pourcentage(depense, enveloppe),
      depasse: depense > enveloppe,
    }
  })
}

/** Seuils de tolérance sur l'écart au budget théorique, en points de pourcentage. */
const SEUIL_ATTENTION = 0.05
const SEUIL_ALERTE = 0.15

/**
 * Compare le rythme de dépense à l'avancement du voyage. Sans cela, un total
 * « 180 € sur 450 € » ne dit rien : à J2 c'est catastrophique, à J9 c'est
 * excellent.
 */
export function rythme(
  depenses: readonly Depense[],
  enveloppes: Enveloppes,
  isoAujourdhui: string,
): Rythme {
  const budget = totalEnveloppes(enveloppes)
  const depense = total(depenses)
  const jour = numeroJour(isoAujourdhui)
  const ou = position(isoAujourdhui)

  if (ou === 'avant') {
    return { jour: null, joursTotal: NOMBRE_JOURS, attendu: 0, ecart: depense, statut: 'avant' }
  }
  if (ou === 'apres' || jour === null) {
    return {
      jour: null,
      joursTotal: NOMBRE_JOURS,
      attendu: budget,
      ecart: depense - budget,
      statut: 'termine',
    }
  }

  const attendu = Math.round((budget * jour) / NOMBRE_JOURS)
  const ecart = depense - attendu
  const tolerance = ecart / (budget || 1)

  let statut: Rythme['statut'] = 'ok'
  if (tolerance > SEUIL_ALERTE) statut = 'alerte'
  else if (tolerance > SEUIL_ATTENTION) statut = 'attention'

  return { jour, joursTotal: NOMBRE_JOURS, attendu, ecart, statut }
}

/** Valide une dépense relue depuis le stockage local. */
export function estDepenseValide(valeur: unknown): valeur is Depense {
  if (typeof valeur !== 'object' || valeur === null) return false
  const d = valeur as Record<string, unknown>
  return (
    typeof d.id === 'string' &&
    typeof d.date === 'string' &&
    /^\d{4}-\d{2}-\d{2}$/u.test(d.date) &&
    estCategorieId(d.categorie) &&
    typeof d.centimes === 'number' &&
    Number.isInteger(d.centimes) &&
    d.centimes > 0 &&
    typeof d.libelle === 'string'
  )
}
