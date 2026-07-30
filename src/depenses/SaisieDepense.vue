<script setup lang="ts">
import { computed, ref } from 'vue'
import Icone from '../partage/Icone.vue'
import { parseMontant } from '../partage/monnaie'
import { JOURS, jourActif, libelleJour } from '../partage/voyage'
import { CATEGORIES } from './categories'
import type { CategorieId } from './types'
import { useDepenses } from './useDepenses'

const { ajouter } = useDepenses()

const saisie = ref('')
const libelle = ref('')
const confirmation = ref('')

// Hors voyage, on retombe sur le premier jour pour que les essais avant le
// départ n'atterrissent pas sur une date absente du carnet de route.
const date = ref(jourActif() ?? JOURS[0])

const centimes = computed(() => parseMontant(saisie.value))
const pret = computed(() => centimes.value !== null)

function enregistre(categorie: CategorieId) {
  const montant = centimes.value
  if (montant === null) return

  ajouter({ categorie, centimes: montant, libelle: libelle.value, date: date.value })
  confirmation.value = `${CATEGORIES.find((c) => c.id === categorie)?.label} enregistré`
  saisie.value = ''
  libelle.value = ''
  window.setTimeout(() => {
    confirmation.value = ''
  }, 1600)
}
</script>

<template>
  <section class="rounded-2xl bg-white p-4 shadow-sm">
    <label class="block">
      <span class="text-sm font-medium text-encre-doux">Montant</span>
      <div class="mt-1 flex items-baseline gap-2">
        <input
          v-model="saisie"
          type="text"
          inputmode="decimal"
          enterkeyhint="done"
          placeholder="0,00"
          aria-label="Montant de la dépense en euros"
          class="w-full min-w-0 border-b-2 border-sable-fonce bg-transparent py-2 text-4xl font-bold tabular-nums outline-none focus:border-terre"
        />
        <span class="text-3xl font-bold text-encre-doux">€</span>
      </div>
    </label>

    <input
      v-model="libelle"
      type="text"
      maxlength="60"
      placeholder="Libellé (facultatif)"
      aria-label="Libellé de la dépense, facultatif"
      class="mt-3 w-full rounded-xl bg-sable px-3 py-2 outline-none focus:ring-2 focus:ring-terre/40"
    />

    <p class="mt-4 text-sm font-medium text-encre-doux">Touche une catégorie pour enregistrer</p>
    <div class="mt-2 grid grid-cols-4 gap-2">
      <button
        v-for="categorie in CATEGORIES"
        :key="categorie.id"
        type="button"
        :disabled="!pret"
        class="flex min-h-[68px] flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-xs font-semibold transition active:scale-95 disabled:opacity-35"
        :class="pret ? 'bg-terre-clair text-terre' : 'bg-sable text-encre-doux'"
        @click="enregistre(categorie.id)"
      >
        <Icone :nom="categorie.icone" :taille="24" />
        <span class="text-center leading-tight">{{ categorie.label }}</span>
      </button>
    </div>

    <div class="mt-4 flex items-center justify-between gap-3 text-sm">
      <label class="flex items-center gap-2 text-encre-doux">
        <span>Jour</span>
        <select
          v-model="date"
          aria-label="Jour de la dépense"
          class="rounded-lg bg-sable px-2 py-1 font-medium text-encre"
        >
          <option v-for="jour in JOURS" :key="jour" :value="jour">
            {{ libelleJour(jour) }}
          </option>
        </select>
      </label>
      <span v-if="confirmation" class="font-semibold text-olive" role="status">
        {{ confirmation }}
      </span>
    </div>
  </section>
</template>
