# Où on en est — Pouilles 2026

**État** : application complète et vérifiée, pas encore déployée.

**Voyage** : 24/08/2026 au 03/09/2026. Bari 6 nuits, Lecce 4 nuits. Vol retour le 03/09 à 20 h 40.

## Prochaines actions, dans l'ordre

1. Déployer sur Vercel (`vercel` ou import du repo). Gratuit, HTTPS requis pour la PWA.
2. Sur l'iPhone : ouvrir l'URL dans Safari, Partager, « Sur l'écran d'accueil ».
3. Lancer depuis l'icône, saisir une dépense d'essai, la supprimer.
4. Mode Avion, vérifier que les quatre onglets répondent.
5. Exporter une sauvegarde et la stocker ailleurs que sur le téléphone.

Ces cinq points sont aussi rappelés dans l'écran Réglages de l'application.

## Points de vigilance

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
