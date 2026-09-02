import type { CollectionConfig } from 'payload'
import { withAccessControl, withUserAuditFields } from '@/payload/lib/helpers/collection.helpers'

export const Media: CollectionConfig = withUserAuditFields(
  withAccessControl({
    slug: 'media',
    labels: {
      plural: 'Archivos',
      singular: 'Archivo',
    },
    access: {
      read: () => true,
    },
    fields: [
      {
        name: 'alt',
        type: 'text',
        required: false,
      },
    ],
    upload: {
      mimeTypes: ['image/*', 'application/pdf'],
    },
  }),
)
