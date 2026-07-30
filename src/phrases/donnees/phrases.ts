import type { NomIcone } from '../../partage/icones'

export interface Phrase {
  fr: string
  it: string
}

export interface SectionPhrases {
  id: string
  titre: string
  /** Libellé court, pour les pastilles de filtre sur mobile. */
  court: string
  icone: NomIcone
  phrases: readonly Phrase[]
}

/**
 * Antimémoire de survie, consultable hors-ligne. Les crochets marquent les
 * mots à remplacer par sa destination ou son prénom.
 *
 * L'ordre des sections est celui des pastilles de filtre, et il est voulu :
 * du plus courant au plus rare, le sans-laitage placé juste après les achats.
 */
export const SECTIONS_PHRASES: readonly SectionPhrases[] = [
  {
    id: 'politesse',
    titre: 'Politesse',
    court: 'Politesse',
    icone: 'politesse',
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
      { fr: 'Pouvez-vous répéter plus lentement ?', it: 'Può ripetere più lentamente?' },
    ],
  },
  {
    id: 'orientation',
    titre: 'S’orienter',
    court: 'Orientation',
    icone: 'orientation',
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
    id: 'transports',
    titre: 'Transports',
    court: 'Transports',
    icone: 'transport',
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
    id: 'achats',
    titre: 'Achats et argent',
    court: 'Achats',
    icone: 'achats',
    phrases: [
      { fr: 'Combien ça coûte ?', it: 'Quanto costa?' },
      { fr: 'Puis-je payer par carte bancaire ?', it: 'Posso pagare con la carta?' },
      { fr: 'Je cherche un distributeur de billets', it: 'Cerco un bancomat' },
      { fr: 'Où sont les paniers ?', it: 'Dove sono i cestini?' },
      { fr: 'Où sont les caddies ?', it: 'Dove sono i carrelli?' },
      { fr: 'Où se trouve la caisse ?', it: 'Dov’è la cassa?' },
      { fr: 'C’est trop cher pour moi', it: 'È troppo caro per me' },
    ],
  },
  {
    id: 'laitage',
    titre: 'Sans laitage',
    court: 'Sans laitage',
    icone: 'laitage',
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
      {
        fr: 'Attention, c’est important pour ma santé',
        it: 'Attenzione, è importante per la mia salute',
      },
    ],
  },
  {
    id: 'hebergement',
    titre: 'Auberge et hôtel',
    court: 'Hôtel',
    icone: 'hebergement',
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
    id: 'drague',
    titre: 'Rencontres',
    court: 'Rencontres',
    icone: 'drague',
    phrases: [
      // Aborder
      { fr: 'Salut, je peux t’offrir un verre ?', it: 'Ciao, posso offrirti da bere?' },
      { fr: 'Je peux m’asseoir ?', it: 'Posso sedermi?' },
      { fr: 'Tu es d’ici ?', it: 'Sei di qui?' },
      {
        fr: 'Je suis français, je voyage dans les Pouilles',
        it: 'Sono francese, sto viaggiando in Puglia',
      },
      { fr: 'Je ne parle pas bien italien, désolé', it: 'Non parlo bene italiano, scusa' },
      { fr: 'Tu me conseilles quoi, dans le coin ?', it: 'Cosa mi consigli qui in zona?' },

      // Faire connaissance
      { fr: 'Comment tu t’appelles ?', it: 'Come ti chiami?' },
      { fr: 'Moi c’est [votre prénom]', it: 'Io sono [votre prénom]' },
      { fr: 'Tu es ici en vacances ?', it: 'Sei qui in vacanza?' },
      { fr: 'Tu fais quoi dans la vie ?', it: 'Che lavoro fai?' },
      { fr: 'Tu as quel âge ?', it: 'Quanti anni hai?' },
      { fr: 'Je suis à Bari pour une semaine', it: 'Sono a Bari per una settimana' },

      // Compliments
      { fr: 'Tu as un très beau sourire', it: 'Hai un sorriso bellissimo' },
      { fr: 'Tu es très belle', it: 'Sei molto bella' },
      { fr: 'Tu es très beau', it: 'Sei molto bello' },
      { fr: 'J’aime beaucoup ton accent', it: 'Mi piace molto il tuo accento' },
      { fr: 'Tu danses très bien', it: 'Balli molto bene' },

      // Proposer
      { fr: 'Tu veux boire quelque chose avec moi ?', it: 'Ti va di bere qualcosa con me?' },
      { fr: 'On va prendre une glace ?', it: 'Ti va di andare a prendere un gelato?' },
      { fr: 'Je connais un bel endroit', it: 'Conosco un bel posto' },
      { fr: 'On se voit demain ?', it: 'Ci vediamo domani?' },
      { fr: 'Tu me donnes ton numéro ?', it: 'Mi dai il tuo numero?' },
      { fr: 'Tu es sur Instagram ?', it: 'Sei su Instagram?' },
      { fr: 'Je peux te revoir ?', it: 'Posso rivederti?' },

      // Aller plus loin, en demandant
      { fr: 'Tu me plais beaucoup', it: 'Mi piaci molto' },
      { fr: 'Je passe un très bon moment avec toi', it: 'Mi sto divertendo molto con te' },
      { fr: 'Je peux t’embrasser ?', it: 'Posso baciarti?' },

      // Dire non, et savoir reconnaître un non
      { fr: 'Non merci, ça ne m’intéresse pas', it: 'No grazie, non mi interessa' },
      { fr: 'Je préfère rester seul, merci', it: 'Preferisco stare da solo, grazie' },
      { fr: 'Laisse-moi tranquille, s’il te plaît', it: 'Lasciami in pace, per favore' },
      { fr: 'J’ai compris, aucun souci', it: 'Ho capito, nessun problema' },
      { fr: 'Pardon de t’avoir dérangé, bonne soirée', it: 'Scusa il disturbo, buona serata' },
      { fr: 'Je suis désolé, je repars jeudi', it: 'Mi dispiace, torno a casa giovedì' },
    ],
  },
  {
    id: 'urgence',
    titre: 'Urgence',
    court: 'Urgence',
    icone: 'urgence',
    phrases: [
      { fr: 'Pouvez-vous m’aider, s’il vous plaît ?', it: 'Può aiutarmi, per favore?' },
      { fr: 'J’ai perdu mon téléphone', it: 'Ho perso il mio telefono' },
      { fr: 'J’ai perdu mon portefeuille', it: 'Ho perso il mio portafoglio' },
      { fr: 'Où se trouve la pharmacie la plus proche ?', it: 'Dov’è la farmacia più vicina?' },
      { fr: 'Je ne me sens pas bien', it: 'Non mi sento bene' },
      { fr: 'Appelez une ambulance', it: 'Chiami un’ambulanza' },
      { fr: 'J’ai besoin d’un médecin', it: 'Ho bisogno di un medico' },
    ],
  },
]
