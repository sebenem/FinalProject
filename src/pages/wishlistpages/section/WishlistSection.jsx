import React, { useEffect } from 'react'
import style from './WishlistSection.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteWishlistThunk, getWishlistThunk } from '../../../redux/reducers/wishlistSlice';
const WishlistSection = () => {
     const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlistThunk());
  }, [dispatch]);

  const wishlist = useSelector((state) => state.wishlist.wishlist) || [];
const handDeleteWishlist = (id)=>{
  dispatch(deleteWishlistThunk(id))
}
  return (
    <div className={style.container}>
      <div className={style.carts}>
        {wishlist && wishlist.map((item) => (
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
               onClick={()=> handDeleteWishlist(item._id)}
              />
              <FaRegEye />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistSection
