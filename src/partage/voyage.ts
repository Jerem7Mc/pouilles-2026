/**
 * Repères temporels du voyage. Les dates sont manipulées en chaînes ISO
 * "AAAA-MM-JJ" et calculées en UTC pour éviter tout décalage de fuseau
 * (Toulouse et les Pouilles sont tous deux en UTC+2 en août, mais on ne
 * dépend pas de cette coïncidence).
 */

export const PREMIER_JOUR = '2026-08-24'
export const DERNIER_JOUR = '2026-09-03'

/** Décale une date ISO d'un nombre de jours. */
export function ajouteJours(iso: string, nombre: number): string {
  const [annee, mois, jour] = iso.split('-').map(Number)
  const date = new Date(Date.UTC(annee, mois - 1, jour + nombre))
  return date.toISOString().slice(0, 10)
}

/** Nombre de jours entre deux dates ISO (b - a). */
export function ecartJours(a: string, b: string): number {
  const enMs = (iso: string) => {
    const [annee, mois, jour] = iso.split('-').map(Number)
    return Date.UTC(annee, mois - 1, jour)
  }
  return Math.round((enMs(b) - enMs(a)) / 86_400_000)
}

/** Les 11 journées du voyage, du 24/08 au 03/09 inclus. */
export const JOURS: readonly string[] = Array.from(
  { length: ecartJours(PREMIER_JOUR, DERNIER_JOUR) + 1 },
  (_, index) => ajouteJours(PREMIER_JOUR, index),
)

export const NOMBRE_JOURS = JOURS.length

/** Date du jour au format ISO, en heure locale de l'appareil. */
export function isoDuJour(maintenant: Date = new Date()): string {
  const annee = maintenant.getFullYear()
  const mois = String(maintenant.getMonth() + 1).padStart(2, '0')
  const jour = String(maintenant.getDate()).padStart(2, '0')
  return `${annee}-${mois}-${jour}`
}

/** Numéro de la journée dans le voyage (1 à 11), null en dehors. */
export function numeroJour(iso: string): number | null {
  const index = JOURS.indexOf(iso)
  return index === -1 ? null : index + 1
}

/**
 * Journée du voyage en cours, ou null en dehors des dates.
 *
 * Source unique pour les trois écrans qui présélectionnent un jour : journal,
 * lieux et saisie de dépense. Chacun choisit ensuite son repli hors voyage,
 * mais aucun ne recalcule « aujourd'hui » pour son compte.
 */
export function jourActif(maintenant: Date = new Date()): string | null {
  const aujourdhui = isoDuJour(maintenant)
  return numeroJour(aujourdhui) === null ? null : aujourdhui
}

const FORMAT_LONG = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  timeZone: 'UTC',
})

const FORMAT_COURT = new Intl.DateTimeFormat('fr-FR', {
  weekday: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

function enDate(iso: string): Date {
  const [annee, mois, jour] = iso.split('-').map(Number)
  return new Date(Date.UTC(annee, mois - 1, jour))
}

function majuscule(texte: string): string {
  return texte.charAt(0).toUpperCase() + texte.slice(1)
}

/** "2026-08-24" -> "Lundi 24 août" */
export function libelleJour(iso: string): string {
  return majuscule(FORMAT_LONG.format(enDate(iso)))
}

/** "2026-08-24" -> "Lun. 24" */
export function libelleJourCourt(iso: string): string {
  return majuscule(FORMAT_COURT.format(enDate(iso)))
}

/** Position d'une date par rapport au voyage. */
export type Position = 'avant' | 'pendant' | 'apres'

export function position(iso: string): Position {
  if (iso < PREMIER_JOUR) return 'avant'
  if (iso > DERNIER_JOUR) return 'apres'
  return 'pendant'
}
