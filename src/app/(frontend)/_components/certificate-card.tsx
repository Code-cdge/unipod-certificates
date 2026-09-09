'use client'

import { Button } from '@/components/ui/button'
import { useDownload } from '@/hooks/use-download'
import type { AttendantTraining } from '@/lib/types'
import { Award, Download, Eye, Loader2 } from 'lucide-react'

type CertificateCardProps = {
  attendantName: string
  training: AttendantTraining
}

export function CertificateCard({ attendantName, training }: CertificateCardProps) {
  const filename = `${attendantName}-${training.title}.pdf`
  const { download, isPending } = useDownload(training.certificateUrl, filename)

  return (
    <div className="relative border-2 border-primary/20 rounded-md p-6 bg-linear-to-b from-primary/3 to-transparent">
      {/* Esquinas tipo sello, como las de un diploma físico */}
      <div className="absolute top-2 left-2 size-3 border-t-2 border-l-2 border-primary/40" />
      <div className="absolute top-2 right-2 size-3 border-t-2 border-r-2 border-primary/40" />
      <div className="absolute bottom-2 left-2 size-3 border-b-2 border-l-2 border-primary/40" />
      <div className="absolute bottom-2 right-2 size-3 border-b-2 border-r-2 border-primary/40" />

      <Award className="size-6 text-primary/60 mx-auto mb-3" />
      <p className="text-center text-xs tracking-widest text-muted-foreground uppercase mb-2">
        Certificado de participación
      </p>
      <p className="text-lg font-bold text-center leading-tight mb-3">{training.title}</p>
      <div className="h-px bg-primary/15 w-16 mx-auto mb-3" />
      <p className="text-muted-foreground text-sm text-center line-clamp-3 mb-1">
        {training.description}
      </p>
      <p className="text-xs text-center text-muted-foreground mb-5">{training.workload} horas</p>

      <div className="flex gap-2">
        <Button className="flex-1" onClick={download} disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="animate-spin size-3.5" /> Preparando...
            </>
          ) : (
            <>
              Descargar <Download className="size-3.5" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
