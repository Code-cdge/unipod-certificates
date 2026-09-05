import { Access, APIError, PayloadRequest } from 'payload'

/**
 * Permite acceso únicamente a usuarios autenticados con el rol de 'admin'
 * @param user
 */
export const isAdmin: Access = ({req: {user}}) => {
  return user?.role === 'admin';
}

/**
 * Permite acceso únicamente a usuarios autenticados
 * @param user
 */
export const isAuthenticated: Access = ({req: {user}}) => {
  return !!user;
}

export function checkAdminCredentials(req: PayloadRequest) {
  if (!req.user) {
    throw new APIError('No tienes permiso para realizar esta acción', 401)
  } else if (req.user.role !== 'admin') {
    throw new APIError('No tienes permiso para realizar esta acción', 403)
  }
}