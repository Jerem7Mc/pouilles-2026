<script setup lang="ts">
import { computed, ref } from 'vue'
import Icone from '../partage/Icone.vue'
import { isoDuJour } from '../partage/voyage'
import { useDepenses } from './useDepenses'
import { useReferences } from '../reglages/references'

const { depenses, enveloppes, importer, toutEffacer } = useDepenses()
const { references, importer: importerReferences } = useReferences()

const message = ref('')
const collage = ref('')
const confirmeEffacement = ref(false)

const sauvegarde = computed(() =>
  JSON.stringify(
    {
      version: 2,
      exporteLe: isoDuJour(),
      enveloppes: enveloppes.value,
      references: references.value,
      depenses: depenses.value,
    },
    null,
    2,
  ),
)

function annonce(texte: string) {
  message.value = texte
  window.setTimeout(() => {
    message.value = ''
  }, 3000)
}

async function copie() {
  try {
    await navigator.clipboard.writeText(sauvegarde.value)
    annonce('Sauvegarde copiée dans le presse-papier')
  } catch {
    annonce('Copie refusée par le navigateur, utilise le téléchargement')
  }
}

function telecharge() {
  const blob = new Blob([sauvegarde.value], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const lien = document.createElement('a')
  lien.href = url
  lien.download = `pouilles-${isoDuJour()}.json`
  lien.click()
  URL.revokeObjectURL(url)
}

/** Décrit ce qui a été réinjecté, dépenses et références confondues. */
function bilan(depensesAjoutees: number, referencesAjoutees: number): string {
  const morceaux: string[] = []
  if (depensesAjoutees > 0) {
    morceaux.push(`${depensesAjoutees} dépense${depensesAjoutees > 1 ? 's' : ''}`)
  }
  if (referencesAjoutees > 0) {
    morceaux.push(`${referencesAjoutees} référence${referencesAjoutees > 1 ? 's' : ''}`)
  }
  return morceaux.length === 0
    ? 'Rien à restaurer, tout est déjà présent'
    : `${morceaux.join(' et ')} restaurées`
}

function restaure() {
  try {
    const contenu: unknown = JSON.parse(collage.value)
    const objet =
      typeof contenu === 'object' && contenu !== null ? (contenu as Record<string, unknown>) : null
    const liste = objet && 'depenses' in objet ? objet.depenses : contenu
    if (!Array.isArray(liste)) {
      annonce('Ce contenu ne ressemble pas à une sauvegarde')
      return
    }
    const ajoutees = importer(liste)
    // Les sauvegardes de version 1 n'ont pas de références : absentes, elles
    // ne restaurent rien plutôt que d'échouer.
    const referencesAjoutees = importerReferences(objet?.references)
    collage.value = ''
    annonce(bilan(ajoutees, referencesAjoutees))
  } catch {
    annonce('JSON illisible')
  }
}

function efface() {
  if (!confirmeEffacement.value) {
    confirmeEffacement.value = true
    return
  }
  toutEffacer()
  confirmeEffacement.value = false
  annonce('Toutes les dépenses ont été supprimées')
}
</script>

<template>
  <section class="bloc">
    <p class="micro">Sauvegarde</p>
    <p class="mt-2 text-sm text-encre-doux">
      Les données ne vivent que sur cet appareil. Sauvegarde tous les 2 ou 3 jours, et après la
      journée la plus dépensière. Depuis le téléphone, le plus simple est Copier, puis coller dans
      un mail que tu t’envoies : la restauration se fait par collage, alors qu’un fichier téléchargé
      oblige à l’ouvrir et à tout recopier.
    </p>

    <div class="mt-3 flex gap-2">
      <button
        type="button"
        class="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-terre text-sm font-semibold text-white"
        @click="copie()"
      >
        <Icone nom="copier" :taille="16" />
        Copier
      </button>
      <button
        type="button"
        class="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-white text-sm font-semibold text-encre"
        @click="telecharge()"
      >
        <Icone nom="telecharger" :taille="16" />
        Télécharger
      </button>
    </div>

    <details class="mt-4">
      <summary class="cursor-pointer text-sm font-semibold text-mer">
        Restaurer une sauvegarde
      </summary>
      <textarea
        v-model="collage"
        rows="4"
        placeholder="Colle ici le contenu d’une sauvegarde"
        aria-label="Contenu d’une sauvegarde à restaurer"
        class="mt-2 w-full rounded-xl bg-white p-2 font-mono text-xs outline-none focus:ring-2 focus:ring-terre/40"
      />
      <button
        type="button"
        :disabled="collage.trim() === ''"
        class="min-h-11 w-full rounded-xl bg-mer text-sm font-semibold text-white disabled:opacity-40"
        @click="restaure()"
      >
        Restaurer
      </button>
      <p class="mt-1 text-xs text-encre-doux">
        La restauration ajoute ce qui manque, sans écraser ni dupliquer l’existant.
      </p>
    </details>

    <button
      type="button"
      class="mt-4 min-h-11 w-full rounded-xl text-sm font-semibold"
      :class="confirmeEffacement ? 'bg-alerte text-white' : 'bg-white text-alerte'"
      @click="efface()"
    >
      {{ confirmeEffacement ? 'Confirmer : tout supprimer' : 'Effacer toutes les dépenses' }}
    </button>

    <p v-if="message" role="status" class="mt-3 text-sm font-semibold text-olive">{{ message }}</p>
  </section>
</template>
