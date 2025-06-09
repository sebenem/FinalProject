import React, { useEffect } from "react";
import style from "./AdminSection.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getWishlistThunk, deleteWishlistThunk,} from "../../../redux/reducers/wishlistSlice";
import { getProductsThunk, deleteProductThunk,} from "../../../redux/reducers/productSlice";
import { getUser } from "../../../redux/reducers/userSlice";
import { deleteBasketThunk, getBasketThunk } from "../../../redux/reducers/basketSlice";

const AdminSection = () => {
  const dispatch = useDispatch();

  // ==================== SELECTORS ====================
  const user = useSelector((state) => state.user?.user) || null;

  const { products = [], loading: productsLoading } = useSelector(
    (state) => state.products || {}
  );

  const { category = [], loading: categoryLoading } = useSelector(
    (state) => state.category || {}
  );

  const { wishlist = [], loading: wishlistLoading } = useSelector(
    (state) => state.wishlist || {}
  );

  // ==================== USE EFFECT ====================
  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getBasketThunk());
    dispatch(getWishlistThunk());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={style.adminSection}>
      {/* 👤 Admin Məlumatı */}
      <div className={style.card}>
        <h2>👤 Admin Məlumatı</h2>
        {user ? (
          <div>
            <p>
              <b>Ad:</b> {user.name}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
          </div>
        ) : (
          <p>Yüklənir...</p>
        )}
      </div>

      {/* 📦 Məhsullar */}
      <div className={style.card}>
        <h2>📦 Məhsullar</h2>
        {productsLoading ? (
          <p>Yüklənir...</p>
        ) : (
          <table className={style.table}>
            <thead>
              <tr>
                <th>Ad</th>
                <th>Qiymət</th>
                <th>Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id}>
                  <td>{prod.name}</td>
                  <td>{prod.price} ₼</td>
                  <td>
                    <button
                      onClick={() => dispatch(deleteProductThunk(prod._id))}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 📁 Kateqoriyalar */}
      <div className={style.card}>
        <h2>📁 Kateqoriyalar</h2>
        {categoryLoading ? (
          <p>Yüklənir...</p>
        ) : category.length > 0 ? (
          <ul className={style.list}>
            {category.map((cat) => (
              <li key={cat._id}>
                <span>{cat.name}</span>
                <button onClick={() => dispatch(deleteBasketThunk(cat._id))}>
                  Sil
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Kateqoriya yoxdur</p>
        )}
      </div>

      {/* 💖 Seçilmişlər */}
      <div className={style.card}>
        <h2>💖 Seçilmişlər</h2>
        {wishlistLoading ? (
          <p>Yüklənir...</p>
        ) : Array.isArray(wishlist) && wishlist.length > 0 ? (
          <ul className={style.list}>
            {wishlist.map((item) => (
              <li key={item._id}>
                <span>{item.name}</span>
                <button onClick={() => dispatch(deleteWishlistThunk(item._id))}>
                  Sil
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Seçilmiş məhsul yoxdur</p>
        )}
      </div>
    </div>
  );
};

export default AdminSection;
