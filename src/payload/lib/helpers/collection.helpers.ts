import { APIError, CollectionConfig, CollectionSlug } from 'payload'
import { isAdmin, isAuthenticated } from '@/payload/lib/utils/access-control'

/**
 * Adds createdBy and updatedBy columns to documents of this collection and defines
 * a hook to automatically set their values
 * @param config
 * @param required
 */
export function withUserAuditFields(config: CollectionConfig, required = false): CollectionConfig {
  return {
    ...config,
    fields: [
      ...config.fields,
      {
        name: 'createdBy',
        type: 'relationship',
        relationTo: 'users',
        required,
        access: {
          update: () => false,
        },
        admin: {
          readOnly: true,
          position: 'sidebar',
          condition: (data) => !!data?.createdBy,
        },
      },
      {
        name: 'updatedBy',
        type: 'relationship',
        relationTo: 'users',
        required,
        access: {
          update: () => false,
        },
        admin: {
          readOnly: true,
          position: 'sidebar',
          condition: (data) => !!data?.updatedBy,
        },
      },
    ],
    hooks: {
      ...config.hooks,
      beforeChange: [
        ({ req, operation, data }) => {
          if (req.user) {
            if (operation === 'create') {
              data.updatedBy = req.user.id
              data.createdBy = req.user.id
            } else if (operation === 'update') {
              data.updatedBy = req.user.id
            }
            return data
          } else if (required) {
            throw new APIError(`Authentication required`, 401)
          }
        },
        ...(config.hooks?.beforeChange || []),
      ],
    },
  }
}

/**
 * Global Role-based Access Control system
 * @param config
 * @param slug - default to this collection's slug. Can be used to tie this collection's access control to another
 * @param withAdminAccess
 */
export function withAccessControl(config: CollectionConfig, slug?: CollectionSlug, withAdminAccess = true): CollectionConfig {

  const accessSlug = slug || config.slug as CollectionSlug;

  return {
    ...config,
    access: {
      create: !withAdminAccess ? () => false : isAdmin,
      read: isAuthenticated,
      update: !withAdminAccess ? () => false : isAdmin,
      delete: !withAdminAccess ? () => false : isAdmin,
      ...config.access,
    },
  }
}
