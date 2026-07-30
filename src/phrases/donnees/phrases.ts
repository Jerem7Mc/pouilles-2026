import type { NomIcone } from '../../partage/icones'

export interface Phrase {
  fr: string
  it: string
  /** Précision d'usage, affichée sur la fiche. Réservée aux vrais pièges locaux. */
  astuce?: string
}

export interface SectionPhrases {
  id: string
  titre: string
  /** Libellé court, pour les tuiles de l'accueil. */
  court: string
  icone: NomIcone
  phrases: readonly Phrase[]
}

/**
 * Antimémoire de survie, consultable hors-ligne. Les crochets marquent les mots
 * à remplacer par sa destination ou son prénom.
 *
 * L'ordre des sections suit la fréquence d'usage réelle sur ce voyage, pas une
 * logique de manuel. Le sans-laitage est une contrainte parmi d'autres, pas un
 * axe du séjour : il est rangé comme les autres.
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
      {
        fr: 'Salut',
        it: 'Ciao',
        astuce: 'Entre gens du même âge. Avec un commerçant, préférer buongiorno.',
      },
      { fr: 'Au revoir', it: 'Arrivederci' },
      { fr: 'S’il vous plaît', it: 'Per favore' },
      { fr: 'Merci', it: 'Grazie' },
      { fr: 'Merci beaucoup', it: 'Grazie mille' },
      { fr: 'Je vous en prie', it: 'Prego' },
      { fr: 'Excusez-moi', it: 'Scusi' },
      {
        fr: 'Pardon, je passe',
        it: 'Permesso',
        astuce: 'Le mot pour se frayer un passage dans une ruelle ou un bus bondé.',
      },
      { fr: 'Parlez-vous français ?', it: 'Parla francese?' },
      { fr: 'Parlez-vous anglais ?', it: 'Parla inglese?' },
      { fr: 'Je ne comprends pas', it: 'Non capisco' },
      { fr: 'Pouvez-vous répéter plus lentement ?', it: 'Può ripetere più lentamente?' },
      { fr: 'Je ne parle qu’un peu italien', it: 'Parlo solo un po’ d’italiano' },
    ],
  },
  {
    id: 'comprendre',
    titre: 'Comprendre la réponse',
    court: 'Comprendre',
    icone: 'comprendre',
    phrases: [
      {
        fr: 'Seulement en espèces',
        it: 'Solo contanti',
        astuce: 'Fréquent dans le Sud, y compris au restaurant. Toujours garder du liquide.',
      },
      { fr: 'C’est fermé', it: 'È chiuso' },
      { fr: 'C’est ouvert', it: 'È aperto' },
      {
        fr: 'Fermeture de l’après-midi',
        it: 'Pausa pranzo',
        astuce: 'Beaucoup de commerces ferment de 13 h 30 à 16 h 30, surtout en août.',
      },
      { fr: 'Il n’y en a plus', it: 'Non c’è più' },
      { fr: 'C’est complet', it: 'È al completo' },
      { fr: 'Il faut réserver', it: 'Bisogna prenotare' },
      { fr: 'Attendez un instant', it: 'Aspetti un momento' },
      { fr: 'Suivez-moi', it: 'Mi segua' },
      { fr: 'Là-bas', it: 'Laggiù' },
      { fr: 'Tout droit puis à droite', it: 'Sempre dritto e poi a destra' },
      { fr: 'Ce n’est pas possible', it: 'Non è possibile' },
      { fr: 'Pouvez-vous l’écrire ?', it: 'Può scriverlo?' },
      { fr: 'Pouvez-vous me le montrer sur la carte ?', it: 'Può mostrarmelo sulla mappa?' },
      { fr: 'Combien de temps ?', it: 'Quanto tempo?' },
    ],
  },
  {
    id: 'orientation',
    titre: 'S’orienter et la chaleur',
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
      { fr: 'À pied, ça prend combien de temps ?', it: 'A piedi, quanto ci vuole?' },
      { fr: 'À droite', it: 'A destra' },
      { fr: 'À gauche', it: 'A sinistra' },
      { fr: 'Tout droit', it: 'Sempre dritto' },
      {
        fr: 'Où y a-t-il une fontaine d’eau potable ?',
        it: 'Dov’è una fontanella?',
        astuce: 'Les fontanelle publiques sont partout dans les Pouilles, et l’eau est potable.',
      },
      { fr: 'Où puis-je remplir ma gourde ?', it: 'Dove posso riempire la borraccia?' },
      { fr: 'Il fait très chaud', it: 'Fa molto caldo' },
      { fr: 'Y a-t-il de l’ombre ?', it: 'C’è ombra?' },
    ],
  },
  {
    id: 'transports',
    titre: 'Trains et bus',
    court: 'Transports',
    icone: 'transport',
    phrases: [
      { fr: 'Un billet pour [Bari], s’il vous plaît', it: 'Un biglietto per [Bari], per favore' },
      { fr: 'Aller-retour', it: 'Andata e ritorno' },
      { fr: 'Aller simple', it: 'Solo andata' },
      { fr: 'À quelle heure part le prochain train ?', it: 'A che ora parte il prossimo treno?' },
      {
        fr: 'De quel quai part le train pour [Matera] ?',
        it: 'Da quale binario parte il treno per [Matera]?',
      },
      { fr: 'Ce train s’arrête-t-il à [Ostuni] ?', it: 'Questo treno ferma a [Ostuni]?' },
      { fr: 'Dois-je changer ?', it: 'Devo cambiare?' },
      { fr: 'Quel est le prochain arrêt ?', it: 'Qual è la prossima fermata?' },
      { fr: 'Est-ce que ce bus va à [Otranto] ?', it: 'Questo autobus va a [Otranto]?' },
      {
        fr: 'Où est l’arrêt de la navette pour le centre ?',
        it: 'Dov’è la fermata della navetta per il centro?',
        astuce: 'Indispensable à Ostuni : la gare est à 2,8 km du centre historique.',
      },
      { fr: 'Où puis-je acheter le billet ?', it: 'Dove posso comprare il biglietto?' },
      {
        fr: 'Où dois-je valider mon billet ?',
        it: 'Dove devo timbrare il biglietto?',
        astuce: 'Billet régional non composté, amende possible même s’il est payé.',
      },
      { fr: 'Le train a du retard', it: 'Il treno è in ritardo' },
      { fr: 'Le train est annulé', it: 'Il treno è cancellato' },
      { fr: 'J’ai raté mon train', it: 'Ho perso il treno' },
      { fr: 'Est-ce que ce siège est libre ?', it: 'Questo posto è libero?' },
      {
        fr: 'Où se trouve la consigne automatique à bagages ?',
        it: 'Dov’è il deposito bagagli automatico?',
      },
    ],
  },
  {
    id: 'restaurant',
    titre: 'Au restaurant',
    court: 'Restaurant',
    icone: 'manger',
    phrases: [
      { fr: 'Une table pour une personne', it: 'Un tavolo per una persona' },
      { fr: 'Le menu, s’il vous plaît', it: 'Il menù, per favore' },
      { fr: 'Qu’est-ce que vous me conseillez ?', it: 'Cosa mi consiglia?' },
      { fr: 'Quelle est la spécialité locale ?', it: 'Qual è la specialità locale?' },
      {
        fr: 'Y a-t-il un couvert à payer ?',
        it: 'C’è il coperto?',
        astuce: 'Forfait par personne, 1 à 3 €, ajouté à l’addition. Normal en Italie.',
      },
      {
        fr: 'Une carafe d’eau, s’il vous plaît',
        it: 'Una caraffa d’acqua, per favore',
        astuce: 'Souvent refusée, beaucoup d’établissements ne servent que de l’eau en bouteille.',
      },
      { fr: 'De l’eau plate', it: 'Acqua naturale' },
      { fr: 'De l’eau gazeuse', it: 'Acqua frizzante' },
      { fr: 'Une portion', it: 'Una porzione' },
      { fr: 'C’est à emporter', it: 'Da portare via' },
      { fr: 'Je mange ici', it: 'Mangio qui' },
      { fr: 'Je n’ai pas commandé ça', it: 'Non ho ordinato questo' },
      { fr: 'L’addition, s’il vous plaît', it: 'Il conto, per favore' },
      { fr: 'C’était très bon', it: 'Era molto buono' },
      { fr: 'Acceptez-vous la carte ?', it: 'Accettate la carta?' },
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
      { fr: 'Sans lactose', it: 'Senza lattosio' },
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
      {
        fr: 'Pouvez-vous demander en cuisine ?',
        it: 'Può chiedere in cucina?',
        astuce: 'À sortir quand le serveur hésite. Mieux vaut attendre que supposer.',
      },
      {
        fr: 'Ne saupoudrez pas de fromage, s’il vous plaît',
        it: 'Non metta il formaggio grattugiato, per favore',
        astuce: 'Certaines trattorias en ajoutent au service, sans demander.',
      },
    ],
  },
  {
    id: 'achats',
    titre: 'Argent et achats',
    court: 'Argent',
    icone: 'achats',
    phrases: [
      { fr: 'Combien ça coûte ?', it: 'Quanto costa?' },
      { fr: 'Puis-je payer par carte bancaire ?', it: 'Posso pagare con la carta?' },
      { fr: 'Acceptez-vous les cartes étrangères ?', it: 'Accettate carte straniere?' },
      { fr: 'Seulement en espèces ?', it: 'Solo contanti?' },
      { fr: 'Je cherche un distributeur de billets', it: 'Cerco un bancomat' },
      { fr: 'C’est trop cher pour moi', it: 'È troppo caro per me' },
      { fr: 'Pouvez-vous me faire un reçu ?', it: 'Mi può fare la ricevuta?' },
      { fr: 'Avez-vous de la monnaie ?', it: 'Ha da cambiare?' },
      { fr: 'Je regarde seulement, merci', it: 'Sto solo guardando, grazie' },
    ],
  },
  {
    id: 'supermarche',
    titre: 'Au supermarché',
    court: 'Courses',
    icone: 'supermarche',
    phrases: [
      { fr: 'Où sont les paniers ?', it: 'Dove sono i cestini?' },
      { fr: 'Où sont les caddies ?', it: 'Dove sono i carrelli?' },
      { fr: 'Où se trouve la caisse ?', it: 'Dov’è la cassa?' },
      {
        fr: 'Un sac, s’il vous plaît',
        it: 'Una borsa, per favore',
        astuce: 'Les sacs sont payants partout.',
      },
      {
        fr: 'Dois-je peser les fruits moi-même ?',
        it: 'Devo pesare la frutta da solo?',
        astuce: 'Oui, dans la plupart des supermarchés. Étiquette à coller avant la caisse.',
      },
      { fr: 'Où sont les produits sans lactose ?', it: 'Dove sono i prodotti senza lattosio?' },
      { fr: 'Avez-vous du pain sans lait ?', it: 'Avete pane senza latte?' },
      { fr: 'Où est l’eau ?', it: 'Dov’è l’acqua?' },
      { fr: 'C’est le prix au kilo ?', it: 'È il prezzo al chilo?' },
      { fr: 'Jusqu’à quelle heure êtes-vous ouverts ?', it: 'Fino a che ora siete aperti?' },
    ],
  },
  {
    id: 'plage',
    titre: 'Plage et mer',
    court: 'Plage',
    icone: 'plage',
    phrases: [
      {
        fr: 'Est-ce une plage libre ?',
        it: 'È una spiaggia libera?',
        astuce: 'Distinction essentielle : spiaggia libera est gratuite, un lido est payant.',
      },
      {
        fr: 'Combien coûtent un transat et un parasol ?',
        it: 'Quanto costano un lettino e un ombrellone?',
      },
      { fr: 'Pour une demi-journée', it: 'Per mezza giornata' },
      { fr: 'Où sont les douches ?', it: 'Dove sono le docce?' },
      { fr: 'Où puis-je me changer ?', it: 'Dove posso cambiarmi?' },
      { fr: 'Où puis-je laisser mes affaires ?', it: 'Dove posso lasciare le mie cose?' },
      { fr: 'L’eau est profonde ?', it: 'L’acqua è profonda?' },
      { fr: 'Y a-t-il des méduses ?', it: 'Ci sono meduse?' },
      { fr: 'Y a-t-il un maître-nageur ?', it: 'C’è il bagnino?' },
      { fr: 'Le fond est-il rocheux ?', it: 'Il fondo è roccioso?' },
    ],
  },
  {
    id: 'visites',
    titre: 'Visites et billets',
    court: 'Visites',
    icone: 'visites',
    phrases: [
      { fr: 'Combien coûte l’entrée ?', it: 'Quanto costa l’ingresso?' },
      { fr: 'Un billet, s’il vous plaît', it: 'Un biglietto, per favore' },
      { fr: 'Y a-t-il un tarif réduit ?', it: 'C’è una riduzione?' },
      { fr: 'Où est l’entrée ?', it: 'Dov’è l’ingresso?' },
      { fr: 'À quelle heure fermez-vous ?', it: 'A che ora chiudete?' },
      { fr: 'C’est ouvert le dimanche ?', it: 'È aperto la domenica?' },
      { fr: 'Faut-il réserver ?', it: 'Bisogna prenotare?' },
      { fr: 'Y a-t-il une visite guidée en anglais ?', it: 'C’è una visita guidata in inglese?' },
      { fr: 'Peut-on prendre des photos ?', it: 'Si possono fare foto?' },
      {
        fr: 'Faut-il avoir les épaules couvertes ?',
        it: 'Bisogna avere le spalle coperte?',
        astuce: 'Beaucoup d’églises refusent l’entrée en débardeur ou en short court.',
      },
    ],
  },
  {
    id: 'nombres',
    titre: 'Nombres et heures',
    court: 'Nombres',
    icone: 'nombres',
    phrases: [
      { fr: 'De un à cinq', it: 'uno, due, tre, quattro, cinque' },
      { fr: 'De six à dix', it: 'sei, sette, otto, nove, dieci' },
      { fr: 'Vingt, trente, cinquante, cent', it: 'venti, trenta, cinquanta, cento' },
      { fr: 'Un demi-kilo', it: 'Mezzo chilo' },
      { fr: 'Deux, s’il vous plaît', it: 'Due, per favore' },
      { fr: 'À quelle heure ?', it: 'A che ora?' },
      { fr: 'Quelle heure est-il ?', it: 'Che ore sono?' },
      { fr: 'Maintenant', it: 'Adesso' },
      { fr: 'Plus tard', it: 'Più tardi' },
      { fr: 'Dans dix minutes', it: 'Fra dieci minuti' },
      { fr: 'Aujourd’hui', it: 'Oggi' },
      { fr: 'Ce soir', it: 'Stasera' },
      { fr: 'Demain', it: 'Domani' },
      { fr: 'Demain matin', it: 'Domani mattina' },
      { fr: 'Hier', it: 'Ieri' },
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
      { fr: 'Où puis-je recharger mon téléphone ?', it: 'Dove posso caricare il telefono?' },
      { fr: 'Y a-t-il un casier ?', it: 'C’è un armadietto?' },
      {
        fr: 'Puis-je laisser mon sac ici pour la journée ?',
        it: 'Posso lasciare la mia borsa qui per la giornata?',
      },
      { fr: 'À quelle heure est le check-out ?', it: 'A che ora è il check-out?' },
      { fr: 'La climatisation ne fonctionne pas', it: 'L’aria condizionata non funziona' },
      { fr: 'Y a-t-il des serviettes ?', it: 'Ci sono gli asciugamani?' },
    ],
  },
  {
    id: 'sante',
    titre: 'Pharmacie et santé',
    court: 'Pharmacie',
    icone: 'sante',
    phrases: [
      { fr: 'Où se trouve la pharmacie la plus proche ?', it: 'Dov’è la farmacia più vicina?' },
      { fr: 'Avez-vous quelque chose contre ça ?', it: 'Avete qualcosa per questo?' },
      { fr: 'J’ai un coup de soleil', it: 'Ho una scottatura solare' },
      { fr: 'J’ai mal à la tête', it: 'Ho mal di testa' },
      { fr: 'J’ai mal au ventre', it: 'Ho mal di pancia' },
      { fr: 'J’ai été piqué', it: 'Sono stato punto' },
      {
        fr: 'Du paracétamol',
        it: 'La tachipirina',
        astuce:
          'Nom de marque employé par tout le monde en Italie, mieux compris que paracetamolo.',
      },
      { fr: 'De la crème solaire indice 50', it: 'La crema solare protezione 50' },
      { fr: 'Des pansements', it: 'I cerotti' },
      { fr: 'Des sels de réhydratation', it: 'I sali minerali' },
      { fr: 'Est-ce que c’est sans lactose ?', it: 'È senza lattosio?' },
      { fr: 'Je ne me sens pas bien', it: 'Non mi sento bene' },
    ],
  },
  {
    id: 'drague',
    titre: 'Rencontres',
    court: 'Rencontres',
    icone: 'drague',
    phrases: [
      { fr: 'Salut, je peux t’offrir un verre ?', it: 'Ciao, posso offrirti da bere?' },
      { fr: 'Je peux m’asseoir ?', it: 'Posso sedermi?' },
      { fr: 'Tu es d’ici ?', it: 'Sei di qui?' },
      {
        fr: 'Je suis français, je voyage dans les Pouilles',
        it: 'Sono francese, sto viaggiando in Puglia',
      },
      { fr: 'Je ne parle pas bien italien, désolé', it: 'Non parlo bene italiano, scusa' },
      { fr: 'Tu me conseilles quoi, dans le coin ?', it: 'Cosa mi consigli qui in zona?' },
      { fr: 'Comment tu t’appelles ?', it: 'Come ti chiami?' },
      { fr: 'Moi c’est [votre prénom]', it: 'Io sono [votre prénom]' },
      { fr: 'Tu es ici en vacances ?', it: 'Sei qui in vacanza?' },
      { fr: 'Tu fais quoi dans la vie ?', it: 'Che lavoro fai?' },
      { fr: 'Tu as quel âge ?', it: 'Quanti anni hai?' },
      {
        fr: 'Tu es en couple ?',
        it: 'Sei fidanzata?',
        astuce: 'La question qui évite de perdre la soirée. Se pose tôt, sans détour.',
      },
      { fr: 'Je suis à Bari pour une semaine', it: 'Sono a Bari per una settimana' },
      { fr: 'Tu as un très beau sourire', it: 'Hai un sorriso bellissimo' },
      { fr: 'Tu es très belle', it: 'Sei molto bella' },
      { fr: 'J’aime beaucoup ton accent', it: 'Mi piace molto il tuo accento' },
      { fr: 'Tu danses très bien', it: 'Balli molto bene' },
      { fr: 'Tu veux boire quelque chose avec moi ?', it: 'Ti va di bere qualcosa con me?' },
      { fr: 'On va prendre une glace ?', it: 'Ti va di andare a prendere un gelato?' },
      { fr: 'Je connais un bel endroit', it: 'Conosco un bel posto' },
      { fr: 'On se voit demain ?', it: 'Ci vediamo domani?' },
      { fr: 'Tu me donnes ton numéro ?', it: 'Mi dai il tuo numero?' },
      { fr: 'Tu es sur Instagram ?', it: 'Sei su Instagram?' },
      { fr: 'Je peux te revoir ?', it: 'Posso rivederti?' },
      { fr: 'Tu me plais beaucoup', it: 'Mi piaci molto' },
      { fr: 'Je passe un très bon moment avec toi', it: 'Mi sto divertendo molto con te' },
      { fr: 'Je peux t’embrasser ?', it: 'Posso baciarti?' },
      { fr: 'Non merci, ça ne m’intéresse pas', it: 'No grazie, non mi interessa' },
      { fr: 'Je préfère rester seul, merci', it: 'Preferisco stare da solo, grazie' },
      { fr: 'Laisse-moi tranquille, s’il te plaît', it: 'Lasciami in pace, per favore' },
      { fr: 'J’ai compris, aucun souci', it: 'Ho capito, nessun problema' },
      { fr: 'Pardon de t’avoir dérangée, bonne soirée', it: 'Scusa il disturbo, buona serata' },
      { fr: 'Je suis désolé, je repars jeudi', it: 'Mi dispiace, torno a casa giovedì' },
    ],
  },
  {
    id: 'urgence',
    titre: 'Urgence',
    court: 'Urgence',
    icone: 'urgence',
    phrases: [
      {
        fr: 'Appelez les secours',
        it: 'Chiami i soccorsi',
        astuce: 'Numéro d’urgence unique en Italie : 112, gratuit même sans forfait.',
      },
      { fr: 'Appelez une ambulance', it: 'Chiami un’ambulanza' },
      { fr: 'J’ai besoin d’un médecin', it: 'Ho bisogno di un medico' },
      { fr: 'Pouvez-vous m’aider, s’il vous plaît ?', it: 'Può aiutarmi, per favore?' },
      { fr: 'Où est l’hôpital ?', it: 'Dov’è l’ospedale?' },
      { fr: 'J’ai perdu mon téléphone', it: 'Ho perso il mio telefono' },
      { fr: 'J’ai perdu mon portefeuille', it: 'Ho perso il mio portafoglio' },
      { fr: 'J’ai perdu mon passeport', it: 'Ho perso il passaporto' },
      { fr: 'On m’a volé mon sac', it: 'Mi hanno rubato la borsa' },
      { fr: 'Je veux porter plainte', it: 'Voglio fare una denuncia' },
      { fr: 'Où est le poste de police ?', it: 'Dov’è la questura?' },
      { fr: 'Je me suis perdu', it: 'Mi sono perso' },
    ],
  },
]

export const TOTAL_PHRASES = SECTIONS_PHRASES.reduce(
  (somme, section) => somme + section.phrases.length,
  0,
)

export function sectionParId(id: string): SectionPhrases | undefined {
  return SECTIONS_PHRASES.find((section) => section.id === id)
}
