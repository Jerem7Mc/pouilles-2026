<script setup lang="ts">
import BandeauBudget from './BandeauBudget.vue'
import ListeDepenses from './ListeDepenses.vue'
import ListeEnveloppes from './ListeEnveloppes.vue'
import SaisieDepense from './SaisieDepense.vue'
import { useDepenses } from './useDepenses'

const { erreurStockage } = useDepenses()
</script>

<template>
  <!--
    Ordre voulu : ce qu'on lit d'abord en haut, ce qu'on touche en bas. Le pavé
    de saisie est le dernier enfant pour que son `position: sticky` le maintienne
    épinglé au-dessus de la barre d'onglets pendant tout le défilement.
  -->
  <div>
    <p
      v-if="erreurStockage"
      role="alert"
      class="mt-3 rounded-xl bg-alerte px-3 py-2 text-sm font-semibold text-white"
    >
      {{ erreurStockage }}
    </p>

    <BandeauBudget />
    <ListeEnveloppes />
    <ListeDepenses />
    <SaisieDepense />
  </div>
</template>
