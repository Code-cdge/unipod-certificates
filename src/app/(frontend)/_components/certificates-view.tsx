"use client";

import Link from "next/link";
import type { Attendant, AttendantTraining } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CloudAlert, Sparkles } from "lucide-react";
import { HeroPattern } from "@/components/shared/hero-pattern";
import {
  Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle,
} from "@/components/ui/empty";
import { use } from "react";
import { CertificateCard } from "./certificate-card";

type CertificatesViewProps = {
  attendant: Attendant;
  certificatesResponse: Promise<AttendantTraining[]>;
};

export function CertificatesView({ attendant, certificatesResponse }: CertificatesViewProps) {
  const certificates = use(certificatesResponse);

  return (
    <main className="flex flex-col">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <HeroPattern className="absolute inset-0 opacity-5" />
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent" />
        </div>
        <div className="relative z-10 py-16 pt-32 border-b border-border/50">
          <div className="container mx-auto px-4 space-y-4 text-center">
            {certificates.length > 0 && (
              <Badge variant="secondary" className="mx-auto">
                <Sparkles className="size-3" />
                {certificates.length === 1
                  ? "1 certificado encontrado"
                  : `${certificates.length} certificados encontrados`}
              </Badge>
            )}
            <h1 className="text-3xl md:text-4xl font-bold">¡Mis certificados!</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hola <span className="text-primary font-medium">{attendant.fullName}</span>, aquí
              puedes descargar tus certificados.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {certificates.length === 0 ? (
            <Empty className="border-dashed">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CloudAlert className="size-12" />
                </EmptyMedia>
                <EmptyTitle>No se encontraron certificados</EmptyTitle>
                <EmptyDescription>
                  Su código es válido, pero todavía no tiene certificados cargados. Si cree que
                  esto es un error, contacte con el equipo de soporte de{" "}
                  <span className="text-primary font-bold">UniPod</span>.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" nativeButton={false} render={<Link href="/verify" />}>
                  Verificar otro código
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {certificates.map((certificate, idx) => (
                <CertificateCard
                  key={idx}
                  attendantName={attendant.fullName}
                  training={certificate}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}