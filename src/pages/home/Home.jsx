import React from 'react'
import MainLayout from '../../components/MainLayout'
import Hero from '../container/Hero'
import { images } from '../../constants'

const Home = () => {
  return (
    <MainLayout>
        <Hero />
        {/* <div className='relative -top-52 z-10'>
          <img src={images.Oval} alt="" />
        </div> */}
    </MainLayout>
  )
}

export default Home