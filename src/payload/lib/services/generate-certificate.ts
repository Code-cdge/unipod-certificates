import { Attendant, AttendantTraining, Media, Training } from '@/payload-types'
import {
  TDocumentDefinitions,
  TCreatedPdf,
  ImageDefinition,
  Content,
  TableCell,
  Column,
} from 'pdfmake/interfaces'
import pdfMake from 'pdfmake'
import { PDF_MAKE_FONTS } from '@/payload/lib/constants'
import path from 'path'

export function generateCertificate(attendant: Attendant): TCreatedPdf {
  const training = (attendant.trainings!.docs as AttendantTraining[])![0].training as Training
  const signatureCells: Column[] = []
  const signatures: Record<string, ImageDefinition> = {}

  if (training.signatories && training.signatories.length > 0) {
    training.signatories.forEach((signatory, index) => {
      const signature = signatory.signature as Media
      signatures[signature.id] = { url: signature.url! }
      if (index > 0) { // add even space before each item after the first one
        signatureCells.push({width: '*', text: ''})
      }
      signatureCells.push({
        style: { fontSize: 10 },
        width: 250,
        stack: [
          { image: signature.id, fit: [150, 150], alignment: 'center', marginTop: 5 },
          {
            text: '                                                                      ',
            decoration: 'overline',
            decorationColor: '#ae9b7a',
          },
          { text: `${signatory.name}`.toUpperCase(), alignment: 'center', bold: true },
          { text: `${signatory.role}`.toUpperCase(), alignment: 'center', marginBottom: 5 },
        ],
      })
    })
  }

  const document: TDocumentDefinitions = {
    pageSize: 'A4',
    pageOrientation: 'landscape',
    defaultStyle: {
      font: 'Calibri',
      // fontSize: 14,
      alignment: 'center',
    },
    pageMargins: [80, 40],
    background: (_, pageSize) => ({
      image: path.join(process.cwd(), 'public/assets/images/frame.png'),
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
                image: path.join(process.cwd(), 'public/assets/images/eg-coat.png'),
                fit: [80, 80],
                alignment: 'left',
              },
              {
                image: path.join(process.cwd(), 'public/assets/images/Unipod-Logo.png'),
                fit: [150, 80],
              },
              {
                image: path.join(process.cwd(), 'public/assets/images/undp-logo.png'),
                fit: [80, 80],
                alignment: 'right',
              },
            ],
          },
          {
            text: 'Certificado de Participación',
            font: 'ArialBlack',
            bold: true,
            color: '#2e4b6e',
            fontSize: 36,
            marginTop: 40,
          },
          {
            marginTop: 10,
            lineHeight: 1.5,
            text: [
              'EL',
              { text: ' MINISTERIO DE EDUCACIÓN, CIENCIA, JUVENTUD Y DEPORTES ', bold: true },
              'Y EL',
              { text: ' PROGRAMA DE LAS NACIONES UNIDAS PARA EL DESARROLLO ', bold: true },
              '(PNUD), EN EL MARCO DE LA INICIATIVA',
              { text: ' UNIPOD', bold: true },
            ],
          },
          {
            text: 'OTORGAN EL PRESENTE CERTIFICADO A:',
            font: 'ArialBlack',
            bold: true,
            color: '#2591c5',
            marginTop: 5,
          },
          {
            text: `${attendant.fullName}`.toUpperCase(),
            bold: true,
            fontSize: 18,
            marginTop: 10,
          },
          {
            marginTop: 5,
            table: {
              widths: '*',
              body: [
                [
                  {
                    text: '',
                    border: [false, true, false, false],
                    borderColor: ['', '#e3e3e3', '', ''],
                  },
                ],
              ],
            },
          },
          {
            // marginTop: 5,
            lineHeight: 1.5,
            text: [
              'POR SU ASISTENCIA Y PARTICIPACIÓN EN LA ',
              { text: `${training.title} `.toUpperCase(), bold: true },
              'CON UNA CARGA HORARIA TOTAL DE ',
              { text: `${training.workload} HORAS `, bold: true },
              ' LECTIVAS, HABIENDO COMPLETADO SATISFACTORIAMENTE EL PROGRAMA FORMATIVO ORIENTADO AL ',
              `${training.description}`.toUpperCase(),
            ],
          },
          {
            marginTop: 20,
            columns: signatureCells
          },
        ],
      },
    ],
  }

  pdfMake.addFonts(PDF_MAKE_FONTS)
  return pdfMake.createPdf(document)
}
