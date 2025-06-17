import React, { useEffect, useState } from 'react';
import style from './WishlistSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteWishlistThunk, getWishlistThunk } from '../../../redux/reducers/wishlistSlice';
import { postBasketThunk } from '../../../redux/reducers/basketSlice';
import WishlistCard from '../../../components/cards/wishlistcard/WishlistCard';

const WishlistSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlistThunk());
  }, [dispatch]);

  const wishlist = useSelector((state) => state.wishlist.wishlist) || [];

    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [detailsItem, setDetailsItem] = useState(null);

   const openDetailsModal = (item) => {
    setDetailsItem(item);
    setShowDetailsModal(true);
  };
  
    const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setDetailsItem(null);
  };

  const handDeleteWishlist = (id) => {
    dispatch(deleteWishlistThunk(id));
  };

  const handBasket = (item) => {
    dispatch(postBasketThunk(item));
  };

  return (
    <div className={style.container}>
      <div className={style.carts}>
        {wishlist.map((item) => (
          <WishlistCard
            key={item._id}
            item={item}
            onDelete={handDeleteWishlist}
            onAddToBasket={handBasket}
            openDetailsModal={openDetailsModal}
          />
        ))}
      </div>
         {/* Məhsul Detallar Modalı */}
      {showDetailsModal && detailsItem && (
        <div className={style.modalOverlay} onClick={closeDetailsModal}>
          <div className={style.modalContent} onClick={e => e.stopPropagation()}>
            <h2>{detailsItem.title}</h2>
            <img src={detailsItem.image} alt={detailsItem.title} style={{ maxWidth: '100%', borderRadius: '8px', margin: '1rem 0' }} />
            <p>Qiymət: {detailsItem.price} ₼</p>
            <p>{detailsItem.description || 'Məhsul haqqında əlavə məlumat yoxdur.'}</p>

            <button onClick={closeDetailsModal} className={style.closeButton}>Bağla</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistSection;

