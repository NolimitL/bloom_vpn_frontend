import currency from 'currency.js'
import getSymbolFromCurrency from 'currency-symbol-map'

export function formatCents(cents: number, currencyStr?: string): string {
  if (!cents && typeof cents !== 'number') {
    console.error('Cents are not provided')
    return ''
  }
  const symbol = getSymbolFromCurrency(currencyStr)

  return currency(cents, {
    fromCents: true,
  }).format({
    symbol: symbol || '$',
    decimal: '.',
  })
}
