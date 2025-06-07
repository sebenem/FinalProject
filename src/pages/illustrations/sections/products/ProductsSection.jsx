  import React, { useEffect } from "react";
  import style from "./ProductsSection.module.scss";
  import { IoMdHeart } from "react-icons/io";
  import { HiMiniFolderArrowDown } from "react-icons/hi2";
  import { LuShoppingCart } from "react-icons/lu";
  import { useDispatch, useSelector } from "react-redux";
  import { getProductsThunk } from "../../../../redux/reducers/productSlice";
  import { useParams } from "react-router-dom";

  const ProductsSection = () => {
    const { categoryName } = useParams(); 

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getProductsThunk());
    }, [dispatch]);

    const products = useSelector((state) => state.products.products);
    const error = useSelector((state) => state.products.error);
    const loading = useSelector((state) => state.products.loading);

   const filterData = products.filter(
  (product) => product.category?.toLowerCase() === categoryName?.toLowerCase()
);


    if (error) return <h2>Xəta var</h2>;
    if (loading) return <h2>Yüklənir...</h2>;

    return (
      <div className={style.container}>
        <div className={style.carts}>
          {filterData.length > 0 ? (
            filterData.map((item) => (
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
                </div>
              </div>
            ))
          ) : (
            <p>Bu kateqoriyaya uyğun məhsul tapılmadı.</p>
          )}
        </div>
      </div>
    );
  };

  export default ProductsSection;

  