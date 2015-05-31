import {remove as removeDiacritics} from 'diacritics'

export const normalizeString = str => removeDiacritics(str).toLowerCase()
