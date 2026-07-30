import { describe, expect, it } from 'vitest'
import {
  DERNIER_JOUR,
  JOURS,
  NOMBRE_JOURS,
  PREMIER_JOUR,
  ajouteJours,
  ecartJours,
  isoDuJour,
  jourActif,
  libelleJour,
  libelleJourCourt,
  numeroJour,
  position,
} from './voyage'

describe('calendrier du voyage', () => {
  it('couvre 11 journées du 24/08 au 03/09', () => {
    expect(NOMBRE_JOURS).toBe(11)
    expect(JOURS[0]).toBe(PREMIER_JOUR)
    expect(JOURS.at(-1)).toBe(DERNIER_JOUR)
  })

  it('enchaîne les dates sans trou ni doublon', () => {
    expect(new Set(JOURS).size).toBe(NOMBRE_JOURS)
    for (let i = 1; i < JOURS.length; i++) {
      expect(ecartJours(JOURS[i - 1], JOURS[i])).toBe(1)
    }
  })

  it('franchit correctement la fin du mois', () => {
    expect(ajouteJours('2026-08-31', 1)).toBe('2026-09-01')
    expect(ajouteJours('2026-09-01', -1)).toBe('2026-08-31')
    expect(JOURS).toContain('2026-08-31')
    expect(JOURS).toContain('2026-09-01')
  })
})

describe('numeroJour', () => {
  it('numérote de 1 à 11', () => {
    expect(numeroJour('2026-08-24')).toBe(1)
    expect(numeroJour('2026-08-31')).toBe(8)
    expect(numeroJour('2026-09-03')).toBe(11)
  })

  it('renvoie null hors du voyage', () => {
    expect(numeroJour('2026-08-23')).toBeNull()
    expect(numeroJour('2026-09-04')).toBeNull()
  })
})

describe('jourActif', () => {
  it('renvoie la journée en cours pendant le voyage', () => {
    expect(jourActif(new Date(2026, 7, 27, 14))).toBe('2026-08-27')
  })

  it('fonctionne le premier et le dernier jour', () => {
    expect(jourActif(new Date(2026, 7, 24, 8))).toBe('2026-08-24')
    expect(jourActif(new Date(2026, 8, 3, 23, 59))).toBe('2026-09-03')
  })

  it('renvoie null avant et après le voyage', () => {
    expect(jourActif(new Date(2026, 6, 30, 12))).toBeNull()
    expect(jourActif(new Date(2026, 7, 23, 23, 59))).toBeNull()
    expect(jourActif(new Date(2026, 8, 4, 0, 1))).toBeNull()
  })
})

describe('isoDuJour', () => {
  it('utilise la date locale, pas la date UTC', () => {
    // 23 h locales : un passage par toISOString basculerait au lendemain
    // pour tout fuseau à l'est de Greenwich.
    const soir = new Date(2026, 7, 24, 23, 30)
    expect(isoDuJour(soir)).toBe('2026-08-24')
  })

  it('complète les mois et jours sur deux chiffres', () => {
    expect(isoDuJour(new Date(2026, 0, 5, 12))).toBe('2026-01-05')
  })
})

describe('libellés', () => {
  it('affiche le jour en français avec une majuscule', () => {
    expect(libelleJour('2026-08-24')).toBe('Lundi 24 août')
    expect(libelleJour('2026-09-03')).toBe('Jeudi 3 septembre')
  })

  it('propose une version courte pour les onglets de jour', () => {
    expect(libelleJourCourt('2026-08-24')).toBe('Lun. 24')
  })
})

describe('position', () => {
  it('situe une date par rapport au voyage', () => {
    expect(position('2026-07-30')).toBe('avant')
    expect(position('2026-08-24')).toBe('pendant')
    expect(position('2026-08-29')).toBe('pendant')
    expect(position('2026-09-03')).toBe('pendant')
    expect(position('2026-09-10')).toBe('apres')
  })
})
