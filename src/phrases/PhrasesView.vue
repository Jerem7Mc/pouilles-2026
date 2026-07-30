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
  <div>
    <!-- Recherche et catégories restent collées en haut : c'est ce qu'on
         cherche en premier, y compris après avoir défilé. -->
    <div class="sticky top-14 z-10 -mx-4 bg-sable/95 px-4 pb-2 pt-1 backdrop-blur">
      <label class="relative block">
        <span class="absolute inset-y-0 left-0 flex items-center text-encre-doux">
          <Icone nom="recherche" :taille="18" />
        </span>
        <input
          v-model="recherche"
          type="search"
          enterkeyhint="search"
          placeholder="Chercher « fromage », « billet », « numéro »…"
          aria-label="Chercher une phrase"
          class="w-full border-b-2 border-sable-fonce bg-transparent py-2.5 pl-7 outline-none focus:border-encre"
        />
      </label>

      <nav aria-label="Catégories de phrases" class="rangee-defilante -mx-4 mt-2 px-4">
        <ul class="flex gap-1.5">
          <li>
            <button
              type="button"
              class="min-h-11 whitespace-nowrap rounded-xl px-3 text-xs font-bold"
              :class="sectionActive === null ? 'bg-encre text-sable' : 'text-encre-doux'"
              :aria-pressed="sectionActive === null"
              @click="sectionActive = null"
            >
              Tout
            </button>
          </li>
          <li v-for="section in SECTIONS_PHRASES" :key="section.id">
            <button
              type="button"
              class="flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-xl px-3 text-xs font-bold"
              :class="sectionActive === section.id ? 'bg-encre text-sable' : 'text-encre-doux'"
              :aria-pressed="sectionActive === section.id"
              @click="bascule(section.id)"
            >
              <Icone :nom="section.icone" :taille="15" />
              {{ section.court }}
            </button>
          </li>
        </ul>
      </nav>
    </div>

    <p v-if="total === 0" class="bloc text-sm text-encre-doux">
      Aucune phrase ne correspond à cette recherche.
    </p>

    <section v-for="section in sections" :key="section.id" class="bloc">
      <p class="micro flex items-center gap-1.5">
        <Icone :nom="section.icone" :taille="14" />
        {{ section.titre }}
      </p>
      <ul class="mt-2">
        <li
          v-for="phrase in section.phrases"
          :key="phrase.it"
          class="border-b border-sable-fonce/60 py-2.5 last:border-0"
        >
          <p class="text-xs text-encre-doux">{{ phrase.fr }}</p>
          <p class="mt-0.5 text-lg font-semibold leading-snug" lang="it">{{ phrase.it }}</p>
        </li>
      </ul>
    </section>
  </div>
</template>
