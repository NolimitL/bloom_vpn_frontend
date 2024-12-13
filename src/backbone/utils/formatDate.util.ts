import DateTime from 'luxon/src/datetime.js'

export function formatDataToSlashString(input: string | Date): string {
  if (typeof input === 'string') {
    return DateTime.fromISO(input).toFormat('dd/MM/yyyy')
  } else if (input instanceof Date) {
    return DateTime.fromJSDate(input).toFormat('dd/MM/yyyy')
  } else {
    console.warn(`Cannot format date. Date is ${input}`)
    return ''
  }
}

export function formatSlashStringDataToISO8601(value: string): string {
  if (!value) {
    console.warn(`Cannot format date. Date is ${value}`)
    return ''
  }
  return DateTime.fromFormat(value, 'dd/MM/yyyy').toISODate()
}

export function formatISO8601ToDate(value: string): Date {
  if (!value) {
    console.warn(`Cannot format date. Date is ${value}`)
    return null
  }
  return DateTime.fromISO(value).toJSDate()
}

export function getDateFromFormat(input: string, format: string): Date {
  const date = DateTime.fromFormat(input, format)
  if (date.isValid) {
    return date.toJSDate()
  }

  return null
}
