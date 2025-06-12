import React from "react";
import style from "./AiSection.module.scss";

const AiSection = () => {
  return (
 <div className={style.container}>
  <div className={style.item}>
    <div className={style.image}>
      <img src="/images/GenAI_LP_Blade1.png" alt="AI Generated Preview" />
    </div>
    <div className={style.text}>
      <h3>Search and evaluate with ease</h3>
      <p>
        Customize allows you to search and evaluate stock content in one
        place. Make single-click refinements such as Expand Image or Apply
        Style to a single image or multiple images all at once.
      </p>
    </div>
  </div>

  <div className={style.item}>
    <div className={style.text}>
      <h3>View your search history</h3>
      <p>
        Customize enables you to view your search history and your AI
        refinements all on one page, accelerating your creativity and
        quickening workflows.
      </p>
    </div>
    <div className={style.image}>
      <img src="/images/GenAI_LP_Blade2.png" alt="AI Generated Preview" />
    </div>
  </div>

  <div className={style.item}>
    <div className={style.image}>
      <img src="/images/GenAI_LP_Blade3.webp" alt="AI Generated Preview" />
    </div>
    <div className={style.text}>
      <h3>Committed to Creators and our Contributors</h3>
      <p>
        Adobe Stock downloads are backed by IP indemnification for eligible
        customers. With every download for commercial use, Contributors are
        compensated.
      </p>
    </div>
  </div>
</div>

  );
};

export default AiSection;
