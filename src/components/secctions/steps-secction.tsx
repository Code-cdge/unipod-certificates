import { cn } from "@/lib/utils";

const steps = [
  {
    step: 1,
    title: "Introduzca su código",
    description: "El codigo de verificacion asignado",
  },
  {
    step: 2,
    title: "Descarge",
    description: "Reciba su sertificado en formato PDF",
  },
];

export function StepsSecction() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mx-auto mb-18">
          <h2 className="text-3xl font-bold mb-4">¿Cómo funciona?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descargar tu certificado es facíl. Sigue estos pasos simples
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step) => (
            <div key={step.step} className="text-center group">
              <div
                className={cn(
                  "w-15 h-15 bg-primary text-primary-foreground rounded-full flex items-center justify-center",
                  "text-xl font-bold mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform",
                )}
              >
                {step.step}
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
