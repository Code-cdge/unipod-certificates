import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/payload/lib/utils/access-control'
import { withAccessControl, withUserAuditFields } from '@/payload/lib/helpers/collection.helpers'

export const Users: CollectionConfig = withUserAuditFields(
  withAccessControl({
    slug: 'users',
    labels: {
      plural: 'Usuarios',
      singular: 'Usuario',
    },
    admin: {
      useAsTitle: 'email',
    },
    auth: {
      useAPIKey: true
    },
    access: {
      read: isAdmin,
    },
    fields: [
      // Email added by default
      {
        name: 'name',
        type: 'text',
        required: false,
      },
      {
        name: 'role',
        type: 'select',
        options: ['admin', 'user'],
        defaultValue: 'admin',
        required: false,
      },
    ],
  }),
)
