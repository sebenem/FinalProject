import React, { useEffect, useState } from "react";
import style from "./ProductVideo.module.scss";
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getProductsThunk } from "../../../../redux/reducers/productSlice";
import { postBasketThunk } from "../../../../redux/reducers/basketSlice";
import { postWishlistThunk } from "../../../../redux/reducers/wishlistSlice";

const ProductVideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);
  const user = useSelector((state) => state.user.user);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  // Filter yalnız "vector" kateqoriyasına uyğun məhsullar üçün
  const templateProducts = products.filter(
    (product) => product.category?.toLowerCase() === "vector"
  );

  const handleAddToBasket = (item) => {
    if (!user || Object.keys(user).length === 0) {
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
      localStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({ type: "wishlist", item })
      );
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    dispatch(postWishlistThunk(item));
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  if (error) return <h2>Xəta var</h2>;
  if (loading) return <h2>Yüklənir...</h2>;

  return (
    <div className={style.container}>
      <div className={style.carts}>
        {templateProducts.length > 0 ? (
          templateProducts.map((item) => (
            <div className={style.cart} key={item._id}>
              <div className={style.image}>
                {/* Video yox, şəkil göstərilir */}
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
                <FaRegEye onClick={() => handleViewDetails(item)} style={{ cursor: "pointer" }} />
              </div>
            </div>
          ))
        ) : (
          <p>Template kateqoriyasına uyğun məhsul tapılmadı.</p>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedItem && (
        <div className={style.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={selectedItem.image} alt={selectedItem.title} />
            <h3>{selectedItem.title}</h3>
            <p>Qiymət: {selectedItem.price} ₼</p>
            <p>Kategoriya: {selectedItem.category}</p>
            <p>Haqqında: {selectedItem.description || "Ətraflı məlumat yoxdur."}</p>
            <button onClick={() => setShowModal(false)}>Bağla</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVideo;

