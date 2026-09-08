import { TFontDictionary } from 'pdfmake/interfaces'
import path from 'path'

export const PDF_MAKE_FONTS: TFontDictionary = {
  Calibri: {
    normal: path.join(process.cwd(), 'public/assets/fonts/calibri.ttf'),
    bold: path.join(process.cwd(), 'public/assets/fonts/calibrib.ttf'),
    italics: path.join(process.cwd(), 'public/assets/fonts/calibrii.ttf'),
    bolditalics: path.join(process.cwd(), 'public/assets/fonts/calibriz.ttf'),
  },
  Arial: {
    normal: path.join(process.cwd(), 'public/assets/fonts/arial.ttf'),
    bold: path.join(process.cwd(), 'public/assets/fonts/arialbd.ttf'),
    italics: path.join(process.cwd(), 'public/assets/fonts/ariali.ttf'),
    bolditalics: path.join(process.cwd(), 'public/assets/fonts/arialbi.ttf'),
  },
  ArialBlack: {
    normal: path.join(process.cwd(), 'public/assets/fonts/ariblk.ttf'),
    bold: path.join(process.cwd(), 'public/assets/fonts/ariblk.ttf'),
    italics: path.join(process.cwd(), 'public/assets/fonts/ariblk.ttf'),
    bolditalics: path.join(process.cwd(), 'public/assets/fonts/ariblk.ttf'),
  },
}