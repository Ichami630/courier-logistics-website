import React from 'react'
import Hero from '../components/Hero'
import InfoSection from '../components/InfoSection'
import Services from '../components/Services'
import StatsCounter from '../components/StatsCounter'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Partners from '../components/Parters'
import About from '../components/About'

const Home = () => {
  return (
    <>
        <Hero />
        <InfoSection />
        <About />
        <Services />
        <WhyChooseUs />
        <StatsCounter />
        <Testimonials />
        <Partners />
    </>
  )
}

export default Home