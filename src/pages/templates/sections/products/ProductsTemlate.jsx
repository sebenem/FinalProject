import React, { useEffect, useState } from 'react';
import style from './ProductsTemlate.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { getProductsThunk } from '../../../../redux/reducers/productSlice';
import { postBasketThunk } from '../../../../redux/reducers/basketSlice';
import { postWishlistThunk } from '../../../../redux/reducers/wishlistSlice';
import { useNavigate } from 'react-router-dom';

const ProductsTemlate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const products = useSelector((state) => state.products.products);
  const error = useSelector((state) => state.products.error);
  const loading = useSelector((state) => state.products.loading);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  const templateProducts = products.filter(
    (product) => product.category?.toLowerCase() === "template"
  );

  const handleAddToBasket = (item) => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(postBasketThunk({
      image: item.image,
      title: item.title,
      price: item.price,
      category: item.category
    }));
  };

  const handleAddWishlist = (item) => {
    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(postWishlistThunk({
      image: item.image,
      title: item.title,
      price: item.price,
      category: item.category
    }));
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
          <p>Template kateqoriyasına uyğun məhsul tapılmadı.</p>
        )}
      </div>

      {/* Modal pəncərə */}
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

export default ProductsTemlate;
