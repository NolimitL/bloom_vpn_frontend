const nameRegex = /^[A-Za-z\s]*$/

/**
 * Validate first and last name to let include only letters and space
 */
export function validateName(name: string): boolean | string {
  if (name && !nameRegex.test(name)) {
    return 'Only letters and spaces are allowed.'
  }
  return true
}
