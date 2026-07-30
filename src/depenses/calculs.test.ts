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
  it('totalisent 450 €, le budget réaliste retenu', () => {
    expect(totalEnveloppes(enveloppesParDefaut())).toBe(45_000)
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

  it('au jour 1, attend un onzième du budget', () => {
    const r = rythme([], enveloppes, '2026-08-24')
    expect(r.jour).toBe(1)
    expect(r.joursTotal).toBe(11)
    expect(r.attendu).toBe(Math.round(45_000 / 11))
  })

  it('reste « ok » quand on suit le budget', () => {
    // Jour 6 : attendu ~24 545 centimes, on est légèrement en dessous.
    expect(rythme([depense(24_000)], enveloppes, '2026-08-29').statut).toBe('ok')
  })

  it('passe en « attention » à plus de 5 % d’avance', () => {
    // Jour 6 : attendu 24 545, seuil attention à +2 250.
    expect(rythme([depense(28_000)], enveloppes, '2026-08-29').statut).toBe('attention')
  })

  it('passe en « alerte » à plus de 15 % d’avance', () => {
    expect(rythme([depense(33_000)], enveloppes, '2026-08-29').statut).toBe('alerte')
  })

  it('signe l’écart : positif quand on dépense trop vite', () => {
    const r = rythme([depense(30_000)], enveloppes, '2026-08-29')
    expect(r.ecart).toBeGreaterThan(0)
    const sage = rythme([depense(10_000)], enveloppes, '2026-08-29')
    expect(sage.ecart).toBeLessThan(0)
  })

  it('statut « termine » après le retour', () => {
    const r = rythme([depense(40_000)], enveloppes, '2026-09-10')
    expect(r.statut).toBe('termine')
    expect(r.ecart).toBe(40_000 - 45_000)
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
