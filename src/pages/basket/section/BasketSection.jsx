import React, { useEffect, useState } from 'react';
import style from './BasketSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdHeart } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { HiMiniFolderArrowDown } from "react-icons/hi2";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { getBasketThunk, deleteBasketThunk } from '../../../redux/reducers/basketSlice';

const BasketSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasketThunk());
  }, [dispatch]);

  const basket = useSelector((state) => state.basket.basket) || [];

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Ödəniş formu state-ləri
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const openPaymentModal = (item) => {
    setSelectedItem(item);
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedItem(null);
    setCardNumber('');
    setExpiry('');
    setCvv('');
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Sadə validasiya (sən lazım bildiyin qədər genişləndirə bilərsən)
    if (cardNumber.length !== 16) {
      alert('Kart nömrəsi 16 rəqəmdən ibarət olmalıdır');
      return;
    }
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      alert('Son istifadə tarixi MM/YY formatında olmalıdır');
      return;
    }
    if (cvv.length !== 3) {
      alert('CVV 3 rəqəmdən ibarət olmalıdır');
      return;
    }

    // Burada real ödəniş prosesi olacaq
    console.log('Ödəniş məlumatları:', { cardNumber, expiry, cvv, product: selectedItem });

    alert(`Ödəniş uğurla həyata keçirildi: ${selectedItem.title}`);

    closePaymentModal();
  };

  return (
    <div className={style.container}>
      <div className={style.carts}>
        {basket.map((item) => (
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
              <RiDeleteBin5Fill
                onClick={() => dispatch(deleteBasketThunk(item._id))}
                style={{ cursor: "pointer", color: "red" }}
              />
              <FaRegEye />
            </div>

            <button className={style.payButton} onClick={() => openPaymentModal(item)}>
              Ödəniş et
            </button>
          </div>
        ))}
      </div>

      {showPaymentModal && selectedItem && (
        <div className={style.modalOverlay} onClick={closePaymentModal}>
          <div className={style.modalContent} onClick={e => e.stopPropagation()}>
            <h2>{selectedItem.title} - Ödəniş</h2>
            <p>Qiymət: {selectedItem.price} ₼</p>

            <form onSubmit={handlePaymentSubmit} className={style.paymentForm}>
              <label>
                Kart nömrəsi
                <input
                  type="text"
                  maxLength="16"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </label>

              <label>
                Son istifadə tarixi (MM/YY)
                <input
                  type="text"
                  maxLength="5"
                  value={expiry}
                  onChange={e => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </label>

              <label>
                CVV
                <input
                  type="password"
                  maxLength="3"
                  value={cvv}
                  onChange={e => setCvv(e.target.value.replace(/\D/g, ''))}
                  placeholder="123"
                  required
                />
              </label>

              <div className={style.buttons}>
                <button type="submit" className={style.confirmButton}>Ödənişi təsdiqlə</button>
                <button type="button" className={style.cancelButton} onClick={closePaymentModal}>İmtina et</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BasketSection;

