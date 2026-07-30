<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Icone from './partage/Icone.vue'
import type { NomIcone } from './partage/icones'

const route = useRoute()
const titre = computed(() => (route.meta.titre as string | undefined) ?? 'Pouilles')

/**
 * Ordre voulu : le carnet de route d'abord, les dépenses en dernier. La route
 * d'accueil reste malgré tout l'écran de saisie, pour tenir l'objectif d'une
 * dépense enregistrée en moins de cinq secondes depuis l'icône.
 */
const ONGLETS: readonly { nom: string; label: string; icone: NomIcone }[] = [
  { nom: 'journal', label: 'Journal', icone: 'journal' },
  { nom: 'phrases', label: 'Phrases', icone: 'phrases' },
  { nom: 'lieux', label: 'Lieux', icone: 'lieux' },
  { nom: 'depenses', label: 'Dépenses', icone: 'depenses' },
]
</script>

<template>
  <div class="min-h-dvh bg-sable">
    <header class="zone-sure-haut sticky top-0 z-20 bg-sable/95 backdrop-blur">
      <div class="flex h-14 items-center justify-between px-4">
        <h1 class="text-lg font-bold">{{ titre }}</h1>
        <RouterLink
          :to="{ name: 'reglages' }"
          class="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-encre-doux"
          aria-label="Réglages"
        >
          <Icone nom="reglages" :taille="22" />
        </RouterLink>
      </div>
    </header>

    <main class="px-4 pb-28">
      <RouterView />
    </main>

    <nav
      aria-label="Navigation principale"
      class="zone-sure-bas fixed inset-x-0 bottom-0 z-20 border-t border-sable-fonce bg-white/95 backdrop-blur"
    >
      <ul class="flex">
        <li v-for="onglet in ONGLETS" :key="onglet.nom" class="flex-1">
          <RouterLink
            :to="{ name: onglet.nom }"
            class="flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold text-encre-doux"
            active-class="text-terre"
          >
            <Icone :nom="onglet.icone" :taille="22" />
            <span>{{ onglet.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
