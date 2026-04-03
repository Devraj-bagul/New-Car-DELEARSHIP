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
    <div>
      {/* <SignInButton mode='modal' forceRedirectUrl='/'>
        <Button>Sign In</Button>
      </SignInButton> */}
      {/* header */}
      <Header/>
      {/* hero */}
      <Hero/>
      {/* Category */}
      <Category/>
      {/* New comp create  */}
      <ALLCarsHere/>
      {/* InfoSection */}
      <InfoSection/>
      {/* New Luxury Components */}
      <LogoWall />
      <OwnershipExperience />
      <ExecutiveGallery />
      {/* Happy Customers Reels */}
      <HappyCustomers />
      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Home
