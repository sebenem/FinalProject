import React from 'react'
import style from './Hero.module.scss'
import { FcSearch } from "react-icons/fc";

const Hero = () => {
  return (
      <div className={style.container}>
      <div className={style.text}>
        <h2>3D Aktivlər</h2>
       <div className={style.search}>
          <input type="text" placeholder='Search all illustrations' />
<FcSearch className={style.icoSearch} />
        </div>
      </div>
    </div>
  )
}

export default Hero
