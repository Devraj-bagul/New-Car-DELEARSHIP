import { SignInButton } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './components/ui/button'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'
import ALLCarsHere from './components/AllCarsHere'
import LogoWall from './components/LogoWall'
import OwnershipExperience from './components/OwnershipExperience'
import ExecutiveGallery from './components/ExecutiveGallery'
import HappyCustomers from './components/HappyCustomers'

const Home = () => {
  return (
    <div className="min-h-screen relative bg-[#Fcfcfc] dark:bg-background overflow-hidden pb-32 md:pb-0">
      {/* Cinematic Grid Background (Fixed to span the entire scrolling page) */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
        {/* The Grid lines */}
        <div 
          className="absolute inset-0 opacity-[0.6] dark:opacity-[0.1]" 
          style={{
            backgroundImage: `
              linear-gradient(to right, #e2e8f0 1px, transparent 1px),
              linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center top'
          }}
        ></div>
        
        {/* Gradient Fade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#Fcfcfc]/50 to-[#Fcfcfc] dark:via-background/80 dark:to-background pointer-events-none"></div>
      </div>
      
      {/* Main Content wrapper brought to front */}
      <div className="relative z-10">
        <Header/>
        <Hero/>
        <Category/>
        <ALLCarsHere/>
        <InfoSection/>
        <LogoWall />
        <OwnershipExperience />
        <ExecutiveGallery />
        <HappyCustomers />
        <Footer/>
      </div>
    </div>
  )
}

export default Home
