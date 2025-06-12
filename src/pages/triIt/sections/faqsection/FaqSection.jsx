import React, { useState } from "react";
import style from "./FaqSection.module.scss";

const FaqSection = () => {
  // Hər sual üçün ayrıca state - açıq-bağlı vəziyyətini saxlayırıq
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [open6, setOpen6] = useState(false);
  const [open7, setOpen7] = useState(false);
  const [open8, setOpen8] = useState(false);
  const [open9, setOpen9] = useState(false);
  const [open10, setOpen10] = useState(false);

  return (
    <div className={style.container}>
      <div className={style.faq}>
        <h1>FAQ</h1>
      </div>
      <div className={style.batn}>
        <div>
          <button onClick={() => setOpen1(!open1)}>
            What is generative AI?
          </button>
          {open1 && (
            <span>
              Generative AI is a type of artificial intelligence that can
              translate ordinary words and other inputs into extraordinary
              results. While the conversation around this technology has
              centered on AI image and art generation, generative AI can do much
              more than generate static images from text prompts. With a few
              simple words and the right AI generator, anyone can create videos,
              documents, and digital experiences as well as rich images and art.
              AI art generators can also be useful for producing “creative
              building blocks” like brushes, vectors, and textures that can add
              to or form the foundation of pieces of content.
            </span>
          )}
        </div>

        <div>
          <button onClick={() => setOpen2(!open2)}>
            What is Adobe Firefly?
          </button>
          {open2 && (
            <span>
              Adobe Firefly is a standalone web application available at
              firefly.adobe.com. It offers new ways to ideate, create, and
              communicate while significantly improving creative workflows using
              generative AI. In addition to the Firefly website, Adobe also has
              the broader Firefly family of creative generative AI models, along
              with features powered by Firefly in Adobe's flagship apps and
              Adobe Stock. Firefly is the natural extension of the technology
              Adobe has produced over the past 40 years, driven by the belief
              that people should be empowered to bring their ideas into the
              world precisely as they imagine them.{" "}
            </span>
          )}
        </div>

        <div>
          <button onClick={() => setOpen3(!open3)}>
            What are generative credits?
          </button>
          {open3 && (
            <span>
              Generative credits enable the use of generative AI features
              powered by Firefly and certain other generative AI features in the
              applications to which you are entitled. Generative credit counts
              reset each month, and unused credits do not roll over{" "}
            </span>
          )}
        </div>

        <div>
          <button onClick={() => setOpen4(!open4)}>
            How are generative credits consumed?
          </button>
          {open4 && (
            <span>
              Generative credits are consumed when using features powered by
              generative AI. For example, if you edit an image using Expand
              Image on stock.adobe.com, that will consume generative credits.{" "}
            </span>
          )}
        </div>

        <div>
          <button onClick={() => setOpen5(!open5)}>
            What happens if I exceed my monthly allocation of generative
            credits?
          </button>
          {open5 && (
            <span>
              Generative credit counts reset each month based on the billing
              date of your plan. For more details, please see this :
              https://helpx.adobe.com/firefly/get-set-up/learn-the-basics/generative-credits-faq.html{" "}
            </span>
          )}
        </div>

        <div>
          <button onClick={() => setOpen6(!open6)}>
            Does my Adobe Stock plan include access to generative features
            powered by Firefly?
          </button>
          {open6 && (
            <span>
              Adobe Stock paid subscriptions include monthly generative credits
              that can be used for standard image and vector features like AI
              image creations and edits, many powered by Adobe Firefly. Adobe
              Stock free plans receive a number of generative AI image creations
              and edits, many powered by Adobe Firefly. For more information,
              please see this FAQ:
              https://helpx.adobe.com/firefly/get-set-up/learn-the-basics/generative-credits-faq.html{" "}
            </span>
          )}
        </div>

        <div>
          <button onClick={() => setOpen7(!open7)}>
            Do generative credits roll over month to month?
          </button>
          {open7 && (
            <span>
              No, generative credits do not roll over to the next month because
              the cloud based computational resources are fixed and assume a
              certain allocation per users in a given month. Your generative
              credit balance will reset to your allocated amount on a monthly
              basis.
            </span>
          )}
        </div>

        <div>
          <button onClick={() => setOpen8(!open8)}>
            What languages does Firefly support and what if my prompt isn't
            accurately translated?
          </button>
          {open8 && (
            <span>
              Firefly is bringing the power of generative AI to global audiences
              by supporting over 100 languages for text prompt inputs, as well
              as localizing the Firefly website for more than 20 languages,
              starting with Japanese, French, German, Spanish, Brazilian
              Portuguese, Korean, Italian, Danish, Dutch, Norwegian, Swedish,
              Finnish, Chinese Simplified, and Chinese Traditional. We currently
              support prompts in over 100 languages using machine translation to
              English provided by Microsoft Translator. Because of the nuances
              of each language, it’s possible certain generations based on
              translated prompts may be inaccurate or unexpected. We are working
              hard to identify and resolve any issues. To report incorrect
              translation results, hover over a generated image and click on the
              Report tool.
            </span>
          )}
        </div>

        <div>
          <button onClick={() => setOpen9(!open9)}>
            Do I need a stock subscription or stock credit pack to download
            generated images?
          </button>
          {open9 && (
            <span>
              Yes, you must have an active stock subscription or a valid credit
              pack to download generated images.
            </span>
          )}
        </div>

        <div>
          <button onClick={() => setOpen10(!open10)}>
            Are Stock credits and generative credits the same thing?
          </button>
          {open10 && (
            <span>
              No, Adobe Stock credits cannot be used to generate content using
              Firefly-powered features. Only generative credits are used to
              generate content using Firefly-powered features. Adobe Stock
              credits are used to license content from the Stock website as
              defined in the Adobe Stock Additional Terms or your customer
              agreement, as applicable.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
