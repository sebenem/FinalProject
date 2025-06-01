import React from 'react'
import style from './TrySection.module.scss'
const TrySection = () => {
  return (
       <div className={style.container}>
      <div className={style.con}>
        <h1>Try Customize to search and refine faster with AI</h1>

        <div className={style.carts}>
          <div className={style.cart}>
            <div className={style.image}>
              <video 
                src="https://slp-statics.astockcdn.net/static_assets/staging/25winter/customize/homepage/Homepage_Card_1__NonPro_EN_HiRes.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
              />
            </div>
            <h2>1. Search and Evaluate</h2>
            <button>Try It</button>
          </div>

          <div className={style.cart}>
            <div className={style.image}>
              <video 
                src="https://slp-statics.astockcdn.net/static_assets/staging/25winter/customize/homepage/Homepage_Card_2__NonPro_EN_HiRes.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
              />
            </div>
            <h2>2: Customize multiple images</h2>
            <button>Try It</button>
          </div>

          <div className={style.cart}>
            <div className={style.image}>
              <img 
                src="https://slp-statics.astockcdn.net/static_assets/staging/25winter/customize/homepage/Homepage_Card_Image_3_Pro_NonPro_EN_2x.png" 
                alt="Customize with AI" 
              />
            </div>
            <h2>3: Download</h2>
            <button>Try It</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrySection
