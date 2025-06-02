import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from './sections/hero/Hero'
import TrySection from './sections/trysection/TrySection'
import CollectionsSection from './sections/collectionssection/CollectionsSection'
import StockSection from './sections/stocksection/StockSection'
import ArtistsRule from './sections/artistsrule/ArtistsRule'
import Discover from './sections/discover/Discover'
import Incredible from './sections/incredible/Incredible'

const Home = () => {
  return (
    <>
     <Layout>
     <Hero/>   
   <TrySection/>
   {/* <CollectionsSection/> */}
   {/* <StockSection/> */}
   {/* <ArtistsRule/> */}
   {/* <Discover/> */}
   {/* <Incredible/> */}
    </Layout>
    
    </>
  
  )
}

export default Home
