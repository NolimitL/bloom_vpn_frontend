export type Validator = {
  label: string
  validatorFn: (value: string) => boolean
}

export function maxLengthValidator(value: string): boolean {
  return value && value.length >= 9
}

export function upperAndLowerCharsValidator(value: string): boolean {
  return /[a-z].*[A-Z]|[A-Z].*[a-z]/g.test(value)
}

export function numberValidator(value: string): boolean {
  return /[0-9]/g.test(value)
}

export function specialCharsValidator(value: string): boolean {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/g.test(value)
}

export const VALIDATORS: Validator[] = [
  {
    label: 'a minimum of 9 characters',
    validatorFn: maxLengthValidator,
  },
  {
    label: 'uppercase and lowercase letters',
    validatorFn: upperAndLowerCharsValidator,
  },
  {
    label: 'a number',
    validatorFn: numberValidator,
  },
  {
    label: 'a special character',
    validatorFn: specialCharsValidator,
  },
]

export function validatePassword(value: string): boolean | string {
  for (const validator of VALIDATORS) {
    const isValid = validator.validatorFn(value)
    if (!isValid) {
      return `Requires ${validator.label}`
    }
  }
  return true
}
