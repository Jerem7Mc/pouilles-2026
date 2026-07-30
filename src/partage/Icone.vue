<script setup lang="ts">
import { computed } from 'vue'
import { ICONES } from './icones'
import type { NomIcone } from './icones'

const props = withDefaults(defineProps<{ nom: NomIcone; taille?: number }>(), { taille: 20 })

const composant = computed(() => ICONES[props.nom])
</script>

<template>
  <!-- aria-hidden par défaut : l'icône double toujours un libellé texte visible.
       Les rares cas sans texte passent un aria-label depuis le parent. -->
  <component
    :is="composant"
    :size="taille"
    :stroke-width="2"
    aria-hidden="true"
    focusable="false"
  />
</template>
