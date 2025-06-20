import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from './ProfilSection.module.scss';
import {
  getWishlistThunk
} from '../../../redux/reducers/wishlistSlice';
import {
  getBasketThunk
} from '../../../redux/reducers/basketSlice';
import {
  getProductsThunk
} from '../../../redux/reducers/productSlice';
import {
 
  updateUserInfo,
  changePassword,
  logoutUser
} from '../../../redux/reducers/userSlice';
import { CgProfile } from "react-icons/cg";

const ProfilSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const basket = useSelector((state) => state.basket.basket);
  const products = useSelector((state) => state.products.products);

  const [showEdit, setShowEdit] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [formData, setFormData] = useState({ email: "", name: "" });
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: ""
  });

  useEffect(() => {
    dispatch(getWishlistThunk());
    dispatch(getBasketThunk());
    dispatch(getProductsThunk());

    if (user) {
      setFormData({ email: user.email, name: user.name || "" });
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(formData));
    setShowEdit(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    dispatch(changePassword(passwords));
    setPasswords({ oldPassword: "", newPassword: "" });
    setShowPasswordChange(false);
  };

  if (!user) return <h2>Zəhmət olmasa daxil olun.</h2>;

  const myProducts = products.filter((product) => product.userId === user._id);

  return (
    <div className={style.container}>
      <div className={style.top}>
        <h2><CgProfile /></h2>
        <button onClick={handleLogout}>Çıxış</button>
      </div>

      <div className={style.info}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Ad:</strong> {user.name || "Ad daxil edilməyib"}</p>
        <button onClick={() => setShowEdit(!showEdit)}>Profili redaktə et</button>
        <button onClick={() => setShowPasswordChange(!showPasswordChange)}>Parolu dəyiş</button>
      </div>

      {showEdit && (
        <form className={style.form} onSubmit={handleProfileUpdate}>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ad"
          />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
          />
          <button type="submit">Yadda saxla</button>
        </form>
      )}

      {showPasswordChange && (
        <form className={style.form} onSubmit={handlePasswordChange}>
          <input
            type="password"
            placeholder="Köhnə parol"
            value={passwords.oldPassword}
            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
          />
          <input
            type="password"
            placeholder="Yeni parol"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          />
          <button type="submit">Parolu yenilə</button>
        </form>
      )}

      <div className={style.section}>
        <h3>Sevimlilər</h3>
        {wishlist.length > 0 ? (
          <ul>
            {wishlist.map((item) => (
              <li key={item._id}>{item.title}</li>
            ))}
          </ul>
        ) : (
          <p>Sevimlilər boşdur.</p>
        )}
      </div>

      <div className={style.section}>
        <h3>Səbət</h3>
        {basket.length > 0 ? (
          <ul>
            {basket.map((item) => (
              <li key={item._id}>{item.title}</li>
            ))}
          </ul>
        ) : (
          <p>Səbət boşdur.</p>
        )}
      </div>

      <div className={style.section}>
        <h3>Əlavə etdiklərin</h3>
        {myProducts.length > 0 ? (
          <ul>
            {myProducts.map((item) => (
              <li key={item._id}>{item.title}</li>
            ))}
          </ul>
        ) : (
          <p>Əlavə etdiyin məhsul yoxdur.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilSection;
