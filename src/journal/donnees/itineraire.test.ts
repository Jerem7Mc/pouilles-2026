import { describe, expect, it } from 'vitest'
import { JOURS } from '../../partage/voyage'
import { LIEUX, lieuParId } from '../../lieux/donnees/lieux'
import { ITINERAIRE } from './itineraire'

describe('itinéraire', () => {
  it('couvre exactement les 11 journées du voyage, dans l’ordre', () => {
    expect(ITINERAIRE.map((jour) => jour.date)).toEqual([...JOURS])
  })

  it('reproduit le total de transport du plan : 130,80 €', () => {
    // 116,40 € au plan d'origine, plus douze trajets de bus AMTAB à 1,20 € :
    // le logement de Bari est à 1,9 km de la gare, la marche n'est pas tenable
    // deux fois par jour pendant six jours en août.
    const total = ITINERAIRE.reduce((somme, jour) => somme + jour.transportPrevu, 0)
    expect(total).toBe(13_080)
  })

  it('prévoit 25 € de repas par jour, soit 275 € au total', () => {
    // Relevé volontairement au-dessus du plan d'origine, qui ne comptait que
    // deux repas quotidiens et descendait à 12 € certains jours.
    for (const jour of ITINERAIRE) {
      expect(jour.repasPrevu, jour.date).toBe(2_500)
    }
    const total = ITINERAIRE.reduce((somme, jour) => somme + jour.repasPrevu, 0)
    expect(total).toBe(27_500)
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

describe('liens vers les lieux', () => {
  it('ne référence que des identifiants de lieux existants', () => {
    for (const jour of ITINERAIRE) {
      const ids = [...jour.lieuxTransport, ...jour.lieuxSites, ...jour.lieuxManger]
      if (jour.lieuHebergement) ids.push(jour.lieuHebergement)
      for (const id of ids) {
        expect(lieuParId(id), `${jour.date} référence un lieu inconnu : ${id}`).toBeDefined()
      }
    }
  })

  it('donne un logement à chaque nuit du voyage, sauf le jour du retour', () => {
    // Le carnet portait autrefois le nom du logement en chaîne libre, qui a
    // survécu tel quel à un changement d'hébergement. Passer par un
    // identifiant rend la divergence impossible, ce test la rend visible.
    const nuits = ITINERAIRE.slice(0, -1)
    for (const jour of nuits) {
      const lieu = lieuParId(jour.lieuHebergement ?? '')
      expect(lieu, `${jour.date} sans logement`).toBeDefined()
      expect(lieu?.type, jour.date).toBe('hebergement')
      expect(lieu?.ville, jour.date).toBe(jour.base)
    }
    expect(
      ITINERAIRE.at(-1)?.lieuHebergement,
      'le jour du retour ne dort nulle part',
    ).toBeUndefined()
  })

  it('donne au moins un point de transport à chaque journée', () => {
    for (const jour of ITINERAIRE) {
      expect(jour.lieuxTransport.length, jour.date).toBeGreaterThan(0)
    }
  })

  it('rattache les lieux référencés à la bonne journée', () => {
    // Un lieu lié au jour J doit aussi déclarer J dans son propre champ `jours`,
    // sinon un filtre par date le masquerait alors que le journal y renvoie.
    for (const jour of ITINERAIRE) {
      const ids = [...jour.lieuxTransport, ...jour.lieuxSites, ...jour.lieuxManger]
      if (jour.lieuHebergement) ids.push(jour.lieuHebergement)
      for (const id of ids) {
        const lieu = lieuParId(id)
        expect(lieu?.jours, `${id} n’est pas rattaché au ${jour.date}`).toContain(jour.date)
      }
    }
  })

  it('n’a aucun identifiant de lieu en doublon', () => {
    const ids = LIEUX.map((lieu) => lieu.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('réservations', () => {
  it('n’expose que des liens https absolus', () => {
    for (const jour of ITINERAIRE) {
      for (const reservation of jour.reservations) {
        expect(reservation.url, jour.date).toMatch(/^https:\/\//u)
        expect(reservation.label.length).toBeGreaterThan(0)
      }
    }
  })

  it('ne renvoie jamais vers salentoinbus.it, dont le domaine ne résout plus', () => {
    const toutes = ITINERAIRE.flatMap((jour) => jour.reservations.map((r) => r.url)).join(' ')
    expect(toutes).not.toContain('salentoinbus')
  })

  it('donne les horaires officiels de la Province aux deux journées Salento in Bus', () => {
    // Le domaine du réseau est mort, le réseau non : les horaires 2026 sont
    // publiés par la Province de Lecce, un PDF par ligne. Sans ce lien, l'app
    // enverrait chercher un affichage papier alors que les heures sont connues.
    for (const date of ['2026-09-01', '2026-09-02']) {
      const jour = ITINERAIRE.find((autre) => autre.date === date)
      const urls = jour?.reservations.map((reservation) => reservation.url).join(' ') ?? ''
      expect(urls, date).toContain('provincia.le.it')
    }
  })
})
