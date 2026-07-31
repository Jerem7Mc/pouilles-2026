/** Lien externe de réservation ou d'horaires, vérifié joignable. */
export interface Reservation {
  label: string
  url: string
}

export interface Jour {
  /** Date ISO "AAAA-MM-JJ" */
  date: string
  titre: string
  base: 'Bari' | 'Lecce'
  /**
   * Identifiant du lieu où l'on dort ce soir-là, absent le jour du retour.
   *
   * Un identifiant et non un nom : le carnet affichait autrefois une chaîne
   * libre, qui a survécu telle quelle à un changement de logement et affichait
   * donc une adresse périmée. Le nom et l'adresse viennent maintenant de
   * `lieux.ts`, source unique, et un test vérifie la référence.
   */
  lieuHebergement?: string
  aFaire: string
  transport: string
  /** Coût de transport prévu au plan, en centimes. */
  transportPrevu: number
  ouManger: string
  /** Budget repas prévu, en centimes. Relevé à 25 € par jour. */
  repasPrevu: number

  /**
   * Identifiants de lieux, définis dans `lieux/donnees/lieux.ts`. Le journal en
   * fait des liens vers la carte, ciblés sur l'item. Un test vérifie que chaque
   * référence existe : une faute de frappe ne peut pas passer en silence.
   */
  lieuxTransport: readonly string[]
  lieuxSites: readonly string[]
  lieuxManger: readonly string[]

  /** Où acheter le billet ou vérifier les horaires du jour. */
  reservations: readonly Reservation[]

  /** Avertissement affiché en évidence, quand il y a un vrai risque. */
  alerte?: string
}
