'use client'

import { Button, LoadingOverlay, toast, useListQuery } from '@payloadcms/ui'
import { useState } from 'react'

export default function downloadCertificates() {
  const { collectionSlug, data } = useListQuery()
  const [loading, setLoading] = useState<boolean>(false)

  const handleClick = async () => {
    const ids = data?.docs.map((doc) => doc.id).join(',')
    if (ids) {
      setLoading(true)
      const response = await fetch(`/api/${collectionSlug}/download-certificates?ids=${ids}`, {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        console.error(await response.json())
        return toast.error('Se ha producido un error al descargar los certificados')
      }

      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = `certificados-${data?.page}-${data?.totalPages}.zip`
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(blobUrl)
      setLoading(false)
    }
  }

  return (
    <>
      <LoadingOverlay show={loading} loadingText={'Descargando certificados...'} />
      <Button
        icon={['chevron']}
        buttonStyle={'subtle'}
        disabled={loading}
        onClick={handleClick}
      >
        Descargar certificados
      </Button>
    </>
  )
}
