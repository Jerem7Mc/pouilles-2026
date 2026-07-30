import { describe, expect, it } from 'vitest'
import { JOURS } from '../../partage/voyage'
import { ITINERAIRE } from './itineraire'

describe('itinéraire', () => {
  it('couvre exactement les 11 journées du voyage, dans l’ordre', () => {
    expect(ITINERAIRE.map((jour) => jour.date)).toEqual([...JOURS])
  })

  it('reproduit le total de transport du plan : 116,40 €', () => {
    const total = ITINERAIRE.reduce((somme, jour) => somme + jour.transportPrevu, 0)
    expect(total).toBe(11_640)
  })

  it('reproduit le total nourriture du plan : 151,00 €', () => {
    const total = ITINERAIRE.reduce((somme, jour) => somme + jour.repasPrevu, 0)
    expect(total).toBe(15_100)
  })

  it('n’a aucune journée incomplète', () => {
    for (const jour of ITINERAIRE) {
      expect(jour.titre.length).toBeGreaterThan(0)
      expect(jour.aFaire.length).toBeGreaterThan(0)
      expect(jour.transport.length).toBeGreaterThan(0)
      expect(jour.ouManger.length).toBeGreaterThan(0)
      expect(jour.transportPrevu).toBeGreaterThan(0)
      expect(jour.repasPrevu).toBeGreaterThan(0)
    }
  })

  it('bascule de base à Bari puis Lecce, sans retour en arrière', () => {
    const bases = ITINERAIRE.map((jour) => jour.base)
    expect(bases.filter((base) => base === 'Bari')).toHaveLength(6)
    expect(bases.filter((base) => base === 'Lecce')).toHaveLength(5)
    expect(bases.indexOf('Lecce')).toBe(6)
    expect(bases.lastIndexOf('Bari')).toBe(5)
  })
})
