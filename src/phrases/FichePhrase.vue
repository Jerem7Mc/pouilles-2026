<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Icone from '../partage/Icone.vue'
import type { Phrase } from './donnees/phrases'

const props = defineProps<{
  phrase: Phrase
  titreSection: string
  /** Position dans la section, pour naviguer sans revenir à la liste. */
  rang: number
  total: number
}>()

const emit = defineEmits<{ fermer: []; precedent: []; suivant: [] }>()

const copie = ref(false)
const panneau = ref<HTMLElement | null>(null)

async function copier() {
  try {
    await navigator.clipboard.writeText(props.phrase.it)
    copie.value = true
    window.setTimeout(() => {
      copie.value = false
    }, 1600)
  } catch {
    // Copie refusée par le navigateur : la phrase reste lisible à l'écran,
    // ce qui est le besoin principal. Inutile d'alarmer.
  }
}

function auClavier(evenement: KeyboardEvent) {
  if (evenement.key === 'Escape') emit('fermer')
  if (evenement.key === 'ArrowLeft') emit('precedent')
  if (evenement.key === 'ArrowRight') emit('suivant')
}

onMounted(() => {
  window.addEventListener('keydown', auClavier)
  panneau.value?.focus()
})
onBeforeUnmount(() => window.removeEventListener('keydown', auClavier))
</script>

<template>
  <!--
    Fiche plein écran : l'italien occupe l'écran pour être lu à bout de bras par
    quelqu'un d'autre quand la prononciation ne passe pas. C'est la raison d'être
    de cet écran, pas un simple agrandissement décoratif.
  -->
  <div
    ref="panneau"
    role="dialog"
    aria-modal="true"
    :aria-label="`${phrase.fr}, en italien`"
    tabindex="-1"
    class="zone-sure-haut zone-sure-bas fixed inset-0 z-40 flex flex-col bg-sable px-5 pb-5 pt-3 outline-none"
  >
    <div class="flex items-center justify-between">
      <button
        type="button"
        class="flex min-h-11 items-center gap-1 pr-2 text-xs font-bold text-mer"
        @click="emit('fermer')"
      >
        <Icone nom="precedent" :taille="18" />
        {{ titreSection }}
      </button>
      <span class="micro tabular-nums">{{ rang }} / {{ total }}</span>
    </div>

    <div class="flex flex-1 flex-col justify-center py-4">
      <p class="text-4xl font-bold leading-[1.15] tracking-tight text-balance" lang="it">
        {{ phrase.it }}
      </p>
      <p class="mt-5 text-base text-encre-doux">{{ phrase.fr }}</p>
      <p
        v-if="phrase.astuce"
        class="mt-5 border-l-2 border-terre pl-3 text-sm leading-relaxed text-terre"
      >
        {{ phrase.astuce }}
      </p>
    </div>

    <div class="flex gap-2">
      <button
        type="button"
        class="flex min-h-14 w-14 items-center justify-center rounded-2xl bg-white text-encre disabled:opacity-30"
        :disabled="rang <= 1"
        aria-label="Phrase précédente"
        @click="emit('precedent')"
      >
        <Icone nom="precedent" :taille="22" />
      </button>
      <button
        type="button"
        class="flex min-h-14 flex-1 items-center justify-center gap-2 rounded-2xl text-sm font-bold"
        :class="copie ? 'bg-olive text-white' : 'bg-terre text-white'"
        @click="copier()"
      >
        <Icone :nom="copie ? 'valide' : 'copier'" :taille="18" />
        {{ copie ? 'Copié' : 'Copier' }}
      </button>
      <button
        type="button"
        class="flex min-h-14 w-14 items-center justify-center rounded-2xl bg-white text-encre disabled:opacity-30"
        :disabled="rang >= total"
        aria-label="Phrase suivante"
        @click="emit('suivant')"
      >
        <Icone nom="suivant" :taille="22" />
      </button>
    </div>

    <p class="mt-3 text-center text-xs text-encre-doux">
      Montre cet écran si la prononciation ne passe pas
    </p>
  </div>
</template>
