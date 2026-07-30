import { describe, expect, it } from 'vitest'
import { JOURS } from '../../partage/voyage'
import { ETAPES } from './etapes'
import { LIEUX, lienCarte } from './lieux'

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

describe('lienCarte', () => {
  it('envoie l’adresse en texte quand la position n’est qu’au niveau de la rue', () => {
    const coop = LIEUX.find((element) => element.nom === 'Coop')
    expect(coop?.precision).toBe('rue')
    expect(lienCarte(coop!)).toBe('https://maps.apple.com/?q=Via%20Giulio%20Petroni%2022%2C%20Bari')
  })

  it('envoie les coordonnées quand la position est exacte', () => {
    const conad = LIEUX.find((element) => element.nom === 'Conad City')
    expect(conad?.precision).toBe('poi')
    expect(lienCarte(conad!)).toBe('https://maps.apple.com/?ll=40.35255,18.18231&q=Conad%20City')
  })
})
