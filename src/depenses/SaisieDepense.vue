<script setup lang="ts">
import { computed, ref } from 'vue'
import Icone from '../partage/Icone.vue'
import { parseMontant } from '../partage/monnaie'
import { JOURS, jourActif, libelleJour, libelleJourCourt } from '../partage/voyage'
import { CATEGORIES } from './categories'
import type { CategorieId } from './types'
import { useDepenses } from './useDepenses'

const { ajouter } = useDepenses()

const saisie = ref('')
const libelle = ref('')
const confirmation = ref('')
const detailOuvert = ref(false)

// Hors voyage, on retombe sur le premier jour pour que les essais avant le
// départ n'atterrissent pas sur une date absente du carnet de route.
const date = ref(jourActif() ?? JOURS[0])

const centimes = computed(() => parseMontant(saisie.value))
const pret = computed(() => centimes.value !== null)

function enregistre(categorie: CategorieId) {
  const montant = centimes.value
  if (montant === null) return

  ajouter({ categorie, centimes: montant, libelle: libelle.value, date: date.value })
  confirmation.value = `${CATEGORIES.find((c) => c.id === categorie)?.label} · enregistré`
  saisie.value = ''
  libelle.value = ''
  detailOuvert.value = false
  window.setTimeout(() => {
    confirmation.value = ''
  }, 1800)
}
</script>

<template>
  <!--
    Pavé collé au-dessus de la barre d'onglets : montant et catégories sont
    dans la zone du pouce, atteignables à une main sans changer de prise.
  -->
  <section
    class="pave-pouce -mx-4 border-t border-sable-fonce bg-sable/95 px-4 pb-3 pt-2.5 backdrop-blur"
    aria-label="Saisir une dépense"
  >
    <div class="flex items-baseline gap-1">
      <!--
        Champ de largeur fixe et texte aligné à droite : les chiffres viennent
        toucher le symbole euro, comme sur une calculatrice. En alignement à
        gauche, le € se retrouvait à 60 px des chiffres sur un montant court.
        Largeur calée sur le plafond de saisie, 1000,00, en tabular-nums.
      -->
      <input
        v-model="saisie"
        type="text"
        inputmode="decimal"
        enterkeyhint="done"
        placeholder="0,00"
        aria-label="Montant de la dépense en euros"
        class="w-32 min-w-0 bg-transparent text-right text-3xl font-bold tabular-nums outline-none placeholder:text-encre-doux/30"
      />
      <span class="text-xl font-bold text-encre-doux">€</span>
      <button
        type="button"
        class="ml-auto flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-bold text-encre-doux"
        :aria-expanded="detailOuvert"
        @click="detailOuvert = !detailOuvert"
      >
        {{ libelleJourCourt(date) }}
        <span v-if="libelle" class="text-terre" aria-label="libellé renseigné">·</span>
      </button>
    </div>

    <!-- Libellé et date : repliés par défaut, ils ne doivent pas coûter un
         geste dans le cas courant où l'on saisit juste un montant. -->
    <div v-if="detailOuvert" class="mt-2 flex gap-2">
      <input
        v-model="libelle"
        type="text"
        maxlength="60"
        placeholder="Libellé (facultatif)"
        aria-label="Libellé de la dépense, facultatif"
        class="min-w-0 flex-1 rounded-xl bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-terre/40"
      />
      <select
        v-model="date"
        aria-label="Jour de la dépense"
        class="min-h-11 rounded-xl bg-white px-2 text-sm font-semibold"
      >
        <option v-for="jour in JOURS" :key="jour" :value="jour">{{ libelleJour(jour) }}</option>
      </select>
    </div>

    <!-- Les sept catégories tiennent sur une seule ligne : aucun défilement
         horizontal, donc aucune option cachée au moment de valider. -->
    <div class="mt-2.5 grid grid-cols-7 gap-1">
      <button
        v-for="categorie in CATEGORIES"
        :key="categorie.id"
        type="button"
        :disabled="!pret"
        class="flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-lg px-0.5 pb-1 pt-1.5 transition active:scale-95 disabled:opacity-40"
        :class="pret ? 'bg-terre text-white' : 'bg-white text-encre-doux'"
        :title="categorie.label"
        @click="enregistre(categorie.id)"
      >
        <Icone :nom="categorie.icone" :taille="18" />
        <span class="text-[0.55rem] font-bold leading-none tracking-tight">
          {{ categorie.court }}
        </span>
      </button>
    </div>

    <p
      class="mt-1.5 h-4 text-xs font-bold"
      :class="confirmation ? 'text-olive' : 'text-encre-doux'"
      role="status"
    >
      {{ confirmation || (pret ? 'Touche une catégorie pour enregistrer' : '') }}
    </p>
  </section>
</template>
