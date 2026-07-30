/**
 * Ville visitée chaque journée du voyage, avec ses coordonnées.
 *
 * Obtenues via une requête structurée Nominatim (`city=` + `country=`), la
 * seule forme fiable : en texte libre, le géocodeur renvoyait des centroïdes
 * de province, voire la cathédrale d'Otrante pour « Cattedrale di Lecce ».
 */
export interface Etape {
  date: string
  ville: string
  lat: number
  lon: number
}

export const ETAPES: readonly Etape[] = [
  { date: '2026-08-24', ville: 'Bari', lat: 41.12578, lon: 16.86203 },
  { date: '2026-08-25', ville: 'Matera', lat: 40.66703, lon: 16.60633 },
  { date: '2026-08-26', ville: 'Trani', lat: 41.27818, lon: 16.41861 },
  { date: '2026-08-27', ville: 'Polignano a Mare', lat: 40.99445, lon: 17.22249 },
  { date: '2026-08-28', ville: 'Ostuni', lat: 40.72763, lon: 17.57641 },
  { date: '2026-08-29', ville: 'Alberobello', lat: 40.78412, lon: 17.2377 },
  { date: '2026-08-30', ville: 'Lecce', lat: 40.35704, lon: 18.17185 },
  { date: '2026-08-31', ville: 'Gallipoli', lat: 40.05469, lon: 17.97578 },
  { date: '2026-09-01', ville: 'Otrante', lat: 40.14567, lon: 18.49076 },
  { date: '2026-09-02', ville: 'Porto Cesareo', lat: 40.26282, lon: 17.89842 },
  { date: '2026-09-03', ville: 'Bari', lat: 41.12578, lon: 16.86203 },
]

/** Deuxième ville du 27 août, la journée combine Polignano et Monopoli. */
export const MONOPOLI = { ville: 'Monopoli', lat: 40.95224, lon: 17.29995 }

export function etape(date: string): Etape | undefined {
  return ETAPES.find((element) => element.date === date)
}
