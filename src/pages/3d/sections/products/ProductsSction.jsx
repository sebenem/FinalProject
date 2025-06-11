import React, { useEffect } from "react";
import style from "./ProductsSection.module.scss";
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../../../redux/reducers/productSlice";
import { postBasketThunk } from "../../../../redux/reducers/basketSlice";
import { postWishlistThunk } from "../../../../redux/reducers/wishlistSlice";
import { logoutUser } from "../../../../redux/reducers/userSlice";
import { useNavigate } from "react-router-dom";

const ProductsSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);
  const user = useSelector((state) => state.user.user); // İstifadəçinin login olub-olmaması

  // 3D kateqoriyasına uyğun məhsulları filtr et
  const threeDProducts = products.filter(
    (product) => product.category?.toLowerCase() === "3d"
  );

  // Basket-ə məhsul əlavə etmə funksiyası — login yoxlaması ilə
  const handleAddToBasket = (item) => {
    if (!user) {
      alert("Zəhmət olmasa, məhsulu səbətə əlavə etmək üçün daxil olun.");
      navigate("/login");
      return;
    }
    dispatch(
      postBasketThunk({
        image: item.image,
        title: item.title,
        price: item.price,
        category: item.category,
      })
    );
  };

  // Wishlist-ə məhsul əlavə etmə funksiyası — login yoxlaması ilə
  const handAddWishlist = (item) => {
    if (!user) {
      alert("Zəhmət olmasa, məhsulu sevimlilərə əlavə etmək üçün daxil olun.");
      navigate("/login");
      return;
    }
    dispatch(
      postWishlistThunk({
        image: item.image,
        title: item.title,
        price: item.price,
        category: item.category,
      })
    );
  };

  // Logout funksiyası
  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) return <h2>Xəta var</h2>;
  if (loading) return <h2>Yüklənir...</h2>;

  return (
    <div className={style.container}>
   

      <div className={style.carts}>
        {threeDProducts.length > 0 ? (
          threeDProducts.map((item) => (
            <div className={style.cart} key={item._id}>
              <div className={style.image}>
                <img src={item.image} alt={item.title} />
              </div>

              <div className={style.info}>
                <h3>{item.title}</h3>
                <p>{item.price} ₼</p>
              </div>

              <div className={style.icon}>
                <IoMdHeart onClick={() => handAddWishlist(item)} />
                <HiMiniFolderArrowDown />
                <LuShoppingCart onClick={() => handleAddToBasket(item)} />
                <FaRegEye />
              </div>
            </div>
          ))
        ) : (
          <p>3D kateqoriyasına uyğun məhsul tapılmadı.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsSection;

