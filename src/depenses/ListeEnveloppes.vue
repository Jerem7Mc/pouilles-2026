<script setup lang="ts">
import Icone from '../partage/Icone.vue'
import { formatEuros } from '../partage/monnaie'
import { useDepenses } from './useDepenses'

const { lignes } = useDepenses()

/** Au-delà de 80 % on prévient, au-delà de 100 % on alerte. */
function couleurBarre(pourcentage: number, depasse: boolean): string {
  if (depasse) return 'bg-alerte'
  if (pourcentage >= 80) return 'bg-attention'
  return 'bg-mer'
}
</script>

<template>
  <section class="rounded-2xl bg-white p-4 shadow-sm">
    <h2 class="text-sm font-medium text-encre-doux">Enveloppes</h2>
    <ul class="mt-3 space-y-3">
      <li v-for="ligne in lignes" :key="ligne.id">
        <div class="flex items-baseline justify-between gap-2 text-sm">
          <span class="flex items-center gap-1.5 font-semibold">
            <Icone :nom="ligne.icone" :taille="16" />
            {{ ligne.label }}
          </span>
          <span
            class="tabular-nums"
            :class="ligne.depasse ? 'text-alerte font-semibold' : 'text-encre-doux'"
          >
            {{ formatEuros(ligne.depense) }} / {{ formatEuros(ligne.enveloppe) }}
          </span>
        </div>
        <div class="mt-1 h-2 overflow-hidden rounded-full bg-sable-fonce">
          <div
            class="h-full rounded-full transition-all"
            :class="couleurBarre(ligne.pourcentage, ligne.depasse)"
            :style="{ width: `${Math.min(100, ligne.pourcentage)}%` }"
          />
        </div>
        <p
          class="mt-1 text-xs tabular-nums"
          :class="ligne.depasse ? 'text-alerte' : 'text-encre-doux'"
        >
          {{
            ligne.depasse
              ? `Dépassé de ${formatEuros(-ligne.reste)}`
              : `Reste ${formatEuros(ligne.reste)}`
          }}
        </p>
      </li>
    </ul>
  </section>
</template>
