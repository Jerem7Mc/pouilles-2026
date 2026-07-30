import type { NomIcone } from '../partage/icones'

export type CategorieId =
  'transport' | 'repas' | 'courses' | 'glaces' | 'visites' | 'souvenirs' | 'divers'

export interface Depense {
  id: string
  /** Date ISO "AAAA-MM-JJ" */
  date: string
  categorie: CategorieId
  /** Montant en centimes entiers, toujours strictement positif. */
  centimes: number
  /** Libellé libre, chaîne vide si non renseigné. */
  libelle: string
}

export type Enveloppes = Record<CategorieId, number>

export interface LigneEnveloppe {
  id: CategorieId
  label: string
  icone: NomIcone
  depense: number
  enveloppe: number
  reste: number
  pourcentage: number
  depasse: boolean
}

export type StatutRythme = 'avant' | 'ok' | 'attention' | 'alerte' | 'termine'

export interface Rythme {
  /** Numéro de journée dans le voyage, null en dehors. */
  jour: number | null
  joursTotal: number
  /** Ce qu'on aurait dû avoir dépensé à ce stade, au prorata des journées. */
  attendu: number
  /** Positif = on dépense plus vite que le budget ne le permet. */
  ecart: number
  statut: StatutRythme
}
