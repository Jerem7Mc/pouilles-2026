<script setup lang="ts">
import { useReferences } from './references'

const { references, champs, regler } = useReferences()

function saisit(id: string, evenement: Event) {
  regler(id, (evenement.target as HTMLInputElement).value)
}
</script>

<template>
  <section class="bloc">
    <p class="micro">Références de réservation</p>
    <p class="mt-2 text-sm leading-relaxed text-encre-doux">
      Saisies ici, elles restent sur ce téléphone et partent dans l’export. Elles ne sont pas dans
      le code de l’application, dont le dépôt est public : une référence associée à ton nom permet
      de consulter ou d’annuler une réservation.
    </p>

    <ul class="mt-3 space-y-3">
      <li v-for="champ in champs" :key="champ.id">
        <label class="block">
          <span class="text-sm font-semibold">{{ champ.label }}</span>
          <span class="mt-0.5 block text-xs text-encre-doux">{{ champ.aide }}</span>
          <input
            type="text"
            inputmode="text"
            autocapitalize="characters"
            autocomplete="off"
            spellcheck="false"
            :value="references[champ.id] ?? ''"
            :placeholder="`Référence ${champ.label}`"
            class="mt-1.5 min-h-11 w-full rounded-xl bg-white px-3 text-base tabular-nums outline-none focus:ring-2 focus:ring-terre/40"
            @change="saisit(champ.id, $event)"
          />
        </label>
      </li>
    </ul>
  </section>
</template>
