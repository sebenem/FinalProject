import React from 'react'
import style from './ArtistsRule.module.scss'
const ArtistsRule = () => {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h2>Artists Rule</h2>
        <span>Get inspired by these Adobe Stock contributors</span>
      </div>
      <div className={style.carts}>
        <div className={style.cart}>
            <div className={style.image}>
                <img src="/images/Card1_1415147910.jpg" alt="" />
            </div>
            <h3>Gorodenkoff</h3>
            <p>Videographer</p>
        </div>
         <div className={style.cart}>
            <div className={style.image}>
                <img src="/images/Card2_866471052.jpg" alt="" />
            </div>
            <h3>nadia_snopek</h3>
            <p>Illustrator</p>
        </div>
         <div className={style.cart}>
            <div className={style.image}>
                <img src="/images/Card3_866471052.jpg" alt="" />
            </div>
            <h3>Gorodenkoff</h3>
            <p>Videographer</p>
        </div>
            <div className={style.cart}>
            <div className={style.image}>
                <img src="/images/Card4_1378206611.jpg" alt="" />
            </div>
            <h3>Gorodenkoff</h3>
            <p>Videographer</p>
        </div>
      </div>
    </div>
  )
}

export default ArtistsRule
