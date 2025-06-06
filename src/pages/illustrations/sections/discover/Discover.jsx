import React from "react";
import style from "./Discover.module.scss";

const Discover = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <h2>Discover fresh illustrations</h2>
        <p >
          Explore our newest royalty-free illustrations added daily by talented
          artists.
        </p>

        <div className={style.grid}>
          <div className={style.card}>
            <img
              src="/images/360_F_1392681158_4gEDRun5qqfNGXTG4g6kZFAhuKpd2ldo.jpg"
              alt="Fantasy Landscape"
            />
          </div>
          <div className={style.card}>
            <img
              src="/images/360_F_1414776032_swhUKkH7Sty2YtCHRCabLrJqINEnvRfI.jpg"
              alt="Abstract Fashion"
            />
          </div>

          <div className={style.card}>
            <img
              src="/images/360_F_1423263241_0zc9a2IaFQ15QPlJcQhQXvotCexruNgV.jpg"
              alt="Colorful House"
            />
          </div>
          <div className={style.card}>
            <img
              src="/images/360_F_1422304945_2PkrseRYxwMBZYt5Y5PJFps1YRxox26T.jpg"
              alt="Digital Art Composition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
