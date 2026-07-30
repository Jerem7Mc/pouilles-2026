/**
 * Tous les montants circulent en centimes entiers dans l'application.
 * Aucun flottant ne touche à de l'argent : 0,1 + 0,2 !== 0,3 en JavaScript.
 */

/** Plafond de saisie : au-delà, c'est une faute de frappe, pas une dépense. */
export const CENTIMES_MAX = 1_000_00 // 1 000,00 €

/**
 * Convertit une saisie clavier ("12,50", "12.5", " 8 ") en centimes.
 * Renvoie null si la saisie n'est pas un montant strictement positif valide.
 */
export function parseMontant(saisie: string): number | null {
  const nettoye = saisie.trim().replace(/\s/gu, '').replace(',', '.')
  if (nettoye === '' || !/^\d*\.?\d*$/u.test(nettoye)) return null

  const valeur = Number(nettoye)
  if (!Number.isFinite(valeur) || valeur <= 0) return null

  const centimes = Math.round(valeur * 100)
  return centimes > CENTIMES_MAX ? null : centimes
}

/** 1250 -> "12,50" (pas de séparateur de milliers, on reste sous 1 000 €). */
export function formatCentimes(centimes: number): string {
  const arrondi = Math.round(centimes)
  const signe = arrondi < 0 ? '-' : ''
  const absolu = Math.abs(arrondi)
  const unites = Math.floor(absolu / 100)
  const decimales = String(absolu % 100).padStart(2, '0')
  return `${signe}${unites},${decimales}`
}

/** 1250 -> "12,50 €" */
export function formatEuros(centimes: number): string {
  return `${formatCentimes(centimes)} €`
}

/** Pourcentage entier borné à [0, 999] pour l'affichage des barres. */
export function pourcentage(part: number, total: number): number {
  if (total <= 0) return 0
  return Math.min(999, Math.round((part / total) * 100))
}
