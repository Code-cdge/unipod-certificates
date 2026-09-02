import { DateFieldValidation } from 'payload'

export const validateBirthDate: DateFieldValidation = (birthDate) => {
  if (birthDate && (new Date().getTime() < new Date(birthDate).getTime())) {
    return 'La fecha de nacimiento no puede ser una fecha en el futuro'
  }
  return true
}