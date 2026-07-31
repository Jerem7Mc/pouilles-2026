import { PREMIER_JOUR } from '../../partage/voyage'
import type { Jour } from '../types'

/**
 * Carnet de route figé au départ, montants en centimes.
 *
 * `transportPrevu` reprend le plan tel quel, ses tarifs sont vérifiables.
 * `repasPrevu` est en revanche relevé à 25 € par jour partout : le plan
 * d'origine ne comptait que deux repas quotidiens et tombait à 12 € certains
 * jours, ce qui est intenable avec un petit-déjeuner, un déjeuner et un dîner.
 * Mieux vaut un prévu réaliste qu'un écran qui affiche un dépassement chaque
 * jour et qu'on finit par ignorer.
 */
const REPAS_PAR_JOUR = 2_500
export const ITINERAIRE: readonly Jour[] = [
  {
    date: '2026-08-24',
    titre: 'Bienvenue à Bari',
    base: 'Bari',
    lieuHebergement: 'the-queen-room-bari',
    aFaire:
      'Atterrissage à 13h40, mais le logement n’ouvre qu’à 16 h : deux heures à tenir sac au dos, autant les passer dans Bari Vecchia plutôt qu’à attendre devant la porte. Ruelles de Bari Vecchia, les mamies qui fabriquent les orecchiette dans la rue, puis passeggiata sur le front de mer au coucher du soleil.',
    transport:
      'Vol Ryanair FR2007, Toulouse 11h35, Bari 13h40. Train navette Ferrotramviaria depuis le sous-sol du terminal de l’aéroport jusqu’à Bari Centrale. Le logement est ensuite à 1,9 km, quartier Libertà : bus AMTAB ligne 1 depuis Bari Centrale, arrêt à 250 m, 1,20 € le titre de 90 minutes. À pied ce sont 24 minutes, déconseillé avec les bagages.',
    transportPrevu: 650,
    ouManger:
      'Boulangerie Fiore : deux grosses parts de focaccia barese (huile d’olive, tomates fraîches, olives).',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['aeroport-de-bari', 'bari-centrale'],
    lieuxSites: [
      'bari-vecchia-piazza-mercantile',
      'basilique-san-nicola',
      'chateau-normand-souabe',
      'lungomare-nazario-sauro',
    ],
    lieuxManger: ['boulangerie-fiore'],
    reservations: [
      { label: 'Navette aéroport, Ferrotramviaria', url: 'https://www.ferrotramviaria.it/home' },
    ],
  },
  {
    date: '2026-08-25',
    titre: 'Les Sassi de Matera',
    base: 'Bari',
    lieuHebergement: 'the-queen-room-bari',
    aFaire:
      'Journée entière dans la cité de pierre : églises rupestres, habitations troglodytes, panorama depuis la Piazza Pascoli.',
    transport:
      'Bus AMTAB ligne 1 jusqu’à Bari Centrale, puis train direct Ferrovie Appulo Lucane (FAL) depuis la gare adjacente. Billets aux bornes grises FAL. Horaires à plein régime le mardi.',
    transportPrevu: 1380,
    ouManger:
      'Restaurant La Lopa, midi et soir : fave e cicorie (purée de fèves à l’huile d’olive, chicorée sauvage, peperoni cruschi).',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['bari-centrale', 'gare-de-matera-centrale'],
    lieuxSites: ['belvedere-luigi-guerricchio', 'santa-maria-de-idris'],
    lieuxManger: ['la-lopa'],
    reservations: [{ label: 'Horaires et billets FAL', url: 'https://ferrovieappulolucane.it' }],
  },
  {
    date: '2026-08-26',
    titre: 'Le port de Trani',
    base: 'Bari',
    lieuHebergement: 'the-queen-room-bari',
    aFaire:
      'Air marin à Trani : la cathédrale blanche posée au ras de l’eau, le fort historique et le port de pêche.',
    transport:
      'Bus AMTAB ligne 1 jusqu’à Bari Centrale, puis train régional direct, réservable sur l’application ou le site Trenitalia.',
    transportPrevu: 960,
    ouManger:
      'Friterie marine Peschef sur le port : poulpe grillé ou grande salade de fruits de mer, huile d’olive et citron.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['bari-centrale', 'gare-de-trani'],
    lieuxSites: ['cathedrale-de-trani', 'chateau-souabe-de-trani'],
    lieuxManger: ['peschef'],
    reservations: [{ label: 'Billets Trenitalia', url: 'https://www.trenitalia.com' }],
  },
  {
    date: '2026-08-27',
    titre: 'Polignano a Mare et Monopoli',
    base: 'Bari',
    lieuHebergement: 'the-queen-room-bari',
    aFaire:
      'Matinée à Polignano pour la crique de Lama Monachile et les falaises. Après-midi à Monopoli : baignade à la Cala Porta Vecchia et centre fortifié.',
    transport:
      'Bus AMTAB ligne 1 jusqu’à Bari Centrale, puis trains régionaux successifs Trenitalia (Bari, Polignano, Monopoli, Bari). Chaque trajet dure de 5 à 30 minutes.',
    transportPrevu: 1200,
    ouManger:
      'Pescaria à Polignano : panino con polpo fritto (poulpe frit, figues, chicorée). Demander impérativement à retirer la crème de ricotta.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['bari-centrale', 'gare-de-polignano-a-mare', 'gare-de-monopoli'],
    lieuxSites: ['lama-monachile', 'cala-porta-vecchia', 'chateau-charles-quint'],
    lieuxManger: ['pescaria'],
    reservations: [{ label: 'Billets Trenitalia', url: 'https://www.trenitalia.com' }],
  },
  {
    date: '2026-08-28',
    titre: 'La perle blanche d’Ostuni',
    base: 'Bari',
    lieuHebergement: 'the-queen-room-bari',
    aFaire:
      'La ville blanche juchée sur sa colline : labyrinthe de ruelles chaulées et vue sur les plaines d’oliviers jusqu’à la mer.',
    transport:
      'Bus AMTAB ligne 1 jusqu’à Bari Centrale, train régional Trenitalia jusqu’à la gare d’Ostuni, puis navette de bus STP devant la gare pour monter au centre historique.',
    transportPrevu: 1540,
    ouManger:
      'Boulangerie d’Ostuni : puccia au feu de bois garnie de légumes grillés, thon à l’huile et câpres. Préciser « senza formaggio ».',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['bari-centrale', 'gare-d-ostuni'],
    lieuxSites: ['concathedrale-d-ostuni'],
    lieuxManger: [],
    reservations: [{ label: 'Billets Trenitalia', url: 'https://www.trenitalia.com' }],
    alerte:
      'La gare est à 2,8 km du centre historique. Prendre la navette de bus STP qui attend devant la gare, la montée à pied n’est pas raisonnable en août.',
  },
  {
    date: '2026-08-29',
    titre: 'Les trulli d’Alberobello',
    base: 'Bari',
    lieuHebergement: 'the-queen-room-bari',
    aFaire:
      'Les 1500 maisons à toit conique. Se concentrer sur le quartier résidentiel préservé de Rione Aia Piccola pour éviter les foules du samedi.',
    transport:
      'Bus AMTAB ligne 1 jusqu’à Bari Centrale, puis bus officiel FSE (Ferrovie del Sud Est). Horaires et billets sur l’interface Trenitalia.',
    transportPrevu: 1240,
    ouManger:
      'Grand cornet de taralli artisanaux (farine, vin blanc, huile d’olive) en boulangerie, avec tomates cerises et fruits frais.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['bari-centrale', 'gare-d-alberobello'],
    lieuxSites: ['rione-aia-piccola', 'rione-monti'],
    lieuxManger: [],
    reservations: [
      { label: 'Billets Trenitalia', url: 'https://www.trenitalia.com' },
      { label: 'Réseau FSE', url: 'https://www.fssudest.it' },
    ],
  },
  {
    date: '2026-08-30',
    titre: 'Descente vers le Sud profond',
    base: 'Lecce',
    lieuHebergement: 'mammasisi-rooms',
    aFaire:
      'Matinée de transfert. Après-midi à Lecce, la Florence du Sud : théâtre romain, palais, Piazza del Duomo.',
    transport:
      'Bus AMTAB ligne 1 jusqu’à Bari Centrale, train régional direct vers Lecce (Trenitalia), puis 1,1 km jusqu’au logement, 13 minutes à pied par le centre historique.',
    transportPrevu: 1300,
    ouManger:
      'La Puccia, Viale Giacomo Leopardi : puccia leccese sur mesure, prosciutto crudo, tomates séchées, olives, roquette. Sans fromage ni crème.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['bari-centrale', 'gare-de-lecce'],
    lieuxSites: ['piazza-del-duomo', 'basilique-santa-croce', 'amphitheatre-romain'],
    lieuxManger: ['la-puccia'],
    reservations: [
      { label: 'Billets Trenitalia', url: 'https://www.trenitalia.com' },
      {
        label: 'Salento in Bus, horaires officiels',
        url: 'https://www.provincia.le.it/salento-in-bus-orari-e-linee/',
      },
    ],
    alerte:
      'Horaires de Salento in Bus pour Otrante et Porto Cesareo : le site salentoinbus.it n’existe plus, la source officielle est la Province de Lecce, un PDF par ligne, et les horaires des 1er et 2 septembre sont déjà dans le journal. Rien à aller chercher au terminal. Call center 379 333 79 79, tous les jours de 8h à 20h. Les deux lignes partent du City Terminal, à 2 km de la gare.',
  },
  {
    date: '2026-08-31',
    titre: 'Gallipoli, perle ionienne',
    base: 'Lecce',
    lieuHebergement: 'mammasisi-rooms',
    aFaire:
      'Vieille ville fortifiée bâtie sur une île de pêcheurs, puis baignade sur la Spiaggia della Purità au pied des remparts.',
    transport: 'Bus ou train local FSE au départ de Lecce, réservable sur Trenitalia.',
    transportPrevu: 1000,
    ouManger:
      'En trattoria : orecchiette con cime di rapa (ail, huile d’olive, anchois). Bien préciser « senza formaggio », certains en saupoudrent au service.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['gare-de-lecce', 'gare-de-gallipoli'],
    lieuxSites: ['chateau-angevin-de-gallipoli', 'spiaggia-della-purita'],
    lieuxManger: ['la-puccia'],
    reservations: [
      { label: 'Réseau FSE', url: 'https://www.fssudest.it' },
      { label: 'Billets Trenitalia', url: 'https://www.trenitalia.com' },
    ],
  },
  {
    date: '2026-09-01',
    titre: 'Otrante et la côte adriatique',
    base: 'Lecce',
    lieuHebergement: 'mammasisi-rooms',
    aFaire:
      'Château fortifié d’Otrante et sa cathédrale, baignade dans l’eau transparente près des remparts du port.',
    transport:
      'Ligne 101 Salento in Bus, opérée par ELIOS, au départ du City Terminal de Lecce : 07h30, 11h30 et 16h15, arrivée au port d’Otrante 1h45 plus tard. Retours du port à 09h00, 14h00 et 18h30, le dernier rentre à Lecce à 20h14. Billet à bord, espèces ou carte.',
    transportPrevu: 800,
    ouManger:
      'Frise à emporter : pains secs réhydratés, tomates fraîches frottées, huile d’olive extra-vierge et origan.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['city-terminal-bus-lecce', 'gare-d-otrante'],
    lieuxSites: ['chateau-aragonais-d-otrante', 'cathedrale-d-otrante'],
    lieuxManger: [],
    reservations: [
      {
        label: 'Horaires ligne 101, PDF officiel',
        url: 'https://www.provincia.le.it/wp-content/uploads/2026/06/Linea-101-Lecce-Torre-dellOrso-Otranto-A.pdf',
      },
      {
        label: 'Salento in Bus, toutes les lignes',
        url: 'https://www.provincia.le.it/salento-in-bus-orari-e-linee/',
      },
      { label: 'Repli en train, réseau FSE', url: 'https://www.fssudest.it' },
    ],
    alerte:
      'Départ du City Terminal, au nord, et non de la gare : 2 km séparent les deux. Rouvrir le PDF la veille au soir, avec du réseau : une révision d’horaires ou une grève ne se voit qu’en ligne, jamais sur une grille imprimée. L’arrêt Otranto Stazione FSE précède le port de 8 minutes. Repli en train FSE si la ligne ne roule pas.',
  },
  {
    date: '2026-09-02',
    titre: 'Porto Cesareo, les Caraïbes des Pouilles',
    base: 'Lecce',
    lieuHebergement: 'mammasisi-rooms',
    aFaire:
      'Journée farniente sur les plages de sable blanc et l’eau turquoise du golfe de Tarente.',
    transport:
      'Ligne 104 Salento in Bus, opérée par CHIFFI, au départ du City Terminal de Lecce à 09h00, arrivée Via Garibaldi à 09h56. Retours à 07h29, 12h59 et 17h59, le dernier rentre à Lecce à 18h55. Billet à bord, espèces ou carte.',
    transportPrevu: 700,
    ouManger:
      'Pique-nique autonome préparé au Sconto Più, à 350 m du logement (pain de campagne, prosciutto crudo, olives, tomates), pour éviter les tarifs des paillotes.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['city-terminal-bus-lecce'],
    lieuxSites: ['plage-de-porto-cesareo'],
    lieuxManger: [],
    reservations: [
      {
        label: 'Horaires ligne 104, PDF officiel',
        url: 'https://www.provincia.le.it/wp-content/uploads/2026/06/Linea-104-Lecce-Porto-Cesareo-Gallipoli-A.pdf',
      },
      {
        label: 'Salento in Bus, toutes les lignes',
        url: 'https://www.provincia.le.it/salento-in-bus-orari-e-linee/',
      },
      {
        label: 'Second opérateur, STP Lecce',
        url: 'https://www.stplecce.it/it/index.php?option=com_content&view=article&id=415%3Alinea-lecce-leverano-porto-cesareo&catid=11&Itemid=126',
      },
    ],
    alerte:
      'Trois passages par jour seulement : viser l’aller de 09h00 et le retour de 17h59, au City Terminal. Rouvrir le PDF la veille au soir, avec du réseau, une grève ne se voit qu’en ligne. Si la ligne ne roule pas, la STP dessert Porto Cesareo par Leverano au départ de la gare. Pique-nique à préparer la veille au Sconto Più, à 350 m du logement.',
  },
  {
    date: '2026-09-03',
    titre: 'Retour à Toulouse',
    base: 'Lecce',
    aFaire:
      'Matinée tranquille à Lecce, derniers souvenirs comestibles au supermarché plutôt qu’en boutique. Train pour Bari en début d’après-midi, sac à la consigne automatique de Bari Centrale, dernières heures en ville, puis aéroport pour le vol de 20 h 40.',
    transport:
      'Train régional Trenitalia (Lecce vers Bari) 11,80 €, navette Ferrotramviaria vers l’aéroport 5,30 €, consigne de gare 6,00 €. Vol Ryanair FR2008, Bari 20h40, Toulouse 23h00 : être à l’aéroport à 18h40, donc quitter Bari Centrale vers 18h00.',
    transportPrevu: 2310,
    ouManger: 'Derniers en-cas de rue à Bari : parts de focaccia ou taralli avant l’embarquement.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['gare-de-lecce', 'bari-centrale', 'aeroport-de-bari'],
    lieuxSites: ['bari-vecchia-piazza-mercantile', 'piazza-del-duomo'],
    lieuxManger: ['boulangerie-fiore'],
    reservations: [
      { label: 'Billets Trenitalia', url: 'https://www.trenitalia.com' },
      { label: 'Navette aéroport, Ferrotramviaria', url: 'https://www.ferrotramviaria.it/home' },
    ],
    alerte: 'Vol à 20 h 40. Consigne automatique à Bari Centrale, 6 € prévus.',
  },
]

if (ITINERAIRE[0]?.date !== PREMIER_JOUR) {
  throw new Error('L’itinéraire ne commence pas au premier jour du voyage')
}
