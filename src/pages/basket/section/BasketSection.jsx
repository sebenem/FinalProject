import React, { useEffect } from 'react';
import style from './BasketSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { getBasketThunk, deleteBasketThunk } from '../../../redux/reducers/basketSlice';

const BasketSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasketThunk());
  }, [dispatch]);

  const basket = useSelector((state) => state.basket.basket) || [];

  return (
    <div className={style.container}>
      <div className={style.carts}>
        {basket && basket.map((item) => (
          <div className={style.cart} key={item._id}>
            <div className={style.image}>
              <img src={item.image} alt={item.title} />
            </div>

            <div className={style.info}>
              <h3>{item.title}</h3>
              <p>{item.price} ₼</p>
            </div>

            <div className={style.icon}>
              <IoMdHeart />
              <HiMiniFolderArrowDown />
              <RiDeleteBin5Fill
                onClick={() => dispatch(deleteBasketThunk(item._id))}
                style={{ cursor: "pointer", color: "red" }}
              />
              <FaRegEye />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BasketSection;
