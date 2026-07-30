# Où on en est — Pouilles 2026

Dernière mise à jour : 30/07/2026. Départ dans 25 jours.

## État en une ligne

**Tout est poussé et déployé.** `main` et `origin/main` sont alignés, la production est à jour
et vérifiée. Aucun fichier non commité, `npm run verify` vert, 85 tests.

## Rien en attente

Aucune décision en suspens, aucun travail commencé et non terminé. La prochaine session repart
sur une base propre.

Piège corrigé au dernier moment, à ne pas réintroduire : le premier `vercel.json` utilisait une
expression régulière brute avec lookahead négatif, ce que Vercel n'interprète pas (il attend du
path-to-regexp). Résultat, les cinq routes renvoyaient 404 en production alors que tout
fonctionnait en local. La forme simple `"/(.*)"` est la bonne : Vercel sert les fichiers
existants **avant** d'appliquer les réécritures, donc les assets ne sont pas capturés. Vérifié :
les six routes répondent 200, et `manifest.webmanifest`, `sw.js`, les PNG et le JPEG de la carte
sont toujours servis avec leur bon type MIME.

Leçon générale : une réécriture d'hébergeur ne se teste pas en local, le serveur de
développement Vite fait son propre repli SPA et masque le problème.

## Repères techniques

- **Dépôt** : `git@github.com:Jerem7Mc/pouilles-2026.git`, branche `main`, reliée à Vercel.
  Un `git push` suffit à déployer, `vercel --prod` n'est plus nécessaire.
- **Production** : https://pouilles-2026.vercel.app. C'est **cet alias stable** qu'il faut
  installer sur l'écran d'accueil, jamais une URL de déploiement horodatée : le stockage local
  est lié à l'origine, changer d'URL perdrait les dépenses.
- **Serveur local** : `npm run dev -- --port 1605 --host`. Les ports 707 et 1605 sont ceux que
  Jérém réserve à ce projet, d'autres projets tournent en parallèle. Le service worker n'existe
  que sur origine sécurisée : par IP locale on voit l'interface, pas le hors-ligne.
- **Deux pièges d'outillage** rencontrés, susceptibles de revenir :
  - le hook RTK de la config globale réécrit `npx` en `npm run`, ce qui casse
    `npx <outil-non-installé>`. Contournement : appeler le binaire du cache npx directement.
  - le CLI Vercel refusait de créer le projet parce que le dossier s'appelle `Italy`, avec une
    majuscule. Réglé par `vercel link --project pouilles-2026`, `.vercel/` conserve le lien.

## Ce que Jérém a tranché, et qui ne se devine pas dans le code

- **Ordre des onglets** : Journal, Phrases, Lieux, Dépenses. La racine `/` mène au **journal**.
- **URL propres, sans `#`**. Ma justification initiale du hash était trop prudente.
- **Aucun défilement horizontal pour choisir** : catégories de dépense, types de lieux et
  tuiles de phrases sont en grille. Une option hors écran est une option qu'on n'utilise pas.
- **Aucun emoji dans l'interface**, uniquement des icônes Lucide via le registre.
- **Aucune catégorie de phrases privilégiée**. Le sans-laitage n'est pas épinglé : c'est une
  contrainte parmi d'autres, pas un axe du voyage.
- **Direction visuelle « carnet »** : pas de cartes blanches empilées, filets d'un pixel,
  chiffres héros. Plus le pavé de saisie collé en bas d'écran, dans la zone du pouce.
- **Toujours les dernières versions compatibles** des librairies, peers vérifiés avant montée.

## Pour le voyage, à ne pas perdre

- **Salento in Bus : le domaine est mort, pas le réseau.** `salentoinbus.it` ne résout plus,
  mais le service tourne du 13 juin au 13 septembre 2026 et les horaires sont publiés par la
  Province de Lecce sur `provincia.le.it`, un PDF par ligne. Horaires du 1er au 13 septembre
  relevés et intégrés au journal le 30/07/2026 :
  - **ligne 101, Otrante** (ELIOS) : aller du City Terminal 07h30, 11h30, 16h15 ; retour du
    port 09h00, 14h00, 18h30. Repli train FSE.
  - **ligne 104, Porto Cesareo** (CHIFFI) : aller 09h00, arrivée 09h56 ; retours 07h29, 12h59,
    17h59. Second opérateur STP par Leverano, au départ de la gare.
  - Billet **à bord**, espèces ou carte, léger supplément. Call center 379 333 79 79, 8h-20h.
    Grilles susceptibles de bouger : reconfirmer à l'arrivée le 30 août.
- **Gare et terminal de bus de Lecce sont à 2 km, dans des directions opposées.** Gallipoli part
  de la gare ferroviaire au sud, Otrante et Porto Cesareo du City Terminal au nord.
- **La gare d'Ostuni est à 2,8 km du centre historique.** La navette STP n'est pas optionnelle.
- **Courses à Bari : c'est le Lidl, pas le Coop.** Résolu le 30/07/2026. Le Coop était placé Via
  Giulio Petroni, à 2 508 m de l'auberge. Le « 2 minutes à pied » du plan désignait en fait le
  **Lidl de la Via Giuseppe Capruzzi, à 200 m**, vérifié par Overpass. Le Coop est corrigé sur
  Via Paolo Lembo 17, à 557 m, mais en `precision: 'rue'` : OpenStreetMap ne connaît aucun Coop
  à ce numéro, l'enseigne reste à confirmer sur place. Un test fige le classement.
- **Budget** : enveloppes par défaut à **565 €**, contre 267,40 € au plan initial. Les repas
  sont passés à 25 € par jour, petit-déjeuner compris. Réglable dans l'écran Réglages.
- **Les marqueurs de la carte portent le glyphe de leur type**, pas seulement une couleur : six
  teintes se confondaient deux à deux. Les couleurs vivent dans `@theme` de `style.css`, en
  `--color-carte-*`, jamais en dur dans un composant. `lieux/marqueurs.ts` construit les
  pastilles à partir du registre d'icônes.
- **La carte interactive exige du réseau.** Hors-ligne, l'écran Lieux bascule sur la carte en
  image. Liste des adresses, phrases et dépenses restent disponibles sans réseau.

## Installation sur l'iPhone, faite

Installée en PWA depuis Safari et testée hors-ligne le 30/07/2026, les quatre onglets
répondent en Mode Avion.

Sauvegardes : **tous les 2 ou 3 jours**, pas chaque soir, ma consigne initiale était de la
sur-prudence. Ce qui est en jeu est un relevé de dépenses, pas des pièces comptables. Le risque
réel est l'éviction de `localStorage` sous pression disque, avec 11 jours de photos. Chemin qui
boucle vraiment depuis un téléphone seul : bouton **Copier**, puis collage dans un mail qu'on
s'envoie. `restaure()` ne lit que du texte collé, il n'y a pas d'import de fichier : un JSON sur
Drive obligerait à l'ouvrir et à tout recopier.

Procédure conservée pour mémoire, en cas de réinstallation :

1. Ouvrir https://pouilles-2026.vercel.app **dans Safari**, pas Chrome. Sur iOS, seul Safari
   crée une PWA autonome ; le raccourci de Chrome garde un stockage de site ordinaire, donc
   évinçable. Test : si l'app lancée depuis l'icône affiche une barre d'adresse, c'est un
   raccourci, pas une PWA.
2. Partager, puis « Sur l'écran d'accueil ».
3. Lancer depuis l'icône, saisir une dépense d'essai, la supprimer.
4. Mode Avion, vérifier que les quatre onglets répondent.
5. Exporter une sauvegarde et la stocker ailleurs que sur le téléphone. À refaire une fois par
   soir pendant le voyage : c'est le seul filet si le téléphone est perdu, `localStorage` reste
   évinçable sous forte pression disque même en PWA installée.

Ces cinq points sont aussi rappelés dans l'écran Réglages de l'application.

## Ce qui n'est volontairement pas fait

Pas de backend ni de synchronisation, pas de compte, pas de photos de tickets, pas de partage de
dépenses, pas de CI GitHub Actions. Les itinéraires sont délégués à Google Maps plutôt que
calculés dans l'app. Voir la section 6 de `CLAUDE.md` et le détail des arbitrages dans
`docs/CHANGELOG.md`.
