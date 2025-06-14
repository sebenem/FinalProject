import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from './sections/hero/Hero'
import VideoCarts from './sections/videCarts/VideoCarts'
import ProductVideo from './sections/productsvideo/ProductVideo'
import BringSection from './sections/bringsection/BringSection'

const Vectors = () => {
  return (
   <>
   <Layout>
     <Hero/>
          <VideoCarts/>
       
          <ProductVideo/>
          <BringSection/>
   </Layout>
   </>
  )
}

export default Vectors
