export type Certificate = {
  fullName?: string | null
  trainings: {
    title: string
    placement: string
    certificateUrl: string
  }[]
}