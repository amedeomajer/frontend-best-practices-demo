/**
 * Formatting utilities - pure functions for displaying data
 *
 * These are easy to test and reuse across the app.
 */

export function formatDate(isoDate: string, locale = 'en-FI'): string {
  return new Date(isoDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatCurrency(amount: number, locale = 'fi-FI', currency = 'EUR'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatNumber(value: number, locale = 'fi-FI'): string {
  return new Intl.NumberFormat(locale).format(value)
}
