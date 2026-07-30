<script setup lang="ts">
import ReglageEnveloppes from '../depenses/ReglageEnveloppes.vue'
import SauvegardeDonnees from '../depenses/SauvegardeDonnees.vue'
</script>

<template>
  <div class="space-y-4">
    <ReglageEnveloppes />
    <SauvegardeDonnees />

    <section class="rounded-2xl bg-white p-4 shadow-sm">
      <h2 class="font-semibold">À faire avant le départ</h2>
      <ol class="mt-2 list-inside list-decimal space-y-1 text-sm leading-relaxed text-encre-doux">
        <li>Ouvrir cette page dans Safari, puis Partager, puis « Sur l’écran d’accueil ».</li>
        <li>Lancer l’app depuis l’icône et saisir une dépense d’essai, puis la supprimer.</li>
        <li>Mettre l’iPhone en mode Avion et vérifier que les quatre onglets répondent.</li>
        <li>Exporter une sauvegarde et la garder ailleurs que sur le téléphone.</li>
      </ol>
    </section>
  </div>
</template>
