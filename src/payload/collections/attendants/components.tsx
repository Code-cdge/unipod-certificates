'use client'

import { ChangeEvent, FC, useState } from 'react'
import { Button, LoadingOverlay, toast, useConfig } from '@payloadcms/ui'

export const ImportButton: FC = () => {
  const [uploading, setUploading] = useState(false)
  const { config } = useConfig()

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch(`${config.serverURL}${config.routes.api}/attendants/import`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const result = await res.json()
      if (res.ok) {
        toast.success(`Imported: ${result.created},\nSkipped: ${result.skipped}\n Failed: ${result.failed}`)
        // window.location.reload()
      } else {
        toast.error(result.error || 'Se ha producido un error al importar')
      }
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ marginBottom: '1rem' }}>
      <LoadingOverlay show={uploading} loadingText={'Importando registros...'} />
      <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
        disabled={uploading}
        id="import-file-input"
        style={{ display: 'none' }}
      />
      <Button onClick={() => document.getElementById('import-file-input')?.click()}>
        {uploading ? 'Importando...' : 'Importar desde Excel/CSV'}
      </Button>
    </div>
  )
}
