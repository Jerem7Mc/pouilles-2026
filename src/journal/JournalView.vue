<script setup lang="ts">
import { computed, ref } from 'vue'
import Icone from '../partage/Icone.vue'
import { formatEuros } from '../partage/monnaie'
import { JOURS, isoDuJour, libelleJour, libelleJourCourt, position } from '../partage/voyage'
import { totalParDate } from '../depenses/calculs'
import { useDepenses } from '../depenses/useDepenses'
import { ITINERAIRE } from './donnees/itineraire'

const { depenses } = useDepenses()

const aujourdhui = isoDuJour()
const selection = ref(position(aujourdhui) === 'pendant' ? aujourdhui : JOURS[0])

const jour = computed(() => ITINERAIRE.find((etape) => etape.date === selection.value))
const numero = computed(() => JOURS.indexOf(selection.value) + 1)

const prevu = computed(() => (jour.value ? jour.value.transportPrevu + jour.value.repasPrevu : 0))
const reel = computed(() => totalParDate(depenses.value)[selection.value] ?? 0)
const ecart = computed(() => reel.value - prevu.value)
</script>

<template>
  <div class="space-y-4">
    <!-- Sélecteur de jour : défilement horizontal, une pastille par journée -->
    <nav aria-label="Journées du voyage" class="-mx-4 overflow-x-auto px-4">
      <ul class="flex gap-2 pb-1">
        <li v-for="date in JOURS" :key="date">
          <button
            type="button"
            class="min-h-11 whitespace-nowrap rounded-xl px-3 text-sm font-semibold"
            :class="
              date === selection
                ? 'bg-terre text-white'
                : date === aujourdhui
                  ? 'bg-terre-clair text-terre'
                  : 'bg-white text-encre-doux'
            "
            :aria-current="date === selection ? 'true' : undefined"
            @click="selection = date"
          >
            {{ libelleJourCourt(date) }}
          </button>
        </li>
      </ul>
    </nav>

    <article v-if="jour" class="space-y-4">
      <header class="rounded-2xl bg-white p-4 shadow-sm">
        <p class="text-sm font-medium text-encre-doux">
          Jour {{ numero }} sur {{ JOURS.length }} · {{ libelleJour(jour.date) }}
        </p>
        <h1 class="mt-1 text-2xl font-bold">{{ jour.titre }}</h1>
        <p class="mt-1 text-sm text-encre-doux">Base {{ jour.base }} · {{ jour.hebergement }}</p>
      </header>

      <section class="rounded-2xl bg-white p-4 shadow-sm">
        <h2 class="text-sm font-medium text-encre-doux">Budget du jour</h2>
        <div class="mt-2 flex items-baseline gap-4 tabular-nums">
          <p class="text-2xl font-bold">{{ formatEuros(reel) }}</p>
          <p class="text-sm text-encre-doux">dépensés sur {{ formatEuros(prevu) }} prévus</p>
        </div>
        <p
          class="mt-1 text-sm font-medium tabular-nums"
          :class="ecart > 0 ? 'text-attention' : 'text-olive'"
        >
          {{
            ecart > 0
              ? `${formatEuros(ecart)} au-dessus du plan`
              : `${formatEuros(-ecart)} sous le plan`
          }}
        </p>
      </section>

      <section class="rounded-2xl bg-white p-4 shadow-sm">
        <h2 class="flex items-center gap-2 font-semibold">
          <Icone nom="carte" />
          Quoi voir, quoi faire
        </h2>
        <p class="mt-1 text-sm leading-relaxed">{{ jour.aFaire }}</p>
      </section>

      <section class="rounded-2xl bg-white p-4 shadow-sm">
        <h2 class="flex items-center gap-2 font-semibold">
          <Icone nom="transport" />
          Comment y aller
          <span class="ml-1 text-sm font-normal text-encre-doux tabular-nums">
            {{ formatEuros(jour.transportPrevu) }} prévus
          </span>
        </h2>
        <p class="mt-1 text-sm leading-relaxed">{{ jour.transport }}</p>
      </section>

      <section class="rounded-2xl bg-white p-4 shadow-sm">
        <h2 class="flex items-center gap-2 font-semibold">
          <Icone nom="manger" />
          Où manger, sans laitage
          <span class="ml-1 text-sm font-normal text-encre-doux tabular-nums">
            {{ formatEuros(jour.repasPrevu) }} prévus
          </span>
        </h2>
        <p class="mt-1 text-sm leading-relaxed">{{ jour.ouManger }}</p>
      </section>
    </article>
  </div>
</template>
