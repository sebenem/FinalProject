import React from 'react'
import style from './Discover.module.scss'
const Discover = () => {
  return (
    <div className={style.container}>
      <div className={style.text}>
        <h2>Discover popular Stock categories and themes</h2>
      </div>
      <div className={style.cards}>
        <div className={style.cart}>
            <ul>
                <li><a href="">Animals</a></li>
                <li><a href="">Architecture</a></li>
                <li><a href="">Backgrounds</a></li>
                <li><a href="">Business</a></li>
                <li><a href="">Clipart</a></li>
            </ul>
        </div>
         <div className={style.cart}>
            <ul>
                <li><a href="">Drawings</a></li>
                <li><a href="">Education</a></li>
                <li><a href="">Family</a></li>
                <li><a href="">Father's Day</a></li>
                <li><a href="">Icons</a></li>
            </ul>
        </div>
         <div className={style.cart}>
            <ul>
                <li><a href="">Logos</a></li>
                <li><a href="">Memorial Day</a></li>
                <li><a href="">Mockups</a></li>
                <li><a href="">Nature</a></li>
                <li><a href="">People</a></li>
            </ul>
        </div>
         <div className={style.cart}>
            <ul>
                <li><a href=""> Plants and Flowers</a></li>
                <li><a href="">PNGs</a></li>
                <li><a href="">Silhouettes</a></li>
                <li><a href="">Sports</a></li>
                <li><a href="">Spring</a></li>
            </ul>
        </div>
         <div className={style.cart}>
            <ul>
                <li><a href="">Summer</a></li>
                <li><a href="">Technology</a></li>
                <li><a href="">Textures</a></li>
                <li><a href="">Travel</a></li>
                <li><a href="">Wallpaper</a></li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Discover
