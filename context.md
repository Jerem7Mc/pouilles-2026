# Où on en est — Pouilles 2026

**État** : en local, des changements non déployés. La dernière version en ligne date d'avant
les retours sur la carte, le budget repas et la route d'accueil.

**URL de production** : https://pouilles-2026.vercel.app (projet Vercel `pouilles-2026`,
compte `jerems-projects-85dffad9`). C'est **cette** URL, l'alias stable, qu'il faut installer
sur l'écran d'accueil. Les URL de déploiement horodatées changent à chaque `vercel --prod` et
n'ont pas le même stockage.

**Dépôt** : `git@github.com:Jerem7Mc/pouilles-2026.git`, branche `main`, reliée à Vercel.
Un `git push` suffit à déployer.

**Consigne en cours** : on travaille **en local uniquement**, on ne pousse pas. Jérém veut
éviter d'épuiser un quota de déploiements avant la fin des retours. Le plan Hobby plafonne à
une centaine de déploiements par jour, on en est très loin, mais la consigne tient jusqu'à
demande explicite. Serveur de suivi : `npm run dev -- --port 1605 --host`.

Le dossier étant nommé `Italy`, avec une majuscule, le CLI Vercel refusait de créer le projet ;
il a fallu le lier explicitement avec `vercel link --project pouilles-2026`. C'est fait,
`.vercel/` conserve le lien. À noter aussi : le hook RTK de la config globale réécrit `npx` en
`npm run`, ce qui casse `npx <outil-non-installé>` ; passer par le binaire du cache npx.

**Voyage** : 24/08/2026 au 03/09/2026. Bari 6 nuits, Lecce 4 nuits. Vol retour le 03/09 à 20 h 40.

## Prochaines actions, dans l'ordre

1. ~~Déployer sur Vercel~~ fait le 30/07/2026, hors-ligne vérifié.
2. Sur l'iPhone : ouvrir https://pouilles-2026.vercel.app **dans Safari**, Partager, « Sur
   l'écran d'accueil ». Voir le point de vigilance sur Chrome plus bas.
3. Lancer depuis l'icône, saisir une dépense d'essai, la supprimer.
4. Mode Avion, vérifier que les quatre onglets répondent.
5. Exporter une sauvegarde et la stocker ailleurs que sur le téléphone.

Ces cinq points sont aussi rappelés dans l'écran Réglages de l'application.

Serveur local : `npm run dev -- --port 1605 --host`. Le service worker ne s'enregistre que
sur une origine sécurisée, donc l'accès par IP locale montre l'interface mais pas le
hors-ligne ni l'installation.

## Points de vigilance

- **Installer depuis Safari, pas Chrome.** Jérém navigue sous Chrome, mais sur iOS seul Safari
  crée une PWA autonome. Le « Ajouter à l'écran d'accueil » de Chrome iOS ne fait qu'un
  raccourci qui rouvre dans Chrome, avec un stockage de site ordinaire donc évinçable.
  Vérification : si l'app lancée depuis l'icône affiche une barre d'adresse, c'est un
  raccourci, pas une PWA.
- **Persistance iOS** : en PWA installée, `localStorage` n'est pas soumis à la purge 7 jours de
  Safari, mais reste évincible sous forte pression disque. L'export manuel est le seul filet.
  À faire une fois par soir pendant le voyage.
- **Budget** : enveloppes par défaut à **565 €**, contre 267,40 € au plan initial. Réglables
  dans l'app. Deux corrections : les postes oubliés (glaces, entrées de sites, courses,
  souvenirs, marge) et surtout les repas, passés à **25 € par jour** puisque le plan ne
  comptait que deux repas quotidiens et descendait à 12 € certains jours.
- **Horaires Salento in Bus** : les grilles changent souvent au 1er septembre. Vérifier
  l'affichage officiel en gare de Lecce dès l'arrivée le 30 août, avant la journée d'Otrante.

- **Adresse du Coop de Bari à vérifier sur place.** Le géocodage place Via Giulio Petroni 22 à
  2 km de la gare, alors que le plan annonce « 2 minutes à pied, en face de l'hôtel ». L'un des
  deux est faux. Le Famila, lui, est bien à 8 minutes.
- **La carte interactive a besoin de réseau.** Hors-ligne, l'écran Lieux affiche la carte en
  image à la place. La liste des adresses et les phrases restent disponibles sans réseau.

- **Gare et terminal de bus de Lecce sont à 2 km, dans des directions opposées.** Le train FSE
  pour Gallipoli part de la gare, au sud. Salento in Bus pour Otrante et Porto Cesareo part du
  City Terminal, au nord. Ne pas se tromper de point de départ.
- **La gare d'Ostuni est à 2,8 km du centre historique.** La navette STP devant la gare n'est
  pas optionnelle.

## Ce qui n'est volontairement pas fait

Pas de backend ni de synchronisation, pas de photos de tickets, pas de partage de dépenses,
pas de CI. La carte est en revanche bien interactive depuis les retours du 30/07.
Voir la section 6 de `CLAUDE.md`.
