import React from 'react';
import style from './BasketCard.module.scss';
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { deleteBasketThunk, updateQuantityThunk } from '../../../redux/reducers/basketSlice';
import { postWishlistThunk } from '../../../redux/reducers/wishlistSlice';

const BasketCard = ({ item, openDetailsModal, openPaymentModal }) => {
  const dispatch = useDispatch();

  return (
    <div className={style.cart}>
      <div className={style.image}>
        <img src={item.image} alt={item.title} />
      </div>

      <div className={style.info}>
        <h3>{item.title}</h3>
        <p>{item.price} ₼</p>
      </div>

      <div className={style.quantityControl}>
        <button onClick={() => {
          if (item.quantity > 1) {
            dispatch(updateQuantityThunk({ id: item._id, quantity: item.quantity - 1 }));
          }
        }}>–</button>

        <span>{item.quantity || 1}</span>

        <button onClick={() => {
          dispatch(updateQuantityThunk({ id: item._id, quantity: (item.quantity || 1) + 1 }));
        }}>+</button>
      </div>

      <div className={style.icon}>
        <IoMdHeart onClick={() => dispatch(postWishlistThunk(item))} style={{ cursor: 'pointer' }} />
        <HiMiniFolderArrowDown />
        <RiDeleteBin5Fill
          onClick={() => dispatch(deleteBasketThunk(item._id))}
          className={style.delete}
        />
        <FaRegEye
          onClick={() => openDetailsModal(item)}
        />
      </div>

      <button className={style.payButton} onClick={() => openPaymentModal(item)}>
        Ödəniş et
      </button>
    </div>
  );
};

export default BasketCard;
