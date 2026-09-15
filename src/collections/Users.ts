import type { CollectionConfig } from 'payload'

import { adminOnly, adminOrSelf, fieldAdminOnly } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: adminOnly,
    create: adminOnly,
    update: adminOrSelf,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: ['admin', 'editor', 'staff', 'client'],
      defaultValue: ['client'],
      required: true,
      saveToJWT: true,
      access: { update: fieldAdminOnly },
    },
  ],
}
