import React from 'react'
import style from './Hero.module.scss'
const Hero = () => {
  return (
         <div className={style.container}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={style.videoBackground}
        src="https://slp-statics.astockcdn.net/static_assets/staging/25spring/US_homepage/Spring25_Hero.mp4"
        type="video/mp4"
      />

      <div className={style.text}>
        <h1>Discover millions of royalty-free assets</h1>
         
      </div>
    </div>
  )
}

export default Hero
