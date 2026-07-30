# Journal de sessions

## 2026-07-30 — Carte utile, budget repas réaliste, accueil sur le journal

**Demandé**

Placer sur la carte les points de transport, les lieux de la journée et les incontournables,
les glaciers n'étant qu'une commodité. Relever le budget repas à 20-25 € par jour. Arriver sur
le journal et non sur les dépenses. Voir les sept catégories de dépense sans défilement.
Travailler en local, sans pousser sur Vercel.

**Fait**

- 51 lieux au lieu de 17 : 12 points de transport (gares, terminaux, aéroport), 22 sites, et
  les adresses existantes. Deux nouveaux types `transport` et `site`, placés en tête de liste,
  les glaciers relégués en dernier.
- Budget repas porté de 160 à 275 €, soit 25 € par jour petit-déjeuner compris. Budget total à
  565 €. `repasPrevu` de l'itinéraire aligné sur la même valeur.
- La racine `/` redirige vers le journal, les dépenses passent sur `/depenses`.
- Les sept catégories du pavé de saisie en grille de sept colonnes, et les six types de lieux en
  grille de trois : plus aucune option hors écran.
- Titre du jour passé de `h1` à `h2` : il y avait deux `h1` sur la même page.

**Outillage de géocodage**

Nominatim en texte libre s'est révélé inutilisable pour les gares : station-service Q8 pour
« Stazione di Polignano », borne de recharge e-bike pour Monopoli, Trattoria La Stazione pour
Gallipoli, gare d'Andria pour Trani, gare de Casarano pour Lecce. Les gares viennent désormais
d'**Overpass**, interrogé sur les tags `railway=station` et `amenity=bus_station`. Le contrôle
par nom de ville était par ailleurs trop faible, « Trani » figurant dans la province
« Barletta-Andria-Trani » : la validation porte maintenant sur le type d'objet et la distance
au centre-ville.

**Découvertes utiles pour le voyage**

- La gare d'Ostuni est à 2,8 km du centre historique : la navette STP est indispensable.
- À Lecce, la gare ferroviaire et le City Terminal Bus sont à 2 km l'un de l'autre et dans des
  directions opposées. Gallipoli part de la gare, Otrante et Porto Cesareo du terminal.

**Vérifications**

69 tests verts. Les tests de rythme ont été réécrits pour dériver leurs seuils du budget courant
au lieu de montants codés en dur : ajuster une enveloppe ne les casse plus. Parcours Playwright
en local avec l'horloge au 27/08 : racine vers le journal, 7 catégories toutes dans l'écran,
filtre par type qui ne laisse que la section attendue, aucun débordement horizontal sur les cinq
routes, zéro erreur console.

Non déployé, conformément à la consigne de rester en local.

## 2026-07-30 — Refonte visuelle, direction « carnet + pavé du pouce »

Trois directions ont été maquettées et comparées dans le navigateur avant tout code. Jérém a
retenu **A + C** : structure carnet partout, pavé de saisie en bas d'écran.

**Fait**

- Suppression de toutes les cartes blanches empilées. Hiérarchie portée par la taille du texte,
  le vide et des filets d'un pixel. Classes `.micro`, `.bloc`, `.chiffre` dans `style.css`.
- Saisie de dépense descendue en pavé collant au-dessus de la barre d'onglets, adossée à la
  variable `--hauteur-nav` pour ne dépendre d'aucun nombre magique. Libellé et date repliés par
  défaut : le cas courant est un montant seul.
- Deux tuiles de statistiques sur le journal, empruntées à la direction bento, pour comparer le
  dépensé et le prévu du jour sans lire une phrase.
- Présélection du jour en cours sur les trois écrans concernés, via une fonction unique
  `jourActif()`. La bande de journées du journal recentre la pastille active au montage.
- Ordre des catégories de phrases revu : le sans-laitage passe après les achats.

**Arbitrages**

- Aucune couleur ni donnée touchée, comme demandé. La logique de budget n'a pas bougé, ses
  tests restaient la garantie de non-régression.
- Les sept catégories du pavé défilent horizontalement : quatre sont visibles d'emblée, les
  trois dernières demandent un glissement. Alternative écartée : deux rangées, qui coûtaient
  70 px d'écran en permanence.
- Montant aligné à droite contre le symbole euro. En alignement à gauche dans un champ de
  largeur fixe, le € se retrouvait à 60 px des chiffres.

**Vérifications**

67 tests verts. Parcours Playwright avec l'horloge figée au 27/08, jour 4 : pavé visible à
l'ouverture et après défilement, jamais recouvert par la barre d'onglets, saisie complète
fonctionnelle, jour actif présélectionné sur les trois écrans, aucun débordement horizontal sur
les cinq routes, zéro erreur console.

## 2026-07-30 — Retours utilisateur, carte OSM et icônes de librairie

**Demandé**

Carte OpenStreetMap avec les points filtrables par catégorie, ville ou date. Icônes de
librairie au lieu des emoji. Menu réordonné : journal, phrases, lieux, dépenses. Accès direct
aux catégories de phrases. Ajout d'une section drague.

**Fait**

- Leaflet + markercluster. Points des 17 lieux et des 11 étapes, filtrables par type, ville et
  journée, la carte se recadre sur la sélection.
- Géocodage Nominatim des 17 adresses et des 11 villes, figé dans `donnees/`, avec un champ
  `precision` affiché dans l'interface.
- `lucide-vue-next` et le registre `partage/icones.ts`. Plus un seul emoji dans `src/`.
- Onglets réordonnés, route d'accueil laissée sur les dépenses.
- Barre de catégories collante sur l'écran phrases, avec recherche combinable.
- Section « Rencontres » : 32 phrases, de l'abordage au refus, dans les deux sens.
- Lien « Y aller » basculé de Google Maps vers Plans d'Apple, avec les coordonnées quand la
  position est exacte et l'adresse en texte sinon.
- Dépôt GitHub `Jerem7Mc/pouilles-2026` relié à Vercel : chaque push sur `main` déploie.

**Arbitrages**

- Le géocodage en texte libre s'est révélé faux trois fois sur les villes (centroïdes de
  province, cathédrale d'Otrante renvoyée pour « Cattedrale di Lecce »). Les requêtes
  structurées `city=` et `street=` corrigent le problème, Nominatim ne résolvant en revanche
  aucun numéro de rue sur ces adresses.
- Incohérence relevée dans les données de départ : le Coop de Via Giulio Petroni est à 2 km de
  la gare de Bari, ce qui contredit le « 2 minutes à pied » du plan. Noté dans la fiche du lieu.
- Sans regroupement, la carte affichait 2 pastilles pour 8 lieux. `leaflet.markercluster`
  ajoute 8 ko gzippés et rend la carte utilisable.
- Bundle passé de 47,8 à 107,8 ko gzippés, essentiellement Leaflet. Payé une fois au
  préchargement, assumé pour obtenir la carte demandée.

**Vérifications**

64 tests verts, dont les bornes géographiques et le rattachement de chaque lieu à des dates du
voyage. Parcours Playwright en viewport iPhone : ordre du menu, icônes rendues en SVG Lucide,
28 marqueurs puis 8 après filtre sur le 25/08, regroupement à 6 et 2, filtres croisés
type/ville/jour, section Rencontres isolée par sa pastille. Zéro erreur console.

## 2026-07-30 — Création du projet, trois phases livrées

Départ prévu le 24/08/2026, soit 25 jours après cette session.

**Cadrage retenu** : suivi de dépenses plus carnet de route, phrases italiennes et lieux.
Un seul utilisateur, iPhone en PWA, `localStorage` seul, enveloppe budgétaire réaliste de 450 €.

**Fait**

- Scaffolding Vite Vue TS, Tailwind v4, vue-router, vite-plugin-pwa.
- Socle `partage/` : monnaie en centimes entiers, calendrier du voyage, stockage local qui
  remonte ses échecs. Couvert par 54 tests Vitest.
- Dépenses : sept catégories, enveloppes réglables, indicateur de rythme comparant le budget
  consommé à l'avancement du voyage, historique groupé par jour, suppression en deux temps.
- Carnet de route : les 11 journées de l'itinéraire, prévu contre réel par jour.
- Phrases italiennes : 55 phrases en 7 sections, recherche insensible aux accents.
- Lieux : 17 adresses (hébergements, supermarchés, glaciers sans laitage, restaurants) avec
  liens vers les cartes, plus la carte touristique consultable hors-ligne.
- Sauvegarde : export JSON par copie ou téléchargement, restauration sans doublon.
- Icônes PWA générées par `scripts/generer-icones.mjs`, sans dépendance externe.

**Décisions et arbitrages**

- Le plan de voyage annonçait 267,40 € sur place. Les sommes ont été vérifiées et sont justes,
  mais le plan omettait glaces, entrées de sites, courses, souvenirs et marge. Les enveloppes
  par défaut totalisent 450 €.
- Pas de Nuxt, pas de Pinia, pas de backend, pas de CI GitHub Actions : le projet ne les
  justifie pas et Vercel bloque déjà un build cassé.
- TypeScript reste en 6.0.x : `typescript-eslint` plafonne à `<6.1.0`, la 7.0 est incompatible.
- `@types/node` aligné sur le Node local (22.x) plutôt que sur la dernière majeure publiée.
- Vulnérabilité `brace-expansion` (haute, 11 chemins, tous en devDependencies) neutralisée par
  un `overrides` vers 5.0.8. `npm audit` est propre.
- `italie.png` fournie par l'utilisateur porte un filigrane commercial : non utilisée. Une
  silhouette de l'Italie en tricolore a été dessinée par le script d'icônes à la place.
- Le doublon PNG de la carte (982 ko) est exclu du préchargement hors-ligne, seul le JPEG de
  110 ko est embarqué.

**Vérifications**

`npm run verify` vert (lint, typecheck, 54 tests). `npm run build` vert, 47,8 ko de JS gzippé,
14 entrées préchargées pour 262 Ko.
