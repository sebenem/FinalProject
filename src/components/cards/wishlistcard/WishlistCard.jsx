
import React, { useState } from 'react';
import style from './WishlistCard.module.scss';
import { FaRegEye } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { RiDeleteBin5Fill } from "react-icons/ri";

const WishlistCard = ({ item, onDelete, onAddToBasket,openDetailsModal }) => {
 

  return (
    <div className={style.cart}>
      <div className={style.image}>
        <img src={item.image} alt={item.title} />
      </div>

      <div className={style.info}>
        <h3>{item.title}</h3>
        <p>{item.price} ₼</p>
      </div>

      <div className={style.icon}>
        <LuShoppingCart onClick={() => onAddToBasket(item)} />
        <RiDeleteBin5Fill onClick={() => onDelete(item._id)} />
        <FaRegEye  onClick={() => openDetailsModal(item)} />
      </div>
    </div>
  );
};

export default WishlistCard;
