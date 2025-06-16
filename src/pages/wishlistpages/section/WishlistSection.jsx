import React, { useEffect } from 'react';
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
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistSection;

