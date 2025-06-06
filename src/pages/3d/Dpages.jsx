import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from './sections/hero/Hero'
import Discover from './sections/discover/Discover'
import Image from './sections/image/Image'


const Dpages = () => {
  return (
   <Layout>
 <Hero/>
 <Discover/>
 <Image/>
   </Layout>
  )
}

export default Dpages
