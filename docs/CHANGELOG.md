# Journal de sessions

## 2026-07-31 — Bus urbains de Bari chiffrés, données d'arrivée des logements

**La ligne 1 d'AMTAB relie le logement à Bari Centrale.** Trouvée par Overpass en croisant les
relations `route=bus` desservant un arrêt à moins de 250 m du logement et un arrêt à moins de
300 m de la gare : la ligne 1, Bari Centrale ↔ Santo Spirito, satisfait les deux. Le carnet
disait « ou un bus urbain », ce qui ne s'utilise pas avec une valise à la main.

Tarif AMTAB vérifié sur la grille officielle : **1,20 € les 90 minutes**, 2,50 € la journée. Le
titre journalier n'est pas rentable ici, deux trajets espacés de plus de 90 minutes coûtent
2,40 €. Douze trajets au total : un le 24 août à l'arrivée, deux par jour d'excursion du 25 au
29, un le 30 au départ pour Lecce. À Lecce rien n'est ajouté, la gare est à 1,1 km et aucune
ligne urbaine n'a pu être corroborée.

**Conséquence budgétaire assumée.** Le transport prévu passe de 116,40 € à **130,80 €**, ce qui
dépassait l'enveloppe Transport de 130 €. Elle est relevée à **150 €**, et le budget conseillé
passe de 565 à **585 €**. Une enveloppe qui part déjà en dépassement au premier jour ne sert à
rien.

**Correction d'horaire, la plus importante de la journée.** Le carnet annonçait « bagages à
l'hôtel à partir de 13 h ». La réservation dit **16 h**. Trois heures d'écart, sac sur le dos, un
jour d'arrivée après un vol. Corrigé, avec la consigne d'occuper l'intervalle dans la vieille
ville.

**Données d'arrivée dans les deux hébergements** : heures d'arrivée et de départ dans la note, et
un champ `telephone` sur le lieu, rendu en bouton d'appel `tel:` placé **avant** le bouton
d'itinéraire. Quand on cherche ce bouton, c'est qu'on est en retard ou devant une porte fermée.

**Ce qui n'est délibérément pas dans le dépôt : les références de réservation.** Le dépôt est
public, vérifié par une requête anonyme à l'API GitHub qui renvoie 200. Une référence de
confirmation associée à un nom permet de consulter ou d'annuler une réservation ; elle n'a rien à
faire dans un historique Git public, où sa suppression ultérieure ne l'efface pas. Les numéros de
téléphone sont en revanche des lignes professionnelles publiées par les hébergeurs.

**Deux défauts trouvés au passage, sans rapport avec la demande.**

- L'écran des enveloppes annonçait « Revenir aux enveloppes conseillées (450 €) », un chiffre
  **écrit en dur** alors que les défauts totalisaient 565 €, et 585 € désormais. Il est calculé.
  Même famille de bug que le nom de logement en chaîne libre : une valeur recopiée finit toujours
  par mentir.
- Le test de `etatEnveloppes` vérifiait l'arithmétique en s'appuyant sur les **vraies** enveloppes
  par défaut, donc il cassait à chaque révision de budget. Il utilise maintenant des enveloppes
  fictives et rondes. Un test de calcul ne doit pas dépendre d'une décision de budget ; le bloc
  `rythme` faisait déjà correctement la distinction.

## 2026-07-31 — Le logement devient un lieu référencé, plus une chaîne libre

Le carnet portait le logement en texte libre : `hebergement: 'Host Bari Centrale'`, répété sur
chaque journée. C'était la **seule rubrique du carnet à ne pas référencer un lieu par
identifiant**, contrairement à la règle du projet, et elle en a payé le prix : au changement
d'hébergement, seul le nom a été remplacé, sans l'adresse, que le journal n'affichait de toute
façon pas. Le voyageur voyait un nom sans adresse et sans lien vers la carte.

`Jour.hebergement: string` devient `Jour.lieuHebergement?: string`, un identifiant de lieu.
L'en-tête de journée affiche désormais **le nom et l'adresse**, résolus depuis `lieux.ts`, dans un
lien qui ouvre la carte centrée sur le logement. Nom et adresse ne peuvent plus diverger de la
carte, puisqu'il n'en existe qu'une source.

Le champ est optionnel : le jour du retour ne dort nulle part. L'heure du vol, qui vivait dans
cette chaîne, rejoint le déroulé de la journée.

Trois tests couvrent le nouveau champ : la référence doit exister, elle doit pointer sur un lieu
de type `hebergement` situé dans la ville de base du jour, et elle doit être rattachée à cette
journée. Le jour du retour doit au contraire ne rien déclarer. Les deux tests existants qui
validaient les références de lieux prennent le nouveau champ en compte.

## 2026-07-31 — Applications de transport, positions recalées sur les réservations

**Nouvel écran dans Réglages : les applications à installer avant de partir.** Cinq entrées, une
donnée par `reglages/donnees/applications.ts`, chaque lien vérifié joignable : Trenitalia,
Ferrovie Appulo Lucane, MUVT, DropTicket, Biglietteria Cotrap. Chacune porte son rôle **sur ce
voyage précis**, pas ses fonctionnalités générales : « la seule pour Matera, le 25 août » est
utilisable, « application de mobilité multimodale » ne l'est pas.

**Correction : l'application de Bari n'est pas « Muvin », c'est MUVT.** Le domaine `muvin.it`
existe et répond, mais ce n'est pas un service de transport barese ; l'application officielle de
l'AMTAB est MUVT, `muvt.app`, et DropTicket est l'autre app autorisée sur le réseau. Un lien vers
muvin aurait envoyé acheter le mauvais titre. Un test interdit ce domaine, comme pour
salentoinbus.

**Positions recalées sur les captures des réservations.** Le point de Bari était calé sur le n°79,
au milieu de la rue ; la carte de la réservation le place à l'extrémité nord, à l'angle de la Via
Napoli, près du port. Nouvelle distance à Bari Centrale : **1,9 km, 24 minutes**, contre 1,8 km
estimé. Lecce est confirmé entre la Piazza Sant'Oronzo et la Via XXV Luglio, à 1,1 km de la gare.

Aucun arrêt ferroviaire n'a pu être corroboré près du logement de Bari : les libellés visibles sur
la capture (Crispi, Brigata Bari, Quintino Sella) ne correspondent à aucune gare ni halte dans
OpenStreetMap. Rien n'a donc été écrit à ce sujet, et le bus urbain reste la réponse, d'où MUVT.

**Le déplacement du point a périmé une deuxième série de distances.** Recalculées, toutes :
Coop 147 m, Dok 503 m, Lidl 1,9 km, Famila 2,2 km. Et surtout, à Lecce, **l'Eurospin n'est plus
à 5 minutes du logement mais à 1,1 km**. Le pique-nique de Porto Cesareo, qui s'y préparait la
veille au soir, se prépare désormais au **Sconto Più, à 354 m**, ajouté aux lieux. Trois textes
en dépendaient : la note du lieu, le repas du 2 septembre et son alerte. Deux notes de gares
annonçaient encore « à 200 m de l'hôtel » et « 15 à 20 minutes jusqu'à l'auberge », corrigées, et
la description de l'enveloppe Courses citait des enseignes devenues hors de portée.

Le test de proximité passe de « un supermarché à moins de 300 m du logement de Bari » à « un
supermarché à moins de 400 m de **chaque** logement ». Le premier n'aurait pas vu l'Eurospin
s'éloigner à Lecce.

## 2026-07-31 — Changement des deux logements, et tout ce que ça périme

Les deux hébergements ont changé : **The Queen Room Bari**, Via Brigata Regina 88, et
**Mammasisi Rooms**, Via Richel Rubichi 3 à Lecce. Toute trace des précédents est retirée, y
compris leurs identifiants de lieu.

Ni l'un ni l'autre n'est répertorié dans OpenStreetMap, et aucun des deux numéros n'est
cartographié : les deux sont en `precision: 'rue'`, ce que l'interface affiche. Bari est calé sur
le n°79 voisin, seul point réel de la rue à ce niveau de numérotation. Le n°104 relevé par OSM
contredit la progression des numéros pairs, la rue est donc numérotée par tronçons et une
extrapolation aurait été fausse.

**Le vrai changement est la distance à la gare de Bari : 200 m avant, 1,8 km maintenant**, soit
22 minutes à pied. Cinq matins de départ en excursion commencent désormais par cette marche.
C'est écrit dans la note du lieu et dans le transport du premier jour, parce que ça ne se devine
pas sur une carte à ce niveau de zoom. Lecce est à 1,1 km de sa gare et 1,2 km du City Terminal,
dans des directions opposées.

**Le déménagement a périmé l'analyse des supermarchés faite la veille.** Le Lidl retenu comme
« le plus proche, 200 m » est à 1,8 km du nouveau logement. Recalcul par Overpass autour de la
nouvelle adresse :

- **Coop, Via Napoli, 191 m**, tagué dans OSM, en `precision: 'poi'`. Ironie du dossier : après
  deux adresses de Coop non corroborées, c'est un Coop qui se retrouve voisin.
- **Supermercati Dok, Via Brigata Regina 12, 354 m**, dans la rue du logement, comme repli
  pendant la pause de l'après-midi.
- Lidl et Famila conservés mais requalifiés : ce sont les supermarchés **de la gare**, à faire au
  retour d'excursion, plus ceux du soir.

Le test figeait « le Lidl à moins de 300 m », ce qui était un fait, pas un invariant. Remplacé
par la règle qui compte : **un supermarché à moins de 300 m du logement de Bari**, quel qu'il
soit. Un test qui encode le nom d'une enseigne casse à chaque déménagement sans rien protéger.

Le test de `lienCarte` prenait le Coop comme exemple de position au niveau de la rue. Le Coop
étant passé en `poi`, il s'appuie désormais sur le Famila.

## 2026-07-30 — Marqueurs de carte porteurs de sens, section Rencontres corrigée

**La couleur seule ne suffisait pas.** Six teintes à 26 px se confondaient deux à deux en
usage réel, et il fallait ouvrir la bulle pour savoir si un point était une gare ou un
supermarché. Chaque marqueur porte maintenant le glyphe de son type, pris dans le registre
`partage/icones.ts` : le type se lit sans appuyer, et la carte reste utilisable pour un œil qui
distingue mal les couleurs. La légende reproduit exactement le marqueur, glyphe compris.

Leaflet attend une chaîne HTML là où le reste de l'app manipule des composants Vue. Plutôt que
de recopier les tracés Lucide, le composant du registre est rendu dans un élément détaché et son
balisage récupéré, mémorisé une fois par type. Six rendus au total. Le registre reste la source
unique des icônes, conformément à la règle du projet.

Deux effets de bord assumés, tous deux dans le sens des règles du projet :

- `CarteLieux.vue` passait de 211 à 172 lignes par extraction de `lieux/marqueurs.ts`. Le
  fichier frôlait le plafond `max-lines`, l'ajout aurait dû le faire sauter.
- Les six couleurs de marqueurs étaient des hexadécimaux **dans le composant**, ce que la règle
  interdit. Elles rejoignent le `@theme` de `style.css` et sont lues en `var(--color-carte-*)`.
  `supermarche` passe de `#0e7490` à `#0f766e`, la paire qui se confondait le plus avec le bleu
  du transport.

Vérifié au navigateur, pas seulement au test : six marqueurs sur six portent un `<svg>`, six
glyphes dans la légende, aucune erreur console. Un test de plus fige l'invariant, chaque type de
lieu doit avoir une icône déclarée, sans quoi le marqueur serait une pastille muette.

**Section Rencontres** : les phrases s'adressent à une femme, l'accord italien est porté par
l'interlocutrice. `Sei molto bello` retiré, l'accord français de « dérangée » corrigé, et
`Sei fidanzata?` ajoutée, qui manquait alors que c'est la question la plus utile de la section.

La section ne contenait que des phrases **à dire**, dont trois pour éconduire quelqu'un, et rien
pour reconnaître un refus qu'on vous adresse, qui est pourtant le cas fréquent. Trois lignes
ajoutées, marquées « à entendre, pas à dire » dans leur astuce : `Sono fidanzata`,
`Sto aspettando il mio ragazzo`, `Non mi interessa`. Le corpus passe à 212 phrases.

## 2026-07-30 — Horaires Salento in Bus retrouvés, dernière journée sécurisée

Audit de reprise sur un dépôt propre. Le code n'avait rien à se reprocher, mais les données
portaient un vrai trou : la journée du 2 septembre à Porto Cesareo reposait sur Salento in Bus
et sur rien d'autre, `reservations: []`, alors qu'Otrante avait au moins un repli ferroviaire.
Porto Cesareo n'a pas de gare. Si le bus ne roulait pas, la dernière journée pleine du voyage
tombait sans plan B.

**Ma prémisse était fausse.** J'avais conclu en juillet que le réseau était mort parce que
`salentoinbus.it` ne résolvait plus. C'est le domaine qui est mort, pas le service : Salento in
Bus tourne du 13 juin au 13 septembre 2026 et la Province de Lecce publie les horaires sur
`provincia.le.it`, un PDF par ligne. L'app envoyait donc chercher un affichage papier alors que
les heures étaient publiques. Leçon : un domaine qui ne résout plus ne prouve rien sur
l'existence du service, seulement sur celle du site.

**Horaires intégrés**, période du 1er au 13 septembre, celle qui couvre nos deux dates.

- Ligne 101 Otrante, opérée par ELIOS : aller du City Terminal 07h30, 11h30, 16h15 ; retour du
  port 09h00, 14h00, 18h30, dernier retour à Lecce 20h14.
- Ligne 104 Porto Cesareo, opérée par CHIFFI : aller 09h00, arrivée 09h56 ; retours 07h29,
  12h59, 17h59, dernier retour à Lecce 18h55.
- Billet achetable **à bord**, espèces ou carte, léger supplément. C'est ce qui rend la journée
  récupérable sans rien avoir préparé. Call center 379 333 79 79, tous les jours 8h-20h.
- Second opérateur nommé pour Porto Cesareo : STP par Leverano, au départ de la **gare**, pas du
  City Terminal. Le trou est refermé.

**Tarifs non intégrés** : la Province ne les publie pas. `transportPrevu` reste à 8 € et 7 €,
estimés. Rien d'inventé, conformément à la règle sur les données non vérifiées.

**Piège écarté** : la ligne 104 dessert aussi Gallipoli, mais le 31 août tombe dans la période
haute saison, qui est un autre PDF. Ces horaires n'ont donc pas été recopiés sur la journée
Gallipoli, qui reste au train FSE.

Un test de plus, 86 au total : les deux journées Salento in Bus doivent pointer sur
`provincia.le.it`. L'interdiction de `salentoinbus.it` reste en place, les deux règles se
complètent au lieu de se remplacer.

Réserve assumée : figer des horaires dans les données accepte qu'ils bougent d'ici septembre.
D'où la consigne de reconfirmation et le numéro du call center affichés dans le journal.

**Hors code** : PWA installée depuis Safari et testée en Mode Avion, les quatre onglets
répondent hors-ligne.

**Courses à Bari : mauvaise enseigne depuis le début.** Le Coop était placé Via Giulio Petroni,
géocodage vérifié à 2 508 m de l'auberge, ce qui contredisait le « 2 minutes à pied » du plan.
Overpass sur la zone montre six supermarchés à moins de 235 m de l'auberge. Le « 2 minutes »
désignait le **Lidl de la Via Giuseppe Capruzzi, 200 m**, ajouté en `precision: 'poi'`. Le Coop
est corrigé sur Via Paolo Lembo 17, à 557 m, mais gardé en `precision: 'rue'` : OpenStreetMap ne
connaît aucun Coop à ce numéro, l'enseigne n'est pas corroborée. Trois autres adresses proposées
ont été écartées par distance, 740 m et 826 m. Un test fige le classement Lidl avant Coop, pour
que Petroni ne revienne pas.

**Deux consignes de ma part étaient trop lourdes, corrigées dans l'interface.**

- « Exporter une sauvegarde chaque soir » : c'est un relevé de dépenses, pas de la comptabilité.
  Tous les 2 ou 3 jours suffit. Surtout, `restaure()` ne lit que du **texte collé**, il n'y a pas
  d'import de fichier : le bouton Copier suivi d'un collage dans un mail est le seul chemin qui
  boucle depuis un téléphone seul. Un JSON sur Drive obligerait à l'ouvrir et à tout recopier.
  Le texte de l'écran Réglages disait l'inverse.
- « Vérifier les horaires au City Terminal » : inutile, la grille officielle est en ligne et déjà
  dans le journal. Ne restent que deux motifs de rouvrir le PDF la veille au soir, une révision
  d'horaires ou une grève, qui ne se voient qu'en ligne. Les trois alertes sont reformulées.

L'écran Réglages listait « à faire avant le départ », désormais périmé. Remplacé par trois
consignes valables sur le terrain.

## 2026-07-30 — Écran phrases refait, antimémoire porté à 209 phrases

Trois structures ont été maquettées et comparées avant tout code. Retenu : tuiles plus fiche
plein écran, **sans le bloc sans-laitage épinglé** que j'avais proposé. Le voyage ne se résume
pas à l'alimentation, et cette contrainte n'a pas à être privilégiée sur les autres.

**Structure**

Trois niveaux. Les 15 tuiles de catégories tiennent sur un écran, sans aucune phrase affichée.
Une liste par catégorie. Puis une fiche plein écran où l'italien fait 36 px, avec le français en
dessous, l'astuce éventuelle, un bouton copier et la navigation vers la phrase suivante. La
recherche court-circuite les deux premiers niveaux. Clavier géré : Échap ferme, flèches
naviguent.

La fiche répond à un besoin précis, pas à une envie décorative : faire lire la phrase par un
serveur ou un pharmacien quand la prononciation ne passe pas.

**Contenu porté de 96 à 209 phrases, 8 à 15 catégories**

Le corpus initial couvrait la survie alimentaire et négligeait le quotidien réel du séjour. Six
sections ajoutées, choisies depuis l'itinéraire lui-même :

- **Comprendre la réponse** : ce qu'on va vous dire (« solo contanti », « pausa pranzo »,
  « è al completo »). Absent de la plupart des guides, pourtant la moitié d'un échange.
- **Plage et mer** : cinq journées de plage au programme, et la distinction payante entre
  _spiaggia libera_ et _lido_.
- **Au restaurant** : mécanique de commande, dont le _coperto_ et la carafe d'eau souvent refusée.
- **Au supermarché** : dont le piège de la pesée des fruits à faire soi-même.
- **Visites et billets** : sites payants de Matera, Otrante, Lecce, et les épaules couvertes.
- **Nombres et heures** : indispensable pour comprendre un prix ou un horaire à l'oral.
- **Pharmacie et santé** : août dans les Pouilles, donc coup de soleil et déshydratation. Dont
  « tachipirina », le nom que tout le monde emploie en Italie pour le paracétamol.

16 astuces d'usage ont été ajoutées sur les vrais pièges locaux, affichées sur la fiche.

**Vérifications**

85 tests verts, dont un nouveau fichier de 11 tests sur le corpus : unicité des identifiants,
icônes existant dans le registre, libellés courts assez brefs pour les tuiles, aucune phrase
italienne en doublon. Ce dernier test a immédiatement attrapé « Posso pagare con la carta? »
présent deux fois, ce qui aurait cassé la clé de liste Vue.

Parcours Playwright : 15 tuiles toutes dans l'écran, aucune phrase italienne à l'accueil, liste
filtrée correcte, fiche à 36 px mesurés, copie effective dans le presse-papier, navigation
suivante, fermeture par Échap, recherche transversale sur « tachipirina » et « fontanella ».

Non déployé.

## 2026-07-30 — URL sans hash, liens du journal vers la carte

**Fait**

- Passage en historique HTML5 : `/journal`, `/phrases`, `/lieux`, `/depenses`, `/reglages`, sans
  `#`. `vercel.json` réécrit vers `index.html`, et `navigateFallback` de Workbox fait de même
  hors-ligne. Ma justification initiale du hash était trop prudente : Workbox couvrait déjà le
  cas du rechargement hors-ligne.
- Chaque lieu porte un identifiant stable, généré depuis son nom. L'itinéraire référence ces
  identifiants pour ses points de transport, ses sites et ses restaurants.
- Le journal affiche sous chaque rubrique des puces vers `/lieux?lieu=<id>` : la carte zoome sur
  le point, ouvre sa bulle, et la ligne correspondante est mise en évidence dans la liste.
- Boutons de réservation par journée, vers Trenitalia, FAL, FSE et Ferrotramviaria.
- Chaque lieu propose « Itinéraire » vers Google Maps et « Voir dans Plans » vers Apple Plans.

**Liens externes vérifiés, pas supposés**

Chaque URL a été appelée avant d'être écrite. Deux corrections : `ferrotramviaria.it` renvoie 404
à la racine, il faut `/home` ; et surtout **`salentoinbus.it` ne résout plus en DNS**, le site du
réseau de bus des 1er et 2 septembre a disparu. Aucun lien mort livré, un avertissement le dit
dans les journées concernées, et un test empêche sa réintroduction.

**Arbitrages**

- Les itinéraires restent délégués à Google Maps. Les calculer dans l'app supposerait un moteur
  de routage externe, sans horaires de transport italien, et inutilisable hors-ligne.
- `dessine` de `CarteLieux` dépassait la complexité 10 après ajout du ciblage : découpée en
  `ajouteEtapes` et `ajouteLieux` plutôt que d'assouplir la règle.

**Vérifications**

75 tests verts, dont trois nouveaux sur l'intégrité des références du carnet vers les lieux.
Parcours Playwright : les six routes répondent sans `#`, le rechargement direct de `/lieux`
fonctionne, la puce « Bari Centrale » du journal mène à `/lieux?lieu=bari-centrale` avec bulle
ouverte et ligne surlignée, les liens de réservation et d'itinéraire pointent où il faut.

**En attente**

La structure de l'écran phrases, trois options soumises à arbitrage. Non déployé.

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
