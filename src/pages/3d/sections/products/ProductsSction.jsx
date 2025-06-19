import React, { useEffect, useState } from "react";
import style from "./ProductsSection.module.scss";
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../../../../redux/reducers/productSlice";
import { postBasketThunk } from "../../../../redux/reducers/basketSlice";
import { postWishlistThunk } from "../../../../redux/reducers/wishlistSlice";
import { useNavigate, useLocation } from "react-router-dom";

const ProductsSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const query = new URLSearchParams(location.search).get("query")?.toLowerCase() || "";

  const filteredProducts = products.filter((product) => {
    const is3D = product.category?.toLowerCase() === "3d";
    const matchesQuery =
      product.title?.toLowerCase().includes(query) ||
      product.color?.toLowerCase().includes(query);
    return is3D && (query ? matchesQuery : true);
  });

  const handleAddToBasket = (item) => {
    if (!user) {
      localStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({ type: "basket", item })
      );
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    dispatch(postBasketThunk(item));
  };

  const handleAddWishlist = async (item) => {
    if (!user) {
      localStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({ type: "wishlist", item })
      );
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      const res = await dispatch(postWishlistThunk(item)).unwrap();
      alert(res.message);
    } catch (error) {
      alert(error);
    }
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  if (error) return <h2>Xəta baş verdi</h2>;
  if (loading) return <h2>Yüklənir...</h2>;

  return (
    <div className={style.container}>
      <div className={style.carts}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
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
                <LuShoppingCart onClick={() => handleAddToBasket(item)} />
                <FaRegEye onClick={() => handleViewDetails(item)} />
              </div>
            </div>
          ))
        ) : (
          <p>Uyğun məhsul tapılmadı.</p>
        )}
      </div>

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

export default ProductsSection;
