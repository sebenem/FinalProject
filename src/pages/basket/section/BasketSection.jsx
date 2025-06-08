import React, { useEffect } from 'react'
import style from './BasketSection.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { LuShoppingCart } from "react-icons/lu";
import { getProductsThunk } from '../../../redux/reducers/productSlice'
const BasketSection = () => {
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getProductsThunk())
    }, [dispatch])
    const products = useSelector((state) => state.products.products)  || []

  return (
    <div className={style.container}>
      <div className={style.carts}>
        {products && products.map((item)=>(
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
                <LuShoppingCart />
                <FaRegEye />
              </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default BasketSection
