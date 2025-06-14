import React, { useState } from "react";
import style from "./VideoCarts.module.scss";
const VideoCarts = () => {

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
              src="/images/360_F_1503128906_Py9SfzKvq6UdDAM9eFVqD87GbPrmD20O.jpg"
              alt="Fantasy Landscape"
            />
          </div>
          <div className={style.card}>
            <img
              src="/images/360_F_1474473206_25rfbrNOUpSN3v37LacN367okJYKEyP9.jpg"
              alt="Abstract Fashion"
            />
          </div>

          <div className={style.card}>
            <img
              src="/images/360_F_1413852445_VuNe4QAbttBjZCQ3ddytAO01qacxL1wz.jpg"
              alt="Colorful House"
            />
          </div>
          <div className={style.card}>
            <img
              src="/images/360_F_1474967473_youfCHyrwJOvynQ6adFujM3ikRJrcodh.jpg"
              alt="Digital Art Composition"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCarts;
