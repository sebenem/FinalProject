import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from './sections/hero/Hero'
import Discover from './sections/discover/Discover'
import Free from './sections/free/Free'
import Stunning from './sections/stunning/Stunning'
const Illustrations = () => {
  return (
   <>
   <Layout>
    <Hero/>
    <Discover/>
    <Free/>
    <Stunning/>
   </Layout>
   </>
  )
}

export default Illustrations
