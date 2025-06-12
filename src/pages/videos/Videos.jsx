import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from './sections/hero/Hero'
import VideoCarts from './sections/videCarts/VideoCarts'
import Discover from './sections/discover/Discover'
import BringSection from './sections/bringsection/BringSection'
import ProductVideo from './sections/productsvideo/ProductVideo'

const Videos = () => {
  return (
    <>
    <Layout>
      <Hero/>
      <VideoCarts/>
      <Discover/>
      <ProductVideo/>
      <BringSection/>
    </Layout>
    </>
  )
}

export default Videos
