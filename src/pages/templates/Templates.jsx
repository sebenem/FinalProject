import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from './sections/hero/Hero'
import Discover from './sections/discover/Discover'
import Stock from './sections/stock/Stock'
import ProductsTemlate from './sections/products/ProductsTemlate'

const Templates = () => {
  return (
    <>
    <Layout>
        <Hero/>
        <Discover/>
        <ProductsTemlate/>
        <Stock/>
    </Layout>
    </>
  )
}

export default Templates
