<script setup lang="ts">
import Icone from '../partage/Icone.vue'
import { formatEuros } from '../partage/monnaie'
import { useDepenses } from './useDepenses'

const { lignes } = useDepenses()

/** Au-delà de 80 % on prévient, au-delà de 100 % on alerte. */
function couleurFil(pourcentage: number, depasse: boolean): string {
  if (depasse) return 'bg-alerte'
  if (pourcentage >= 80) return 'bg-attention'
  return 'bg-mer'
}
</script>

<template>
  <section class="bloc">
    <p class="micro">Enveloppes</p>
    <ul class="mt-3">
      <li
        v-for="ligne in lignes"
        :key="ligne.id"
        class="border-b border-sable-fonce/60 py-2.5 last:border-0"
      >
        <div class="flex items-baseline justify-between gap-3">
          <span class="flex items-center gap-1.5 text-sm font-semibold">
            <Icone :nom="ligne.icone" :taille="15" />
            {{ ligne.label }}
          </span>
          <span
            class="text-xs tabular-nums"
            :class="ligne.depasse ? 'font-semibold text-alerte' : 'text-encre-doux'"
          >
            {{ formatEuros(ligne.depense) }} / {{ formatEuros(ligne.enveloppe) }}
          </span>
        </div>
        <div class="mt-1.5 h-0.5 bg-sable-fonce">
          <div
            class="h-full transition-all"
            :class="couleurFil(ligne.pourcentage, ligne.depasse)"
            :style="{ width: `${Math.min(100, ligne.pourcentage)}%` }"
          />
        </div>
        <p v-if="ligne.depasse" class="mt-1 text-xs font-semibold tabular-nums text-alerte">
          Dépassé de {{ formatEuros(-ligne.reste) }}
        </p>
      </li>
    </ul>
  </section>
</template>
