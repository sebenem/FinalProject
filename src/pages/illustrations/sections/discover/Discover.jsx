import React, { useState } from "react";
import style from "./Discover.module.scss";

const Discover = () => {
  const [page, setPage] = useState(1)

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  return (
    <div className={style.container}>
      <div className={style.textSection}>
        <h2>Discover fresh illustrations</h2>
        <p>Explore our newest royalty-free illustrations</p>
      </div>

      <div className={style.grid}>
        {page === 1 && (
          <>
            <div className={style.card}>
              <img src="/images/360_F_1500057411_pvhQdVqZjnxjupShnfXCDcJObo1TcPPq.jpg" alt="Business Presentation" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1489229174_uBLff6DszWuSuzEhA7KRXmR1KUaZ4E3h.jpg" alt="Modern Portfolio" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1432881831_ktWdjjAfiOL4ZG0KiKGWtsS6exs6z3r0.jpg" alt="Creative Resume" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1464399420_qA6alalknQzzE43mwalWUpOEBUrsx3nl.jpg" alt="Minimal Brochure" />
            </div>
          </>
        )}

        {page === 2 && (
          <>
            <div className={style.card}>
              <img src="/images/360_F_1497342781_7NLseCfpr8WfYDiOGQ5h72XycE150QKy.jpg" alt="Dark Portfolio" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1481990278_rvEHRq9es6Y7tGAwcmPrZAiih58uzzd4.jpg" alt="Ecommerce Banner" />
            </div>
            <div className={style.card}>
              <img src="/images/360_F_1484222430_V3mpZXj1mZP7p9U98ybuju3q9j5nYy9n.jpg" alt="Event Poster" />
            </div>
            <div className={style.card}>
              <img src="images/360_F_1481646954_HinKQTQzixTWdNS1lGVvRjfvAwS3yMFw.jpg" alt="Social Media Ad" />
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
};

export default Discover;
