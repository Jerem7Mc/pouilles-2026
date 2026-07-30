<script setup lang="ts">
import ReglageEnveloppes from '../depenses/ReglageEnveloppes.vue'
import SauvegardeDonnees from '../depenses/SauvegardeDonnees.vue'
</script>

<template>
  <div>
    <ReglageEnveloppes />
    <SauvegardeDonnees />

    <section class="bloc">
      <p class="micro">Pendant le voyage</p>
      <ul class="mt-2 list-inside list-disc space-y-1 text-sm leading-relaxed text-encre-doux">
        <li>Sauvegarder tous les 2 ou 3 jours, par Copier puis collage dans un mail.</li>
        <li>
          Salento in Bus, les 1er et 2 septembre : rouvrir le PDF de la ligne la veille au soir,
          avec du réseau. Une révision d’horaires ou une grève ne se voit qu’en ligne.
        </li>
        <li>
          Hors réseau, l’écran Lieux passe à la carte en image. Adresses, phrases et dépenses
          restent disponibles.
        </li>
      </ul>
    </section>
  </div>
</template>
