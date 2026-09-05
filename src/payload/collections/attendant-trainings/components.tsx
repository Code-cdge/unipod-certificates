'use client'

import { useDocumentInfo, Button, toast, LoadingOverlay } from '@payloadcms/ui'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function GenerateCertificate() {
  const { id, collectionSlug, data } = useDocumentInfo()
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = () => {
    setLoading(true)
    fetch(`/api/${collectionSlug}/${id}/generate-certificate/${data?.attendant}`, {
      method: 'POST',
      credentials: 'include',
    }).then( async (res) => {
      const data = await res.json()
      if (!res.ok) {
        toast.error('Se ha producido un error inesperado')
        console.error(data)
      } else {
        toast.success('El certificado se ha generado con éxito')
        router.refresh()
      }
    }).catch( err => {
      toast.error('Se ha producido un error inesperado')
      console.error(err)
    }).finally(() => { setLoading(false) })
  }

  return (
    <>
      <LoadingOverlay show={loading} loadingText={'Generando certificado...'} />
      <Button
        icon={['plus']}
        iconPosition={'left'}
        buttonStyle={'subtle'}
        disabled={!!data?.certificate}
        onClick={handleClick}
      >
        Generar certificado
      </Button>
    </>
  )
}
