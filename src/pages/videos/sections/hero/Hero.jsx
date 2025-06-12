import React from 'react'
import style from './Hero.module.scss'
import { FcSearch } from "react-icons/fc";
const Hero = () => {
  return (
<div className={style.container}>
  <video
    autoPlay
    muted
    loop
    playsInline
    className={style.backgroundVideo}
  >
    <source
      src="https://slp-statics.astockcdn.net/static_assets/staging/23spring/video/hero/hero-cover.mp4"
      type="video/mp4"
    />
    Your browser does not support the video tag.
  </video>

  <div className={style.text}>
    <h2>Royalty-free stock footage at your fingertips</h2>
    <div className={style.search}>
      <input type="text" placeholder="What are you looking for?" />
      <FcSearch className={style.icoSearch} />
    </div>
  </div>
</div>

  )
}

export default Hero
