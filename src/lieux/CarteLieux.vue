<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import Icone from '../partage/Icone.vue'
import { LIBELLES_TYPE } from './donnees/lieux'
import type { Lieu, TypeLieu } from './donnees/lieux'
import type { Etape } from './donnees/etapes'

const props = defineProps<{ lieux: readonly Lieu[]; etapes: readonly Etape[] }>()

const conteneur = ref<HTMLElement | null>(null)
const carte = shallowRef<L.Map | null>(null)
const couche = shallowRef<L.MarkerClusterGroup | null>(null)

/**
 * Les tuiles OpenStreetMap exigent le réseau, et leur politique d'usage
 * interdit le téléchargement massif préventif : impossible de les précharger
 * pour le hors-ligne. Sans réseau, on bascule sur la carte en image.
 */
const enLigne = ref(navigator.onLine)
function suitReseau() {
  enLigne.value = navigator.onLine
}

/** Couleurs alignées sur le thème, une par type de lieu. */
const COULEURS: Record<TypeLieu, string> = {
  hebergement: '#c2410c',
  supermarche: '#0e7490',
  glacier: '#7c3aed',
  manger: '#4d7c0f',
}

/**
 * Pastilles dessinées en HTML plutôt qu'avec les images PNG par défaut de
 * Leaflet : pas d'asset à résoudre par le bundler, et un glyphe d'icône serait
 * illisible à cette taille de toute façon. La légende porte les icônes.
 */
function pastille(couleur: string, rayon = 13) {
  return L.divIcon({
    className: '',
    html: `<span style="display:block;width:${rayon * 2}px;height:${rayon * 2}px;border-radius:9999px;background:${couleur};border:3px solid #faf7f2;box-shadow:0 1px 4px rgba(0,0,0,.4)"></span>`,
    iconSize: [rayon * 2, rayon * 2],
    iconAnchor: [rayon, rayon],
  })
}

/**
 * Sans regroupement, les sept adresses de Bari se superposaient en un seul
 * point : la carte affichait 2 pastilles pour 8 lieux. Le compteur indique
 * combien de lieux sont empilés, un appui les sépare.
 */
function pastilleGroupe(groupe: L.MarkerCluster) {
  const nombre = groupe.getChildCount()
  const taille = nombre < 10 ? 34 : 40
  return L.divIcon({
    className: '',
    html: `<span style="display:flex;align-items:center;justify-content:center;width:${taille}px;height:${taille}px;border-radius:9999px;background:#1c1917;color:#faf7f2;border:3px solid #faf7f2;box-shadow:0 1px 4px rgba(0,0,0,.4);font:600 14px/1 -apple-system,system-ui,sans-serif">${nombre}</span>`,
    iconSize: [taille, taille],
    iconAnchor: [taille / 2, taille / 2],
  })
}

function dessine() {
  const instance = carte.value
  const groupe = couche.value
  if (!instance || !groupe) return

  groupe.clearLayers()
  const points: L.LatLngExpression[] = []

  for (const etape of props.etapes) {
    L.marker([etape.lat, etape.lon], { icon: pastille('#1c1917', 9) })
      .bindPopup(`<strong>${etape.ville}</strong><br>Étape du voyage`)
      .addTo(groupe)
    points.push([etape.lat, etape.lon])
  }

  for (const lieu of props.lieux) {
    L.marker([lieu.lat, lieu.lon], { icon: pastille(COULEURS[lieu.type]) })
      .bindPopup(
        `<strong>${lieu.nom}</strong><br>${LIBELLES_TYPE[lieu.type].label}<br>${lieu.adresse}`,
      )
      .addTo(groupe)
    points.push([lieu.lat, lieu.lon])
  }

  if (points.length > 0) {
    instance.fitBounds(L.latLngBounds(points).pad(0.25), { maxZoom: 15, animate: false })
  }
}

function monte() {
  if (!conteneur.value || carte.value) return

  const instance = L.map(conteneur.value, { attributionControl: true, zoomControl: true })
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
  }).addTo(instance)

  carte.value = instance
  couche.value = L.markerClusterGroup({
    iconCreateFunction: pastilleGroupe,
    maxClusterRadius: 34,
    showCoverageOnHover: false,
    spiderfyDistanceMultiplier: 1.6,
  }).addTo(instance)
  instance.setView([40.8, 17.2], 8)
  dessine()
}

onMounted(() => {
  window.addEventListener('online', suitReseau)
  window.addEventListener('offline', suitReseau)
  if (enLigne.value) monte()
})

onBeforeUnmount(() => {
  window.removeEventListener('online', suitReseau)
  window.removeEventListener('offline', suitReseau)
  carte.value?.remove()
  carte.value = null
})

// Le retour du réseau doit faire apparaître la carte sans rechargement.
watch(enLigne, (actif) => {
  if (actif) requestAnimationFrame(monte)
})

watch(() => [props.lieux, props.etapes], dessine, { deep: false })
</script>

<template>
  <figure class="overflow-hidden rounded-2xl bg-white shadow-sm">
    <div
      v-if="enLigne"
      ref="conteneur"
      class="h-72 w-full"
      role="application"
      aria-label="Carte des lieux du voyage"
    />

    <template v-else>
      <img
        src="/carte-toursitique-pouilles.jpg"
        alt="Carte touristique des Pouilles situant Bari, Trani, Polignano a Mare, Monopoli, Alberobello, Ostuni, Matera, Lecce, Gallipoli et Otrante"
        class="w-full"
        width="800"
        height="813"
      />
      <figcaption class="flex items-center gap-2 px-3 pt-3 text-xs text-encre-doux">
        <Icone nom="horsLigne" :taille="14" />
        Hors-ligne : carte interactive indisponible, voici la carte préchargée.
      </figcaption>
    </template>

    <ul class="flex flex-wrap gap-x-3 gap-y-1 p-3 text-xs text-encre-doux">
      <li v-for="(valeur, type) in LIBELLES_TYPE" :key="type" class="flex items-center gap-1">
        <span
          class="size-2.5 shrink-0 rounded-full"
          :style="{ backgroundColor: COULEURS[type] }"
          aria-hidden="true"
        />
        <Icone :nom="valeur.icone" :taille="13" />
        {{ valeur.label }}
      </li>
      <li class="flex items-center gap-1">
        <span class="size-2.5 shrink-0 rounded-full bg-encre" aria-hidden="true" />
        Étapes
      </li>
    </ul>
  </figure>
</template>
