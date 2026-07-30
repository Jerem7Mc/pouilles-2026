<script setup lang="ts">
import { computed } from 'vue'
import Icone from '../partage/Icone.vue'
import { formatCentimes, formatEuros, parseMontant } from '../partage/monnaie'
import { CATEGORIES } from './categories'
import type { CategorieId } from './types'
import { useDepenses } from './useDepenses'

const { enveloppes, budgetTotal, reglerEnveloppe, reinitialiserEnveloppes } = useDepenses()

const valeurs = computed(() =>
  CATEGORIES.map((categorie) => ({
    ...categorie,
    saisie: formatCentimes(enveloppes.value[categorie.id]),
  })),
)

function modifie(id: CategorieId, evenement: Event) {
  const saisie = (evenement.target as HTMLInputElement).value
  // Une enveloppe peut légitimement être remise à zéro, contrairement à une dépense.
  const centimes = saisie.trim() === '' || saisie.trim() === '0' ? 0 : parseMontant(saisie)
  if (centimes !== null) reglerEnveloppe(id, centimes)
}
</script>

<template>
  <section class="bloc">
    <div class="flex items-baseline justify-between gap-2">
      <p class="micro">Enveloppes</p>
      <span class="text-sm font-bold tabular-nums">{{ formatEuros(budgetTotal) }}</span>
    </div>
    <p class="mt-2 text-sm text-encre-doux">
      Le plan de voyage prévoyait 267,40 € de transports et de repas. Les enveloppes par défaut y
      ajoutent les postes qu’il avait laissés de côté.
    </p>

    <ul class="mt-3 space-y-3">
      <li v-for="valeur in valeurs" :key="valeur.id">
        <label class="flex items-center justify-between gap-3">
          <span class="min-w-0">
            <span class="flex items-center gap-1.5 text-sm font-semibold">
              <Icone :nom="valeur.icone" :taille="16" />
              {{ valeur.label }}
            </span>
            <span class="block text-xs leading-snug text-encre-doux">{{ valeur.base }}</span>
          </span>
          <span class="flex shrink-0 items-baseline gap-1">
            <input
              type="text"
              inputmode="decimal"
              :value="valeur.saisie"
              :aria-label="`Enveloppe ${valeur.label} en euros`"
              class="w-20 rounded-lg bg-white px-2 py-2 text-right font-bold tabular-nums outline-none focus:ring-2 focus:ring-terre/40"
              @change="modifie(valeur.id, $event)"
            />
            <span class="text-sm font-semibold text-encre-doux">€</span>
          </span>
        </label>
      </li>
    </ul>

    <button
      type="button"
      class="mt-4 min-h-11 w-full text-xs font-bold text-encre-doux underline decoration-sable-fonce decoration-2 underline-offset-4"
      @click="reinitialiserEnveloppes()"
    >
      Revenir aux enveloppes conseillées (450 €)
    </button>
  </section>
</template>
