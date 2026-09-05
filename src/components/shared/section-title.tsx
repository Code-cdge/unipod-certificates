import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  description: string
  className?: string
}

export function SectionTitle({
  title,
  description,
  className = 'text-primary',
}: SectionTitleProps) {
  return (
    <div className={cn('text-center mx-auto mb-16', className)}>
      <h2 className="text-3xl  md:text-4xl font-bold mb-4">{title}</h2>
      <p className="text-lg max-w-5xl mx-auto text-foreground">{description}</p>
    </div>
  )
}
