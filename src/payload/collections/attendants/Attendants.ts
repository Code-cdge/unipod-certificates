import { CollectionConfig } from 'payload'
import { withAccessControl, withUserAuditFields } from '@/payload/lib/helpers/collection.helpers'
import {
  deleteTrainings,
  generateAge,
  generateFullName,
} from '@/payload/collections/attendants/hooks'
import { validateBirthDate } from '@/payload/collections/attendants/validations'
import {
  downloadCertificate,
  importHandler,
} from '@/payload/collections/attendants/endpoint-handlers'
import { randomId } from '@/payload/lib/utils'

export const Attendants: CollectionConfig = withUserAuditFields(
  withAccessControl({
    slug: 'attendants',
    labels: {
      plural: 'Participantes',
      singular: 'Participante',
    },
    admin: {
      useAsTitle: 'firstName',
      components: {
        beforeListTable: ['/payload/collections/attendants/components.tsx#ImportButton'],
      },
    },
    hooks: {
      beforeDelete: [deleteTrainings]
    },
    endpoints: [
      {
        path: '/import',
        method: 'post',
        handler: importHandler,
      },
      {
        path: '/:code/download-certificate',
        method: 'get',
        handler: downloadCertificate
      }
    ],
    fields: [
      {
        name: 'code',
        label: 'Código del asistente',
        type: 'text',
        minLength: 1,
        maxLength: 8,
        required: true,
        unique: true,
        defaultValue: () => randomId()
      },
      {
        name: 'firstName',
        label: 'Nombre',
        type: 'text',
        minLength: 1,
        maxLength: 64,
        required: true,
      },
      {
        name: 'lastName',
        label: 'Apellidos',
        type: 'text',
        minLength: 1,
        maxLength: 64,
        required: false,
      },
      {
        name: 'fullName',
        label: 'Nombre completo',
        type: 'text',
        virtual: true,
        required: false,
        hooks: { afterRead: [generateFullName] },
      },
      {
        name: 'birthDate',
        label: 'Fecha de nacimiento',
        type: 'date',
        validate: validateBirthDate,
        required: false,
        admin: { date: { pickerAppearance: 'dayOnly' } },
      },
      {
        name: 'age',
        label: 'Edad',
        type: 'number',
        virtual: true,
        required: false,
        hooks: { afterRead: [generateAge] },
      },
      {
        name: 'sex',
        label: 'Sexo biológico',
        type: 'select',
        options: ['M', 'F'],
        required: false,
      },
      {
        name: 'phone',
        label: 'Número de teléfono',
        type: 'text',
        minLength: 1,
        maxLength: 32,
        required: false,
        unique: true,
      },
      {
        name: 'email',
        label: 'Correo electrónico',
        type: 'email',
        required: false,
        unique: true,
      },
      {
        name: 'trainings',
        label: 'Certificados',
        type: 'join',
        collection: 'attendant-trainings',
        on: 'attendant',
        maxDepth: 3
      },
    ],
  }),
)
