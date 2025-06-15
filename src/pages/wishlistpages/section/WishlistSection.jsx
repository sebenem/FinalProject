import React, { useEffect } from 'react'
import style from './WishlistSection.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { FaRegEye } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deleteWishlistThunk, getWishlistThunk } from '../../../redux/reducers/wishlistSlice';
import { postBasketThunk } from '../../../redux/reducers/basketSlice';
const WishlistSection = () => {
     const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlistThunk());
  }, [dispatch]);

  const wishlist = useSelector((state) => state.wishlist.wishlist) || [];
const handDeleteWishlist = (id)=>{
  dispatch(deleteWishlistThunk(id))
}
const handBasket = (item)=>{
  dispatch(postBasketThunk(item))
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
                <LuShoppingCart onClick={()=> handBasket(item)} />
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
