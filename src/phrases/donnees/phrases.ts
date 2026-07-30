export interface Phrase {
  fr: string
  it: string
}

export interface SectionPhrases {
  id: string
  titre: string
  emoji: string
  phrases: readonly Phrase[]
}

/**
 * Antimémoire de survie, consultable hors-ligne. Les crochets marquent les
 * mots à remplacer par sa destination.
 */
export const SECTIONS_PHRASES: readonly SectionPhrases[] = [
  {
    id: 'laitage',
    titre: 'Sans laitage',
    emoji: '🥛',
    phrases: [
      {
        fr: 'Je suis intolérant au lait et au fromage',
        it: 'Sono intollerante al latte e al formaggio',
      },
      { fr: 'Sans fromage', it: 'Senza formaggio' },
      { fr: 'Sans crème', it: 'Senza crema' },
      { fr: 'Sans beurre', it: 'Senza burro' },
      { fr: 'Est-ce qu’il y a du lait ou du beurre là-dedans ?', it: 'C’è latte o burro dentro?' },
      {
        fr: 'Ce parfum de glace est-il fait avec de l’eau ou du lait ?',
        it: 'Questo gusto è fatto con acqua o con latte?',
      },
      { fr: 'C’est à base d’huile d’olive ?', it: 'È a base di olio d’oliva?' },
    ],
  },
  {
    id: 'transports',
    titre: 'Transports',
    emoji: '🚂',
    phrases: [
      { fr: 'Un billet pour [Bari], s’il vous plaît', it: 'Un biglietto per [Bari], per favore' },
      { fr: 'Aller-retour', it: 'Andata e ritorno' },
      { fr: 'À quelle heure part le prochain train ?', it: 'A che ora parte il prossimo treno?' },
      { fr: 'Est-ce que ce bus va à [Otranto] ?', it: 'Questo autobus va a [Otranto]?' },
      { fr: 'Où puis-je acheter le billet ?', it: 'Dove posso comprare il biglietto?' },
      {
        fr: 'De quel quai part le train pour [Matera] ?',
        it: 'Da quale binario parte il treno per [Matera]?',
      },
      { fr: 'Le train a du retard', it: 'Il treno è in ritardo' },
      { fr: 'Le train est annulé', it: 'Il treno è cancellato' },
      {
        fr: 'Où se trouve la consigne automatique à bagages ?',
        it: 'Dov’è il deposito bagagli automatico?',
      },
      { fr: 'Est-ce que ce siège est libre ?', it: 'Questo posto è libero?' },
      { fr: 'Où dois-je valider mon billet ?', it: 'Dove devo timbrare il biglietto?' },
    ],
  },
  {
    id: 'orientation',
    titre: 'S’orienter',
    emoji: '🗺️',
    phrases: [
      { fr: 'Où se trouve la gare ?', it: 'Dov’è la stazione?' },
      { fr: 'Où se trouve l’arrêt de bus ?', it: 'Dov’è la fermata dell’autobus?' },
      { fr: 'Où sont les toilettes ?', it: 'Dov’è il bagno?' },
      { fr: 'Le centre-ville', it: 'Il centro città' },
      { fr: 'Le supermarché', it: 'Il supermercato' },
      { fr: 'C’est loin ?', it: 'È lontano?' },
      { fr: 'C’est près ?', it: 'È vicino?' },
      { fr: 'À droite', it: 'A destra' },
      { fr: 'À gauche', it: 'A sinistra' },
      { fr: 'Tout droit', it: 'Sempre dritto' },
    ],
  },
  {
    id: 'achats',
    titre: 'Achats et argent',
    emoji: '🛍️',
    phrases: [
      { fr: 'Combien ça coûte ?', it: 'Quanto costa?' },
      { fr: 'Puis-je payer par carte bancaire ?', it: 'Posso pagare con la carta?' },
      { fr: 'Je cherche un distributeur de billets', it: 'Cerco un bancomat' },
      { fr: 'Où sont les paniers ?', it: 'Dove sono i cestini?' },
      { fr: 'Où sont les caddies ?', it: 'Dove sono i carrelli?' },
      { fr: 'Où se trouve la caisse ?', it: 'Dov’è la cassa?' },
    ],
  },
  {
    id: 'hebergement',
    titre: 'Auberge et hôtel',
    emoji: '🏨',
    phrases: [
      {
        fr: 'J’ai une réservation au nom de [votre nom]',
        it: 'Ho una prenotazione a nome di [votre nom]',
      },
      { fr: 'Où se trouve ma chambre ?', it: 'Dov’è la mia camera?' },
      { fr: 'Où se trouve mon lit ?', it: 'Dov’è il mio letto?' },
      { fr: 'Quel est le code du Wi-Fi ?', it: 'Qual è la password del Wi-Fi?' },
      {
        fr: 'Puis-je laisser mon sac ici pour la journée ?',
        it: 'Posso lasciare la mia borsa qui per la giornata?',
      },
      { fr: 'À quelle heure est le check-out ?', it: 'A che ora è il check-out?' },
    ],
  },
  {
    id: 'urgence',
    titre: 'Urgence',
    emoji: '🆘',
    phrases: [
      { fr: 'Pouvez-vous m’aider, s’il vous plaît ?', it: 'Può aiutarmi, per favore?' },
      { fr: 'J’ai perdu mon téléphone', it: 'Ho perso il mio telefono' },
      { fr: 'J’ai perdu mon portefeuille', it: 'Ho perso il mio portafoglio' },
      { fr: 'Où se trouve la pharmacie la plus proche ?', it: 'Dov’è la farmacia più vicina?' },
      { fr: 'Je ne me sens pas bien', it: 'Non mi sento bene' },
    ],
  },
  {
    id: 'politesse',
    titre: 'Politesse',
    emoji: '👋',
    phrases: [
      { fr: 'Bonjour', it: 'Buongiorno' },
      { fr: 'Bonsoir', it: 'Buonasera' },
      { fr: 'Salut', it: 'Ciao' },
      { fr: 'Au revoir', it: 'Arrivederci' },
      { fr: 'S’il vous plaît', it: 'Per favore' },
      { fr: 'Merci', it: 'Grazie' },
      { fr: 'Excusez-moi', it: 'Scusi' },
      { fr: 'Parlez-vous français ?', it: 'Parla francese?' },
      { fr: 'Parlez-vous anglais ?', it: 'Parla inglese?' },
      { fr: 'Je ne comprends pas', it: 'Non capisco' },
    ],
  },
]
