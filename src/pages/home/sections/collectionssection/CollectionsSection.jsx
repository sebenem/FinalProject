import React from 'react'
import style from './CollectionsSection.module.scss'
const CollectionsSection = () => {
  return (
     <div className={style.container}>
      <div className={style.header}>
        <h2>Curated royalty-free stock collections</h2>
        <p>
          Explore popular stock image collections of our most incredible high-resolution,
          royalty-free photos, stock videos, music tracks, and more.
        </p>
      </div>

      <div className={style.grid}>
        <div className={style.card}>
          <video src="/images/700_F_1329681801_qgcc2foAzIJofiuoDfGeCCXjBzJmVV4f_ST.mp4" muted autoPlay loop playsInline />
          <div className={style.overlay}>
            <span>00:10</span>
            <span>HD</span>
          </div>
        </div>

        <div className={style.card}>
 <video src="/images/700_F_1305737552_4jvu2yxKAXpbwqG4R2p2BrWgjWoK6LBW_ST.mp4" muted autoPlay loop playsInline />          <div className={style.overlay}>
            <span>00:08</span>
            <span>4K</span>
          </div>
        </div>

        <div className={style.card}>
     <video src="/images/700_F_1382866643_eA2p3OpbRrBGaFdkWBixMSRNu43nwiCD_ST.mp4" muted autoPlay loop playsInline />          <div className={style.overlay}>
            <span>00:09</span>
            <span>HD</span>
          </div>
        </div>
           <div className={style.card}>
 <video src="/images/700_F_1305796012_ZbyNOldaNL8GTaYn5VbfsouTx1donGk7_ST.mp4" muted autoPlay loop playsInline />         <div className={style.overlay}>
            <span>00:09</span>
            <span>HD</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionsSection
