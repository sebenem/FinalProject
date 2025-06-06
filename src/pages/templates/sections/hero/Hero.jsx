import React from 'react'
import style from './Hero.module.scss'
import { FcSearch } from "react-icons/fc";
const Hero = () => {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h2>Jump-start your creativity with templates</h2>
       <div className={style.search}>
          <input type="text" placeholder='Search all temlates' />
<FcSearch className={style.icoSearch} />
        </div>
      </div>
    </div>
  )
}

export default Hero
