import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from '../container/Hero'
// import { images } from '../../constants'
import Article from '../container/Article'
import CTA from '../container/CTA'

const Home = () => {
  return (
    <MainLayout>
        <Hero />
        <Article />
        {/* <div className='relative -top-52 z-10'>
          <img src={images.Oval} alt="" />
        </div> */}
        <CTA />
    </MainLayout>
  )
}

export default Home