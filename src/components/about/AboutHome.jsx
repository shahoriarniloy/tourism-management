"use client"
import React from 'react'
import Banner from './Banner'
import Discover from './Discover'
import AboutUs from './AboutUs'
import TeamSection from './TeamSection'
import TravelPhilosophySection from './TravelPhilosophySection'
import ImageCard from './ImageCard'

export default function About() {
  return (
    <div>
        <Banner />
        <Discover />
        <AboutUs />
        <TravelPhilosophySection />
        <ImageCard />

        {/* <TeamSection /> */}

      </div>
    
  )
}
