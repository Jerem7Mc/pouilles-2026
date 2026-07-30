import { describe, expect, it } from 'vitest'
import { enveloppesParDefaut } from './categories'
import {
  estDepenseValide,
  etatEnveloppes,
  rythme,
  total,
  totalEnveloppes,
  totalParCategorie,
  totalParDate,
} from './calculs'
import type { CategorieId, Depense } from './types'

function depense(
  centimes: number,
  categorie: CategorieId = 'repas',
  date = '2026-08-24',
  libelle = '',
): Depense {
  return { id: `${date}-${categorie}-${centimes}`, date, categorie, centimes, libelle }
}

describe('enveloppes par défaut', () => {
  it('totalisent 565 €, le budget réaliste retenu', () => {
    // 130 transport + 275 repas + 30 courses + 35 glaces + 45 visites
    // + 40 souvenirs + 10 divers. Les repas ont été relevés à 25 € par jour :
    // le plan d'origine ne comptait que deux repas quotidiens.
    expect(totalEnveloppes(enveloppesParDefaut())).toBe(56_500)
  })

  it('accordent aux repas la plus grosse enveloppe', () => {
    const defauts = enveloppesParDefaut()
    const maximum = Math.max(...Object.values(defauts))
    expect(defauts.repas).toBe(maximum)
    expect(defauts.repas).toBe(27_500)
  })
})

describe('totaux', () => {
  it('somme les montants', () => {
    expect(total([depense(1250), depense(800)])).toBe(2050)
  })

  it('somme zéro sur une liste vide', () => {
    expect(total([])).toBe(0)
  })

  it('ventile par catégorie en gardant toutes les catégories à zéro', () => {
    const cumul = totalParCategorie([depense(1250, 'repas'), depense(530, 'transport')])
    expect(cumul.repas).toBe(1250)
    expect(cumul.transport).toBe(530)
    expect(cumul.glaces).toBe(0)
  })

  it('ventile par date', () => {
    const cumul = totalParDate([
      depense(600, 'repas', '2026-08-24'),
      depense(530, 'transport', '2026-08-24'),
      depense(1140, 'transport', '2026-08-25'),
    ])
    expect(cumul).toEqual({ '2026-08-24': 1130, '2026-08-25': 1140 })
  })
})

describe('etatEnveloppes', () => {
  const enveloppes = enveloppesParDefaut()

  it('calcule reste et pourcentage par catégorie', () => {
    const lignes = etatEnveloppes([depense(6_500, 'transport')], enveloppes)
    const transport = lignes.find((l) => l.id === 'transport')
    expect(transport).toMatchObject({
      depense: 6_500,
      enveloppe: 13_000,
      reste: 6_500,
      pourcentage: 50,
      depasse: false,
    })
  })

  it('marque le dépassement et un reste négatif', () => {
    const lignes = etatEnveloppes([depense(4_000, 'glaces')], enveloppes)
    const glaces = lignes.find((l) => l.id === 'glaces')
    expect(glaces?.depasse).toBe(true)
    expect(glaces?.reste).toBe(-500)
  })

  it('renvoie une ligne par catégorie, même sans dépense', () => {
    expect(etatEnveloppes([], enveloppes)).toHaveLength(7)
  })
})

describe('rythme', () => {
  const enveloppes = enveloppesParDefaut()

  it('statut « avant » tant que le voyage n’a pas commencé', () => {
    const r = rythme([], enveloppes, '2026-07-30')
    expect(r.statut).toBe('avant')
    expect(r.jour).toBeNull()
  })

  // Les montants sont dérivés du budget courant et non codés en dur : ajuster
  // une enveloppe ne doit pas casser les tests de rythme, seul le test dédié
  // au total des enveloppes a vocation à changer.
  const budget = totalEnveloppes(enveloppes)
  const JOUR_6 = '2026-08-29'
  const attenduAuJour6 = Math.round((budget * 6) / 11)

  it('au jour 1, attend un onzième du budget', () => {
    const r = rythme([], enveloppes, '2026-08-24')
    expect(r.jour).toBe(1)
    expect(r.joursTotal).toBe(11)
    expect(r.attendu).toBe(Math.round(budget / 11))
  })

  it('reste « ok » quand on suit exactement le budget', () => {
    expect(rythme([depense(attenduAuJour6)], enveloppes, JOUR_6).statut).toBe('ok')
  })

  it('reste « ok » quand on dépense moins que prévu', () => {
    const sage = depense(attenduAuJour6 - Math.round(budget * 0.1))
    expect(rythme([sage], enveloppes, JOUR_6).statut).toBe('ok')
  })

  it('passe en « attention » au-delà de 5 % d’avance', () => {
    const trop = depense(attenduAuJour6 + Math.round(budget * 0.08))
    expect(rythme([trop], enveloppes, JOUR_6).statut).toBe('attention')
  })

  it('passe en « alerte » au-delà de 15 % d’avance', () => {
    const bienTrop = depense(attenduAuJour6 + Math.round(budget * 0.2))
    expect(rythme([bienTrop], enveloppes, JOUR_6).statut).toBe('alerte')
  })

  it('signe l’écart : positif quand on dépense trop vite', () => {
    const trop = rythme([depense(attenduAuJour6 + 5_000)], enveloppes, JOUR_6)
    expect(trop.ecart).toBeGreaterThan(0)
    const sage = rythme([depense(attenduAuJour6 - 5_000)], enveloppes, JOUR_6)
    expect(sage.ecart).toBeLessThan(0)
  })

  it('statut « termine » après le retour, écart mesuré sur le budget entier', () => {
    const r = rythme([depense(budget - 5_000)], enveloppes, '2026-09-10')
    expect(r.statut).toBe('termine')
    expect(r.ecart).toBe(-5_000)
  })
})

describe('estDepenseValide', () => {
  const valide = depense(1250)

  it('accepte une dépense correcte', () => {
    expect(estDepenseValide(valide)).toBe(true)
  })

  it('rejette les formes corrompues venues du stockage', () => {
    expect(estDepenseValide(null)).toBe(false)
    expect(estDepenseValide('depense')).toBe(false)
    expect(estDepenseValide({ ...valide, centimes: 12.5 })).toBe(false)
    expect(estDepenseValide({ ...valide, centimes: 0 })).toBe(false)
    expect(estDepenseValide({ ...valide, centimes: -100 })).toBe(false)
    expect(estDepenseValide({ ...valide, categorie: 'essence' })).toBe(false)
    expect(estDepenseValide({ ...valide, date: '24/08/2026' })).toBe(false)
    expect(estDepenseValide({ ...valide, libelle: undefined })).toBe(false)
  })
})
