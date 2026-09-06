'use client'

import { Button, useListQuery } from '@payloadcms/ui'

export default function downloadCertificates() {

  const { collectionSlug, data } = useListQuery()


  const handleClick = () => {
    const ids = data?.docs.map((doc) => doc.id).join(',')
    if (ids) {
      window.location.href = `/api/${collectionSlug}/download-certificates?ids=${ids}`
    }
  }

  return (
    <>
      <Button
        icon={['chevron']}
        buttonStyle={'subtle'}
        onClick={handleClick}
      >
        Descargar certificados
      </Button>
    </>
  )
}