import { computed, ref, watch } from 'vue'
import { cle, ecrire, lire } from '../partage/stockage'
import { isoDuJour } from '../partage/voyage'
import { enveloppesParDefaut } from './categories'
import { estDepenseValide, etatEnveloppes, rythme, total, totalEnveloppes } from './calculs'
import type { CategorieId, Depense, Enveloppes } from './types'

const CLE_DEPENSES = cle('depenses')
const CLE_ENVELOPPES = cle('enveloppes')

/**
 * État unique partagé par toute l'application. Volontairement un module
 * singleton plutôt qu'un store Pinia : un seul utilisateur, un seul jeu de
 * données, aucun besoin d'injection ni de plusieurs instances.
 */

function chargerDepenses(): Depense[] {
  const brut = lire<unknown[]>(CLE_DEPENSES, [], Array.isArray)
  // On filtre au chargement : une entrée corrompue ne doit pas fausser les totaux.
  return brut.filter(estDepenseValide)
}

function chargerEnveloppes(): Enveloppes {
  const defauts = enveloppesParDefaut()
  const brut = lire<Partial<Enveloppes>>(CLE_ENVELOPPES, defauts)
  const fusion = { ...defauts }
  for (const id of Object.keys(defauts) as CategorieId[]) {
    const valeur = brut[id]
    if (typeof valeur === 'number' && Number.isInteger(valeur) && valeur >= 0) fusion[id] = valeur
  }
  return fusion
}

const depenses = ref<Depense[]>(chargerDepenses())
const enveloppes = ref<Enveloppes>(chargerEnveloppes())

/** Message d'échec de persistance, affiché à l'utilisateur sans être avalé. */
const erreurStockage = ref('')

function persiste(nomCle: string, valeur: unknown): void {
  const resultat = ecrire(nomCle, valeur)
  if (resultat.ok) {
    erreurStockage.value = ''
    return
  }
  erreurStockage.value =
    resultat.raison === 'quota'
      ? 'Stockage plein : exporte tes données puis supprime des dépenses.'
      : 'Stockage indisponible sur cet appareil. Pense à exporter tes données.'
}

watch(depenses, (valeur) => persiste(CLE_DEPENSES, valeur), { deep: true })
watch(enveloppes, (valeur) => persiste(CLE_ENVELOPPES, valeur), { deep: true })

function identifiant(): string {
  return globalThis.crypto?.randomUUID?.() ?? `d${Date.now()}${Math.random().toString(36).slice(2)}`
}

export interface NouvelleDepense {
  categorie: CategorieId
  centimes: number
  libelle?: string
  date?: string
}

function ajouter(entree: NouvelleDepense): Depense {
  const nouvelle: Depense = {
    id: identifiant(),
    date: entree.date ?? isoDuJour(),
    categorie: entree.categorie,
    centimes: entree.centimes,
    libelle: entree.libelle?.trim() ?? '',
  }
  depenses.value = [nouvelle, ...depenses.value]
  return nouvelle
}

function supprimer(id: string): void {
  depenses.value = depenses.value.filter((depense) => depense.id !== id)
}

function reglerEnveloppe(id: CategorieId, centimes: number): void {
  enveloppes.value = { ...enveloppes.value, [id]: Math.max(0, Math.round(centimes)) }
}

function reinitialiserEnveloppes(): void {
  enveloppes.value = enveloppesParDefaut()
}

function toutEffacer(): void {
  depenses.value = []
}

/** Réinjecte une sauvegarde sans écraser ni dupliquer l'existant. */
function importer(entrees: readonly unknown[]): number {
  const connus = new Set(depenses.value.map((depense) => depense.id))
  const nouvelles = entrees.filter(estDepenseValide).filter((depense) => !connus.has(depense.id))
  depenses.value = [...nouvelles, ...depenses.value]
  return nouvelles.length
}

/** Plus récentes d'abord, l'historique se lit du haut vers le bas. */
const depensesTriees = computed(() =>
  [...depenses.value].sort((a, b) => (a.date === b.date ? 0 : a.date < b.date ? 1 : -1)),
)

export function useDepenses() {
  return {
    depenses: depensesTriees,
    enveloppes,
    erreurStockage,
    totalDepense: computed(() => total(depenses.value)),
    budgetTotal: computed(() => totalEnveloppes(enveloppes.value)),
    resteGlobal: computed(() => totalEnveloppes(enveloppes.value) - total(depenses.value)),
    lignes: computed(() => etatEnveloppes(depenses.value, enveloppes.value)),
    rythme: computed(() => rythme(depenses.value, enveloppes.value, isoDuJour())),
    ajouter,
    supprimer,
    reglerEnveloppe,
    reinitialiserEnveloppes,
    toutEffacer,
    importer,
  }
}
