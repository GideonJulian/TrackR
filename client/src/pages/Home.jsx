import React from 'react'
import Hero from '../components/Hero'
import ProblemSection from '../components/Problem'

const Home = () => {
  return (
    <div className='text-3xl mt-[128px]'>
      <div>
        <Hero />
      </div>
      <div>
        <ProblemSection />
      </div>
    </div>
  )
}

export default Home