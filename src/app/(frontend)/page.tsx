import { AboutSecction } from '@/components/secctions/about-secction'
import { HeroSection } from '@/components/secctions/hero-secction'
import { StepsSecction } from '@/components/secctions/steps-secction'
import React from 'react'

export default function IndexPage() {
  return (
    <React.Fragment>
      <HeroSection />
      <StepsSecction />
      <AboutSecction />
    </React.Fragment>
  )
}
