# Où on en est — Pouilles 2026

Dernière mise à jour : 30/07/2026. Départ dans 25 jours.

## État en une ligne

Application complète et vérifiée en local. **Trois commits non poussés**, donc la version en
ligne est en retard de trois lots.

## À trancher au démarrage

**Pousser ou non les 3 commits locaux.** Un `git push` déclenche un déploiement Vercel
automatique. La consigne de rester en local venait d'une crainte de quota, écartée depuis : le
plan Hobby plafonne à environ une centaine de déploiements par jour et on en a fait 4. Rien
n'empêche de pousser, mais c'est à Jérém de le demander.

```
4796725  feat: ecran phrases en trois niveaux, corpus porte a 209 phrases
4ab70c4  feat: URL sans hash et liens du journal vers la carte
0f62e8f  feat: transports et sites sur la carte, budget repas realiste
```

Rien d'autre n'est en attente. Aucun fichier non commité, `npm run verify` vert, 85 tests.

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

- **Salento in Bus : le site n'existe plus.** `salentoinbus.it` ne résout plus en DNS, vérifié
  le 30/07/2026. C'est le réseau des 1er et 2 septembre, pour Otrante et Porto Cesareo.
  Vérifier l'affichage officiel au City Terminal de Lecce dès l'arrivée le 30 août. Repli pour
  Otrante : train FSE, gare à 900 m du centre.
- **Gare et terminal de bus de Lecce sont à 2 km, dans des directions opposées.** Gallipoli part
  de la gare ferroviaire au sud, Otrante et Porto Cesareo du City Terminal au nord.
- **La gare d'Ostuni est à 2,8 km du centre historique.** La navette STP n'est pas optionnelle.
- **Adresse du Coop de Bari à vérifier sur place.** Le géocodage place Via Giulio Petroni 22 à
  2 km de la gare, ce qui contredit le « 2 minutes à pied » du plan. Le Famila, lui, colle avec
  ses 8 minutes.
- **Budget** : enveloppes par défaut à **565 €**, contre 267,40 € au plan initial. Les repas
  sont passés à 25 € par jour, petit-déjeuner compris. Réglable dans l'écran Réglages.
- **La carte interactive exige du réseau.** Hors-ligne, l'écran Lieux bascule sur la carte en
  image. Liste des adresses, phrases et dépenses restent disponibles sans réseau.

## Installation sur l'iPhone, encore à faire

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
