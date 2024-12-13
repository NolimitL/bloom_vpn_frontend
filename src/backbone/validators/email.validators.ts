import 'reflect-metadata'
import isEmail from 'validator/lib/isEmail'

// const networkService = Container.get(NetworkService)

export function validateEmail(value: string | any): boolean | string {
  if (!value) {
    return 'Please enter your email'
  }

  if (!isEmail(value)) {
    return 'Please use valid email'
  }
  return true
}

// export async function emailExist(value: string): Promise<boolean | string> {
//   const inUse = await networkService.isEmailInUse(value)
//
//   return !inUse || 'This email is already in use'
// }
//
// export async function emailDontExistAndValid(email: string): Promise<boolean | string> {
//   // TODO change further
//   return true
//   const emailValid = validateEmail(email)
//   if (emailValid !== true) {
//     return emailValid
//   }
//
//   const emailExists = await emailExist(email)
//   if (emailExists !== false) {
//     return emailExists
//   }
//
//   return emailValid && !emailExists
// }
