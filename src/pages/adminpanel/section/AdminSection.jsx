import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AdminSection.module.scss';
import { useFormik } from 'formik';
import { FaChevronDown, FaChevronUp, FaEdit } from 'react-icons/fa';

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

const AdminSection = () => {
  const dispatch = useDispatch();

  // Products state
  const products = useSelector((state) => state.products.products);
  const loadingProducts = useSelector((state) => state.products.loading);
  const errorProducts = useSelector((state) => state.products.error);

  // Users state
  const users = useSelector((state) => state.user.allUsers);
  const loadingUsers = useSelector((state) => state.user.loading);
  const errorUsers = useSelector((state) => state.user.error);

  // Local UI states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('price');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  // Toggle form visibility
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setEditId(null);
    formik.resetForm();
  };

  // Delete product handler
  const deleteProducts = (id) => {
    dispatch(deleteProductThunk(id));
  };

  // Filter and sort products
  const filteredProducts = products
    ?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    ?.sort((a, b) => {
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

  // Sort button label
  const getSortButtonLabel = () => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? 'Ən ucuzdan bahaya' : 'Ən bahadan ucuza';
    } else if (sortBy === 'title') {
      return sortOrder === 'asc' ? 'A-dan Z-yə' : 'Z-dən A-ya';
    }
    return 'Sırala';
  };

  // Formik form
  const formik = useFormik({
    initialValues: {
      image: '',
      title: '',
      price: '',
      category: '',
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editId) {
          await dispatch(editProductThunk({ id: editId, updatedProduct: values }));
        } else {
          await dispatch(addFormikThunk(values));
        }
        resetForm();
        setEditId(null);
        setIsFormVisible(false);
      } catch (error) {
        console.error('Xəta:', error);
      }
    },
  });

  // Edit product handler
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

  // Delete user handler
  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  // On component mount load products and users
  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loadingProducts || loadingUsers) return <p className={styles.loading}>Yüklənir...</p>;
  if (errorProducts || errorUsers) return <p className={styles.error}>Xəta baş verdi...</p>;

  return (
    <div className={styles.admin}>
      {/* Product add/edit section */}
      <div className={styles.addSection}>
        <button className={styles.addButton} onClick={toggleFormVisibility}>
          {editId ? 'Edit product' : 'Add new product'}{' '}
          {isFormVisible ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {isFormVisible && (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <label htmlFor="image">Image</label>
            <input
              id="image"
              name="image"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.image}
            />

            <label htmlFor="title">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
            />

            <label htmlFor="price">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
            />

            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
            >
              <option value="">Kateqoriya seçin</option>
              <option value="3d">3D</option>
              <option value="ilistrasiya">Illustration</option>
              <option value="vector">Vector</option>
              <option value="template">Templates</option>
            </select>

            <button type="submit" className={styles.submitButton}>
              {editId ? 'Yenilə' : 'Əlavə et'}
            </button>
          </form>
        )}
      </div>

      {/* Product control panel */}
      <div className={styles.controlPanel}>
        <h1>Admin Panel</h1>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Məhsul axtar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className={styles.sortSelect}
          onChange={(e) => setSortBy(e.target.value)}
          value={sortBy}
        >
          <option value="price">Qiymətə görə</option>
          <option value="title">Başlığa görə</option>
        </select>
        <button
          className={styles.sortButton}
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {getSortButtonLabel()}
        </button>
      </div>

      {/* Products table */}
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
          {filteredProducts?.map((item) => (
            <tr key={item._id}>
              <td>
                <img className={styles.productImage} src={item.image} alt={item.title} />
              </td>
              <td>{item.title}</td>
              <td>{item.price} ₼</td>
              <td>
                <button
                  onClick={() => deleteProducts(item._id)}
                  className={styles.deleteButton}
                >
                  Sil
                </button>
                <button onClick={() => handleEdit(item)} className={styles.editButton}>
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Users table */}
      <h2>İstifadəçilər siyahısı (Admin)</h2>
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
          {users?.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name || user.username || 'Ad yoxdur'}</td>
              <td>{user.email}</td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user._id)}
                  className={styles.deleteButton}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSection;
