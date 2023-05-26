import React from 'react'
import './banner.scss'
import MainBanner1 from '../../assets/images/main-banner.jpg'
import MainBanner2 from '../../assets/images/main-banner-1.jpg'

const Banner = () => {
  return (
    <div className='banner'>
        <img src={MainBanner1} alt="" />
    </div>
  )
}

export default Banner