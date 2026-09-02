import { DateFieldValidation } from 'payload'
import { Training } from '@/payload-types'

/**
 * Verifica que la fecha de apertura sea siempre igual o anterior a la fecha de clausura
 * @param startDate
 * @param data
 */
export const validateStartDate: DateFieldValidation = (startDate, { data }) => {
  const record = data as Partial<Training>
  if (startDate && record.endDate) {
    if (new Date(startDate).getTime() > new Date(record.endDate).getTime()) {
      return "La fecha de apertura no puede ser posterior a la fecha de clausura"
    }
  }
  return true
}

/**
 * Verifica que la fecha de clausura sea siempre igual o posterior a la fecha de apertura
 * @param endDate
 * @param data
 */
export const validateEndDate: DateFieldValidation = (endDate, { data }) => {
  const record = data as Partial<Training>
  if (endDate && record.startDate) {
    if (new Date(endDate).getTime() < new Date(record.startDate).getTime()) {
      return "La fecha de clausura no puede ser anterior a la fecha de apertura"
    }
  }
  return true
}

