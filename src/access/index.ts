import type { Access, FieldAccess } from 'payload'

type AccessArgs = Parameters<Access>[0]
type RoleCarrier = { roles?: unknown }

const getRoles = (user: AccessArgs['req']['user']): string[] => {
  if (!user) return []

  const roles = (user as RoleCarrier).roles
  return Array.isArray(roles) ? roles.filter((role): role is string => typeof role === 'string') : []
}

export const adminOnly: Access = ({ req: { user } }) => getRoles(user).includes('admin')

export const fieldAdminOnly: FieldAccess = ({ req: { user } }) => getRoles(user).includes('admin')

export const adminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false
  if (getRoles(user).includes('admin')) return true

  return { id: { equals: user.id } }
}
