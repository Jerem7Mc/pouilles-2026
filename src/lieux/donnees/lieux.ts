import type { NomIcone } from '../../partage/icones'

export type TypeLieu = 'hebergement' | 'supermarche' | 'glacier' | 'manger'

/**
 * Finesse réelle de la coordonnée. Nominatim résout rarement les numéros de
 * rue en Italie du Sud : il faut le dire à l'utilisateur plutôt que de laisser
 * croire à une position au mètre près.
 */
export type Precision = 'poi' | 'rue' | 'ville'

export interface Lieu {
  nom: string
  type: TypeLieu
  ville: string
  adresse: string
  note: string
  lat: number
  lon: number
  precision: Precision
  /** Journées du voyage où ce lieu est pertinent, en dates ISO. */
  jours: readonly string[]
}

const JOURS_BARI = [
  '2026-08-24',
  '2026-08-25',
  '2026-08-26',
  '2026-08-27',
  '2026-08-28',
  '2026-08-29',
] as const

const JOURS_LECCE = ['2026-08-30', '2026-08-31', '2026-09-01', '2026-09-02', '2026-09-03'] as const

/**
 * Coordonnées obtenues une seule fois via Nominatim, le géocodeur OpenStreetMap,
 * puis figées ici. Aucun appel réseau de géocodage n'a lieu à l'exécution.
 */
export const LIEUX: readonly Lieu[] = [
  // Hébergements
  {
    nom: 'Host Bari Centrale',
    type: 'hebergement',
    ville: 'Bari',
    adresse: 'Host Bari Centrale, Bari',
    note: '6 nuits du 24 au 30 août. À 200 m de la gare de Bari Centrale, arrivée à partir de 13 h.',
    lat: 41.11853,
    lon: 16.86888,
    precision: 'rue',
    jours: JOURS_BARI,
  },
  {
    nom: 'Lobby Collective Hostel',
    type: 'hebergement',
    ville: 'Lecce',
    adresse: 'Lobby Collective Hostel, Lecce',
    note: '4 nuits du 30 août au 3 septembre. 15 à 20 minutes à pied depuis la gare de Lecce.',
    lat: 40.35003,
    lon: 18.17542,
    precision: 'rue',
    jours: JOURS_LECCE,
  },

  // Supermarchés
  {
    nom: 'Coop',
    type: 'supermarche',
    ville: 'Bari',
    adresse: 'Via Giulio Petroni 22, Bari',
    note: 'Courses de base, eau, en-cas du soir. Position à vérifier sur place : le géocodage tombe au milieu de la Via Giulio Petroni, à 2 km de la gare, ce qui contredit le « 2 minutes à pied » du plan.',
    lat: 41.09916,
    lon: 16.86739,
    precision: 'rue',
    jours: JOURS_BARI,
  },
  {
    nom: 'Famila',
    type: 'supermarche',
    ville: 'Bari',
    adresse: 'Corso Benedetto Croce 150, Bari',
    note: '8 minutes à pied. Choix plus large de spécialités régionales sèches : pâtes, taralli.',
    lat: 41.11625,
    lon: 16.87219,
    precision: 'rue',
    jours: JOURS_BARI,
  },
  {
    nom: 'Eurospin',
    type: 'supermarche',
    ville: 'Lecce',
    adresse: 'Viale Rossini, Lecce',
    note: 'Moins de 5 minutes à pied de l’auberge. Le meilleur rapport prix pour les pique-niques.',
    lat: 40.34931,
    lon: 18.18551,
    precision: 'rue',
    jours: JOURS_LECCE,
  },
  {
    nom: 'Conad City',
    type: 'supermarche',
    ville: 'Lecce',
    adresse: 'Via Giuseppe Zanardelli 15, Lecce',
    note: '10 minutes à pied. Pour chercher des produits locaux garantis sans lactose.',
    lat: 40.35255,
    lon: 18.18231,
    precision: 'poi',
    jours: JOURS_LECCE,
  },

  // Glaciers, tous avec une offre sans laitage identifiée
  {
    nom: 'Gelateria Piccinni',
    type: 'glacier',
    ville: 'Bari',
    adresse: 'Via Niccolò Piccinni 131, Bari',
    note: 'En centre-ville. Sorbets à l’eau, et versions sans lait convaincantes en chocolat noir et pistache.',
    lat: 41.12522,
    lon: 16.86596,
    precision: 'poi',
    jours: JOURS_BARI,
  },
  {
    nom: 'Il Gelatiere',
    type: 'glacier',
    ville: 'Bari',
    adresse: 'Viale Antonio Salandra 25a, Bari',
    note: 'Adresse de quartier, excellent rapport qualité-prix. Vitrine « senza latte base acqua ».',
    lat: 41.11487,
    lon: 16.86411,
    precision: 'rue',
    jours: JOURS_BARI,
  },
  {
    nom: 'Gelateria Gentile',
    type: 'glacier',
    ville: 'Bari',
    adresse: 'Piazza Federico II di Svevia 33, Bari',
    note: 'Institution depuis 1880, face au château. En août : sorbet mûre sauvage (gelso) ou pêche locale (percoca). Gamme crémeuse au lait de riz.',
    lat: 41.12782,
    lon: 16.86697,
    precision: 'rue',
    jours: JOURS_BARI,
  },
  {
    nom: 'Gelatario',
    type: 'glacier',
    ville: 'Lecce',
    adresse: 'Via Giuseppe Libertini 63, Lecce',
    note: 'Liste d’ingrédients très courte, 100 % naturelle. Sorbets citron et pêche, pistache vegan légèrement salée.',
    lat: 40.35227,
    lon: 18.16857,
    precision: 'poi',
    jours: JOURS_LECCE,
  },
  {
    nom: 'Agricola Gelateria',
    type: 'glacier',
    ville: 'Lecce',
    adresse: 'Piazza d’Italia 28, Lecce',
    note: 'Déclinaisons vegan bien identifiées, sorbets aux fruits locaux, recettes sans sucres ajoutés.',
    lat: 40.34921,
    lon: 18.17361,
    precision: 'rue',
    jours: JOURS_LECCE,
  },
  {
    nom: 'La Romana dal 1947',
    type: 'glacier',
    ville: 'Lecce',
    adresse: 'Via San Francesco d’Assisi 1, Lecce',
    note: 'Grande enseigne, texture très soyeuse, carte dédiée de parfums « senza latte ».',
    lat: 40.3556,
    lon: 18.17625,
    precision: 'rue',
    jours: JOURS_LECCE,
  },

  // Où manger, rattachés à leur journée
  {
    nom: 'Boulangerie Fiore',
    type: 'manger',
    ville: 'Bari',
    adresse: 'Panificio Fiore, Bari',
    note: 'Focaccia barese traditionnelle : huile d’olive, tomates fraîches, olives.',
    lat: 41.1297,
    lon: 16.87095,
    precision: 'poi',
    jours: ['2026-08-24', '2026-09-03'],
  },
  {
    nom: 'La Lopa',
    type: 'manger',
    ville: 'Matera',
    adresse: 'Ristorante La Lopa, Matera',
    note: 'Fave e cicorie : purée de fèves à l’huile d’olive, chicorée sauvage, peperoni cruschi.',
    lat: 40.66383,
    lon: 16.61137,
    precision: 'rue',
    jours: ['2026-08-25'],
  },
  {
    nom: 'Peschef',
    type: 'manger',
    ville: 'Trani',
    adresse: 'Peschef, Trani',
    note: 'Friterie marine sur le port : poulpe grillé, salade de fruits de mer à l’huile et au citron.',
    lat: 41.27978,
    lon: 16.42287,
    precision: 'rue',
    jours: ['2026-08-26'],
  },
  {
    nom: 'Pescaria',
    type: 'manger',
    ville: 'Polignano a Mare',
    adresse: 'Pescaria, Polignano a Mare',
    note: 'Panino con polpo fritto. Demander impérativement à retirer la crème de ricotta.',
    lat: 40.99456,
    lon: 17.21998,
    precision: 'rue',
    jours: ['2026-08-27'],
  },
  {
    nom: 'La Puccia',
    type: 'manger',
    ville: 'Lecce',
    adresse: 'La Puccia, Viale Giacomo Leopardi, Lecce',
    note: 'Puccia leccese sur mesure : prosciutto crudo, tomates séchées, olives, roquette. Sans fromage ni crème.',
    lat: 40.36185,
    lon: 18.17838,
    precision: 'rue',
    jours: ['2026-08-30'],
  },
]

/**
 * Ouvre l'app Plans de l'iPhone.
 *
 * Quand la position est exacte, on l'envoie telle quelle. Quand elle n'est
 * qu'au niveau de la rue, on passe plutôt l'adresse en texte : le géocodeur
 * d'Apple a une chance de mieux résoudre le numéro que nos coordonnées, qui
 * pointeraient au milieu de la voie.
 */
export function lienCarte(lieu: Lieu): string {
  if (lieu.precision === 'poi') {
    return `https://maps.apple.com/?ll=${lieu.lat},${lieu.lon}&q=${encodeURIComponent(lieu.nom)}`
  }
  return `https://maps.apple.com/?q=${encodeURIComponent(lieu.adresse)}`
}

export const LIBELLES_TYPE: Record<TypeLieu, { label: string; icone: NomIcone }> = {
  hebergement: { label: 'Hébergement', icone: 'hebergement' },
  supermarche: { label: 'Supermarchés', icone: 'supermarche' },
  glacier: { label: 'Glaciers sans laitage', icone: 'glacier' },
  manger: { label: 'Où manger', icone: 'manger' },
}

export const LIBELLES_PRECISION: Record<Precision, string> = {
  poi: 'Position exacte',
  rue: 'Position au niveau de la rue',
  ville: 'Position au centre de la ville',
}
