import { AttendantTraining, Media } from '@/payload-types'
import { ZipArchive } from 'archiver'
import { PassThrough, Readable } from 'node:stream'
import { Payload } from 'payload'

type args = {
  docs: Partial<AttendantTraining>[],
  archive: ZipArchive,
  passthrough: PassThrough,
  payload: Payload
}
export async function fetchAndZipCertificates({ docs, archive, passthrough, payload }: args) {
  try {
    for (const doc of docs) {
      const mediaDoc = doc.certificate as Media
      if (!mediaDoc?.url || !mediaDoc?.filename) continue

      const res = await fetch(mediaDoc.url)
      if (!res.ok || !res.body) {
        payload.logger.warn(`Failed to fetch blob: ${mediaDoc.url}`)
        continue
      }

      // archiver's append() accepts a Node Readable, so convert
      // the fetch Web ReadableStream to one.
      const nodeStream = Readable.fromWeb(res.body as any)
      archive.append(nodeStream, { name: mediaDoc.filename })
    }
  } catch (err) {
    archive.abort()
    passthrough.destroy(err as Error)
    return
  }

  return archive.finalize()
}