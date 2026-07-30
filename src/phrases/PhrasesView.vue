<script setup lang="ts">
import { computed, ref } from 'vue'
import { SECTIONS_PHRASES } from './donnees/phrases'

const recherche = ref('')

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
  if (terme === '') return SECTIONS_PHRASES

  return SECTIONS_PHRASES.map((section) => ({
    ...section,
    phrases: section.phrases.filter(
      (phrase) => normalise(phrase.fr).includes(terme) || normalise(phrase.it).includes(terme),
    ),
  })).filter((section) => section.phrases.length > 0)
})

const total = computed(() =>
  sections.value.reduce((somme, section) => somme + section.phrases.length, 0),
)
</script>

<template>
  <div class="space-y-4">
    <input
      v-model="recherche"
      type="search"
      enterkeyhint="search"
      placeholder="Chercher « fromage », « billet », « pharmacie »…"
      aria-label="Chercher une phrase"
      class="w-full rounded-xl bg-white px-3 py-3 shadow-sm outline-none focus:ring-2 focus:ring-terre/40"
    />

    <p v-if="total === 0" class="rounded-xl bg-white p-4 text-sm text-encre-doux shadow-sm">
      Aucune phrase ne correspond à cette recherche.
    </p>

    <section
      v-for="section in sections"
      :key="section.id"
      class="rounded-2xl bg-white p-4 shadow-sm"
    >
      <h2 class="font-semibold">{{ section.emoji }} {{ section.titre }}</h2>
      <ul class="mt-2 divide-y divide-sable">
        <li v-for="phrase in section.phrases" :key="phrase.it" class="py-2">
          <p class="text-sm text-encre-doux">{{ phrase.fr }}</p>
          <p class="text-lg font-semibold leading-snug" lang="it">{{ phrase.it }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
