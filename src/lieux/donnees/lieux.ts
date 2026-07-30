import type { NomIcone } from '../../partage/icones'

/**
 * Ordre volontaire, du plus utile au moins utile sur le terrain : d'où l'on
 * part, où l'on va, où l'on dort, où l'on mange, où l'on fait ses courses.
 * Les glaciers viennent en dernier : c'est une commodité liée à l'intolérance
 * au lait de vache, pas un objectif de voyage.
 */
export type TypeLieu = 'transport' | 'site' | 'hebergement' | 'manger' | 'supermarche' | 'glacier'

/**
 * Finesse réelle de la coordonnée. On l'affiche plutôt que de laisser croire à
 * une position au mètre près partout.
 */
export type Precision = 'poi' | 'rue' | 'ville'

export interface Lieu {
  /**
   * Identifiant stable, référencé par l'itinéraire. Généré depuis le nom mais
   * écrit en clair ici : un test vérifie que chaque référence du carnet de
   * route pointe bien sur un lieu existant.
   */
  id: string
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

const J1 = '2026-08-24'
const J2 = '2026-08-25'
const J3 = '2026-08-26'
const J4 = '2026-08-27'
const J5 = '2026-08-28'
const J6 = '2026-08-29'
const J7 = '2026-08-30'
const J8 = '2026-08-31'
const J9 = '2026-09-01'
const J10 = '2026-09-02'
const J11 = '2026-09-03'

const JOURS_BARI = [J1, J2, J3, J4, J5, J6] as const
const JOURS_LECCE = [J7, J8, J9, J10, J11] as const

/**
 * Coordonnées obtenues une seule fois, puis figées ici. Aucun appel réseau de
 * géocodage n'a lieu à l'exécution.
 *
 * Deux sources selon la nature du point :
 * - Gares et gares routières : API Overpass, sur les tags `railway=station` et
 *   `amenity=bus_station`. Indispensable, car Nominatim en texte libre
 *   renvoyait une station-service pour « Stazione di Polignano » et une
 *   trattoria pour « Stazione di Gallipoli ».
 * - Sites et adresses : Nominatim, avec contrôle du type d'objet et de la
 *   distance au centre-ville visé.
 */
export const LIEUX: readonly Lieu[] = [
  // ==========================================================
  // TRANSPORT — d'où l'on part chaque matin
  // ==========================================================
  {
    id: 'aeroport-de-bari',
    nom: 'Aéroport de Bari',
    type: 'transport',
    ville: 'Bari',
    adresse: 'Aeroporto di Bari Karol Wojtyła, Palese',
    note: 'Arrivée le 24 et départ le 3 septembre, vol à 20 h 40. La navette Ferrotramviaria part du sous-sol du terminal, 5,30 € vers Bari Centrale.',
    lat: 41.13689,
    lon: 16.76004,
    precision: 'poi',
    jours: [J1, J11],
  },
  {
    id: 'bari-centrale',
    nom: 'Bari Centrale',
    type: 'transport',
    ville: 'Bari',
    adresse: 'Stazione di Bari Centrale, Piazza Aldo Moro, Bari',
    note: 'Quatre compagnies au même endroit, à 200 m de l’hôtel. Trenitalia pour Trani, Polignano, Monopoli, Ostuni et Lecce. FAL pour Matera, bornes grises. FSE pour Alberobello. Ferrotramviaria pour l’aéroport.',
    lat: 41.11767,
    lon: 16.87007,
    precision: 'poi',
    jours: [J1, J2, J3, J4, J5, J6, J7, J11],
  },
  {
    id: 'gare-de-matera-centrale',
    nom: 'Gare de Matera Centrale',
    type: 'transport',
    ville: 'Matera',
    adresse: 'Stazione di Matera Centrale (FAL), Matera',
    note: 'Terminus de la ligne FAL depuis Bari. À 400 m du centre, les Sassi commencent juste en dessous.',
    lat: 40.66629,
    lon: 16.60131,
    precision: 'poi',
    jours: [J2],
  },
  {
    id: 'gare-de-trani',
    nom: 'Gare de Trani',
    type: 'transport',
    ville: 'Trani',
    adresse: 'Stazione di Trani, Trani',
    note: 'Ligne Trenitalia depuis Bari. Environ 1 km à pied jusqu’à la cathédrale et au port.',
    lat: 41.2727,
    lon: 16.41769,
    precision: 'poi',
    jours: [J3],
  },
  {
    id: 'gare-de-polignano-a-mare',
    nom: 'Gare de Polignano a Mare',
    type: 'transport',
    ville: 'Polignano a Mare',
    adresse: 'Stazione di Polignano a Mare, Polignano a Mare',
    note: 'Ligne Trenitalia. À 700 m de la crique de Lama Monachile, en descente.',
    lat: 40.99096,
    lon: 17.2187,
    precision: 'poi',
    jours: [J4],
  },
  {
    id: 'gare-de-monopoli',
    nom: 'Gare de Monopoli',
    type: 'transport',
    ville: 'Monopoli',
    adresse: 'Stazione di Monopoli, Monopoli',
    note: 'Ligne Trenitalia, deuxième étape de la journée après Polignano. Environ 1 km jusqu’au centre fortifié.',
    lat: 40.95203,
    lon: 17.29251,
    precision: 'poi',
    jours: [J4],
  },
  {
    id: 'gare-d-ostuni',
    nom: 'Gare d’Ostuni',
    type: 'transport',
    ville: 'Ostuni',
    adresse: 'Stazione di Ostuni, Ostuni',
    note: 'Attention : la gare est à 2,8 km du centre historique, en contrebas. La navette de bus STP attend devant la gare, elle n’est pas optionnelle.',
    lat: 40.7523,
    lon: 17.58086,
    precision: 'poi',
    jours: [J5],
  },
  {
    id: 'gare-d-alberobello',
    nom: 'Gare d’Alberobello',
    type: 'transport',
    ville: 'Alberobello',
    adresse: 'Stazione di Alberobello (FSE), Alberobello',
    note: 'Réseau Ferrovie del Sud Est, billets sur l’interface Trenitalia. À 600 m des trulli.',
    lat: 40.78667,
    lon: 17.24219,
    precision: 'poi',
    jours: [J6],
  },
  {
    id: 'gare-de-lecce',
    nom: 'Gare de Lecce',
    type: 'transport',
    ville: 'Lecce',
    adresse: 'Stazione di Lecce, Lecce',
    note: 'Trenitalia depuis Bari, et FSE pour Gallipoli. 15 à 20 minutes à pied jusqu’à l’auberge. Au sud du centre.',
    lat: 40.34568,
    lon: 18.16572,
    precision: 'poi',
    jours: [J7, J8, J11],
  },
  {
    id: 'city-terminal-bus-lecce',
    nom: 'City Terminal Bus, Lecce',
    type: 'transport',
    ville: 'Lecce',
    adresse: 'City Terminal Bus, Lecce',
    note: 'Départ de Salento in Bus pour Otrante et Porto Cesareo. Au nord du centre, à 2 km de la gare ferroviaire et dans la direction opposée : ne pas confondre les deux.',
    lat: 40.36285,
    lon: 18.16842,
    precision: 'poi',
    jours: [J9, J10],
  },
  {
    id: 'gare-de-gallipoli',
    nom: 'Gare de Gallipoli',
    type: 'transport',
    ville: 'Gallipoli',
    adresse: 'Stazione di Gallipoli (FSE), Gallipoli',
    note: 'Terminus FSE depuis Lecce. Environ 1 km jusqu’au pont vers la vieille ville insulaire.',
    lat: 40.05749,
    lon: 17.98822,
    precision: 'poi',
    jours: [J8],
  },
  {
    id: 'gare-d-otrante',
    nom: 'Gare d’Otrante',
    type: 'transport',
    ville: 'Otranto',
    adresse: 'Stazione di Otranto (FSE), Otranto',
    note: 'Solution de repli si Salento in Bus ne circule plus au 1er septembre. Le bus reste plus direct depuis Lecce.',
    lat: 40.14957,
    lon: 18.48105,
    precision: 'poi',
    jours: [J9],
  },

  // ==========================================================
  // SITES — ce qu'on vient voir
  // ==========================================================
  {
    id: 'bari-vecchia-piazza-mercantile',
    nom: 'Bari Vecchia, Piazza Mercantile',
    type: 'site',
    ville: 'Bari',
    adresse: 'Piazza Mercantile, Bari',
    note: 'Cœur de la vieille ville. C’est dans ces ruelles que les mamies fabriquent les orecchiette devant chez elles.',
    lat: 41.12853,
    lon: 16.87234,
    precision: 'poi',
    jours: [J1, J11],
  },
  {
    id: 'basilique-san-nicola',
    nom: 'Basilique San Nicola',
    type: 'site',
    ville: 'Bari',
    adresse: 'Basilica di San Nicola, Bari',
    note: 'Basilique romane du XIe siècle, au centre de Bari Vecchia. Entrée libre.',
    lat: 41.13027,
    lon: 16.87019,
    precision: 'poi',
    jours: [J1, J11],
  },
  {
    id: 'chateau-normand-souabe',
    nom: 'Château normand-souabe',
    type: 'site',
    ville: 'Bari',
    adresse: 'Castello Normanno-Svevo, Piazza Federico II di Svevia, Bari',
    note: 'Face au château se trouve la Gelateria Gentile, l’institution de 1880.',
    lat: 41.1283,
    lon: 16.86638,
    precision: 'poi',
    jours: [J1, J11],
  },
  {
    id: 'lungomare-nazario-sauro',
    nom: 'Lungomare Nazario Sauro',
    type: 'site',
    ville: 'Bari',
    adresse: 'Lungomare Nazario Sauro, Bari',
    note: 'Front de mer de la passeggiata au coucher du soleil, le premier soir.',
    lat: 41.12097,
    lon: 16.88375,
    precision: 'rue',
    jours: [J1],
  },
  {
    id: 'belvedere-luigi-guerricchio',
    nom: 'Belvédère Luigi Guerricchio',
    type: 'site',
    ville: 'Matera',
    adresse: 'Belvedere Luigi Guerricchio, Sasso Barisano, Matera',
    note: 'Le panorama sur les Sassi. Point de vue à faire en arrivant, pour comprendre la ville avant d’y descendre.',
    lat: 40.66681,
    lon: 16.6068,
    precision: 'poi',
    jours: [J2],
  },
  {
    id: 'santa-maria-de-idris',
    nom: 'Santa Maria de Idris',
    type: 'site',
    ville: 'Matera',
    adresse: 'Chiesa Madonna de Idris, Sasso Caveoso, Matera',
    note: 'Église rupestre creusée dans l’éperon rocheux, la plus spectaculaire des Sassi. Entrée payante.',
    lat: 40.66408,
    lon: 16.61209,
    precision: 'poi',
    jours: [J2],
  },
  {
    id: 'cathedrale-de-trani',
    nom: 'Cathédrale de Trani',
    type: 'site',
    ville: 'Trani',
    adresse: 'Cattedrale di San Nicola Pellegrino, Trani',
    note: 'La cathédrale blanche posée au ras de l’eau, le motif de la journée.',
    lat: 41.28221,
    lon: 16.41848,
    precision: 'poi',
    jours: [J3],
  },
  {
    id: 'chateau-souabe-de-trani',
    nom: 'Château souabe de Trani',
    type: 'site',
    ville: 'Trani',
    adresse: 'Castello Svevo di Trani, Piazza Re Manfredi, Trani',
    note: 'À 300 m de la cathédrale, en bord de mer. Le port de pêche est juste au sud.',
    lat: 41.28197,
    lon: 16.41499,
    precision: 'poi',
    jours: [J3],
  },
  {
    id: 'lama-monachile',
    nom: 'Lama Monachile',
    type: 'site',
    ville: 'Polignano a Mare',
    adresse: 'Lama Monachile, Polignano a Mare',
    note: 'La crique entre les falaises, la vue la plus photographiée des Pouilles. Galets, pas de sable.',
    lat: 40.99325,
    lon: 17.21385,
    precision: 'poi',
    jours: [J4],
  },
  {
    id: 'cala-porta-vecchia',
    nom: 'Cala Porta Vecchia',
    type: 'site',
    ville: 'Monopoli',
    adresse: 'Cala Porta Vecchia, Monopoli',
    note: 'Petite plage au pied des remparts, dans la ville même. Baignade de l’après-midi.',
    lat: 40.9509,
    lon: 17.30553,
    precision: 'poi',
    jours: [J4],
  },
  {
    id: 'chateau-charles-quint',
    nom: 'Château Charles Quint',
    type: 'site',
    ville: 'Monopoli',
    adresse: 'Castello di Carlo V, Largo Castello, Monopoli',
    note: 'Au bout du centre fortifié, à 400 m de la plage.',
    lat: 40.95422,
    lon: 17.30527,
    precision: 'poi',
    jours: [J4],
  },
  {
    id: 'concathedrale-d-ostuni',
    nom: 'Concathédrale d’Ostuni',
    type: 'site',
    ville: 'Ostuni',
    adresse: 'Concattedrale Santa Maria Assunta, Ostuni',
    note: 'Point haut de la ville blanche. C’est de là qu’on voit la plaine d’oliviers jusqu’à la mer.',
    lat: 40.73408,
    lon: 17.57904,
    precision: 'poi',
    jours: [J5],
  },
  {
    id: 'rione-monti',
    nom: 'Rione Monti',
    type: 'site',
    ville: 'Alberobello',
    adresse: 'Rione Monti, Alberobello',
    note: 'Le quartier de trulli le plus dense, et le plus touristique. Beau mais très fréquenté un samedi.',
    lat: 40.78167,
    lon: 17.23638,
    precision: 'rue',
    jours: [J6],
  },
  {
    id: 'rione-aia-piccola',
    nom: 'Rione Aia Piccola',
    type: 'site',
    ville: 'Alberobello',
    adresse: 'Rione Aia Piccola, Alberobello',
    note: 'Quartier résidentiel préservé, celui à privilégier pour éviter les foules du samedi. Il est à l’est du Largo Martellotta, en face du Rione Monti. Aucun objet nommé dans OpenStreetMap : le point est au centre-ville, à ajuster sur place.',
    lat: 40.78412,
    lon: 17.2377,
    precision: 'ville',
    jours: [J6],
  },
  {
    id: 'piazza-del-duomo',
    nom: 'Piazza del Duomo',
    type: 'site',
    ville: 'Lecce',
    adresse: 'Duomo di Lecce, Piazza Duomo, Lecce',
    note: 'La place fermée du baroque leccese, à voir de nuit quand elle est éclairée.',
    lat: 40.35178,
    lon: 18.16936,
    precision: 'poi',
    jours: [J7, J11],
  },
  {
    id: 'basilique-santa-croce',
    nom: 'Basilique Santa Croce',
    type: 'site',
    ville: 'Lecce',
    adresse: 'Basilica di Santa Croce, Lecce',
    note: 'La façade la plus travaillée de la ville, à 300 m de la Piazza Sant’Oronzo.',
    lat: 40.35469,
    lon: 18.17326,
    precision: 'poi',
    jours: [J7],
  },
  {
    id: 'amphitheatre-romain',
    nom: 'Amphithéâtre romain',
    type: 'site',
    ville: 'Lecce',
    adresse: 'Anfiteatro Romano, Piazza Sant’Oronzo, Lecce',
    note: 'À ciel ouvert au milieu de la place centrale, visible sans billet.',
    lat: 40.35255,
    lon: 18.17248,
    precision: 'poi',
    jours: [J7],
  },
  {
    id: 'chateau-angevin-de-gallipoli',
    nom: 'Château angevin de Gallipoli',
    type: 'site',
    ville: 'Gallipoli',
    adresse: 'Castello Angioino, Gallipoli',
    note: 'À l’entrée du pont vers la vieille ville insulaire.',
    lat: 40.05576,
    lon: 17.9794,
    precision: 'poi',
    jours: [J8],
  },
  {
    id: 'spiaggia-della-purita',
    nom: 'Spiaggia della Purità',
    type: 'site',
    ville: 'Gallipoli',
    adresse: 'Spiaggia della Purità, Gallipoli',
    note: 'Plage de sable fin au pied des remparts, dans la vieille ville. Le point est sur l’église de la Purità qui la surplombe, la plage est juste en dessous.',
    lat: 40.05526,
    lon: 17.97497,
    precision: 'rue',
    jours: [J8],
  },
  {
    id: 'chateau-aragonais-d-otrante',
    nom: 'Château aragonais d’Otrante',
    type: 'site',
    ville: 'Otranto',
    adresse: 'Castello Aragonese, Piazza Castello, Otranto',
    note: 'Le grand fort du port. Entrée payante.',
    lat: 40.14446,
    lon: 18.49271,
    precision: 'poi',
    jours: [J9],
  },
  {
    id: 'cathedrale-d-otrante',
    nom: 'Cathédrale d’Otrante',
    type: 'site',
    ville: 'Otranto',
    adresse: 'Cattedrale di Santa Maria Annunziata, Otranto',
    note: 'Immense mosaïque de sol du XIIe siècle. À 200 m du château. La baignade se fait près des remparts du port.',
    lat: 40.14589,
    lon: 18.49106,
    precision: 'poi',
    jours: [J9],
  },
  {
    id: 'plage-de-porto-cesareo',
    nom: 'Plage de Porto Cesareo',
    type: 'site',
    ville: 'Porto Cesareo',
    adresse: 'Spiaggia di Porto Cesareo',
    note: 'Sable blanc et eau turquoise du golfe de Tarente. Pique-nique préparé la veille à l’Eurospin pour éviter les tarifs des paillotes.',
    lat: 40.25974,
    lon: 17.89476,
    precision: 'poi',
    jours: [J10],
  },

  // ==========================================================
  // HÉBERGEMENT
  // ==========================================================
  {
    id: 'host-bari-centrale',
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
    id: 'lobby-collective-hostel',
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

  // ==========================================================
  // OÙ MANGER, sans laitage
  // ==========================================================
  {
    id: 'boulangerie-fiore',
    nom: 'Boulangerie Fiore',
    type: 'manger',
    ville: 'Bari',
    adresse: 'Panificio Fiore, Bari',
    note: 'Focaccia barese traditionnelle : huile d’olive, tomates fraîches, olives. Dans Bari Vecchia.',
    lat: 41.1297,
    lon: 16.87095,
    precision: 'poi',
    jours: [J1, J11],
  },
  {
    id: 'la-lopa',
    nom: 'La Lopa',
    type: 'manger',
    ville: 'Matera',
    adresse: 'Ristorante La Lopa, Matera',
    note: 'Fave e cicorie : purée de fèves à l’huile d’olive, chicorée sauvage, peperoni cruschi.',
    lat: 40.66383,
    lon: 16.61137,
    precision: 'rue',
    jours: [J2],
  },
  {
    id: 'peschef',
    nom: 'Peschef',
    type: 'manger',
    ville: 'Trani',
    adresse: 'Peschef, Trani',
    note: 'Friterie marine sur le port : poulpe grillé, salade de fruits de mer à l’huile et au citron.',
    lat: 41.27978,
    lon: 16.42287,
    precision: 'rue',
    jours: [J3],
  },
  {
    id: 'pescaria',
    nom: 'Pescaria',
    type: 'manger',
    ville: 'Polignano a Mare',
    adresse: 'Pescaria, Polignano a Mare',
    note: 'Panino con polpo fritto. Demander impérativement à retirer la crème de ricotta.',
    lat: 40.99456,
    lon: 17.21998,
    precision: 'rue',
    jours: [J4],
  },
  {
    id: 'la-puccia',
    nom: 'La Puccia',
    type: 'manger',
    ville: 'Lecce',
    adresse: 'La Puccia, Viale Giacomo Leopardi, Lecce',
    note: 'Puccia leccese sur mesure : prosciutto crudo, tomates séchées, olives, roquette. Sans fromage ni crème.',
    lat: 40.36185,
    lon: 18.17838,
    precision: 'rue',
    jours: [J7, J8, J9, J10],
  },

  // ==========================================================
  // SUPERMARCHÉS
  // ==========================================================
  {
    id: 'lidl-bari',
    nom: 'Lidl',
    type: 'supermarche',
    ville: 'Bari',
    adresse: 'Via Giuseppe Capruzzi, Bari',
    note: 'Le plus proche de l’auberge : 200 m, 3 minutes à pied. Eau, en-cas du soir, courses de base. C’est lui que visait le « 2 minutes à pied » du plan, pas le Coop.',
    lat: 41.11676,
    lon: 16.86845,
    precision: 'poi',
    jours: JOURS_BARI,
  },
  {
    id: 'coop',
    nom: 'Coop',
    type: 'supermarche',
    ville: 'Bari',
    adresse: 'Via Paolo Lembo 17, Bari',
    note: '557 m de l’auberge, contre 200 m pour le Lidl. Position au niveau de la rue seulement : OpenStreetMap ne connaît aucun Coop à ce numéro, l’enseigne est à confirmer sur place.',
    lat: 41.11365,
    lon: 16.86736,
    precision: 'rue',
    jours: JOURS_BARI,
  },
  {
    id: 'famila',
    nom: 'Famila',
    type: 'supermarche',
    ville: 'Bari',
    adresse: 'Corso Benedetto Croce 150, Bari',
    note: '8 minutes à pied. Choix plus large de spécialités régionales sèches : pâtes, taralli. À privilégier pour les souvenirs comestibles.',
    lat: 41.11625,
    lon: 16.87219,
    precision: 'rue',
    jours: JOURS_BARI,
  },
  {
    id: 'eurospin',
    nom: 'Eurospin',
    type: 'supermarche',
    ville: 'Lecce',
    adresse: 'Viale Rossini, Lecce',
    note: 'Moins de 5 minutes à pied de l’auberge. Le meilleur rapport prix pour les petits-déjeuners et les pique-niques.',
    lat: 40.34931,
    lon: 18.18551,
    precision: 'rue',
    jours: JOURS_LECCE,
  },
  {
    id: 'conad-city',
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

  // ==========================================================
  // GLACIERS sans laitage — commodité, pas objectif
  // ==========================================================
  {
    id: 'gelateria-gentile',
    nom: 'Gelateria Gentile',
    type: 'glacier',
    ville: 'Bari',
    adresse: 'Piazza Federico II di Svevia 33, Bari',
    note: 'Depuis 1880, face au château. Sorbet mûre sauvage (gelso) ou pêche locale (percoca) en août. Gamme crémeuse au lait de riz.',
    lat: 41.12782,
    lon: 16.86697,
    precision: 'rue',
    jours: JOURS_BARI,
  },
  {
    id: 'gelateria-piccinni',
    nom: 'Gelateria Piccinni',
    type: 'glacier',
    ville: 'Bari',
    adresse: 'Via Niccolò Piccinni 131, Bari',
    note: 'En centre-ville. Sorbets à l’eau, chocolat noir et pistache sans lait.',
    lat: 41.12522,
    lon: 16.86596,
    precision: 'poi',
    jours: JOURS_BARI,
  },
  {
    id: 'il-gelatiere',
    nom: 'Il Gelatiere',
    type: 'glacier',
    ville: 'Bari',
    adresse: 'Viale Antonio Salandra 25a, Bari',
    note: 'Adresse de quartier. Vitrine « senza latte base acqua » clairement identifiée.',
    lat: 41.11487,
    lon: 16.86411,
    precision: 'rue',
    jours: JOURS_BARI,
  },
  {
    id: 'gelatario',
    nom: 'Gelatario',
    type: 'glacier',
    ville: 'Lecce',
    adresse: 'Via Giuseppe Libertini 63, Lecce',
    note: 'Ingrédients très courts, 100 % naturels. Pistache vegan légèrement salée.',
    lat: 40.35227,
    lon: 18.16857,
    precision: 'poi',
    jours: JOURS_LECCE,
  },
  {
    id: 'agricola-gelateria',
    nom: 'Agricola Gelateria',
    type: 'glacier',
    ville: 'Lecce',
    adresse: 'Piazza d’Italia 28, Lecce',
    note: 'Déclinaisons vegan bien identifiées, sans sucres ajoutés.',
    lat: 40.34921,
    lon: 18.17361,
    precision: 'rue',
    jours: JOURS_LECCE,
  },
  {
    id: 'la-romana-dal-1947',
    nom: 'La Romana dal 1947',
    type: 'glacier',
    ville: 'Lecce',
    adresse: 'Via San Francesco d’Assisi 1, Lecce',
    note: 'Grande enseigne, carte dédiée « senza latte ».',
    lat: 40.3556,
    lon: 18.17625,
    precision: 'rue',
    jours: JOURS_LECCE,
  },
]

/**
 * Ouvre l'app Plans de l'iPhone.
 *
 * Quand la position est exacte, on l'envoie telle quelle. Sinon on passe
 * l'adresse en texte : le géocodeur d'Apple a une chance de mieux résoudre le
 * numéro que nos coordonnées, qui pointeraient au milieu de la voie.
 */
export function lienCarte(lieu: Lieu): string {
  if (lieu.precision === 'poi') {
    return `https://maps.apple.com/?ll=${lieu.lat},${lieu.lon}&q=${encodeURIComponent(lieu.nom)}`
  }
  return `https://maps.apple.com/?q=${encodeURIComponent(lieu.adresse)}`
}

/**
 * Itinéraire pas à pas, délégué à Google Maps.
 *
 * Calculer un itinéraire dans l'application supposerait un moteur de routage
 * externe, sans données de transport en commun italien et inutilisable
 * hors-ligne. Google Maps a les horaires Trenitalia et les lignes de bus
 * locales : autant lui passer la main. Le lien s'ouvre dans l'application
 * Google Maps si elle est installée, sinon dans le navigateur.
 */
export function lienItineraire(lieu: Lieu): string {
  const destination = lieu.precision === 'poi' ? `${lieu.lat},${lieu.lon}` : lieu.adresse
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`
}

const PAR_ID = new Map(LIEUX.map((lieu) => [lieu.id, lieu]))

/** Renvoie undefined plutôt que de lever : un lien cassé ne doit pas vider l'écran. */
export function lieuParId(id: string): Lieu | undefined {
  return PAR_ID.get(id)
}

export function lieuxParIds(ids: readonly string[]): Lieu[] {
  return ids.map(lieuParId).filter((lieu): lieu is Lieu => lieu !== undefined)
}

export const LIBELLES_TYPE: Record<TypeLieu, { label: string; court: string; icone: NomIcone }> = {
  transport: { label: 'Gares et terminaux', court: 'Transport', icone: 'transport' },
  site: { label: 'À voir', court: 'À voir', icone: 'site' },
  hebergement: { label: 'Hébergement', court: 'Dormir', icone: 'hebergement' },
  manger: { label: 'Où manger', court: 'Manger', icone: 'manger' },
  supermarche: { label: 'Supermarchés', court: 'Courses', icone: 'supermarche' },
  glacier: { label: 'Glaciers sans laitage', court: 'Glaces', icone: 'glacier' },
}

export const LIBELLES_PRECISION: Record<Precision, string> = {
  poi: 'Position exacte',
  rue: 'Position au niveau de la rue',
  ville: 'Position au centre de la ville',
}
