'use client'

import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { HeroPattern } from '@/components/shared/hero-pattern'
import { SectionTitle } from '@/components/shared/section-title'
import { formOptions, revalidateLogic } from '@tanstack/react-form'
import { CircleQuestionMark, Loader2, ShieldKeyhole } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { codeSchema } from '@/lib/schemas'
import { verifyCode } from '../_server/actions'

const formOpts = formOptions({
  defaultValues: { code: '' },
  validators: {
    onDynamic: codeSchema,
  },
  validationLogic: revalidateLogic({
    mode: 'submit',
    modeAfterSubmission: 'change',
  }),
})

export function Verifyform() {
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ formApi, value }) => {
      const result = await verifyCode(value.code)
      if (!result.success)
        formApi.setErrorMap({
          onDynamic: {
            fields: result.fieldErrors,
          },
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
            title="Acceder a mis Certificado"
            description="Ingrese su codigo unico asignado para acceder a sus certificado"
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
                <FieldGroup className="gap-4">
                  <form.Field name="code">
                    {(field) => {
                      const error = field.state.meta.errors[0]
                      return (
                        <Field>
                          <FieldLabel>Código de verificación</FieldLabel>
                          <Input
                            aria-invalid={!!error}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            placeholder="Ingrese su código de verificación..."
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          {error && (
                            <FieldDescription className="text-destructive">
                              {error.message}
                            </FieldDescription>
                          )}
                        </Field>
                      )
                    }}
                  </form.Field>

                  <form.Subscribe selector={(s) => [s.isSubmitting]}>
                    {([isSubmitting]) => (
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin" /> Verificando...
                          </>
                        ) : (
                          'Verificar'
                        )}
                      </Button>
                    )}
                  </form.Subscribe>
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
