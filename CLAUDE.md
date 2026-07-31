# CLAUDE.md — Pouilles 2026

## 0. Identité du projet

Application web personnelle de suivi de voyage dans les Pouilles, du 24/08/2026 au 03/09/2026
(11 jours, bases à Bari puis Lecce). Un seul utilisateur, un seul appareil : iPhone, en PWA
installée sur l'écran d'accueil.

Objectif principal : **saisir une dépense en moins de 5 secondes** et savoir en un regard s'il
reste du budget. Vol et hébergement sont déjà payés, seul le budget sur place est suivi.

Cible Dolibarr : **Jamais**. Application jetable, personnelle, sans données d'entreprise.

## 1. Stack technique et commandes clés

Vue 3 + Vite + TypeScript strict, Tailwind v4, vue-router en historique par hash,
vite-plugin-pwa (Workbox), Leaflet + markercluster pour la carte, lucide-vue-next pour les
icônes. Aucun backend : `localStorage` uniquement.

TypeScript reste en 6.0.x : `typescript-eslint` plafonne à `<6.1.0`. `@types/node` suit la
majeure du Node local, pas la dernière publiée.

```bash
npm run dev        # serveur de développement
npm run verify     # lint + typecheck + tests, à passer avant tout commit
npm run build      # vue-tsc puis build de production
npm run test       # Vitest
npm run icones     # régénère les icônes PWA et le favicon
```

Déploiement : Vercel, gratuit. L'historique par hash évite toute règle de réécriture côté
hébergeur et tout 404 au rechargement hors-ligne.

## 2. Design system

**Structure « carnet ».** Pas de cartes blanches empilées : la hiérarchie est portée par la
taille du texte, le vide et des filets d'un pixel. Trois classes définies dans `style.css` et
utilisées partout, à préférer à six utilitaires Tailwind répétés :

- `.micro` étiquette de section, petites capitales espacées
- `.bloc` section séparée par un filet, sans filet après la dernière
- `.chiffre` et `.chiffre-moyen` chiffres héros en `tabular-nums`

Les seules surfaces blanches restantes sont celles qui doivent se détacher : les deux tuiles
de statistiques du journal, les champs de saisie, la carte, et la barre d'onglets.

**Pavé du pouce.** Sur l'écran Dépenses, la saisie est en bas via `.pave-pouce`, adossée à
`--hauteur-nav`. En haut d'écran le champ était inatteignable sans changer de prise sur le
téléphone, ce qui condamnait l'objectif des cinq secondes. `SaisieDepense.vue` doit rester le
dernier enfant de `DepensesView` pour que son `position: sticky` fonctionne.

**Aucun emoji dans l'interface.** Toutes les icônes viennent de `lucide-vue-next`, déclarées
dans le registre `src/partage/icones.ts` et rendues par `src/partage/Icone.vue`. Les fichiers
de données ne portent qu'un nom de clé (`icone: 'glaces'`), jamais un composant : ils restent
sérialisables et découplés de l'affichage. Ajouter une icône = l'importer nommément dans le
registre, pour que le bundle ne prenne que celles utilisées.

Toutes les couleurs et la police sont déclarées dans `@theme` de `src/style.css` :
`sable`, `sable-fonce`, `encre`, `encre-doux`, `terre`, `terre-clair`, `mer`, `olive`,
`alerte`, `attention`, plus les six `carte-*` des marqueurs. **Jamais de valeur hexadécimale
dans un composant**, y compris dans une chaîne HTML passée à Leaflet : utiliser `var(--color-…)`.

**Les marqueurs de la carte portent le glyphe de leur type**, pas seulement une couleur : six
teintes à 26 px se confondent deux à deux au soleil, et le type devait être lisible sans appui.
`lieux/marqueurs.ts` rend le composant du registre d'icônes dans un élément détaché et mémorise
le balisage, une fois par type. Ne pas recopier de tracé Lucide ailleurs.

Contraintes mobiles non négociables :

- Palette clair sur fond très clair : lecture en plein soleil d'août.
- Cibles tactiles à `min-h-11` (44 px) minimum.
- Champs de saisie à 16 px minimum, sinon iOS zoome au focus.
- Zones sûres iPhone via les classes `zone-sure-haut` et `zone-sure-bas`.
- Chiffres en `tabular-nums` pour que les colonnes de montants s'alignent.

## 3. Architecture des fichiers

Arborescence par responsabilité, une fonctionnalité par dossier.

```
src/
  partage/      monnaie.ts, voyage.ts, stockage.ts, icones.ts, Icone.vue
  depenses/     calculs.ts (pur, testé), useDepenses.ts (état), composants
  journal/      donnees/itineraire.ts + JournalView
  phrases/      donnees/phrases.ts, PhrasesView (3 niveaux), FichePhrase
  lieux/        donnees/lieux.ts, donnees/etapes.ts, marqueurs.ts, CarteLieux.vue, LieuxView
  reglages/     donnees/applications.ts, references.ts, ReglagesView
scripts/        generer-icones.mjs (génère les PNG et le favicon, zéro dépendance)
```

Les six types de lieux sont ordonnés du plus utile au moins utile sur le terrain :
`transport`, `site`, `hebergement`, `manger`, `supermarche`, `glacier`. Les glaciers ferment la
liste : c'est une commodité liée à l'intolérance au lait de vache, pas un objectif de voyage.

Les fichiers `donnees/` sont des listes littérales figées, exemptés de `max-lines`.

## 4. Modèle de données

**Tous les montants sont des entiers en centimes.** Aucun flottant ne touche à de l'argent.

```ts
Depense    { id, date: 'AAAA-MM-JJ', categorie: CategorieId, centimes: number, libelle: string }
Enveloppes Record<CategorieId, number>
```

Sept catégories : `transport`, `repas`, `courses`, `glaces`, `visites`, `souvenirs`, `divers`.
Enveloppes par défaut : **585 €** au total, contre 267,40 € au plan de voyage initial. Deux
écarts assumés : le plan oubliait glaces, entrées de sites, courses, souvenirs et marge, et il
ne comptait que **deux repas par jour**, tombant à 12 € certains jours. Les repas sont donc
calés sur 25 € par jour, petit-déjeuner compris, soit 275 €. `repasPrevu` de l'itinéraire suit
la même valeur : un prévu irréaliste produit un écran rouge tous les jours, qu'on finit par
ignorer.

Clés de stockage versionnées : `pouilles2026.<nom>.v1`, pour `depenses`, `enveloppes` et
`references`. `ecrire` **remonte** son échec (quota, stockage indisponible) au lieu de l'avaler,
et l'interface l'affiche. L'export est en **version 2** et embarque les références ; la
restauration accepte encore une sauvegarde de version 1, sans elles.

## 5. Routes

**URL propres, sans `#`** : `/journal` (la racine `/` y redirige) · `/phrases` · `/lieux` ·
`/depenses` · `/reglages`. Tout chemin inconnu redirige vers le journal.

Cela repose sur deux réécritures, les deux en place : `vercel.json` côté hébergeur, et
`navigateFallback: '/index.html'` dans Workbox pour que le rechargement hors-ligne d'une route
profonde fonctionne aussi. Vite assure le repli en développement.

`/lieux?lieu=<id>` cible un lieu : les filtres sont levés, la ligne est mise en évidence et la
carte zoome sur le point en ouvrant sa bulle. C'est ce que produisent les puces du journal.

Ordre des onglets : Journal, Phrases, Lieux, Dépenses.

## 6. Roadmap

- **Phase 1, livrée** : saisie, enveloppes, rythme de dépense, historique, export et
  restauration, PWA hors-ligne.
- **Phase 2, livrée** : carnet de route jour par jour avec prévu contre réel.
- **Phase 3, livrée** : phrases italiennes cherchables, lieux et carte hors-ligne.
- **Phase 4, livrée** : horaires Salento in Bus, bus urbains de Bari chiffrés, applications de
  transport, références de réservation en local, glyphes sur les marqueurs.
- **Reste à faire** : rien de prévu. Toute idée passe par `/nouveau-projet` ou
  `writing-plans` avant d'être codée.

## 7. Règles de développement

- Aucune donnée ne quitte l'appareil. Pas de backend, pas de compte, pas de télémétrie.
- **Aucune coordonnée inventée**, et un champ `precision` (`poi`, `rue`, `ville`) affiché
  dans l'interface. Deux outils selon la nature du point :
  - gares et gares routières → **Overpass**, sur les tags `railway=station` et
    `amenity=bus_station`. Nominatim en texte libre renvoyait une station-service pour
    « Stazione di Polignano » et une trattoria pour « Stazione di Gallipoli ».
  - sites et adresses → Nominatim, en requête structurée (`city=`, `street=`), avec contrôle du
    **type d'objet** et de la distance au centre-ville. Ne jamais valider sur le nom de ville
    seul : « Trani » apparaît dans la province « Barletta-Andria-Trani », ce qui avait laissé
    passer la gare d'Andria.
- **L'écran phrases a trois niveaux** : tuiles de catégories, liste, puis fiche plein écran.
  La fiche existe pour une raison précise : afficher l'italien en 36 px afin de le faire lire
  par un serveur ou un pharmacien quand la prononciation ne passe pas. Ce n'est pas un
  agrandissement décoratif, ne pas le réduire.
- **Aucune catégorie de phrases n'est privilégiée.** Le sans-laitage est une contrainte parmi
  d'autres, pas un axe du voyage : il est rangé comme les autres, et un test le vérifie.
- **Les phrases italiennes doivent être uniques** : elles servent de clé de liste Vue. Un test
  bloque les doublons.
- **Aucun défilement horizontal pour choisir.** Catégories de dépense et types de lieux sont en
  grille : une option hors écran est une option qu'on n'utilise pas.
- **Les liens externes sont vérifiés joignables avant d'être écrits.** Le domaine
  `salentoinbus.it` ne résout plus : aucun lien n'y renvoie, un avertissement le dit dans les
  journées concernées, et un test empêche sa réintroduction.
- **Les itinéraires sont délégués à Google Maps** (`lienItineraire`). Les calculer dans l'app
  supposerait un moteur de routage externe, sans horaires de transport italien et inutilisable
  hors-ligne.
- **L'itinéraire référence les lieux par identifiant**, jamais par nom. Trois tests vérifient que
  chaque référence existe, qu'elle est rattachée à la bonne journée, et qu'aucun identifiant
  n'est en doublon.
- **La carte OSM exige le réseau.** La politique d'usage des tuiles interdit le préchargement
  massif : `CarteLieux.vue` bascule sur l'image de carte quand `navigator.onLine` est faux.
- La logique de budget vit dans `calculs.ts`, en fonctions pures et testées. Les composants
  ne calculent pas, ils affichent.
- Toute donnée relue du stockage est validée (`estDepenseValide`) : une entrée corrompue est
  écartée, elle ne fausse jamais un total.
- Seuils ESLint qui font foi : `max-lines` 200, `max-lines-per-function` 50, `complexity` 10,
  `max-depth` 3. Une violation est un signal de découpage, pas une règle à désactiver.
- **Aucune donnée personnelle dans le dépôt : il est public.** Références de réservation,
  identifiants, numéros de dossier se saisissent dans l'écran Réglages et vivent en
  `localStorage`. Seuls les libellés des champs sont dans le code, et un test le vérifie. Un
  historique Git ne s'efface pas par une suppression ultérieure. Les numéros de téléphone des
  hébergeurs sont en revanche des lignes professionnelles publiées.
- **L'itinéraire référence aussi son logement par identifiant** (`Jour.lieuHebergement`), absent
  le seul jour du retour. Le nom en chaîne libre avait laissé passer une adresse périmée.
- **Une valeur affichée ne se recopie jamais à la main.** Le bouton des enveloppes annonçait
  450 € quand les défauts en totalisaient 565 : les totaux sont calculés depuis les données.
- **Un test de calcul ne dépend pas d'une décision de budget.** L'arithmétique se vérifie sur des
  enveloppes fictives ; seul le test dédié au total des enveloppes a vocation à changer avec elles.
- **Un déménagement périme toutes les distances écrites.** Après tout changement de logement,
  recalculer les notes de supermarchés, de gares et les textes de transport. Un test garantit
  qu'un supermarché reste à moins de 400 m de chaque logement.
- **Pas de verrou biométrique.** Écarté le 31/07/2026 : sans serveur, WebAuthn ne protège rien et
  une passkey perdue en voyage couperait l'accès au relevé. Détail dans `context.md`.
- Les images fournies par l'utilisateur ne sont pas retouchées pour retirer un filigrane.

## 8. Ordre d'exécution par feature

1. Types dans `types.ts`, puis fonctions pures dans le module métier.
2. Tests Vitest sur ces fonctions, rouges d'abord.
3. Composable d'état si nécessaire.
4. Composants d'affichage.
5. `npm run verify` puis `npm run build` verts avant commit.

## 9. Progression

Journal de sessions : `docs/CHANGELOG.md`. État courant pour reprise : `context.md`.
