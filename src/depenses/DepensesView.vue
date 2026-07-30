<script setup lang="ts">
import BandeauBudget from './BandeauBudget.vue'
import ListeDepenses from './ListeDepenses.vue'
import ListeEnveloppes from './ListeEnveloppes.vue'
import SaisieDepense from './SaisieDepense.vue'
import { useDepenses } from './useDepenses'

const { erreurStockage } = useDepenses()
</script>

<template>
  <div class="space-y-4">
    <p
      v-if="erreurStockage"
      role="alert"
      class="rounded-xl bg-alerte px-3 py-2 text-sm font-medium text-white"
    >
      {{ erreurStockage }}
    </p>
    <SaisieDepense />
    <BandeauBudget />
    <ListeEnveloppes />
    <ListeDepenses />
  </div>
</template>
