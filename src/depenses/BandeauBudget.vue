<script setup lang="ts">
import { computed } from 'vue'
import { formatEuros } from '../partage/monnaie'
import { useDepenses } from './useDepenses'

const { totalDepense, budgetTotal, resteGlobal, rythme } = useDepenses()

const COULEURS = {
  avant: 'text-encre',
  ok: 'text-olive',
  attention: 'text-attention',
  alerte: 'text-alerte',
  termine: 'text-encre',
} as const

const message = computed(() => {
  const r = rythme.value
  if (r.statut === 'avant') return 'Le voyage n’a pas encore commencé'
  if (r.statut === 'termine') {
    return r.ecart <= 0
      ? `Voyage terminé, budget tenu avec ${formatEuros(-r.ecart)} de marge`
      : `Voyage terminé, budget dépassé de ${formatEuros(r.ecart)}`
  }

  const jour = `Jour ${r.jour} sur ${r.joursTotal}`
  if (r.ecart <= 0) return `${jour} · ${formatEuros(-r.ecart)} d’avance sur le rythme prévu`
  return `${jour} · ${formatEuros(r.ecart)} de retard sur le rythme prévu`
})

const pourcentageConsomme = computed(() =>
  budgetTotal.value > 0 ? Math.min(100, (totalDepense.value / budgetTotal.value) * 100) : 0,
)
const pourcentageTemps = computed(() =>
  rythme.value.jour === null ? 0 : (rythme.value.jour / rythme.value.joursTotal) * 100,
)
</script>

<template>
  <section class="bloc">
    <p class="micro">Reste à dépenser</p>
    <p class="chiffre mt-2" :class="COULEURS[rythme.statut]">{{ formatEuros(resteGlobal) }}</p>
    <p class="mt-2 text-sm tabular-nums text-encre-doux">
      {{ formatEuros(totalDepense) }} dépensés sur {{ formatEuros(budgetTotal) }}
    </p>

    <!-- Un trait de 2 px porte deux informations : le budget consommé, et le
         repère de là où on devrait en être au vu du jour de voyage. -->
    <div class="relative mt-4 h-0.5 bg-sable-fonce">
      <div
        class="absolute inset-y-0 left-0 transition-all"
        :class="{
          'bg-olive': rythme.statut === 'ok' || rythme.statut === 'avant',
          'bg-attention': rythme.statut === 'attention',
          'bg-alerte': rythme.statut === 'alerte',
          'bg-encre-doux': rythme.statut === 'termine',
        }"
        :style="{ width: `${pourcentageConsomme}%` }"
      />
      <div
        v-if="pourcentageTemps > 0"
        class="absolute -top-1 h-2.5 w-px bg-terre"
        :style="{ left: `${pourcentageTemps}%` }"
        :title="`Rythme attendu au jour ${rythme.jour}`"
      />
    </div>

    <p class="mt-3 text-sm font-semibold" :class="COULEURS[rythme.statut]">{{ message }}</p>
  </section>
</template>
