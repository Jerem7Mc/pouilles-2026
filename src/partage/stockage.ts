/**
 * Persistance locale. Aucune donnée ne quitte l'appareil.
 *
 * Le risque assumé est connu : perdre le téléphone ou voir Safari évincer le
 * stockage sous pression disque fait perdre les dépenses. C'est pourquoi
 * `ecrire` remonte son échec au lieu de l'avaler, et que l'application propose
 * un export manuel.
 */

const PREFIXE = 'pouilles2026'

/** Construit une clé versionnée : une migration future ne casse pas l'ancienne. */
export function cle(nom: string, version = 1): string {
  return `${PREFIXE}.${nom}.v${version}`
}

function stockageDisponible(): Storage | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage
  } catch {
    // Safari en navigation privée lève au simple accès à localStorage.
    return null
  }
}

/**
 * Lit une valeur JSON. Toute donnée illisible ou invalide retombe sur le
 * défaut plutôt que de faire planter l'application au démarrage.
 */
export function lire<T>(nomCle: string, defaut: T, valide?: (brut: unknown) => boolean): T {
  const stockage = stockageDisponible()
  if (!stockage) return defaut

  const brut = stockage.getItem(nomCle)
  if (brut === null) return defaut

  try {
    const valeur: unknown = JSON.parse(brut)
    if (valide && !valide(valeur)) return defaut
    return valeur as T
  } catch {
    return defaut
  }
}

export type ResultatEcriture = { ok: true } | { ok: false; raison: 'indisponible' | 'quota' }

/** Écrit une valeur JSON et signale explicitement l'échec. */
export function ecrire(nomCle: string, valeur: unknown): ResultatEcriture {
  const stockage = stockageDisponible()
  if (!stockage) return { ok: false, raison: 'indisponible' }

  try {
    stockage.setItem(nomCle, JSON.stringify(valeur))
    return { ok: true }
  } catch {
    return { ok: false, raison: 'quota' }
  }
}
