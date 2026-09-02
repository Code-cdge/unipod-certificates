import { CollectionConfig } from 'payload'
import { withAccessControl, withUserAuditFields } from '@/payload/lib/helpers/collection.helpers'

export const AttendantTrainings: CollectionConfig = withUserAuditFields(withAccessControl({
  slug: 'attendant-trainings',
  labels: {
    singular: 'Certificado',
    plural: 'Certificados',
  },
  fields: [
    {
      name: 'attendant',
      label: 'Asistente',
      type: 'relationship',
      relationTo: 'attendants',
      required: true
    },
    {
      name: 'training',
      label: 'Formación',
      type: 'relationship',
      relationTo: 'trainings',
      required: true
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
      required: false
    },
    {
      name: 'qualification',
      label: 'Calificación',
      type: 'text',
      minLength: 1,
      maxLength: 32,
      required: false
    },
  ]
}))