import { describe, expect, it } from 'vitest'
import { ICONES } from '../../partage/icones'
import { APPLICATIONS } from './applications'

describe('applications de transport', () => {
  it('n’expose que des liens https absolus, vers un domaine officiel', () => {
    for (const application of APPLICATIONS) {
      expect(application.url, application.nom).toMatch(/^https:\/\//u)
      expect(application.nom.length).toBeGreaterThan(0)
      expect(application.role.length).toBeGreaterThan(0)
    }
  })

  it('ne renvoie jamais vers salentoinbus.it, dont le domaine ne résout plus', () => {
    const liens = APPLICATIONS.map((application) => application.url).join(' ')
    expect(liens).not.toContain('salentoinbus')
  })

  it('ne renvoie jamais vers muvin, qui n’est pas l’application de Bari', () => {
    // Piège de saisie : l'application officielle de l'AMTAB est MUVT. Le
    // domaine muvin.it existe et répond, mais ce n'est pas un service de
    // transport barese : un lien vers lui enverrait acheter le mauvais titre.
    const liens = APPLICATIONS.map((application) => application.url).join(' ')
    expect(liens).not.toContain('muvin')
  })

  it('déclare une icône connue du registre', () => {
    for (const application of APPLICATIONS) {
      expect(ICONES[application.icone], application.nom).toBeDefined()
    }
  })
})
