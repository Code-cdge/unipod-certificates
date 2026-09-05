import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

const infoCards = [
  {
    title: "27 de julio, 2026",
    cite: "Malabo",
    content: "50 seleccionados entre 466 candidaturas",
  },
  {
    title: "4–11 de agosto, 2026",
    cite: "Bata",
    content: "50 seleccionados adicionales",
  },
  {
    title: "Agosto–septiembre, 2026",
    cite: "Todo el país",
    content: "Cascada a 2.000 jóvenes",
  },
];

export function AboutSecction() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <section className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-primary text-balance mb-4">
              Sobre UniPod
            </h2>
            <div className="space-y-4 leading-relaxed">
              <p>
                UniPod es una iniciativa del Gobierno de Guinea Ecuatorial y el
                Programa de las Naciones Unidas para el Desarrollo, parte de la
                plataforma panafricana Timbuktoo. Nace para impulsar el talento,
                la innovación y el emprendimiento juvenil en el país, con
                especial atención a la igualdad de género y al mérito de los
                aspirantes de entre 18 y 35 años.
              </p>
              <p>
                Bajo el lema{" "}
                <span className="italic">"20 formadores, 2.000 futuros"</span>,
                enmarcado en el Año de la Juventud 2026, el programa certifica a
                20 formadores que replican la capacitación en cascada a unos
                2.000 jóvenes en todo el país, cubriendo emprendimiento, modelo
                de negocio, marketing, creatividad y técnicas de presentación.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {infoCards.map((info, index) => (
                <Card key={index} size="sm">
                  <CardContent>
                    <Badge variant="secondary">{info.cite}</Badge>
                    <CardTitle className="font-medium">{info.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {info.content}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
          <section className="relative">
            <div className="relative h-120 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="/assets/images/about.jpg"
                alt="Bandera de Guinea Ecuatorial"
                className="h-full object-cover "
              />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
