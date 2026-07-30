<script setup lang="ts">
import { computed, ref } from 'vue'
import { LIBELLES_TYPE, LIEUX, lienCarte } from './donnees/lieux'
import type { TypeLieu } from './donnees/lieux'

const villes = ['Toutes', 'Bari', 'Lecce'] as const
const filtre = ref<(typeof villes)[number]>('Toutes')

/**
 * Les étapes hors des deux bases (Matera, Trani, Polignano) restent visibles
 * quel que soit le filtre : elles se rattachent à une journée, pas à une ville
 * d'hébergement.
 */
const ORDRE: readonly TypeLieu[] = ['hebergement', 'supermarche', 'glacier', 'manger']

const groupes = computed(() =>
  ORDRE.map((type) => ({
    type,
    ...LIBELLES_TYPE[type],
    lieux: LIEUX.filter(
      (lieu) =>
        lieu.type === type &&
        (filtre.value === 'Toutes' ||
          lieu.ville === filtre.value ||
          !['Bari', 'Lecce'].includes(lieu.ville)),
    ),
  })).filter((groupe) => groupe.lieux.length > 0),
)
</script>

<template>
  <div class="space-y-4">
    <figure class="overflow-hidden rounded-2xl bg-white shadow-sm">
      <img
        src="/carte-toursitique-pouilles.jpg"
        alt="Carte touristique des Pouilles situant Bari, Trani, Polignano a Mare, Monopoli, Alberobello, Ostuni, Matera, Lecce, Gallipoli et Otrante"
        class="w-full"
        width="800"
        height="813"
      />
      <figcaption class="p-3 text-xs text-encre-doux">
        Carte disponible hors-ligne, préchargée avec l’application.
      </figcaption>
    </figure>

    <nav aria-label="Filtrer par ville" class="flex gap-2">
      <button
        v-for="ville in villes"
        :key="ville"
        type="button"
        class="min-h-11 flex-1 rounded-xl text-sm font-semibold"
        :class="filtre === ville ? 'bg-terre text-white' : 'bg-white text-encre-doux'"
        :aria-pressed="filtre === ville"
        @click="filtre = ville"
      >
        {{ ville }}
      </button>
    </nav>

    <section
      v-for="groupe in groupes"
      :key="groupe.type"
      class="rounded-2xl bg-white p-4 shadow-sm"
    >
      <h2 class="font-semibold">{{ groupe.emoji }} {{ groupe.label }}</h2>
      <ul class="mt-2 divide-y divide-sable">
        <li v-for="lieu in groupe.lieux" :key="lieu.nom + lieu.ville" class="py-3">
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="font-semibold">{{ lieu.nom }}</p>
              <p class="text-xs font-medium text-terre">{{ lieu.ville }}</p>
              <p class="mt-1 text-sm leading-relaxed text-encre-doux">{{ lieu.note }}</p>
            </div>
            <a
              :href="lienCarte(lieu)"
              target="_blank"
              rel="noopener noreferrer"
              class="flex min-h-11 shrink-0 items-center rounded-xl bg-sable px-3 text-sm font-semibold text-mer"
              :aria-label="`Ouvrir ${lieu.nom} dans les cartes`"
            >
              Carte
            </a>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
