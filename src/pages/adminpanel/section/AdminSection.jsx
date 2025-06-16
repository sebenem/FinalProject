import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AdminSection.module.scss';
import { useFormik } from 'formik';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import {
  addFormikThunk,
  deleteProductThunk,
  editProductThunk,
  getProductsThunk,
} from '../../../redux/reducers/productSlice';

import {
  getAllUsers,
  deleteUser,
} from '../../../redux/reducers/userSlice';

import AdminCardProduct from '../../../components/cards/admincard/AdminCardProduct';
import AdminCardUser from '../../../components/cards/admincard/AdminCardUser';

const AdminSection = () => {
  const dispatch = useDispatch();

  const { products, loading: loadingProducts, error: errorProducts } =
    useSelector((state) => state.products);
  const { allUsers: users, loading: loadingUsers, error: errorUsers } =
    useSelector((state) => state.user);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  // Load products & users
  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getAllUsers());
  }, [dispatch]);

  // Add / Edit formik
  const formik = useFormik({
    initialValues: { image: '', title: '', price: '', category: '' },
    onSubmit: async (values, { resetForm }) => {
      if (editId) {
        await dispatch(editProductThunk({ id: editId, updatedProduct: values }));
      } else {
        await dispatch(addFormikThunk(values));
      }
      resetForm();
      setEditId(null);
      setIsFormVisible(false);
    },
  });

  const toggleForm = () => {
    setIsFormVisible((v) => !v);
    setEditId(null);
    formik.resetForm();
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    formik.setValues({
      image: product.image,
      title: product.title,
      price: product.price,
      category: product.category,
    });
    setIsFormVisible(true);
  };

  // Combined delete (server + client slices)
  const deleteProducts = (id) => {
    dispatch(deleteProductThunk(id));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  // Filter & sort
  const filteredProducts = products
    .filter((p) =>
      p.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

  if (loadingProducts || loadingUsers)
    return <p className={styles.loading}>Yüklənir...</p>;
  if (errorProducts || errorUsers)
    return <p className={styles.error}>Xəta baş verdi...</p>;

  return (
    <div className={styles.admin}>
      {/* Add/Edit Section */}
      <div className={styles.addSection}>
        <button onClick={toggleForm} className={styles.addButton}>
          {editId ? 'Məhsulu redaktə et' : 'Yeni məhsul əlavə et'}{' '}
          {isFormVisible ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isFormVisible && (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <label>Image URL</label>
            <input name="image" value={formik.values.image} onChange={formik.handleChange} />
            <label>Title</label>
            <input name="title" value={formik.values.title} onChange={formik.handleChange} />
            <label>Price</label>
            <input
              name="price"
              type="number"
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            <label>Category</label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
            >
              <option value="">Seçin</option>
              <option value="3d">3D</option>
              <option value="illustration">Illustration</option>
              <option value="vector">Vector</option>
              <option value="template">Template</option>
            </select>
            <button type="submit" className={styles.submitButton}>
              {editId ? 'Yenilə' : 'Əlavə et'}
            </button>
          </form>
        )}
      </div>

      {/* Control Panel (Search + Sort) */}
      <div className={styles.controlPanel}>
        <input
          type="text"
          placeholder="Məhsul axtar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={() => setSortBy('price')}>
          {sortBy === 'price' ? (sortOrder === 'asc' ? 'Ucuz→Bahalı' : 'Bahalı→Ucuz') : 'Qiymət'}
        </button>
        <button onClick={() => setSortBy('title')}>
          {sortBy === 'title' ? (sortOrder === 'asc' ? 'A→Z' : 'Z→A') : 'Başlıq'}
        </button>
        <button onClick={() => setSortOrder((o) => (o === 'asc' ? 'desc' : 'asc'))}>
          {sortOrder === 'asc' ? 'Artan' : 'Azalan'}
        </button>
      </div>

      {/* Products Table */}
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Şəkil</th>
            <th>Başlıq</th>
            <th>Qiymət</th>
            <th>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((item) => (
            <AdminCardProduct
              key={item._id}
              product={item}
              onDelete={() => deleteProducts(item._id)}
              onEdit={() => handleEdit(item)}
            />
          ))}
        </tbody>
      </table>

      {/* Users Table */}
      <h2>İstifadəçilər (Admin)</h2>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ad</th>
            <th>Email</th>
            <th>Əməliyyat</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <AdminCardUser
              key={u._id}
              user={u}
              onDelete={() => handleDeleteUser(u._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSection;
