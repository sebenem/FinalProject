import React, { useState } from 'react'
import style from './Discover.module.scss'

const Discover = () => {
  const [page, setPage] = useState(1)

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <div className={style.container}>
      <div className={style.textSection}>
        <h2>Discover the latest templates</h2>
        <p>Explore our newest royalty-free templates</p>
      </div>

      <div className={style.grid}>
        {page === 1 && (
          <>
            <div className={style.card}>
              <img src="/images/360_F_1409571387_IdeFUB4hDPbo00BTyLQ3SVfkq7M6omxF.jpg" alt="Business Presentation" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1407535264_FuNSPTBueLkiv7nEhOha0IsnrpIDnEAS.jpg" alt="Modern Portfolio" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1407007752_wF9xC19GSFqyZVeCoZtHORQJEgPuXE7R.jpg" alt="Creative Resume" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1407560834_x6ug2K1sPfrdV4JftPpbsRA9wetMmFTr.jpg" alt="Minimal Brochure" />
            </div>
          </>
        )}

        {page === 2 && (
          <>
            <div className={style.card}>
              <img src="/images/360_F_1407874278_GZD2CAKKxeabqBBsB79iohCOMZNrUeiC.jpg" alt="Dark Portfolio" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1411885132_TNi9j33W1mnsOTqG0WiTWshraclLM7y6.jpg" alt="Ecommerce Banner" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1400621479_c094p4Y3A64M3uvW786xuHV96ZloIT94.jpg" alt="Event Poster" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1417738610_6H16EMcBf02RbAFmFCaAPSaB9orAnkvp.jpg" alt="Social Media Ad" />
            </div>
          </>
        )}
      </div>

      <div className={style.pagination}>
        <button
          onClick={() => handlePageChange(1)}
          className={page === 1 ? style.active : ''}
        >
          1
        </button>
        <button
          onClick={() => handlePageChange(2)}
          className={page === 2 ? style.active : ''}
        >
          2
        </button>
      </div>
    </div>
  )
}

export default Discover


