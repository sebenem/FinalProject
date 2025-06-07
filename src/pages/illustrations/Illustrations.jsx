import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from './sections/hero/Hero'
import Discover from './sections/discover/Discover'
import Free from './sections/free/Free'
import Stunning from './sections/stunning/Stunning'
import ProductsSection from './sections/products/ProductsSection'
const Illustrations = () => {
  return (
   <>
   <Layout>
    <Hero/>
    <Discover/>
    <Free/>
       <ProductsSection/>
    <Stunning/>
   </Layout>
   </>
  )
}

export default Illustrations
