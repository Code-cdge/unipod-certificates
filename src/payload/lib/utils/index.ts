import { customAlphabet } from 'nanoid'

const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * Genera IDs aleatorios con caracteres alfanuméricos utilizando nanoId
 */
export const randomId = customAlphabet(ALPHABET, 6)
