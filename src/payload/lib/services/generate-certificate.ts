import { Attendant } from '@/payload-types'
import PDFDocument = PDFKit.PDFDocument
import { TDocumentDefinitions } from 'pdfmake/interfaces'
import pdfMake from 'pdfmake'
import { PDF_MAKE_FONTS } from '@/payload/lib/constants'
import path from 'path'

export function generateCertificate(attendant: Attendant): pdfMake.TCreatedPdf {

  const document: TDocumentDefinitions = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    defaultStyle: {
      font: 'Calibri',
    },
    background: (_, pageSize) => ({
      image: path.join(process.cwd(), 'public/assets/images/certificate-background.jpg'),
      // fit: [pageSize.width, pageSize.height],
      cover: {
        width: pageSize.width,
        height: pageSize.height,
      }
    }),
    content: [
      {
        stack: [
          { text: 'Certificado', bold: true, alignment: 'center', fontSize: 32 },
          { text: 'Que se otorga a', alignment: 'center' },
          { text: `${attendant.fullName}`, bold: true, alignment: 'center', fontSize: 18 },
        ],
      },
    ],
  }

  pdfMake.addFonts(PDF_MAKE_FONTS)
  return pdfMake.createPdf(document)

}