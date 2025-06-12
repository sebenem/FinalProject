import React from "react";
import style from "./VideoCarts.module.scss";
const VideoCarts = () => {
  return (
    <div className={style.container}>
      <div className={style.header}>
        <h2>Popular stock video categories</h2>
      </div>

      <div className={style.grid}>
        <div className={style.card}>
          <video src="/images/4K.mp4" muted autoPlay loop playsInline />
          <div className={style.overlay}>
            <span>4k stock videos</span>
          </div>
        </div>

        <div className={style.card}>
          <video src="/images/vertical2.mp4" muted autoPlay loop playsInline />{" "}
          <div className={style.overlay}>
            <span>Vertical videos</span>
          </div>
        </div>

        <div className={style.card}>
          <video src="/images/templates.mp4" muted autoPlay loop playsInline />{" "}
          <div className={style.overlay}>
            <span>Video templates</span>
          </div>
        </div>
        <div className={style.card}>
          <video src="/images/music.mp4" muted autoPlay loop playsInline />{" "}
          <div className={style.overlay}>
            <span>Stock music</span>
          </div>
        </div>
        <div className={style.card}>
          <video
            src="/images/backgrounds.mp4"
            muted
            autoPlay
            loop
            playsInline
          />{" "}
          <div className={style.overlay}>
            <span>Video backgrounds</span>
          </div>
        </div>
        <div className={style.card}>
          <video src="/images/animation.mp4" muted autoPlay loop playsInline />{" "}
          <div className={style.overlay}>
            <span>Animation</span>
          </div>
        </div>
        <div className={style.card}>
          <video
            src="/images/videoeffects.mp4"
            muted
            autoPlay
            loop
            playsInline
          />{" "}
          <div className={style.overlay}>
            <span>Video effects</span>
          </div>
        </div>
        <div className={style.card}>
          <video
            src="/images/greenscreen.mp4"
            muted
            autoPlay
            loop
            playsInline
          />{" "}
          <div className={style.overlay}>
            <span>Green screen</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCarts;
