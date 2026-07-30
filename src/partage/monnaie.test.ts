import { describe, expect, it } from 'vitest'
import { CENTIMES_MAX, formatCentimes, formatEuros, parseMontant, pourcentage } from './monnaie'

describe('parseMontant', () => {
  it('accepte la virgule française', () => {
    expect(parseMontant('12,50')).toBe(1250)
  })

  it('accepte le point', () => {
    expect(parseMontant('12.50')).toBe(1250)
  })

  it('accepte un entier', () => {
    expect(parseMontant('8')).toBe(800)
  })

  it('accepte une seule décimale', () => {
    expect(parseMontant('12,5')).toBe(1250)
  })

  it('ignore les espaces', () => {
    expect(parseMontant('  3,20 ')).toBe(320)
  })

  it('arrondit au centime le plus proche', () => {
    expect(parseMontant('12,345')).toBe(1235)
    expect(parseMontant('0,014')).toBe(1)
  })

  it('rejette le vide, le zéro et le négatif', () => {
    expect(parseMontant('')).toBeNull()
    expect(parseMontant('   ')).toBeNull()
    expect(parseMontant('0')).toBeNull()
    expect(parseMontant('0,00')).toBeNull()
    expect(parseMontant('-5')).toBeNull()
  })

  it('rejette ce qui n’est pas un nombre', () => {
    expect(parseMontant('abc')).toBeNull()
    expect(parseMontant('12€')).toBeNull()
    expect(parseMontant('1,2,3')).toBeNull()
    expect(parseMontant('1e3')).toBeNull()
  })

  it('rejette au-delà du plafond de saisie', () => {
    expect(parseMontant('1000')).toBe(CENTIMES_MAX)
    expect(parseMontant('1000,01')).toBeNull()
  })
})

describe('formatCentimes', () => {
  it('affiche toujours deux décimales', () => {
    expect(formatCentimes(1250)).toBe('12,50')
    expect(formatCentimes(5)).toBe('0,05')
    expect(formatCentimes(0)).toBe('0,00')
    expect(formatCentimes(100)).toBe('1,00')
  })

  it('gère le négatif, utile pour un dépassement de budget', () => {
    expect(formatCentimes(-1250)).toBe('-12,50')
    expect(formatCentimes(-5)).toBe('-0,05')
  })

  it('ajoute le symbole euro', () => {
    expect(formatEuros(26740)).toBe('267,40 €')
  })
})

describe('pourcentage', () => {
  it('calcule et arrondit', () => {
    expect(pourcentage(50, 200)).toBe(25)
    expect(pourcentage(1, 3)).toBe(33)
  })

  it('renvoie 0 si le total est nul ou négatif', () => {
    expect(pourcentage(10, 0)).toBe(0)
    expect(pourcentage(10, -5)).toBe(0)
  })

  it('borne le dépassement pour ne pas casser la mise en page', () => {
    expect(pourcentage(1000, 10)).toBe(999)
  })
})
