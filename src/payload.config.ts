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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Attendants,
    Media,
    Trainings,
    Users
  ],
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
  plugins: [],
})
