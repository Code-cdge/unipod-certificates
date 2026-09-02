import { CollectionConfig } from 'payload'
import { withAccessControl, withUserAuditFields } from '@/payload/lib/helpers/collection.helpers'
import { validateEndDate, validateStartDate } from '@/payload/collections/trainings/validations'

export const Trainings: CollectionConfig = withUserAuditFields(
  withAccessControl({
    slug: 'trainings',
    admin: {
      useAsTitle: 'title',
    },
    fields: [
      {
        name: 'code', /*TODO: generate a default value for this field */
        label: 'Código de la formación',
        type: 'text',
        minLength: 1,
        maxLength: 8,
        required: true,
        unique: true
      },
      {
        name: 'title',
        label: 'Título de la formación',
        type: 'text',
        minLength: 1,
        maxLength: 256,
        required: true,
      },
      {
        name: 'placement',
        label: 'Lugar de la formación',
        type: 'text',
        minLength: 1,
        maxLength: 256,
        required: true,
      },
      {
        name: 'startDate',
        label: 'Fecha de apertura',
        type: 'date',
        required: false,
        validate: validateStartDate,
        admin: { date: { pickerAppearance: 'dayOnly' } },
      },
      {
        name: 'endDate',
        label: 'Fecha de clausura',
        type: 'date',
        required: false,
        validate: validateEndDate,
        admin: { date: { pickerAppearance: 'dayOnly' } },
      },
    ],
  }),
)