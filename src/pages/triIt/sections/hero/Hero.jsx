import React from 'react'
import style from './Hero.module.scss'
import { FcSearch } from "react-icons/fc";
const Hero = () => {
  return (
     <div className={style.wrapper}>
      <video className={style.videoBg} autoPlay loop muted>
        <source src="/images/Stock_GenAI-LP_Desktop_Video_NonPro.mp4" type="video/mp4" />
      </video>

      <div className={style.content}>
        <h2>Search for images and customize the results</h2>
       <div className={style.search}>
          <input type="text" placeholder='What are you looking for?' />
<FcSearch className={style.icoSearch} />
        </div>
      </div>
    </div>
  )
}

export default Hero
