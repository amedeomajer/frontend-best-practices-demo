import { describe, it, expect } from 'vitest'
import { formatDate, formatCurrency, formatNumber } from './formatters'

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('formats price with EUR currency', () => {
      const result = formatCurrency(1234.5)
      expect(result).toContain('1')
      expect(result).toContain('234')
      expect(result).toContain('€')
    })

    it('handles zero', () => {
      const result = formatCurrency(0)
      expect(result).toContain('0')
      expect(result).toContain('€')
    })
  })

  describe('formatNumber', () => {
    it('adds thousand separators', () => {
      const result = formatNumber(1000000)
      // Finnish locale uses space as thousand separator
      expect(result).toMatch(/1.000.000|1 000 000/)
    })

    it('handles small numbers', () => {
      expect(formatNumber(42)).toBe('42')
    })
  })

  describe('formatDate', () => {
    it('formats ISO date to readable string', () => {
      const result = formatDate('2026-01-22T14:30:00Z')
      expect(result).toContain('2026')
      expect(result).toContain('22')
    })
  })
})
