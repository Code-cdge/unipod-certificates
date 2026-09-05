import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from '@/payload/collections/users/Users'
import { Media } from '@/payload/collections/media/Media'
import { Trainings } from '@/payload/collections/trainings/Trainings'
import { Attendants } from '@/payload/collections/attendants/Attendants'
import { AttendantTrainings } from '@/payload/collections/attendant-trainings/AttendantTrainings'
import { es } from '@payloadcms/translations/languages/es'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.APP_URL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },
  collections: [Attendants, AttendantTrainings, Media, Trainings, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: false,
    migrationDir: './src/payload/migrations',
    idType: 'uuid',
  }),
  graphQL: {
    disable: true,
  },
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: 'code.cdge@gmail.com',
    defaultFromName: 'UniPod',
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: process.env.NODE_ENV === 'production',
      // Specify which collections should use Vercel Blob
      collections: {
        media: true,
      },
      // Token provided by Vercel once Blob storage is added to your Vercel project
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
})
