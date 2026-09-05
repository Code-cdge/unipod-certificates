import { CollectionConfig } from 'payload'
import { withAccessControl, withUserAuditFields } from '@/payload/lib/helpers/collection.helpers'
import { validateEndDate, validateStartDate } from '@/payload/collections/trainings/validations'
import { randomId } from '@/payload/lib/utils'
import { deleteAttendants, deleteSignatures } from '@/payload/collections/trainings/hooks'

export const Trainings: CollectionConfig = withUserAuditFields(
  withAccessControl({
    slug: 'trainings',
    labels: {
      plural: 'Formaciones',
      singular: 'Formación'
    },
    admin: {
      useAsTitle: 'code',
    },
    hooks: {
      beforeDelete: [deleteAttendants],
      afterDelete: [deleteSignatures]
    },
    fields: [
      {
        name: 'code',
        label: 'Código de la formación',
        type: 'text',
        minLength: 1,
        maxLength: 8,
        required: true,
        unique: true,
        defaultValue: () => randomId()
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
      {
        name: 'signatories',
        label: 'Firmantes de los certificados',
        type: 'array',
        required: false,
        maxRows: 4,
        fields: [
          {
            name: 'name',
            label: 'Nombre del firmante',
            type: 'text',
            required: true
          },
          {
            name: 'role',
            label: 'Cargo del firmante',
            type: 'text',
            required: true
          },
          {
            name: 'signature',
            label: 'Firma escaneada',
            type: 'upload',
            relationTo: 'media',
            required: true,
            filterOptions: {
              mimeType: { contains: 'image' }
            }
          }
        ]
      }
    ],
  }),
)