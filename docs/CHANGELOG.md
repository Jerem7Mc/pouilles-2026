# Journal de sessions

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
