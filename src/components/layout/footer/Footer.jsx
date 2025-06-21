import React from 'react';
import style from './Footer.module.scss';
import { AiOutlineGlobal } from "react-icons/ai";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.adress}>
        <ul>
          <li><a href="#"><AiOutlineGlobal /> Change region</a></li>
          <li><a href="#">License Terms</a></li>
          <li><a href="#">Learn & Support</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Company</a></li>
          <li><a href="#">Sell Images</a></li>
          <li><a href="#">Enterprise</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
      </div>
      <div className={style.adobe}>
        <p>© 2025 Adobe. All rights reserved.</p>
        <ul>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Cookie preferences</a></li>
          <li><a href="#">Do not sell or share my personal information</a></li>
          <li><a href="#">AdChoice</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

