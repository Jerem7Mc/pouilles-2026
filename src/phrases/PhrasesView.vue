<script setup lang="ts">
import { computed, ref } from 'vue'
import Icone from '../partage/Icone.vue'
import { SECTIONS_PHRASES } from './donnees/phrases'

const recherche = ref('')
const sectionActive = ref<string | null>(null)

/**
 * Recherche insensible à la casse, aux accents et aux apostrophes, pour que
 * « e » trouve « è » et que « l'huile » se trouve en tapant « huile ».
 */
function normalise(texte: string): string {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/['’]/gu, ' ')
}

const sections = computed(() => {
  const terme = normalise(recherche.value.trim())
  const retenues =
    sectionActive.value === null
      ? SECTIONS_PHRASES
      : SECTIONS_PHRASES.filter((section) => section.id === sectionActive.value)

  if (terme === '') return retenues

  return retenues
    .map((section) => ({
      ...section,
      phrases: section.phrases.filter(
        (phrase) => normalise(phrase.fr).includes(terme) || normalise(phrase.it).includes(terme),
      ),
    }))
    .filter((section) => section.phrases.length > 0)
})

const total = computed(() =>
  sections.value.reduce((somme, section) => somme + section.phrases.length, 0),
)

/** Sélectionner une pastille déjà active la désélectionne : un seul geste dans les deux sens. */
function bascule(id: string) {
  sectionActive.value = sectionActive.value === id ? null : id
}
</script>

<template>
  <div class="space-y-4">
    <!-- Barre de catégories collante : accessible au pouce quelle que soit la
         position de défilement, c'est le reproche principal de la version 1. -->
    <div class="sticky top-14 z-10 -mx-4 space-y-2 bg-sable/95 px-4 pb-2 pt-1 backdrop-blur">
      <label class="relative block">
        <span class="absolute inset-y-0 left-3 flex items-center text-encre-doux">
          <Icone nom="recherche" :taille="18" />
        </span>
        <input
          v-model="recherche"
          type="search"
          enterkeyhint="search"
          placeholder="Chercher « fromage », « billet », « numéro »…"
          aria-label="Chercher une phrase"
          class="w-full rounded-xl bg-white py-3 pl-10 pr-3 shadow-sm outline-none focus:ring-2 focus:ring-terre/40"
        />
      </label>

      <nav aria-label="Catégories de phrases" class="-mx-4 overflow-x-auto px-4">
        <ul class="flex gap-2 pb-1">
          <li>
            <button
              type="button"
              class="min-h-11 whitespace-nowrap rounded-xl px-3 text-sm font-semibold"
              :class="sectionActive === null ? 'bg-terre text-white' : 'bg-white text-encre-doux'"
              :aria-pressed="sectionActive === null"
              @click="sectionActive = null"
            >
              Tout
            </button>
          </li>
          <li v-for="section in SECTIONS_PHRASES" :key="section.id">
            <button
              type="button"
              class="flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-xl px-3 text-sm font-semibold"
              :class="
                sectionActive === section.id ? 'bg-terre text-white' : 'bg-white text-encre-doux'
              "
              :aria-pressed="sectionActive === section.id"
              @click="bascule(section.id)"
            >
              <Icone :nom="section.icone" :taille="16" />
              {{ section.court }}
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <p v-if="total === 0" class="rounded-xl bg-white p-4 text-sm text-encre-doux shadow-sm">
      Aucune phrase ne correspond à cette recherche.
    </p>

    <section
      v-for="section in sections"
      :key="section.id"
      class="rounded-2xl bg-white p-4 shadow-sm"
    >
      <h2 class="flex items-center gap-2 font-semibold">
        <Icone :nom="section.icone" />
        {{ section.titre }}
      </h2>
      <ul class="mt-2 divide-y divide-sable">
        <li v-for="phrase in section.phrases" :key="phrase.it" class="py-2">
          <p class="text-sm text-encre-doux">{{ phrase.fr }}</p>
          <p class="text-lg font-semibold leading-snug" lang="it">{{ phrase.it }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
