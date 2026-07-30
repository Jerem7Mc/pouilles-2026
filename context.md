# Où on en est — Pouilles 2026

**État** : déployée et vérifiée en production, hors-ligne compris.

**URL de production** : https://pouilles-2026.vercel.app (projet Vercel `pouilles-2026`,
compte `jerems-projects-85dffad9`). C'est **cette** URL, l'alias stable, qu'il faut installer
sur l'écran d'accueil. Les URL de déploiement horodatées changent à chaque `vercel --prod` et
n'ont pas le même stockage.

Redéployer : `vercel --prod`. Le dossier étant nommé `Italy`, avec une majuscule, le CLI
refusait de créer le projet ; il a fallu le lier explicitement avec
`vercel link --project pouilles-2026`. C'est fait, `.vercel/` conserve le lien.

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
- **Budget** : enveloppes par défaut à 450 €, contre 267,40 € au plan initial. Réglables dans
  l'app. Les postes ajoutés sont les glaces, les entrées de sites, les courses, les souvenirs
  et une marge d'imprévu.
- **Horaires Salento in Bus** : les grilles changent souvent au 1er septembre. Vérifier
  l'affichage officiel en gare de Lecce dès l'arrivée le 30 août, avant la journée d'Otrante.

## Ce qui n'est volontairement pas fait

Pas de backend ni de synchronisation, pas de photos de tickets, pas de partage de dépenses,
pas de carte interactive, pas de CI. Voir la section 6 de `CLAUDE.md`.
