import React from 'react'
import Layout from '../../components/layout/Layout'
import Hero from './sections/hero/Hero'
import Discover from './sections/discover/Discover'
import Stock from './sections/stock/Stock'

const Templates = () => {
  return (
    <>
    <Layout>
        <Hero/>
        <Discover/>
        <Stock/>
    </Layout>
    </>
  )
}

export default Templates
