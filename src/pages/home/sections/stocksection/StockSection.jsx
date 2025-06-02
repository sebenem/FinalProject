import React from "react";
import style from "./StockSection.module.scss";
const StockSection = () => {
  return (
    <div className={style.container}>
      <div className={style.image}>
        <img src="/images/HP_storytelling_1439510772.jpg" alt="" />
      </div>
      <div className={style.text}>
        <h2>Your story will be more</h2>
        <h2>captivating than ever with Adobe</h2>
        <h2>Stock in your toolkit</h2>
        <span>
          Choose from flexible subscription plans that allow you to download
          royalty-free stock images, video, templates, and more - all within the
          same plan
        </span>
        <button>Explore plans</button>
      </div>
    </div>
  );
};

export default StockSection;
