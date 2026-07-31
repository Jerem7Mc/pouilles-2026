<script setup lang="ts">
import Icone from '../partage/Icone.vue'
import ReglageEnveloppes from '../depenses/ReglageEnveloppes.vue'
import SauvegardeDonnees from '../depenses/SauvegardeDonnees.vue'
import { APPLICATIONS } from './donnees/applications'
</script>

<template>
  <div>
    <ReglageEnveloppes />
    <SauvegardeDonnees />

    <section class="bloc">
      <p class="micro">Applications à installer avant de partir</p>
      <p class="mt-2 text-sm leading-relaxed text-encre-doux">
        Créer un compte et enregistrer une carte se fait à la maison. En gare, entre le wifi absent
        et la file d’attente, ce n’est pas une opération de cinq minutes.
      </p>
      <ul class="mt-3 space-y-3">
        <li v-for="application in APPLICATIONS" :key="application.nom" class="flex gap-2">
          <Icone :nom="application.icone" :taille="16" class="mt-0.5 shrink-0 text-terre" />
          <div>
            <a
              :href="application.url"
              target="_blank"
              rel="noopener noreferrer"
              class="min-h-11 text-sm font-semibold text-mer underline"
            >
              {{ application.nom }}
            </a>
            <p class="text-sm leading-relaxed text-encre-doux">{{ application.role }}</p>
          </div>
        </li>
      </ul>
    </section>

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
