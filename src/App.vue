<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const titre = computed(() => (route.meta.titre as string | undefined) ?? 'Pouilles')

const ONGLETS = [
  { nom: 'depenses', label: 'Dépenses', emoji: '💶' },
  { nom: 'journal', label: 'Journal', emoji: '🗺️' },
  { nom: 'phrases', label: 'Phrases', emoji: '💬' },
  { nom: 'lieux', label: 'Lieux', emoji: '📍' },
] as const
</script>

<template>
  <div class="min-h-dvh bg-sable">
    <header class="zone-sure-haut sticky top-0 z-10 bg-sable/95 backdrop-blur">
      <div class="flex items-center justify-between px-4 py-3">
        <h1 class="text-lg font-bold">{{ titre }}</h1>
        <RouterLink
          :to="{ name: 'reglages' }"
          class="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-xl"
          aria-label="Réglages"
        >
          ⚙️
        </RouterLink>
      </div>
    </header>

    <main class="px-4 pb-28">
      <RouterView />
    </main>

    <nav
      aria-label="Navigation principale"
      class="zone-sure-bas fixed inset-x-0 bottom-0 border-t border-sable-fonce bg-white/95 backdrop-blur"
    >
      <ul class="flex">
        <li v-for="onglet in ONGLETS" :key="onglet.nom" class="flex-1">
          <RouterLink
            :to="{ name: onglet.nom }"
            class="flex min-h-16 flex-col items-center justify-center gap-0.5 text-xs font-semibold text-encre-doux"
            active-class="text-terre"
          >
            <span class="text-xl leading-none">{{ onglet.emoji }}</span>
            <span>{{ onglet.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>
