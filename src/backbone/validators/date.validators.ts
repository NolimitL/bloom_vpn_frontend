import DateTime from 'luxon/src/datetime.js'

/**
 * Check if the given birthdate is valid.
 *
 * The given birthdate is not valid if difference between the birthdate and the current date is
 * less than 18 years.
 *
 * The given birthdate is not valid if difference between the birthdate and the current date is
 * greater than 109 years.
 *
 * @param value Birthday to validate in dd/MM/yyyy format
 * @returns Validation result
 */
export function validateBirthDate(value: Date | string | undefined): boolean | string {
  if (!value) {
    return 'Please enter your date of birth'
  }

  const inputDate =
    typeof value === 'string'
      ? DateTime.fromFormat(value, 'dd/MM/yyyy')
      : DateTime.fromJSDate(value)
  if (!inputDate.isValid) {
    return 'Please specify a valid date'
  }

  const currentDate = DateTime.now()
  const lowBorderDate: DateTime = currentDate.minus({ years: 109 })
  const highBorderDate: DateTime = currentDate.minus({ years: 18 })

  if (inputDate > highBorderDate) {
    return 'Must be over 18 years old'
  }
  if (inputDate < lowBorderDate) {
    return `Date must be equal or after ${lowBorderDate.year}`
  }

  return true
}
