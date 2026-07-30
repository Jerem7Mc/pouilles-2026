<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Icone from '../partage/Icone.vue'
import { SECTIONS_PHRASES, TOTAL_PHRASES, sectionParId } from './donnees/phrases'
import type { Phrase } from './donnees/phrases'
import FichePhrase from './FichePhrase.vue'

/**
 * Trois niveaux : tuiles de catégories, liste d'une catégorie, fiche en grand.
 *
 * L'accueil ne montre aucune phrase, seulement les quatorze catégories et leur
 * volume : la vue d'ensemble tient sur un écran au lieu d'un mur de 180 phrases.
 * La recherche court-circuite les deux premiers niveaux.
 */
const recherche = ref('')
const sectionOuverte = ref<string | null>(null)
const indexFiche = ref<number | null>(null)

function normalise(texte: string): string {
  return texte
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/['’]/gu, ' ')
}

const terme = computed(() => normalise(recherche.value.trim()))
const enRecherche = computed(() => terme.value.length > 0)

/** Résultats de recherche, toutes catégories confondues. */
const resultats = computed(() =>
  enRecherche.value
    ? SECTIONS_PHRASES.flatMap((section) =>
        section.phrases
          .filter(
            (phrase) =>
              normalise(phrase.fr).includes(terme.value) ||
              normalise(phrase.it).includes(terme.value),
          )
          .map((phrase) => ({ phrase, titre: section.titre })),
      )
    : [],
)

const section = computed(() => (sectionOuverte.value ? sectionParId(sectionOuverte.value) : null))

/** Liste affichée, qu'elle vienne d'une catégorie ou d'une recherche. */
const liste = computed<{ phrase: Phrase; titre: string }[]>(() => {
  if (enRecherche.value) return resultats.value
  if (!section.value) return []
  return section.value.phrases.map((phrase) => ({ phrase, titre: section.value!.titre }))
})

const fiche = computed(() =>
  indexFiche.value !== null ? (liste.value[indexFiche.value] ?? null) : null,
)

// Changer de contexte ferme la fiche : elle porterait sur une phrase absente.
watch([sectionOuverte, terme], () => {
  indexFiche.value = null
})

function deplace(pas: number) {
  if (indexFiche.value === null) return
  const suivant = indexFiche.value + pas
  if (suivant >= 0 && suivant < liste.value.length) indexFiche.value = suivant
}

function revient() {
  if (enRecherche.value) recherche.value = ''
  sectionOuverte.value = null
}
</script>

<template>
  <div>
    <div class="sticky top-14 z-10 -mx-4 bg-sable/95 px-4 pb-2 pt-1 backdrop-blur">
      <label class="relative block">
        <span class="absolute inset-y-0 left-0 flex items-center text-encre-doux">
          <Icone nom="recherche" :taille="18" />
        </span>
        <input
          v-model="recherche"
          type="search"
          enterkeyhint="search"
          :placeholder="`Chercher dans les ${TOTAL_PHRASES} phrases…`"
          aria-label="Chercher une phrase"
          class="w-full border-b-2 border-sable-fonce bg-transparent py-2.5 pl-7 outline-none focus:border-encre"
        />
      </label>
    </div>

    <!-- Niveau 1 : tuiles de catégories -->
    <section v-if="!enRecherche && !section" class="bloc">
      <p class="micro">{{ SECTIONS_PHRASES.length }} catégories · {{ TOTAL_PHRASES }} phrases</p>
      <div class="mt-3 grid grid-cols-3 gap-2">
        <button
          v-for="element in SECTIONS_PHRASES"
          :key="element.id"
          type="button"
          class="flex min-h-24 flex-col items-start justify-between rounded-2xl bg-white p-2.5 text-left"
          @click="sectionOuverte = element.id"
        >
          <Icone :nom="element.icone" :taille="20" />
          <span>
            <span class="block text-xs font-bold leading-tight">{{ element.court }}</span>
            <span class="block text-[0.65rem] tabular-nums text-encre-doux">
              {{ element.phrases.length }} phrases
            </span>
          </span>
        </button>
      </div>
    </section>

    <!-- Niveau 2 : liste d'une catégorie, ou résultats de recherche -->
    <section v-else class="bloc">
      <div class="flex items-center justify-between gap-2">
        <button
          v-if="section"
          type="button"
          class="flex min-h-11 items-center gap-1 pr-2 text-xs font-bold text-mer"
          @click="revient()"
        >
          <Icone nom="precedent" :taille="16" />
          Toutes les catégories
        </button>
        <p v-else class="micro">{{ liste.length }} résultat{{ liste.length > 1 ? 's' : '' }}</p>
        <p v-if="section" class="micro flex items-center gap-1.5">
          <Icone :nom="section.icone" :taille="14" />
          {{ section.titre }}
        </p>
      </div>

      <p v-if="liste.length === 0" class="mt-3 text-sm text-encre-doux">
        Aucune phrase ne correspond à cette recherche.
      </p>

      <ul class="mt-2">
        <li
          v-for="(element, index) in liste"
          :key="element.phrase.it"
          class="border-b border-sable-fonce/60 last:border-0"
        >
          <button
            type="button"
            class="flex w-full items-center gap-3 py-3 text-left"
            @click="indexFiche = index"
          >
            <span class="min-w-0 flex-1">
              <span class="block text-lg font-semibold leading-snug" lang="it">
                {{ element.phrase.it }}
              </span>
              <span class="mt-0.5 block text-xs text-encre-doux">{{ element.phrase.fr }}</span>
              <span v-if="enRecherche" class="micro mt-1 block">{{ element.titre }}</span>
            </span>
            <Icone nom="suivant" :taille="18" class="shrink-0 text-encre-doux" />
          </button>
        </li>
      </ul>
    </section>

    <!-- Niveau 3 : la fiche à montrer -->
    <FichePhrase
      v-if="fiche && indexFiche !== null"
      :phrase="fiche.phrase"
      :titre-section="fiche.titre"
      :rang="indexFiche + 1"
      :total="liste.length"
      @fermer="indexFiche = null"
      @precedent="deplace(-1)"
      @suivant="deplace(1)"
    />
  </div>
</template>
