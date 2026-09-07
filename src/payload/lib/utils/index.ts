import { customAlphabet } from 'nanoid'

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Genera IDs aleatorios con caracteres alfanuméricos utilizando nanoId
 */
export const randomId = customAlphabet(ALPHABET, 6)

/**
 * Convierte un string a un formato amigable para URLs y nombres de archivo
 * @param str
 */
export function slugify(str: string) {
  return str
    .normalize('NFKD') // é → e + ́ (combining accent)
    .replace(/[\u0300-\u036f]/g, '') // strip the combining accent marks
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove remaining non-alphanumerics
    .replace(/[\s_-]+/g, '-') // collapse spaces/underscores/dashes
    .replace(/^-+|-+$/g, '') // trim leading/trailing dashes
}