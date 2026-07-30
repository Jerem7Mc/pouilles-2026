import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cle, ecrire, lire } from './stockage'

/** Double de localStorage, l'environnement de test tourne en Node pur. */
function faussStockage(surSet?: () => void) {
  const donnees = new Map<string, string>()
  return {
    getItem: (k: string) => donnees.get(k) ?? null,
    setItem: (k: string, v: string) => {
      surSet?.()
      donnees.set(k, v)
    },
    removeItem: (k: string) => void donnees.delete(k),
    clear: () => donnees.clear(),
    key: (i: number) => [...donnees.keys()][i] ?? null,
    get length() {
      return donnees.size
    },
  } satisfies Storage
}

function installe(stockage: Storage | undefined) {
  vi.stubGlobal('localStorage', stockage)
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('cle', () => {
  it('préfixe et versionne', () => {
    expect(cle('depenses')).toBe('pouilles2026.depenses.v1')
    expect(cle('depenses', 2)).toBe('pouilles2026.depenses.v2')
  })
})

describe('aller-retour', () => {
  beforeEach(() => installe(faussStockage()))

  it('relit ce qui a été écrit', () => {
    const valeur = [{ id: 'a', centimes: 1250 }]
    expect(ecrire('k', valeur)).toEqual({ ok: true })
    expect(lire('k', [])).toEqual(valeur)
  })

  it('renvoie le défaut si la clé est absente', () => {
    expect(lire('inconnue', 'defaut')).toBe('defaut')
  })
})

describe('robustesse', () => {
  it('retombe sur le défaut si le JSON est corrompu', () => {
    const stockage = faussStockage()
    stockage.setItem('k', '{ceci nest pas du json')
    installe(stockage)
    expect(lire('k', [])).toEqual([])
  })

  it('retombe sur le défaut si le validateur refuse la donnée', () => {
    const stockage = faussStockage()
    stockage.setItem('k', '{"forme":"inattendue"}')
    installe(stockage)
    expect(lire('k', [], Array.isArray)).toEqual([])
  })

  it('signale le dépassement de quota au lieu de l’avaler', () => {
    installe(
      faussStockage(() => {
        throw new DOMException('quota', 'QuotaExceededError')
      }),
    )
    expect(ecrire('k', { gros: 'objet' })).toEqual({ ok: false, raison: 'quota' })
  })

  it('signale un stockage indisponible', () => {
    installe(undefined)
    expect(ecrire('k', 1)).toEqual({ ok: false, raison: 'indisponible' })
    expect(lire('k', 'defaut')).toBe('defaut')
  })
})
