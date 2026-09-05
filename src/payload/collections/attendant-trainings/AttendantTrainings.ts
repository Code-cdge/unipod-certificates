import { CollectionConfig } from 'payload'
import { withAccessControl, withUserAuditFields } from '@/payload/lib/helpers/collection.helpers'
import { validateAttendantTrainingUniqueness } from '@/payload/collections/attendant-trainings/validations'
import {
  deleteCertificateFileAfterChange,
  deleteCertificateFileAfterDelete,
} from '@/payload/collections/attendant-trainings/hooks'

export const AttendantTrainings: CollectionConfig = withUserAuditFields(
  withAccessControl({
    slug: 'attendant-trainings',
    labels: {
      singular: 'Certificado',
      plural: 'Certificados',
    },
    hooks: {
      afterDelete: [deleteCertificateFileAfterDelete],
      afterChange: [deleteCertificateFileAfterChange]
    },
    fields: [
      {
        name: 'attendant',
        label: 'Asistente',
        type: 'relationship',
        relationTo: 'attendants',
        required: true,
        access: { update: () => false }, // no se puede modificar este campo una vez creado
        validate: validateAttendantTrainingUniqueness
      },
      {
        name: 'training',
        label: 'Formación',
        type: 'relationship',
        relationTo: 'trainings',
        required: true,
        access: { update: () => false }, // no se puede modificar este campo una vez creado
        validate: validateAttendantTrainingUniqueness
      },
      {
        name: 'certificate',
        label: 'Certificado',
        type: 'upload',
        relationTo: 'media',
        required: false,
      },
      {
        name: 'grade',
        label: 'Nota',
        type: 'number',
        min: 0,
        required: false,
      },
      {
        name: 'qualification',
        label: 'Calificación',
        type: 'text',
        minLength: 1,
        maxLength: 32,
        required: false,
      },
    ],
  }),
)