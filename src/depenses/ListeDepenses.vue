<script setup lang="ts">
import { computed, ref } from 'vue'
import Icone from '../partage/Icone.vue'
import { formatEuros } from '../partage/monnaie'
import { libelleJour } from '../partage/voyage'
import { categorie } from './categories'
import type { Depense } from './types'
import { useDepenses } from './useDepenses'

const { depenses, supprimer } = useDepenses()

/** Confirmation en deux temps : un doigt mouillé ne doit pas effacer une ligne. */
const aConfirmer = ref<string | null>(null)

const parJour = computed(() => {
  const groupes = new Map<string, Depense[]>()
  for (const depense of depenses.value) {
    const liste = groupes.get(depense.date) ?? []
    liste.push(depense)
    groupes.set(depense.date, liste)
  }
  return [...groupes.entries()].map(([date, lignes]) => ({
    date,
    lignes,
    total: lignes.reduce((somme, ligne) => somme + ligne.centimes, 0),
  }))
})

function confirme(id: string) {
  if (aConfirmer.value === id) {
    supprimer(id)
    aConfirmer.value = null
    return
  }
  aConfirmer.value = id
}
</script>

<template>
  <section class="bloc">
    <p class="micro">Historique</p>

    <p v-if="parJour.length === 0" class="mt-3 text-sm text-encre-doux">
      Aucune dépense enregistrée. Saisis un montant en bas d’écran puis touche une catégorie.
    </p>

    <div v-for="groupe in parJour" :key="groupe.date" class="mt-5 first:mt-3">
      <div class="flex items-baseline justify-between border-b border-encre pb-1">
        <h3 class="micro">{{ libelleJour(groupe.date) }}</h3>
        <span class="text-sm font-bold tabular-nums">{{ formatEuros(groupe.total) }}</span>
      </div>
      <ul>
        <li
          v-for="ligne in groupe.lignes"
          :key="ligne.id"
          class="flex items-center gap-2.5 border-b border-sable-fonce/60 py-2.5 last:border-0"
        >
          <span class="shrink-0 text-encre-doux">
            <Icone :nom="categorie(ligne.categorie).icone" :taille="18" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block truncate text-sm font-medium">
              {{ ligne.libelle || categorie(ligne.categorie).label }}
            </span>
            <span v-if="ligne.libelle" class="block text-xs text-encre-doux">
              {{ categorie(ligne.categorie).label }}
            </span>
          </span>
          <span class="text-sm font-bold tabular-nums">{{ formatEuros(ligne.centimes) }}</span>
          <button
            type="button"
            class="flex min-h-11 min-w-11 items-center justify-center rounded-lg px-2 text-xs font-bold"
            :class="aConfirmer === ligne.id ? 'bg-alerte text-white' : 'text-encre-doux'"
            :aria-label="
              aConfirmer === ligne.id ? 'Confirmer la suppression' : 'Supprimer cette dépense'
            "
            @click="confirme(ligne.id)"
          >
            <span v-if="aConfirmer === ligne.id">Sûr ?</span>
            <Icone v-else nom="supprimer" :taille="17" />
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
