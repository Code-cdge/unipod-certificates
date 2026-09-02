import { Access } from 'payload'

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