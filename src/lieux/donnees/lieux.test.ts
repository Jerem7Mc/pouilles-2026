import { describe, expect, it } from 'vitest'
import { JOURS } from '../../partage/voyage'
import { ICONES } from '../../partage/icones'
import { ETAPES } from './etapes'
import { LIBELLES_TYPE, LIEUX, lienCarte } from './lieux'
import type { TypeLieu } from './lieux'

/** Boîte englobante Pouilles et Basilicate, large mais suffisante pour piéger une inversion. */
const ZONE = { latMin: 39.7, latMax: 41.4, lonMin: 16.3, lonMax: 18.6 }

describe('coordonnées des lieux', () => {
  it('tombent toutes dans la zone du voyage', () => {
    for (const lieu of LIEUX) {
      expect(lieu.lat, `${lieu.nom} latitude`).toBeGreaterThan(ZONE.latMin)
      expect(lieu.lat, `${lieu.nom} latitude`).toBeLessThan(ZONE.latMax)
      expect(lieu.lon, `${lieu.nom} longitude`).toBeGreaterThan(ZONE.lonMin)
      expect(lieu.lon, `${lieu.nom} longitude`).toBeLessThan(ZONE.lonMax)
    }
  })

  it('ne sont jamais inversées, la latitude reste supérieure à la longitude ici', () => {
    // Dans les Pouilles, latitude ~40 et longitude ~17 : une inversion se voit.
    for (const lieu of LIEUX) {
      expect(lieu.lat, `${lieu.nom}`).toBeGreaterThan(lieu.lon - 30)
    }
  })

  it('ne contient aucun doublon de position exacte', () => {
    const positions = LIEUX.map((lieu) => `${lieu.lat},${lieu.lon}`)
    expect(new Set(positions).size).toBe(positions.length)
  })
})

describe('rattachement aux journées', () => {
  it('ne référence que des dates du voyage', () => {
    for (const lieu of LIEUX) {
      expect(lieu.jours.length, `${lieu.nom} sans journée`).toBeGreaterThan(0)
      for (const jour of lieu.jours) {
        expect(JOURS, `${lieu.nom} référence ${jour}`).toContain(jour)
      }
    }
  })

  it('laisse chaque journée du voyage avec au moins un lieu', () => {
    for (const jour of JOURS) {
      const trouves = LIEUX.filter((lieu) => lieu.jours.includes(jour))
      expect(trouves.length, `aucun lieu pour le ${jour}`).toBeGreaterThan(0)
    }
  })
})

describe('étapes', () => {
  it('couvrent les 11 journées dans l’ordre', () => {
    expect(ETAPES.map((etape) => etape.date)).toEqual([...JOURS])
  })

  it('sont dans la zone du voyage', () => {
    for (const etape of ETAPES) {
      expect(etape.lat, etape.ville).toBeGreaterThan(ZONE.latMin)
      expect(etape.lat, etape.ville).toBeLessThan(ZONE.latMax)
      expect(etape.lon, etape.ville).toBeGreaterThan(ZONE.lonMin)
      expect(etape.lon, etape.ville).toBeLessThan(ZONE.lonMax)
    }
  })

  it('commencent et finissent à Bari', () => {
    expect(ETAPES[0].ville).toBe('Bari')
    expect(ETAPES.at(-1)?.ville).toBe('Bari')
  })
})

describe('supermarchés de Bari', () => {
  /** Distance en mètres entre deux positions, formule de haversine. */
  function metres(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
    const rad = (angle: number) => (angle * Math.PI) / 180
    const dLat = rad(b.lat - a.lat)
    const dLon = rad(b.lon - a.lon)
    const x =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2
    return 2 * 6_371_000 * Math.asin(Math.sqrt(x))
  }

  it('garde un supermarché à moins de 300 m du logement de Bari', () => {
    // Le logement a changé de quartier une fois, et chaque déménagement périme
    // les distances écrites dans les notes. Ce test échoue si le prochain
    // changement laisse le voyageur sans commerce à portée de pied.
    const logement = LIEUX.find((lieu) => lieu.id === 'the-queen-room-bari')!
    const courses = LIEUX.filter((lieu) => lieu.type === 'supermarche' && lieu.ville === 'Bari')
    const plusProche = Math.min(...courses.map((lieu) => metres(logement, lieu)))
    expect(plusProche).toBeLessThan(300)
  })
})

describe('légende de la carte', () => {
  it('donne une icône à chacun des six types, sans quoi un marqueur serait vide', () => {
    // Le marqueur porte désormais le glyphe du type : un type sans icône
    // produirait une pastille muette, exactement le défaut qu'on corrige.
    for (const type of Object.keys(LIBELLES_TYPE) as TypeLieu[]) {
      expect(LIBELLES_TYPE[type].icone, type).toBeTruthy()
      expect(ICONES[LIBELLES_TYPE[type].icone], type).toBeDefined()
    }
  })
})

describe('lienCarte', () => {
  it('envoie l’adresse en texte quand la position n’est qu’au niveau de la rue', () => {
    const famila = LIEUX.find((element) => element.nom === 'Famila')
    expect(famila?.precision).toBe('rue')
    expect(lienCarte(famila!)).toBe(
      'https://maps.apple.com/?q=Corso%20Benedetto%20Croce%20150%2C%20Bari',
    )
  })

  it('envoie les coordonnées quand la position est exacte', () => {
    const conad = LIEUX.find((element) => element.nom === 'Conad City')
    expect(conad?.precision).toBe('poi')
    expect(lienCarte(conad!)).toBe('https://maps.apple.com/?ll=40.35255,18.18231&q=Conad%20City')
  })
})
