"use client";

import Link from "next/link";
import type { Attendant, AttendantTraining } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SectionTitle } from "@/components/shared/section-title";
import { CheckCircle2, Clock, Download as DownloadIcon, Loader2, User } from "lucide-react";
import { HeroPattern } from "@/components/shared/hero-pattern";
import { useDownload } from "@/hooks/use-download";

type CertificatesViewProps = {
  attendant: Attendant;
  certificates: AttendantTraining[];
};

export function CertificatesView({ attendant, certificates }: CertificatesViewProps) {
  const tieneMultiples = certificates.length > 1;

  return (
    <main className="relative">
      <div className="absolute inset-0">
        <HeroPattern className="absolute inset-0 bg-repeat opacity-4" />
      </div>
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto size-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="size-8 text-primary" />
          </div>
          <SectionTitle
            title={tieneMultiples ? "Descargue sus certificados" : "Descargue su certificado"}
            description={
              tieneMultiples
                ? "Encontramos varias formaciones asociadas a su código."
                : "Verifique que este es su certificado antes de descargarlo."
            }
          />
          <Card className="w-full max-w-lg mx-auto">
            <CardContent className="space-y-4">
              <div className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 flex items-center gap-3">
                <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="size-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Nombre del participante</p>
                  <p className="font-medium text-sm mt-0.5 truncate">{attendant.fullName}</p>
                </div>
              </div>

              <div className="space-y-3">
                {certificates.map((training) => (
                  <CertificateRow
                    key={training.title}
                    attendantName={attendant.fullName}
                    training={training}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                nativeButton={false}
                className="w-full"
                render={<Link href="/verify" />}
              >
                Verificar otro código
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function CertificateRow({
  attendantName,
  training,
}: {
  attendantName: string;
  training: AttendantTraining;
}) {
  const { download, isPending } = useDownload(
    training.certificateUrl,
    `${attendantName}-${training.title}.pdf`,
  );

  return (
    <div className="rounded-lg border px-4 py-3 space-y-2.5">
      <div>
        <p className="font-medium text-sm">{training.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{training.description}</p>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <Clock className="size-3" /> {training.workload} horas
        </p>
      </div>
      <Button className="w-full" onClick={download} disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="animate-spin" /> Preparando descarga...
          </>
        ) : (
          <>
            <DownloadIcon /> Descargar certificado
          </>
        )}
      </Button>
    </div>
  );
}