<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Icone from '../partage/Icone.vue'
import { formatEuros } from '../partage/monnaie'
import { JOURS, jourActif, libelleJour, libelleJourCourt } from '../partage/voyage'
import { totalParDate } from '../depenses/calculs'
import { useDepenses } from '../depenses/useDepenses'
import { ITINERAIRE } from './donnees/itineraire'

const { depenses } = useDepenses()

const aujourdhui = jourActif()
const selection = ref(aujourdhui ?? JOURS[0])

const bandeJours = ref<HTMLElement | null>(null)

// Au jour 9, la pastille active est hors écran : sans cela il faudrait faire
// défiler à la main chaque fois qu'on ouvre le journal.
onMounted(() => {
  bandeJours.value
    ?.querySelector('[aria-current="true"]')
    ?.scrollIntoView({ block: 'nearest', inline: 'center' })
})

const jour = computed(() => ITINERAIRE.find((etape) => etape.date === selection.value))
const numero = computed(() => JOURS.indexOf(selection.value) + 1)

const prevu = computed(() => (jour.value ? jour.value.transportPrevu + jour.value.repasPrevu : 0))
const reel = computed(() => totalParDate(depenses.value)[selection.value] ?? 0)
const ecart = computed(() => reel.value - prevu.value)

const RUBRIQUES = [
  { cle: 'aFaire', titre: 'Quoi voir, quoi faire', icone: 'carte', montant: null },
  { cle: 'transport', titre: 'Comment y aller', icone: 'transport', montant: 'transportPrevu' },
  { cle: 'ouManger', titre: 'Où manger, sans laitage', icone: 'manger', montant: 'repasPrevu' },
] as const
</script>

<template>
  <div>
    <!-- Bande des journées : la pastille active est ramenée au centre au montage -->
    <nav
      ref="bandeJours"
      aria-label="Journées du voyage"
      class="rangee-defilante zone-sure-haut sticky top-14 z-10 -mx-4 bg-sable/95 px-4 pb-2 pt-1 backdrop-blur"
    >
      <ul class="flex gap-1.5">
        <li v-for="date in JOURS" :key="date">
          <button
            type="button"
            class="min-h-11 whitespace-nowrap rounded-xl px-3 text-xs font-bold"
            :class="
              date === selection
                ? 'bg-encre text-sable'
                : date === aujourdhui
                  ? 'bg-terre-clair text-terre'
                  : 'text-encre-doux'
            "
            :aria-current="date === selection ? 'true' : undefined"
            @click="selection = date"
          >
            {{ libelleJourCourt(date) }}
          </button>
        </li>
      </ul>
    </nav>

    <article v-if="jour">
      <header class="bloc">
        <p class="micro">Jour {{ numero }} sur {{ JOURS.length }} · {{ libelleJour(jour.date) }}</p>
        <h1 class="mt-1.5 text-3xl font-bold leading-tight tracking-tight text-balance">
          {{ jour.titre }}
        </h1>
        <p class="mt-2 text-sm text-encre-doux">{{ jour.base }} · {{ jour.hebergement }}</p>
      </header>

      <!-- Deux tuiles empruntées à la direction bento : le réel et le prévu du
           jour se comparent d'un coup d'œil, sans lire une phrase. -->
      <section class="bloc">
        <p class="micro">Budget du jour</p>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <div class="rounded-2xl bg-white px-3 py-2.5">
            <p class="micro">Dépensé</p>
            <p class="chiffre-moyen mt-0.5">{{ formatEuros(reel) }}</p>
          </div>
          <div class="rounded-2xl bg-white px-3 py-2.5">
            <p class="micro">Prévu</p>
            <p class="chiffre-moyen mt-0.5 text-encre-doux">{{ formatEuros(prevu) }}</p>
          </div>
        </div>
        <p
          class="mt-2.5 text-sm font-semibold tabular-nums"
          :class="ecart > 0 ? 'text-attention' : 'text-olive'"
        >
          {{
            ecart > 0
              ? `${formatEuros(ecart)} au-dessus du plan`
              : `${formatEuros(-ecart)} sous le plan`
          }}
        </p>
      </section>

      <section v-for="rubrique in RUBRIQUES" :key="rubrique.cle" class="bloc">
        <p class="micro flex items-center gap-1.5">
          <Icone :nom="rubrique.icone" :taille="14" />
          {{ rubrique.titre }}
          <span v-if="rubrique.montant" class="tabular-nums normal-case tracking-normal">
            · {{ formatEuros(jour[rubrique.montant]) }} prévus
          </span>
        </p>
        <p class="mt-2 leading-relaxed">{{ jour[rubrique.cle] }}</p>
      </section>
    </article>
  </div>
</template>
