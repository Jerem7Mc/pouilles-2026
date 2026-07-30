export interface Jour {
  /** Date ISO "AAAA-MM-JJ" */
  date: string
  titre: string
  base: 'Bari' | 'Lecce'
  hebergement: string
  aFaire: string
  transport: string
  /** Coût de transport prévu au plan, en centimes. */
  transportPrevu: number
  ouManger: string
  /** Budget repas prévu au plan, en centimes. */
  repasPrevu: number
}
