<script setup lang="ts">
import Icone from '../partage/Icone.vue'
import type { NomIcone } from '../partage/icones'
import { formatEuros } from '../partage/monnaie'
import type { Lieu } from '../lieux/donnees/lieux'
import type { Reservation } from './types'

defineProps<{
  titre: string
  icone: NomIcone
  texte: string
  /** Montant prévu au plan, en centimes. Omis quand la rubrique n'en a pas. */
  montant?: number
  /** Lieux liés : chaque puce ouvre la carte centrée sur l'item. */
  lieux: readonly Lieu[]
  reservations?: readonly Reservation[]
}>()
</script>

<template>
  <section class="bloc">
    <p class="micro flex items-center gap-1.5">
      <Icone :nom="icone" :taille="14" />
      {{ titre }}
      <span v-if="montant" class="tabular-nums normal-case tracking-normal">
        · {{ formatEuros(montant) }} prévus
      </span>
    </p>

    <p class="mt-2 leading-relaxed">{{ texte }}</p>

    <!-- Puces vers la carte : le texte dit « jusqu'à Bari Centrale », la puce
         permet d'y aller sans retaper le nom dans une application de cartes. -->
    <div v-if="lieux.length > 0" class="mt-3 flex flex-wrap gap-1.5">
      <RouterLink
        v-for="lieu in lieux"
        :key="lieu.id"
        :to="{ name: 'lieux', query: { lieu: lieu.id } }"
        class="flex min-h-11 items-center gap-1.5 rounded-xl bg-white px-3 text-xs font-bold text-encre"
      >
        <Icone nom="lieux" :taille="14" />
        {{ lieu.nom }}
      </RouterLink>
    </div>

    <div v-if="reservations?.length" class="mt-1.5 flex flex-wrap gap-1.5">
      <a
        v-for="reservation in reservations"
        :key="reservation.url"
        :href="reservation.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex min-h-11 items-center gap-1.5 rounded-xl bg-mer px-3 text-xs font-bold text-white"
      >
        <Icone nom="achats" :taille="14" />
        {{ reservation.label }}
      </a>
    </div>
  </section>
</template>
