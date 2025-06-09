import React, { useEffect } from 'react'
import style from './ProductsTemlate.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { LuShoppingCart } from "react-icons/lu";
import { getProductsThunk } from '../../../../redux/reducers/productSlice';
import { postBasketThunk } from '../../../../redux/reducers/basketSlice';
import { postWishlistThunk } from '../../../../redux/reducers/wishlistSlice';
const ProductsTemlate = () => {
     const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);

  // Yalnız "Template" olan məhsulları süzürük
  const templateProducts = products.filter(
    (product) => product.category?.toLowerCase() === "template"
  );

     const handleAddToBasket = (item) => {
        dispatch(postBasketThunk({
          image: item.image,
          title: item.title,
          price: item.price,
          category: item.category
        }));
      };

         const handAddWishlist = (item) => {
            dispatch(postWishlistThunk({
                image: item.image,
                title: item.title,
                price: item.price,
                category: item.category
            }))
          }

  if (error) return <h2>Xəta var</h2>;
  if (loading) return <h2>Yüklənir...</h2>;

  return (
    <div className={style.container}>
      <div className={style.carts}>
        {templateProducts.length > 0 ? (
          templateProducts.map((item) => (
            <div className={style.cart} key={item._id}>
              <div className={style.image}>
                <img src={item.image} alt={item.title} />
              </div>

              <div className={style.info}>
                <h3>{item.title}</h3>
                <p>{item.price} ₼</p>
              </div>

              <div className={style.icon}>
                <IoMdHeart onClick={()=>handAddWishlist(item)} />
                <HiMiniFolderArrowDown />
                <LuShoppingCart onClick={()=> handleAddToBasket(item)} />
                <FaRegEye />
              </div>
            </div>
          ))
        ) : (
          <p>Template kateqoriyasına uyğun məhsul tapılmadı.</p>
        )}
      </div>
    </div>
  )
}

export default ProductsTemlate
