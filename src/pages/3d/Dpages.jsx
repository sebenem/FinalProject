import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from './sections/hero/Hero'
import Discover from './sections/discover/Discover'
import Image from './sections/image/Image'
import ProductsSection from './sections/products/ProductsSction'


const Dpages = () => {
  return (
   <Layout>
 <Hero/>
 <Discover/>
 <ProductsSection/>
 <Image/>
   </Layout>
  )
}

export default Dpages
