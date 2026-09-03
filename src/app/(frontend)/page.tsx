import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

import UniPodLogo from '@/../public/assets/images/Unipod-Logo.png'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="home">
      <div className="content">
        <picture>
          <Image
            alt="Payload Logo"
            height={65}
            src={UniPodLogo}
          />
        </picture>
        <h1>Bienvenido</h1>
        <h2>Enhorabuena por completar su formación en UniPod</h2>
        <p>Utiliza esta página para descargar tu certificado de finalización</p>
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Ir al panel de control
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentación de Payload
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Actualiza esta página editando</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}
