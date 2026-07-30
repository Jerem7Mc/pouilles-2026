/**
 * Génère les icônes PNG de la PWA sans aucune dépendance externe.
 *
 * Motif : silhouette de l'Italie remplie du drapeau tricolore sur fond sombre.
 * Le tracé ci-dessous est notre propre approximation géographique (coordonnées
 * saisies à la main depuis les longitudes et latitudes réelles), pas un fichier
 * repris ailleurs.
 *
 * Aucun rasteriseur SVG n'étant disponible, le remplissage de polygone est fait
 * ici : test d'appartenance par lancer de rayon, avec suréchantillonnage pour
 * lisser les bords.
 *
 * Usage : node scripts/generer-icones.mjs public
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

// --- Encodeur PNG minimal (RGB 8 bits, sans transparence) -------------------

const CRC_TABLE = (() => {
  const table = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    table[n] = c
  }
  return table
})()

function crc32(buffer) {
  let c = -1
  for (let i = 0; i < buffer.length; i++) c = CRC_TABLE[(c ^ buffer[i]) & 0xff] ^ (c >>> 8)
  return (c ^ -1) >>> 0
}

function chunk(type, data) {
  const longueur = Buffer.alloc(4)
  longueur.writeUInt32BE(data.length)
  const corps = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(corps))
  return Buffer.concat([longueur, corps, crc])
}

function encodePng(taille, rgb) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(taille, 0)
  ihdr.writeUInt32BE(taille, 4)
  ihdr[8] = 8 // 8 bits par canal
  ihdr[9] = 2 // type couleur RGB
  const brut = Buffer.alloc(taille * (1 + taille * 3))
  for (let y = 0; y < taille; y++) {
    const ligne = y * (1 + taille * 3)
    brut[ligne] = 0 // filtre None
    rgb.copy(brut, ligne + 1, y * taille * 3, (y + 1) * taille * 3)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(brut, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// --- Géographie -------------------------------------------------------------

// Repère de travail : x croît vers l'est, y croît vers le sud.
// x = (longitude - 6) / 13 * 100    et    y = (47.5 - latitude) / 12 * 100
const CONTINENT = [
  [12.3, 30.8], // Vintimille, frontière française
  [22.3, 25.8], // Gênes
  [30.0, 28.3], // La Spezia
  [33.1, 33.3], // Livourne
  [44.6, 45.0], // Civitavecchia
  [48.5, 47.5], // littoral romain
  [58.5, 52.5], // Gaète
  [63.1, 55.4], // Naples
  [67.7, 57.5], // Salerne
  [73.8, 62.5], // golfe de Policastro
  [76.2, 73.3], // Tropea
  [76.2, 77.5], // côte tyrrhénienne calabraise
  [74.2, 79.6], // Reggio de Calabre, pointe de la botte
  [81.5, 72.5], // Catanzaro
  [85.4, 70.0], // Crotone
  [80.8, 65.0], // Sibari
  [83.8, 59.2], // fond du golfe de Tarente
  [86.2, 58.3], // Tarente
  [92.3, 62.1], // Gallipoli
  [95.4, 64.2], // Santa Maria di Leuca, pointe du talon
  [96.2, 61.7], // Otrante
  [91.5, 57.5], // Brindisi
  [83.8, 53.3], // Bari
  [79.2, 51.7], // Barletta
  [78.5, 46.7], // pointe de l'éperon du Gargano
  [73.8, 46.7], // base du Gargano
  [63.1, 41.7], // Pescara
  [57.7, 32.5], // Ancône
  [48.5, 25.8], // Ravenne
  [49.2, 17.5], // Venise
  [60.0, 15.8], // Trieste
  [59.2, 8.3], // Tarvisio
  [47.7, 3.3], // frontière autrichienne
  [26.9, 8.3], // lac de Côme
  [20.0, 9.2], // frontière suisse
  [6.9, 14.2], // Mont Blanc
  [7.7, 16.7], // arc alpin, Turin au sud
]

const SICILE = [
  [50.0, 79.2], // Trapani
  [73.5, 77.5], // Messine
  [71.5, 87.1], // Syracuse
  [60.0, 89.0], // Licata
  [49.0, 81.0], // Marsala
]

const SARDAIGNE = [
  [24.6, 52.1], // Santa Teresa di Gallura
  [27.3, 55.0], // Olbia
  [24.2, 69.2], // Cagliari
  [18.5, 69.6], // sud-ouest
  [19.2, 62.5], // Oristano
  [17.7, 57.5], // Alghero
]

const POLYGONES = [CONTINENT, SICILE, SARDAIGNE]

const FOND = [0x14, 0x12, 0x11]
const VERT = [0x00, 0x8c, 0x45]
const BLANC = [0xf7, 0xf4, 0xef]
const ROUGE = [0xcd, 0x21, 0x2a]

/** Test d'appartenance par lancer de rayon horizontal. */
function dansPolygone(x, y, sommets) {
  let dedans = false
  for (let i = 0, j = sommets.length - 1; i < sommets.length; j = i++) {
    const [xi, yi] = sommets[i]
    const [xj, yj] = sommets[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) dedans = !dedans
  }
  return dedans
}

function boiteEnglobante() {
  let xMin = Infinity
  let xMax = -Infinity
  let yMin = Infinity
  let yMax = -Infinity
  for (const polygone of POLYGONES) {
    for (const [x, y] of polygone) {
      if (x < xMin) xMin = x
      if (x > xMax) xMax = x
      if (y < yMin) yMin = y
      if (y > yMax) yMax = y
    }
  }
  return { xMin, xMax, yMin, yMax }
}

const BOITE = boiteEnglobante()
// 78 % du canevas : laisse la marge de sécurité exigée par les icônes maskable.
const OCCUPATION = 0.78
const SUR_ECHANTILLONNAGE = 4

/** Couleur de la bande tricolore à la position x du dessin. */
function bande(x) {
  const part = (x - BOITE.xMin) / (BOITE.xMax - BOITE.xMin)
  if (part < 1 / 3) return VERT
  if (part < 2 / 3) return BLANC
  return ROUGE
}

function dessine(taille) {
  const largeurDessin = BOITE.xMax - BOITE.xMin
  const hauteurDessin = BOITE.yMax - BOITE.yMin
  const echelle = (taille * OCCUPATION) / Math.max(largeurDessin, hauteurDessin)
  const decalageX = (taille - largeurDessin * echelle) / 2 - BOITE.xMin * echelle
  const decalageY = (taille - hauteurDessin * echelle) / 2 - BOITE.yMin * echelle

  const buffer = Buffer.alloc(taille * taille * 3)
  const pas = 1 / SUR_ECHANTILLONNAGE
  const sousPixels = SUR_ECHANTILLONNAGE * SUR_ECHANTILLONNAGE

  for (let py = 0; py < taille; py++) {
    for (let px = 0; px < taille; px++) {
      let couverture = 0
      let sommeR = 0
      let sommeV = 0
      let sommeB = 0

      for (let sy = 0; sy < SUR_ECHANTILLONNAGE; sy++) {
        for (let sx = 0; sx < SUR_ECHANTILLONNAGE; sx++) {
          const x = (px + (sx + 0.5) * pas - decalageX) / echelle
          const y = (py + (sy + 0.5) * pas - decalageY) / echelle
          if (POLYGONES.some((polygone) => dansPolygone(x, y, polygone))) {
            const couleur = bande(x)
            couverture++
            sommeR += couleur[0]
            sommeV += couleur[1]
            sommeB += couleur[2]
          }
        }
      }

      const i = (py * taille + px) * 3
      if (couverture === 0) {
        buffer[i] = FOND[0]
        buffer[i + 1] = FOND[1]
        buffer[i + 2] = FOND[2]
      } else {
        const alpha = couverture / sousPixels
        buffer[i] = Math.round((sommeR / couverture) * alpha + FOND[0] * (1 - alpha))
        buffer[i + 1] = Math.round((sommeV / couverture) * alpha + FOND[1] * (1 - alpha))
        buffer[i + 2] = Math.round((sommeB / couverture) * alpha + FOND[2] * (1 - alpha))
      }
    }
  }
  return encodePng(taille, buffer)
}

/** Favicon vectoriel, tiré des mêmes coordonnées que les PNG. */
function dessineSvg() {
  const hex = (c) => `#${c.map((n) => n.toString(16).padStart(2, '0')).join('')}`
  const chemin = (polygone) => polygone.map(([x, y]) => `${x},${y}`).join(' ')
  const tiers = (BOITE.xMax - BOITE.xMin) / 3
  const bandes = [
    [BOITE.xMin, tiers, VERT],
    [BOITE.xMin + tiers, tiers, BLANC],
    [BOITE.xMin + 2 * tiers, tiers + 1, ROUGE],
  ]
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="${hex(FOND)}" />
  <clipPath id="italie">
${POLYGONES.map((p) => `    <polygon points="${chemin(p)}" />`).join('\n')}
  </clipPath>
  <g clip-path="url(#italie)">
${bandes
  .map(([x, l, c]) => `    <rect x="${x}" y="0" width="${l}" height="100" fill="${hex(c)}" />`)
  .join('\n')}
  </g>
</svg>
`
}

const cible = process.argv[2]
if (!cible) throw new Error('Usage : node scripts/generer-icones.mjs <dossier public>')

writeFileSync(resolve(cible, 'favicon.svg'), dessineSvg())
console.log('écrit', resolve(cible, 'favicon.svg'))

for (const [nom, taille] of [
  ['pwa-192.png', 192],
  ['pwa-512.png', 512],
  ['apple-touch-icon.png', 180],
]) {
  const chemin = resolve(cible, nom)
  mkdirSync(dirname(chemin), { recursive: true })
  writeFileSync(chemin, dessine(taille))
  console.log('écrit', chemin)
}
