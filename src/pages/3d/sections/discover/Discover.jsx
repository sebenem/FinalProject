import React from "react";
import style from "./Discover.module.scss";
const Discover = () => {
  return (
    <div className={style.container}>
      <p>Discover Substance 3D Assets</p>
      <h2>Download smart content for your 3D projects.</h2>
      <div className={style.xett}></div>
      <div className={style.carts}>
        <div className={style.text}>
          <span>
            As part of the Substance 3D Collection plan, access thousands of
            customizable models, lights, and materials created by 3D specialists
            and world-class 3D artists.
          </span>
          <span>
            Use the assets to create 3D scenes with uncompromised detail and
            realism, for design, architecture, gaming, visual effects and more.
          </span>

        </div>
        <div className={style.image}>
            <img src="/images/5ac07164893dc87ecaac008919e6facecf2d1b58.3d-integration-substance.webp" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Discover;
