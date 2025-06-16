import React, { useEffect, useState } from 'react';
import style from './BasketSection.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getBasketThunk } from '../../../redux/reducers/basketSlice';
import BasketCard from '../../../components/cards/basketcard/BasketCard';


const BasketSection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBasketThunk());
  }, [dispatch]);

  const basket = useSelector((state) => state.basket.basket) || [];

  // Ödəniş modalı state-ləri
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Məhsul detallar modalı üçün state
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null);

  // Ödəniş formu state-ləri
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Modal funksiyaları
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

  const openDetailsModal = (item) => {
    setDetailsItem(item);
    setShowDetailsModal(true);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setDetailsItem(null);
  };

  // Ödəniş formunu submit et
  const handlePaymentSubmit = (e) => {
    e.preventDefault();

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

    console.log('Ödəniş məlumatları:', { cardNumber, expiry, cvv, product: selectedItem });

    alert(`Ödəniş uğurla həyata keçirildi: ${selectedItem.title}`);

    closePaymentModal();
  };

  return (
    <div className={style.container}>
      <div className={style.carts}>
        {basket.map((item) => (
          <BasketCard
            key={item._id}
            item={item}
            openDetailsModal={openDetailsModal}
            openPaymentModal={openPaymentModal}
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

      {/* Ödəniş Modalı */}
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



