'use client'

import { SectionTitle } from '@/components/shared/section-title'
import { Card, CardContent } from '@/components/ui/card'
import { CircleQuestionMark, Loader2, ShieldKeyhole } from 'lucide-react'
import { useTransition } from 'react'
import { useForm, revalidateLogic } from '@tanstack/react-form'
import { useRouter } from 'next/navigation'
import z from 'zod'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { HeroPattern } from '@/components/shared/hero-pattern'

const codeSchema = z.object({
  code: z.string(),
})

export function Verifyform() {
  const router = useRouter()
  const [isNavigate, startTransition] = useTransition()

  const form = useForm({
    defaultValues: { code: '' },
    validators: { onDynamic: codeSchema },
    validationLogic: revalidateLogic({
      mode: 'submit',
      modeAfterSubmission: 'change',
    }),
    onSubmit: ({ value }) => {
      startTransition(() => {
        router.push(`/certificate?code=${encodeURIComponent(value.code)}`)
      })
    },
  })

  return (
    <main className="relative">
      <div className="absolute inset-0">
        <HeroPattern className="absolute inset-0 bg-repeat opacity-4" />
      </div>
      <div className="relative py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto size-12 rounded-md bg-primary flex items-center justify-center mb-4">
            <ShieldKeyhole className="size-8 text-primary-foreground" />
          </div>
          <SectionTitle
            title="Acceder a mi Certificado"
            description="Ingrese su codigo unico asignado para acceder a su certificado"
          />
          <Card className="w-full max-w-lg mx-auto bg-card/80 backdrop-blur-md ring-foreground/15 ring-1">
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel>Código de verificación</FieldLabel>
                    <form.Field name="code">
                      {(field) => (
                        <Input
                          id={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          placeholder="Ingrese su código de verificación..."
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                      )}
                    </form.Field>
                    <form.Subscribe selector={(state) => state}>
                      {({ isSubmitting, isDefaultValue }) => (
                        <Button type="submit" disabled={isSubmitting || isDefaultValue}>
                          {isSubmitting || isNavigate ? (
                            <>
                              <Loader2 className="animate-spin" />
                              Verificando...
                            </>
                          ) : (
                            'Verificar'
                          )}
                        </Button>
                      )}
                    </form.Subscribe>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
          <Alert className="mt-8 max-w-lg mx-auto border-none ring-1 ring-foreground/15">
            <AlertTitle className="text-primary flex items-center gap-1.5">
              <CircleQuestionMark className="size-3.5" /> ¿Necesita ayuda?
            </AlertTitle>
            <AlertDescription>
              Si tiene problemas con la verificación, contacte con el equipo de{' '}
              <span className="font-semibold">UniPod</span>. Asegúrese de escribir el código
              correctamente.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </main>
  )
}
