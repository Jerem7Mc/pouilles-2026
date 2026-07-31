import { ref, watch } from 'vue'
import { cle, ecrire, lire } from '../partage/stockage'

/**
 * Références de réservation, saisies par l'utilisateur et stockées localement.
 *
 * Elles ne sont **pas** dans le dépôt, et ne doivent pas y entrer : il est
 * public, et une référence associée à un nom permet de consulter ou d'annuler
 * une réservation. Un historique Git ne s'efface pas non plus par une
 * suppression ultérieure. Seuls les libellés des champs vivent dans le code ;
 * les valeurs restent sur l'appareil, comme les dépenses, et suivent le même
 * chemin d'export.
 */

const CLE = cle('references')

/** Emplacements proposés. Libellés seulement, jamais de valeur. */
export const CHAMPS_REFERENCE = [
  {
    id: 'logement-bari',
    label: 'The Queen Room Bari',
    aide: 'Confirmation, et numéro de voyage Ryanair Rooms',
  },
  {
    id: 'logement-lecce',
    label: 'Mammasisi Rooms',
    aide: 'Numéro de voyage Ryanair Rooms',
  },
  {
    id: 'vols',
    label: 'Vols Ryanair FR2007 et FR2008',
    aide: 'Référence de réservation, celle qui sert à l’enregistrement',
  },
] as const

export type References = Record<string, string>

const IDS = new Set(CHAMPS_REFERENCE.map((champ) => champ.id))

/**
 * Ne retient que les emplacements connus et les valeurs textuelles.
 *
 * Une sauvegarde restaurée peut venir d'une version antérieure ou avoir été
 * modifiée à la main : une clé inconnue ou une valeur non textuelle est écartée
 * plutôt que réinjectée telle quelle dans l'interface.
 */
export function nettoieReferences(brut: unknown): References {
  if (typeof brut !== 'object' || brut === null) return {}
  const propre: References = {}
  for (const [id, valeur] of Object.entries(brut as Record<string, unknown>)) {
    if (IDS.has(id as (typeof CHAMPS_REFERENCE)[number]['id']) && typeof valeur === 'string') {
      const taille = valeur.trim()
      if (taille !== '') propre[id] = taille
    }
  }
  return propre
}

const references = ref<References>(nettoieReferences(lire<unknown>(CLE, {})))

watch(references, (valeur) => void ecrire(CLE, valeur), { deep: true })

function regler(id: string, valeur: string): void {
  const suite = { ...references.value }
  const taille = valeur.trim()
  if (taille === '') delete suite[id]
  else suite[id] = taille
  references.value = suite
}

/** Réinjecte les références d'une sauvegarde, sans effacer ce qui est déjà là. */
function importer(brut: unknown): number {
  const entrantes = nettoieReferences(brut)
  const manquantes = Object.entries(entrantes).filter(([id]) => !references.value[id])
  if (manquantes.length > 0) {
    references.value = { ...references.value, ...Object.fromEntries(manquantes) }
  }
  return manquantes.length
}

export function useReferences() {
  return { references, champs: CHAMPS_REFERENCE, regler, importer }
}
