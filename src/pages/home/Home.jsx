import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from './sections/hero/Hero'
import TrySection from './sections/trysection/TrySection'
import CollectionsSection from './sections/collectionssection/CollectionsSection'

const Home = () => {
  return (
    <>
     <Layout>
     <Hero/>   
   <TrySection/>
   <CollectionsSection/>
    </Layout>
    </>
  
  )
}

export default Home
