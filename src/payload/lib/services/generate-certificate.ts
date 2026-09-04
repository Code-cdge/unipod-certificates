import { Attendant, AttendantTraining, Media, Training } from '@/payload-types'
import { TDocumentDefinitions, TableCell, TCreatedPdf, ImageDefinition } from 'pdfmake/interfaces'
import pdfMake from 'pdfmake'
import { PDF_MAKE_FONTS } from '@/payload/lib/constants'
import path from 'path'

export function generateCertificate(attendant: Attendant): TCreatedPdf {
  const training = (attendant.trainings!.docs as AttendantTraining[])![0].training as Training
  const signatureCells: TableCell[] = []
  const signatures: Record<string, ImageDefinition> = {};

  if (training.signatories && training.signatories.length > 0) {
    training.signatories.forEach(signatory => {
      const signature = signatory.signature as Media
      signatures[signature.id] = { url: signature.url! }
      signatureCells.push({
        fillColor: 'white',
        stack: [
          { image: signature.id, fit: [150, 150], alignment: 'center', marginTop: 5 },
          { text: `${signatory.name}`, alignment: 'center', bold: true },
          { text: `${signatory.role}`, alignment: 'center', marginBottom: 5 },
        ],
      })
    })
  }

  const document: TDocumentDefinitions = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    defaultStyle: {
      font: 'Calibri',
      fontSize: 16,
    },
    background: (_, pageSize) => ({
      image: path.join(process.cwd(), 'public/assets/images/certificate-background.jpg'),
      cover: {
        width: pageSize.width,
        height: pageSize.height,
      },
    }),
    images: signatures,
    content: [
      {
        stack: [
          {
            columns: [
              {
                image: path.join(process.cwd(), 'public/assets/images/Unipod-Logo.png'),
                fit: [200, 200],
              },
              {
                image: path.join(process.cwd(), 'public/assets/images/undp-logo.png'),
                fit: [100, 100],
                alignment: 'right',
              },
            ],
          },
          { text: 'El presente', alignment: 'center', marginTop: 20 },
          { text: 'Certificado', bold: true, alignment: 'center', fontSize: 42, marginTop: 10 },
          { text: 'Se otorga para todos los efectos a', alignment: 'center', marginTop: 10 },
          {
            text: `${attendant.fullName}`,
            bold: true,
            alignment: 'center',
            fontSize: 18,
            marginTop: 10,
          },
          { text: 'Por completar con éxito el curso de', alignment: 'center', marginTop: 10 },
          {
            text: `${training.title}`,
            bold: true,
            alignment: 'center',
            fontSize: 24,
            marginTop: 10,
          },
          {
            text: [
              'Impartido entre el ',
              { text: `${new Date(training.startDate!).toLocaleDateString('es')}`, bold: true },
              ' y ',
              { text: `${new Date(training.endDate!).toLocaleDateString('es')}`, bold: true },
              { text: ` en ${training.placement}` },
            ],
            alignment: 'center',
            marginTop: 10,
          },
          {
            marginTop: 40,
            layout: 'noBorders',
            style: { fontSize: 14 },
            table: {
              widths: signatureCells.map(() => '*'),
              body: [signatureCells],
            },
          },
        ],
      },
    ],
  }

  pdfMake.addFonts(PDF_MAKE_FONTS)
  return pdfMake.createPdf(document)
}
