import { describe, expect, it } from 'vitest'
import { CHAMPS_REFERENCE, nettoieReferences } from './references'

describe('références de réservation', () => {
  it('ne déclare que des libellés, aucune valeur en dur dans le code', () => {
    // Le dépôt est public : le jour où une référence réelle se glisserait dans
    // ce fichier, ce test doit tomber. Un champ ne porte qu'un identifiant, un
    // libellé et une aide de saisie.
    for (const champ of CHAMPS_REFERENCE) {
      expect(Object.keys(champ).sort()).toEqual(['aide', 'id', 'label'])
    }
  })

  it('retient les valeurs textuelles des emplacements connus', () => {
    const propre = nettoieReferences({ 'logement-bari': ' ABC-123 ', vols: 'XYZ789' })
    expect(propre).toEqual({ 'logement-bari': 'ABC-123', vols: 'XYZ789' })
  })

  it('écarte les emplacements inconnus et les valeurs non textuelles', () => {
    const propre = nettoieReferences({ inconnu: 'X', vols: 42, 'logement-lecce': null })
    expect(propre).toEqual({})
  })

  it('écarte les chaînes vides plutôt que de les mémoriser', () => {
    expect(nettoieReferences({ vols: '   ' })).toEqual({})
  })

  it('survit à une sauvegarde illisible', () => {
    for (const brut of [null, undefined, 'texte', 12, []]) {
      expect(nettoieReferences(brut)).toEqual({})
    }
  })
})
