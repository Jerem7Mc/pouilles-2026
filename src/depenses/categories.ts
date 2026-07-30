import type { NomIcone } from '../partage/icones'
import type { CategorieId, Enveloppes } from './types'

export interface Categorie {
  id: CategorieId
  label: string
  icone: NomIcone
  /**
   * Enveloppe par défaut en centimes. Calée sur le plan de voyage puis
   * majorée des postes que le plan avait oubliés (glaces, entrées de sites,
   * courses, souvenirs) et d'une marge d'imprévu.
   */
  enveloppeDefaut: number
  /** Justification affichée dans l'écran de réglage des enveloppes. */
  base: string
}

export const CATEGORIES: readonly Categorie[] = [
  {
    id: 'transport',
    label: 'Transport',
    icone: 'transport',
    enveloppeDefaut: 13_000,
    base: '116,40 € de trains et bus prévus, plus une marge pour les navettes et les erreurs de billet',
  },
  {
    id: 'repas',
    label: 'Repas',
    icone: 'repas',
    enveloppeDefaut: 16_000,
    base: '151 € de repas prévus au plan, plus une marge',
  },
  {
    id: 'courses',
    label: 'Courses',
    icone: 'courses',
    enveloppeDefaut: 3_000,
    base: 'Eau, petits-déjeuners et pique-niques à la Coop, chez Eurospin et Conad',
  },
  {
    id: 'glaces',
    label: 'Glaces',
    icone: 'glaces',
    enveloppeDefaut: 3_500,
    base: 'Environ 3 € par jour, six glaciers sans laitage repérés à Bari et Lecce',
  },
  {
    id: 'visites',
    label: 'Visites',
    icone: 'visites',
    enveloppeDefaut: 4_500,
    base: 'Églises rupestres de Matera, château d’Otrante, sites de Lecce',
  },
  {
    id: 'souvenirs',
    label: 'Souvenirs',
    icone: 'souvenirs',
    enveloppeDefaut: 4_000,
    base: 'Pâtes sèches, taralli et huile achetés en supermarché plutôt qu’en boutique',
  },
  {
    id: 'divers',
    label: 'Divers',
    icone: 'divers',
    enveloppeDefaut: 1_000,
    base: 'Pharmacie, consigne, imprévus',
  },
]

const PAR_ID = new Map(CATEGORIES.map((categorie) => [categorie.id, categorie]))

export function categorie(id: CategorieId): Categorie {
  const trouvee = PAR_ID.get(id)
  if (!trouvee) throw new Error(`Catégorie inconnue : ${id}`)
  return trouvee
}

export function estCategorieId(valeur: unknown): valeur is CategorieId {
  return typeof valeur === 'string' && PAR_ID.has(valeur as CategorieId)
}

export function enveloppesParDefaut(): Enveloppes {
  return Object.fromEntries(
    CATEGORIES.map((categorie) => [categorie.id, categorie.enveloppeDefaut]),
  ) as Enveloppes
}
