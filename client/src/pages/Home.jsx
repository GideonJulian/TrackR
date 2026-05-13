import React from 'react'
import Hero from '../components/Hero'
import ProblemSection from '../components/Problem'
import ClaritySection from '../components/ClaritySection'
import Features from '../components/Features'
import Testimonials from '../components/Testimonial'
import CTASection from '../components/CTASection'

const Home = () => {
  return (
    <div className='text-3xl mt-[128px]'>
      <div>
        <Hero />
      </div>
      <div>
        <ProblemSection />
      </div>
      <div>
        <ClaritySection />
      </div>
      <div>
        <Features />
      </div>
      <div>
        <Testimonials />
      </div>
      <CTASection />
    </div>
  )
}

export default Home