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
    hebergement: 'Host Bari Centrale',
    aFaire:
      'Bagages à l’hôtel à partir de 13 h. Ruelles de Bari Vecchia, les mamies qui fabriquent les orecchiette dans la rue, puis passeggiata sur le front de mer au coucher du soleil.',
    transport:
      'Train navette Ferrotramviaria depuis le sous-sol du terminal de l’aéroport jusqu’à Bari Centrale. L’hôtel est à 200 m de la gare.',
    transportPrevu: 530,
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
    hebergement: 'Host Bari Centrale',
    aFaire:
      'Journée entière dans la cité de pierre : églises rupestres, habitations troglodytes, panorama depuis la Piazza Pascoli.',
    transport:
      'Train direct Ferrovie Appulo Lucane (FAL) depuis la gare adjacente à Bari Centrale. Billets aux bornes grises FAL. Horaires à plein régime le mardi.',
    transportPrevu: 1140,
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
    hebergement: 'Host Bari Centrale',
    aFaire:
      'Air marin à Trani : la cathédrale blanche posée au ras de l’eau, le fort historique et le port de pêche.',
    transport: 'Train régional direct, réservable sur l’application ou le site Trenitalia.',
    transportPrevu: 720,
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
    hebergement: 'Host Bari Centrale',
    aFaire:
      'Matinée à Polignano pour la crique de Lama Monachile et les falaises. Après-midi à Monopoli : baignade à la Cala Porta Vecchia et centre fortifié.',
    transport:
      'Trains régionaux successifs Trenitalia (Bari, Polignano, Monopoli, Bari). Chaque trajet dure de 5 à 30 minutes.',
    transportPrevu: 960,
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
    hebergement: 'Host Bari Centrale',
    aFaire:
      'La ville blanche juchée sur sa colline : labyrinthe de ruelles chaulées et vue sur les plaines d’oliviers jusqu’à la mer.',
    transport:
      'Train régional Trenitalia jusqu’à la gare d’Ostuni, puis navette de bus STP devant la gare pour monter au centre historique.',
    transportPrevu: 1300,
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
    hebergement: 'Host Bari Centrale',
    aFaire:
      'Les 1500 maisons à toit conique. Se concentrer sur le quartier résidentiel préservé de Rione Aia Piccola pour éviter les foules du samedi.',
    transport:
      'Bus officiel FSE (Ferrovie del Sud Est). Horaires et billets sur l’interface Trenitalia.',
    transportPrevu: 1000,
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
    hebergement: 'Lobby Collective Hostel Lecce',
    aFaire:
      'Matinée de transfert. Après-midi à Lecce, la Florence du Sud : théâtre romain, palais, Piazza del Duomo.',
    transport:
      'Train régional direct Bari Centrale vers Lecce (Trenitalia), puis 15 à 20 minutes de marche jusqu’à l’auberge ou bus urbain.',
    transportPrevu: 1180,
    ouManger:
      'La Puccia, Viale Giacomo Leopardi : puccia leccese sur mesure, prosciutto crudo, tomates séchées, olives, roquette. Sans fromage ni crème.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['bari-centrale', 'gare-de-lecce'],
    lieuxSites: ['piazza-del-duomo', 'basilique-santa-croce', 'amphitheatre-romain'],
    lieuxManger: ['la-puccia'],
    reservations: [{ label: 'Billets Trenitalia', url: 'https://www.trenitalia.com' }],
    alerte:
      'À vérifier dès l’arrivée à Lecce : les horaires de Salento in Bus pour Otrante et Porto Cesareo. Le site salentoinbus.it ne répond plus, il faut consulter l’affichage officiel en gare ou au City Terminal.',
  },
  {
    date: '2026-08-31',
    titre: 'Gallipoli, perle ionienne',
    base: 'Lecce',
    hebergement: 'Lobby Collective Hostel Lecce',
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
    hebergement: 'Lobby Collective Hostel Lecce',
    aFaire:
      'Château fortifié d’Otrante et sa cathédrale, baignade dans l’eau transparente près des remparts du port.',
    transport:
      'Réseau de bus estival Salento in Bus depuis le terminal de Lecce. Vigilance : les grilles horaires changent souvent au 1er septembre, vérifier l’affichage officiel en gare de Lecce dès l’arrivée le 30 août.',
    transportPrevu: 800,
    ouManger:
      'Frise à emporter : pains secs réhydratés, tomates fraîches frottées, huile d’olive extra-vierge et origan.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['city-terminal-bus-lecce', 'gare-d-otrante'],
    lieuxSites: ['chateau-aragonais-d-otrante', 'cathedrale-d-otrante'],
    lieuxManger: [],
    reservations: [{ label: 'Repli en train, réseau FSE', url: 'https://www.fssudest.it' }],
    alerte:
      'Salento in Bus part du City Terminal, au nord, et non de la gare. Aucun site joignable pour les horaires : vérifier l’affichage sur place. Repli possible en train FSE jusqu’à Otrante.',
  },
  {
    date: '2026-09-02',
    titre: 'Porto Cesareo, les Caraïbes des Pouilles',
    base: 'Lecce',
    hebergement: 'Lobby Collective Hostel Lecce',
    aFaire:
      'Journée farniente sur les plages de sable blanc et l’eau turquoise du golfe de Tarente.',
    transport: 'Ligne dédiée Salento in Bus depuis le terminal de bus de Lecce.',
    transportPrevu: 700,
    ouManger:
      'Pique-nique autonome préparé à l’Eurospin voisin de l’auberge (pain de campagne, prosciutto crudo, olives, tomates), pour éviter les tarifs des paillotes.',
    repasPrevu: REPAS_PAR_JOUR,
    lieuxTransport: ['city-terminal-bus-lecce'],
    lieuxSites: ['plage-de-porto-cesareo'],
    lieuxManger: [],
    reservations: [],
    alerte:
      'Salento in Bus depuis le City Terminal. Horaires à vérifier sur place, le site du réseau est hors service. Pique-nique à préparer la veille à l’Eurospin.',
  },
  {
    date: '2026-09-03',
    titre: 'Retour à Toulouse',
    base: 'Lecce',
    hebergement: 'Départ, vol à 20 h 40',
    aFaire:
      'Matinée tranquille à Lecce, derniers souvenirs comestibles au supermarché plutôt qu’en boutique. Train pour Bari en début d’après-midi, sac à la consigne automatique de Bari Centrale, dernières heures en ville, puis aéroport.',
    transport:
      'Train régional Trenitalia (Lecce vers Bari) 11,80 €, navette Ferrotramviaria vers l’aéroport 5,30 €, consigne de gare 6,00 €.',
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
