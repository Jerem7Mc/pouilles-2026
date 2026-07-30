import L from 'leaflet'
import { h, render } from 'vue'
import { ICONES } from '../partage/icones'
import { LIBELLES_TYPE } from './donnees/lieux'
import type { TypeLieu } from './donnees/lieux'

/**
 * Une couleur par type de lieu, déclarées dans `style.css`. Les valeurs sont
 * des variables CSS et non des hexadécimaux : la palette reste au même endroit
 * que le reste du thème, et la légende comme les marqueurs lisent la même
 * source.
 */
export const COULEURS: Record<TypeLieu, string> = {
  transport: 'var(--color-carte-transport)',
  site: 'var(--color-carte-site)',
  hebergement: 'var(--color-carte-hebergement)',
  manger: 'var(--color-carte-manger)',
  supermarche: 'var(--color-carte-supermarche)',
  glacier: 'var(--color-carte-glacier)',
}

/**
 * Le glyphe du type, en SVG, calculé une fois par type puis mémorisé.
 *
 * Leaflet attend une chaîne HTML là où le reste de l'app manipule des
 * composants Vue. Plutôt que de recopier les tracés Lucide dans ce fichier, on
 * rend le composant du registre dans un élément détaché et on en récupère le
 * balisage : le registre reste la source unique des icônes.
 */
const glyphes = new Map<TypeLieu, string>()

function glyphe(type: TypeLieu): string {
  const memorise = glyphes.get(type)
  if (memorise !== undefined) return memorise

  const hote = document.createElement('div')
  render(h(ICONES[LIBELLES_TYPE[type].icone], { size: 15, 'stroke-width': 2.75 }), hote)
  const balisage = hote.innerHTML
  render(null, hote)
  glyphes.set(type, balisage)
  return balisage
}

const CADRE = 'border:3px solid var(--color-sable);box-shadow:0 1px 4px rgba(0,0,0,.4)'

/**
 * Marqueur d'un lieu : pastille colorée portant le glyphe de son type.
 *
 * La couleur seule ne suffisait pas. Six teintes à 26 px se confondent deux à
 * deux au soleil, et il fallait ouvrir la bulle pour savoir si un point était
 * une gare ou un supermarché. Le glyphe rend le type lisible sans appui, et
 * garde la carte utilisable pour un œil qui distingue mal les couleurs.
 */
export function pastilleLieu(type: TypeLieu, estCible: boolean): L.DivIcon {
  const taille = estCible ? 34 : 26
  const style = `display:flex;align-items:center;justify-content:center;width:${taille}px;height:${taille}px;border-radius:9999px;background:${COULEURS[type]};color:var(--color-sable);${CADRE}`
  return L.divIcon({
    className: '',
    html: `<span style="${style}">${glyphe(type)}</span>`,
    iconSize: [taille, taille],
    iconAnchor: [taille / 2, taille / 2],
  })
}

/** Étapes du voyage : petits points sombres, sans glyphe, sous les lieux. */
export function pastilleEtape(): L.DivIcon {
  const style = `display:block;width:18px;height:18px;border-radius:9999px;background:var(--color-encre);${CADRE}`
  return L.divIcon({
    className: '',
    html: `<span style="${style}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  })
}

/**
 * Sans regroupement, les sept adresses de Bari se superposaient en un seul
 * point : la carte affichait 2 pastilles pour 8 lieux. Le compteur indique
 * combien de lieux sont empilés, un appui les sépare.
 */
export function pastilleGroupe(groupe: L.MarkerCluster): L.DivIcon {
  const nombre = groupe.getChildCount()
  const taille = nombre < 10 ? 34 : 40
  const style = `display:flex;align-items:center;justify-content:center;width:${taille}px;height:${taille}px;border-radius:9999px;background:var(--color-encre);color:var(--color-sable);${CADRE};font:600 14px/1 var(--font-sans)`
  return L.divIcon({
    className: '',
    html: `<span style="${style}">${nombre}</span>`,
    iconSize: [taille, taille],
    iconAnchor: [taille / 2, taille / 2],
  })
}
