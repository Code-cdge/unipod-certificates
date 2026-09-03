import { TFontDictionary } from 'pdfmake/interfaces'
import path from 'path'

export const PDF_MAKE_FONTS: TFontDictionary = {
  Calibri: {
    normal: path.join(process.cwd(), 'public/assets/fonts/calibri.ttf'),
    bold: path.join(process.cwd(), 'public/assets/fonts/calibrib.ttf'),
    italics: path.join(process.cwd(), 'public/assets/fonts/calibrii.ttf'),
    bolditalics: path.join(process.cwd(), 'public/assets/fonts/calibriz.ttf'),
  },
  Courier: {
    normal: path.join(process.cwd(), 'public/assets/fonts/cour.ttf'),
    bold: path.join(process.cwd(), 'public/assets/fonts/courbd.ttf'),
    italics: path.join(process.cwd(), 'public/assets/fonts/couri.ttf'),
    bolditalics: path.join(process.cwd(), 'public/assets/fonts/courbi.ttf'),
  }
}