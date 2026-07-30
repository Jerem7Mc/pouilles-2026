<script setup lang="ts">
import { computed, ref } from 'vue'
import Icone from '../partage/Icone.vue'
import { JOURS, jourActif, libelleJour } from '../partage/voyage'
import { ETAPES, etape } from './donnees/etapes'
import { LIBELLES_PRECISION, LIBELLES_TYPE, LIEUX, lienCarte } from './donnees/lieux'
import type { TypeLieu } from './donnees/lieux'
import CarteLieux from './CarteLieux.vue'

const TYPES = Object.keys(LIBELLES_TYPE) as TypeLieu[]
const VILLES = ['Bari', 'Lecce'] as const

const filtreType = ref<TypeLieu | null>(null)
const filtreVille = ref<string | null>(null)
/**
 * Pendant le voyage, on ouvre l'écran sur la journée en cours : ce sont ces
 * adresses qui servent aujourd'hui. Hors des dates, rien n'est filtré, on
 * consulte l'ensemble.
 */
const filtreJour = ref<string | null>(jourActif())

/**
 * Ville et jour sont deux façons de restreindre la même chose : choisir l'une
 * relâche l'autre, sinon on obtient vite une liste vide sans comprendre pourquoi.
 */
function choisitVille(ville: string) {
  filtreVille.value = filtreVille.value === ville ? null : ville
  filtreJour.value = null
}

function choisitJour(evenement: Event) {
  const valeur = (evenement.target as HTMLSelectElement).value
  filtreJour.value = valeur === '' ? null : valeur
  filtreVille.value = null
}

const lieuxFiltres = computed(() =>
  LIEUX.filter((lieu) => {
    if (filtreType.value && lieu.type !== filtreType.value) return false
    if (filtreVille.value && lieu.ville !== filtreVille.value) return false
    if (filtreJour.value && !lieu.jours.includes(filtreJour.value)) return false
    return true
  }),
)

/** La carte ne montre que les étapes concernées par le filtre courant. */
const etapesFiltrees = computed(() => {
  if (filtreJour.value) return ETAPES.filter((element) => element.date === filtreJour.value)
  if (filtreVille.value) return ETAPES.filter((element) => element.ville === filtreVille.value)
  return ETAPES
})

const groupes = computed(() =>
  TYPES.map((type) => ({
    type,
    ...LIBELLES_TYPE[type],
    lieux: lieuxFiltres.value.filter((lieu) => lieu.type === type),
  })).filter((groupe) => groupe.lieux.length > 0),
)

const actif = computed(
  () => filtreType.value !== null || filtreVille.value !== null || filtreJour.value !== null,
)

function reinitialise() {
  filtreType.value = null
  filtreVille.value = null
  filtreJour.value = null
}
</script>

<template>
  <div>
    <div class="pt-3">
      <CarteLieux :lieux="lieuxFiltres" :etapes="etapesFiltrees" />
    </div>

    <section class="bloc">
      <p class="micro">Filtrer</p>

      <div class="rangee-defilante -mx-4 mt-2.5 px-4">
        <div class="flex gap-1.5">
          <button
            v-for="type in TYPES"
            :key="type"
            type="button"
            class="flex min-h-11 shrink-0 items-center gap-1.5 rounded-xl px-3 text-xs font-bold"
            :class="filtreType === type ? 'bg-encre text-sable' : 'bg-white text-encre-doux'"
            :aria-pressed="filtreType === type"
            @click="filtreType = filtreType === type ? null : type"
          >
            <Icone :nom="LIBELLES_TYPE[type].icone" :taille="15" />
            {{ LIBELLES_TYPE[type].label }}
          </button>
        </div>
      </div>

      <div class="mt-1.5 flex gap-1.5">
        <button
          v-for="ville in VILLES"
          :key="ville"
          type="button"
          class="min-h-11 rounded-xl px-3 text-xs font-bold"
          :class="filtreVille === ville ? 'bg-mer text-white' : 'bg-white text-encre-doux'"
          :aria-pressed="filtreVille === ville"
          @click="choisitVille(ville)"
        >
          {{ ville }}
        </button>

        <select
          :value="filtreJour ?? ''"
          aria-label="Filtrer par journée du voyage"
          class="min-h-11 min-w-0 flex-1 rounded-xl bg-white px-2 text-xs font-bold text-encre"
          @change="choisitJour"
        >
          <option value="">Toutes les journées</option>
          <option v-for="jour in JOURS" :key="jour" :value="jour">
            {{ libelleJour(jour) }}{{ etape(jour) ? ` · ${etape(jour)?.ville}` : '' }}
          </option>
        </select>
      </div>

      <button
        v-if="actif"
        type="button"
        class="mt-1.5 min-h-11 w-full rounded-xl text-xs font-bold text-encre-doux underline decoration-sable-fonce decoration-2 underline-offset-4"
        @click="reinitialise()"
      >
        Tout afficher · {{ LIEUX.length }} lieux
      </button>
    </section>

    <p v-if="groupes.length === 0" class="bloc text-sm text-encre-doux">
      Aucun lieu ne correspond à ce filtre.
    </p>

    <section v-for="groupe in groupes" :key="groupe.type" class="bloc">
      <p class="micro flex items-center gap-1.5">
        <Icone :nom="groupe.icone" :taille="14" />
        {{ groupe.label }}
      </p>
      <ul class="mt-2">
        <li
          v-for="lieu in groupe.lieux"
          :key="lieu.nom + lieu.ville"
          class="border-b border-sable-fonce/60 py-3 last:border-0"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="font-semibold">{{ lieu.nom }}</p>
              <p class="text-xs font-bold uppercase tracking-wider text-terre">{{ lieu.ville }}</p>
              <p class="mt-1.5 text-sm leading-relaxed text-encre-doux">{{ lieu.note }}</p>
              <p class="mt-1 text-xs text-encre-doux/80">
                {{ LIBELLES_PRECISION[lieu.precision] }}
              </p>
            </div>
            <a
              :href="lienCarte(lieu)"
              target="_blank"
              rel="noopener noreferrer"
              class="flex min-h-11 shrink-0 items-center gap-1 rounded-xl bg-white px-3 text-xs font-bold text-mer"
              :aria-label="`Ouvrir ${lieu.nom} dans Plans`"
            >
              <Icone nom="carte" :taille="15" />
              Y aller
            </a>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
