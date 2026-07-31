import type { NomIcone } from '../../partage/icones'

export interface Application {
  nom: string
  /** Ce qu'elle sert à faire ici, pas ce qu'elle sait faire en général. */
  role: string
  /** Site officiel, vérifié joignable. Les liens de magasin d'applications
   *  changent de forme selon la plateforme, le site sert de point d'entrée. */
  url: string
  icone: NomIcone
}

/**
 * Applications à installer avant de partir, dans l'ordre où on s'en sert.
 *
 * L'installation se fait à la maison : en gare italienne, entre le wifi absent
 * et la file d'attente, créer un compte et enregistrer une carte bancaire n'est
 * pas une opération de cinq minutes.
 */
export const APPLICATIONS: readonly Application[] = [
  {
    nom: 'Trenitalia',
    role: 'Neuf trajets sur dix : trains régionaux, plus les bus FSE pour Alberobello et Gallipoli.',
    url: 'https://www.trenitalia.com',
    icone: 'transport',
  },
  {
    nom: 'Ferrovie Appulo Lucane',
    role: 'La seule pour Matera, le 25 août. Billets et horaires en temps réel.',
    url: 'https://ferrovieappulolucane.it',
    icone: 'transport',
  },
  {
    nom: 'MUVT',
    role: 'Bus urbains de Bari, application officielle de l’AMTAB. Utile tous les jours : le logement est à 1,9 km de la gare.',
    url: 'https://muvt.app',
    icone: 'bus',
  },
  {
    nom: 'DropTicket',
    role: 'Bus, trains et métro sans créer de compte. Repli si MUVT refuse la carte bancaire.',
    url: 'https://dropticket.it',
    icone: 'bus',
  },
  {
    nom: 'Biglietteria Cotrap',
    role: 'Billets Salento in Bus, pour Otrante le 1er septembre et Porto Cesareo le 2.',
    url: 'https://biglietteria.cotrap.it',
    icone: 'bus',
  },
]
