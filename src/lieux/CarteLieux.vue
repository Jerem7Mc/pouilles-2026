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

const props = defineProps<{
  lieux: readonly Lieu[]
  etapes: readonly Etape[]
  /** Lieu à centrer et dont la bulle s'ouvre, quand on arrive depuis le journal. */
  focus?: Lieu | null
}>()

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

/**
 * Une couleur par type de lieu. Le transport et les sites reçoivent les deux
 * teintes les plus saturées : ce sont eux qu'on cherche sur la carte le matin.
 */
const COULEURS: Record<TypeLieu, string> = {
  transport: '#1d4ed8',
  site: '#c2410c',
  hebergement: '#7c3aed',
  manger: '#4d7c0f',
  supermarche: '#0e7490',
  glacier: '#be185d',
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

/** Étapes du voyage : petits points sombres, sous les lieux dans l'empilement. */
function ajouteEtapes(groupe: L.MarkerClusterGroup, points: L.LatLngExpression[]) {
  for (const etape of props.etapes) {
    L.marker([etape.lat, etape.lon], { icon: pastille('#1c1917', 9) })
      .bindPopup(`<strong>${etape.ville}</strong><br>Étape du voyage`)
      .addTo(groupe)
    points.push([etape.lat, etape.lon])
  }
}

/** Ajoute les lieux et renvoie le marqueur ciblé, s'il y en a un. */
function ajouteLieux(groupe: L.MarkerClusterGroup, points: L.LatLngExpression[]): L.Marker | null {
  let marqueurCible: L.Marker | null = null

  for (const lieu of props.lieux) {
    const estCible = lieu.id === props.focus?.id
    const marqueur = L.marker([lieu.lat, lieu.lon], {
      icon: pastille(COULEURS[lieu.type], estCible ? 17 : 13),
      zIndexOffset: estCible ? 1000 : 0,
    })
      .bindPopup(
        `<strong>${lieu.nom}</strong><br>${LIBELLES_TYPE[lieu.type].label}<br>${lieu.adresse}`,
      )
      .addTo(groupe)
    if (estCible) marqueurCible = marqueur
    points.push([lieu.lat, lieu.lon])
  }

  return marqueurCible
}

function dessine() {
  const instance = carte.value
  const groupe = couche.value
  if (!instance || !groupe) return

  groupe.clearLayers()
  const points: L.LatLngExpression[] = []
  ajouteEtapes(groupe, points)
  const marqueurCible = ajouteLieux(groupe, points)

  // Arrivée depuis le journal : on zoome sur le point demandé plutôt que de
  // cadrer sur l'ensemble, et on ouvre sa bulle pour qu'il soit identifiable.
  if (marqueurCible) {
    instance.setView(marqueurCible.getLatLng(), 16, { animate: false })
    groupe.zoomToShowLayer(marqueurCible, () => marqueurCible.openPopup())
    return
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

watch(() => [props.lieux, props.etapes, props.focus], dessine, { deep: false })
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
        {{ valeur.court }}
      </li>
      <li class="flex items-center gap-1">
        <span class="size-2.5 shrink-0 rounded-full bg-encre" aria-hidden="true" />
        Étapes
      </li>
    </ul>
  </figure>
</template>
