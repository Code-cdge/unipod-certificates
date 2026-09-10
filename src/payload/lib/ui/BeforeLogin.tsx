import { Banner } from '@payloadcms/ui'
import Link from 'next/link'

export default function BeforeLogin() {
  return (
    <>
      <Banner>
        <p style={{ textAlign: 'center' }}>
          Utilice sus credenciales para iniciar sesión{' '}
          <b>
            {' '}
            <em>sólo si has sido explícitamente autorizado</em>{' '}
          </b>
          para acceder, de lo contrario{' '}
          <Link href={'/'} style={{ fontWeight: 'bold' }}>
            vuelva a sitio público
          </Link>
        </p>
      </Banner>
    </>
  )
}
