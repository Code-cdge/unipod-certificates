import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useDownload } from '@/hooks/use-download'
import { AttendantTraining } from '@/lib/types'
import { Download, Eye, Loader2, Timer } from 'lucide-react'

export function CertificateCard({
  attendantName,
  training,
}: {
  attendantName: string
  training: AttendantTraining
}) {
  const filename = `${attendantName}-${training.title}.pdf`
  const { download, isPending } = useDownload(training.certificateUrl, filename)

  return (
    <Card className="rounded-sm hover:ring-foreground/25 hover:scale-[1.02] transition-all duration-300 gap-0">
      <CardContent className="gap-3">
        <p className="text-xl font-bold leading-tight">{training.title}</p>
        <Badge variant="outline" className="-ml-1">
          <Timer className="size-3" />
          Duración: {training.workload} horas
        </Badge>
        <p className="text-muted-foreground line-clamp-3 mb-5">{training.description}</p>
      </CardContent>
      <CardFooter className="flex flex-row gap-2">
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
        <Button
          size="icon"
          variant="outline"
          nativeButton={false}
          render={<a href={training.certificateUrl} target="_blank" rel="noopener noreferrer" />}
        >
          <Eye className="size-3.5" />
        </Button>
      </CardFooter>
    </Card>
  )
}
