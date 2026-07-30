import { describe, expect, it } from 'vitest'
import { ICONES } from '../../partage/icones'
import { SECTIONS_PHRASES, TOTAL_PHRASES, sectionParId } from './phrases'

describe('structure des sections', () => {
  it('n’a aucun identifiant de section en doublon', () => {
    const ids = SECTIONS_PHRASES.map((section) => section.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('ne référence que des icônes du registre', () => {
    for (const section of SECTIONS_PHRASES) {
      expect(ICONES, section.id).toHaveProperty(section.icone)
    }
  })

  it('a un libellé court assez bref pour tenir dans une tuile', () => {
    for (const section of SECTIONS_PHRASES) {
      expect(section.court.length, `${section.id} : « ${section.court} »`).toBeLessThanOrEqual(12)
    }
  })

  it('ne contient aucune section vide', () => {
    for (const section of SECTIONS_PHRASES) {
      expect(section.phrases.length, section.id).toBeGreaterThan(0)
    }
  })

  it('expose un total cohérent', () => {
    const compte = SECTIONS_PHRASES.reduce((somme, s) => somme + s.phrases.length, 0)
    expect(TOTAL_PHRASES).toBe(compte)
    expect(TOTAL_PHRASES).toBeGreaterThan(150)
  })

  it('retrouve une section par son identifiant', () => {
    expect(sectionParId('laitage')?.titre).toBe('Sans laitage')
    expect(sectionParId('inconnue')).toBeUndefined()
  })
})

describe('contenu des phrases', () => {
  it('a toujours une version française et une version italienne', () => {
    for (const section of SECTIONS_PHRASES) {
      for (const phrase of section.phrases) {
        expect(phrase.fr.trim().length, `${section.id}: ${phrase.it}`).toBeGreaterThan(0)
        expect(phrase.it.trim().length, `${section.id}: ${phrase.fr}`).toBeGreaterThan(0)
      }
    }
  })

  it('n’a aucune phrase italienne en doublon, la clé de liste en dépend', () => {
    const italiennes = SECTIONS_PHRASES.flatMap((s) => s.phrases.map((p) => p.it))
    const doublons = italiennes.filter((it, i) => italiennes.indexOf(it) !== i)
    expect(doublons).toEqual([])
  })

  it('couvre les situations du voyage au-delà du seul sans-laitage', () => {
    // Chaque thème ci-dessous correspond à une journée ou une contrainte réelle
    // du séjour : cinq journées de plage, des sites payants, la chaleur d'août.
    const attendus = ['plage', 'visites', 'sante', 'restaurant', 'nombres', 'comprendre']
    for (const id of attendus) {
      expect(sectionParId(id), `section manquante : ${id}`).toBeDefined()
    }
  })

  it('garde le sans-laitage rangé comme les autres, sans traitement de faveur', () => {
    expect(SECTIONS_PHRASES[0].id).not.toBe('laitage')
  })
})
