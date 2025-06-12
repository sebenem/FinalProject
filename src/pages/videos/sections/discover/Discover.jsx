import React from 'react'
import style from './Discover.module.scss'
const Discover = () => {
  return (
     <div className={style.container}>
      <div className={style.image}>
        <img src="/images/Storytelling_388339949.webp" alt="" />
      </div>
      <div className={style.text}>
        <h2>Discover high-quality,</h2>
        <h2>customizable video templates</h2>
        <span>Find amazing Motion Graphics templates or video intros for your projects. Browse Adobe Premiere Pro templates, After Effects templates, and more.</span>
        <button>Explore now</button>
      </div>
    </div>
  )
}

export default Discover
