export type TypeLieu = 'hebergement' | 'supermarche' | 'glacier' | 'manger'

export interface Lieu {
  nom: string
  type: TypeLieu
  ville: string
  /** Adresse telle qu'on la donnerait à un chauffeur ou à un moteur de carte. */
  adresse: string
  note: string
}

export const LIEUX: readonly Lieu[] = [
  // Hébergements
  {
    nom: 'Host Bari Centrale',
    type: 'hebergement',
    ville: 'Bari',
    adresse: 'Host Bari Centrale, Bari',
    note: '6 nuits du 24 au 30 août. À 200 m de la gare de Bari Centrale, arrivée possible à partir de 13 h.',
  },
  {
    nom: 'Lobby Collective Hostel',
    type: 'hebergement',
    ville: 'Lecce',
    adresse: 'Lobby Collective Hostel, Lecce',
    note: '4 nuits du 30 août au 3 septembre. 15 à 20 minutes à pied depuis la gare de Lecce.',
  },

  // Supermarchés
  {
    nom: 'Coop',
    type: 'supermarche',
    ville: 'Bari',
    adresse: 'Via Giulio Petroni 22, Bari',
    note: 'Moins de 2 minutes à pied, juste en face de l’hôtel. Courses de base, eau, en-cas du soir.',
  },
  {
    nom: 'Famila',
    type: 'supermarche',
    ville: 'Bari',
    adresse: 'Corso Benedetto Croce 150, Bari',
    note: '8 minutes à pied. Choix plus large de spécialités régionales sèches : pâtes, taralli.',
  },
  {
    nom: 'Eurospin',
    type: 'supermarche',
    ville: 'Lecce',
    adresse: 'Viale Rossini, Lecce',
    note: 'Moins de 5 minutes à pied de l’auberge. Le meilleur rapport prix pour composer les pique-niques.',
  },
  {
    nom: 'Conad City',
    type: 'supermarche',
    ville: 'Lecce',
    adresse: 'Via Giuseppe Zanardelli 15, Lecce',
    note: '10 minutes à pied. Pour chercher des produits locaux garantis sans lactose.',
  },

  // Glaciers, tous avec une offre sans laitage identifiée
  {
    nom: 'Gelateria Piccinni',
    type: 'glacier',
    ville: 'Bari',
    adresse: 'Via Niccolò Piccinni 131, Bari',
    note: 'En centre-ville. Sorbets à l’eau, et versions sans lait très convaincantes en chocolat noir et pistache.',
  },
  {
    nom: 'Il Gelatiere',
    type: 'glacier',
    ville: 'Bari',
    adresse: 'Viale Antonio Salandra 25a, Bari',
    note: 'Adresse de quartier, excellent rapport qualité-prix. Vitrine qui affiche clairement « senza latte base acqua ».',
  },
  {
    nom: 'Gelateria Gentile',
    type: 'glacier',
    ville: 'Bari',
    adresse: 'Piazza Federico II di Svevia 33, Bari',
    note: 'Institution depuis 1880, face au château. En août : sorbet mûre sauvage (gelso) ou pêche locale (percoca). Gamme crémeuse au lait de riz.',
  },
  {
    nom: 'Gelatario',
    type: 'glacier',
    ville: 'Lecce',
    adresse: 'Via Giuseppe Libertini 63, Lecce',
    note: 'Liste d’ingrédients très courte, 100 % naturelle. Sorbets citron et pêche, pistache vegan légèrement salée.',
  },
  {
    nom: 'Agricola Gelateria',
    type: 'glacier',
    ville: 'Lecce',
    adresse: 'Piazza d’Italia 28, Lecce',
    note: 'Déclinaisons vegan bien identifiées, sorbets aux fruits locaux, recettes sans sucres ajoutés.',
  },
  {
    nom: 'La Romana dal 1947',
    type: 'glacier',
    ville: 'Lecce',
    adresse: 'Via San Francesco d’Assisi 1, Lecce',
    note: 'Grande enseigne, texture très soyeuse, carte dédiée de parfums « senza latte ».',
  },

  // Où manger, repérés jour par jour
  {
    nom: 'Boulangerie Fiore',
    type: 'manger',
    ville: 'Bari',
    adresse: 'Panificio Fiore, Bari',
    note: 'Jour 1. Focaccia barese traditionnelle : huile d’olive, tomates fraîches, olives.',
  },
  {
    nom: 'La Lopa',
    type: 'manger',
    ville: 'Matera',
    adresse: 'Ristorante La Lopa, Matera',
    note: 'Jour 2. Fave e cicorie : purée de fèves à l’huile d’olive, chicorée sauvage, peperoni cruschi.',
  },
  {
    nom: 'Peschef',
    type: 'manger',
    ville: 'Trani',
    adresse: 'Peschef, Trani',
    note: 'Jour 3. Friterie marine sur le port : poulpe grillé, salade de fruits de mer à l’huile et au citron.',
  },
  {
    nom: 'Pescaria',
    type: 'manger',
    ville: 'Polignano a Mare',
    adresse: 'Pescaria, Polignano a Mare',
    note: 'Jour 4. Panino con polpo fritto. Demander impérativement à retirer la crème de ricotta.',
  },
  {
    nom: 'La Puccia',
    type: 'manger',
    ville: 'Lecce',
    adresse: 'La Puccia, Viale Giacomo Leopardi, Lecce',
    note: 'Jour 7. Puccia leccese sur mesure : prosciutto crudo, tomates séchées, olives, roquette. Sans fromage ni crème.',
  },
]

/** Lien de recherche cartographique, ouvert par l'app de cartes du téléphone. */
export function lienCarte(lieu: Lieu): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lieu.adresse)}`
}

export const LIBELLES_TYPE: Record<TypeLieu, { label: string; emoji: string }> = {
  hebergement: { label: 'Hébergement', emoji: '🛏️' },
  supermarche: { label: 'Supermarchés', emoji: '🛒' },
  glacier: { label: 'Glaciers sans laitage', emoji: '🍦' },
  manger: { label: 'Où manger', emoji: '🍽️' },
}
