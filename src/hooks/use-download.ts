import { toast } from '@/components/ui/toast'
import { useTransition } from 'react'

export function useDownload(url: string, filename: string) {
  const [isPending, startTransition] = useTransition()

  function download() {
    startTransition(() => {
      try {
        const a = document.createElement('a')
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      } catch {
        toast.add({
          title: 'Error',
          description: 'No se pudo descargar el certificado.',
          type: 'error',
        })
      }
    })
  }

  return { download, isPending }
}
