import React, { useEffect } from "react";
import style from "./ProductsSection.module.scss";
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getProductsThunk } from "../../../../redux/reducers/productSlice";
import { postBasketThunk } from "../../../../redux/reducers/basketSlice";
import { postWishlistThunk } from "../../../../redux/reducers/wishlistSlice";

const ProductsSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);
  const user = useSelector((state) => state.user.user);  // <-- DÜZGÜN BURADA `user`

  // Məhsulları yüklə
  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  // Login sonrası yadda saxlanmış əməliyyatı yerinə yetir
  useEffect(() => {
    const intent = localStorage.getItem("redirectAfterLogin");
    if (user && intent) {
      const { type, item } = JSON.parse(intent);

      if (type === "basket") {
        dispatch(postBasketThunk(item));
      } else if (type === "wishlist") {
        dispatch(postWishlistThunk(item));
      }

      localStorage.removeItem("redirectAfterLogin");
    }
  }, [user, dispatch]);

  const filterData = products.filter(
    (product) => product.category?.toLowerCase() === "ilistrasiya"
  );

  const handleAddToBasket = (item) => {
    if (!user || Object.keys(user).length === 0) {
      alert("Zəhmət olmasa, əvvəlcə daxil olun.");
      localStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({ type: "basket", item })
      );
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    dispatch(postBasketThunk(item));
  };

  const handleAddWishlist = (item) => {
    if (!user || Object.keys(user).length === 0) {
      alert("Zəhmət olmasa, əvvəlcə daxil olun.");
      localStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({ type: "wishlist", item })
      );
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    dispatch(postWishlistThunk(item));
  };

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
                <IoMdHeart onClick={() => handleAddWishlist(item)} />
                <HiMiniFolderArrowDown />
                <LuShoppingCart onClick={() => handleAddToBasket(item)} />
                <FaRegEye />
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
