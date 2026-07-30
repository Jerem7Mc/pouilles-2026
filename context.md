# Où on en est — Pouilles 2026

**État** : application complète et vérifiée, pas encore déployée.

**Voyage** : 24/08/2026 au 03/09/2026. Bari 6 nuits, Lecce 4 nuits. Vol retour le 03/09 à 20 h 40.

## Prochaines actions, dans l'ordre

1. Déployer sur Vercel : `npx vercel --prod`, projet `pouilles-2026`. Gratuit, HTTPS requis
   pour la PWA. **Toujours `--prod`** : une URL de preview change à chaque déploiement, et
   comme le stockage est lié à l'origine, installer depuis une preview perdrait les dépenses
   au déploiement suivant.
2. Sur l'iPhone : ouvrir l'URL de production **dans Safari**, Partager, « Sur l'écran
   d'accueil ». Voir le point de vigilance sur Chrome plus bas.
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
- **Budget** : enveloppes par défaut à 450 €, contre 267,40 € au plan initial. Réglables dans
  l'app. Les postes ajoutés sont les glaces, les entrées de sites, les courses, les souvenirs
  et une marge d'imprévu.
- **Horaires Salento in Bus** : les grilles changent souvent au 1er septembre. Vérifier
  l'affichage officiel en gare de Lecce dès l'arrivée le 30 août, avant la journée d'Otrante.

## Ce qui n'est volontairement pas fait

Pas de backend ni de synchronisation, pas de photos de tickets, pas de partage de dépenses,
pas de carte interactive, pas de CI. Voir la section 6 de `CLAUDE.md`.
