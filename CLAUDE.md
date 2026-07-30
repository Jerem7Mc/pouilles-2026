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
`alerte`, `attention`. **Jamais de valeur hexadécimale dans un composant.**

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
  phrases/      donnees/phrases.ts + PhrasesView
  lieux/        donnees/lieux.ts, donnees/etapes.ts, CarteLieux.vue, LieuxView
  reglages/     ReglagesView
scripts/        generer-icones.mjs (génère les PNG et le favicon, zéro dépendance)
```

Ordre des onglets : Journal, Phrases, Lieux, Dépenses. La route d'accueil `/` reste malgré
tout l'écran de saisie des dépenses, pour tenir l'objectif des cinq secondes depuis l'icône.

Les fichiers `donnees/` sont des listes littérales figées, exemptés de `max-lines`.

## 4. Modèle de données

**Tous les montants sont des entiers en centimes.** Aucun flottant ne touche à de l'argent.

```ts
Depense    { id, date: 'AAAA-MM-JJ', categorie: CategorieId, centimes: number, libelle: string }
Enveloppes Record<CategorieId, number>
```

Sept catégories : `transport`, `repas`, `courses`, `glaces`, `visites`, `souvenirs`, `divers`.
Enveloppes par défaut : 450 € au total, contre 267,40 € au plan de voyage initial qui oubliait
les glaces, les entrées de sites, les courses, les souvenirs et toute marge d'imprévu.

Clés de stockage versionnées : `pouilles2026.<nom>.v1`. `ecrire` **remonte** son échec (quota,
stockage indisponible) au lieu de l'avaler, et l'interface l'affiche.

## 5. Routes

`/` dépenses · `/journal` carnet de route · `/phrases` italien · `/lieux` adresses et carte ·
`/reglages` enveloppes et sauvegarde. Tout chemin inconnu redirige vers `/`.

## 6. Roadmap

- **Phase 1, livrée** : saisie, enveloppes, rythme de dépense, historique, export et
  restauration, PWA hors-ligne.
- **Phase 2, livrée** : carnet de route jour par jour avec prévu contre réel.
- **Phase 3, livrée** : phrases italiennes cherchables, lieux et carte hors-ligne.
- **Reste à faire** : rien de prévu. Toute idée passe par `/nouveau-projet` ou
  `writing-plans` avant d'être codée.

## 7. Règles de développement

- Aucune donnée ne quitte l'appareil. Pas de backend, pas de compte, pas de télémétrie.
- **Aucune coordonnée inventée.** Les positions viennent d'un géocodage Nominatim figé dans
  `donnees/`, avec un champ `precision` (`poi`, `rue`, `ville`) affiché dans l'interface. Le
  texte libre de Nominatim est peu fiable dans le Sud : utiliser les requêtes structurées
  (`city=`, `street=`) et vérifier chaque résultat contre la boîte englobante du voyage.
- **La carte OSM exige le réseau.** La politique d'usage des tuiles interdit le préchargement
  massif : `CarteLieux.vue` bascule sur l'image de carte quand `navigator.onLine` est faux.
- La logique de budget vit dans `calculs.ts`, en fonctions pures et testées. Les composants
  ne calculent pas, ils affichent.
- Toute donnée relue du stockage est validée (`estDepenseValide`) : une entrée corrompue est
  écartée, elle ne fausse jamais un total.
- Seuils ESLint qui font foi : `max-lines` 200, `max-lines-per-function` 50, `complexity` 10,
  `max-depth` 3. Une violation est un signal de découpage, pas une règle à désactiver.
- Les images fournies par l'utilisateur ne sont pas retouchées pour retirer un filigrane.

## 8. Ordre d'exécution par feature

1. Types dans `types.ts`, puis fonctions pures dans le module métier.
2. Tests Vitest sur ces fonctions, rouges d'abord.
3. Composable d'état si nécessaire.
4. Composants d'affichage.
5. `npm run verify` puis `npm run build` verts avant commit.

## 9. Progression

Journal de sessions : `docs/CHANGELOG.md`. État courant pour reprise : `context.md`.
