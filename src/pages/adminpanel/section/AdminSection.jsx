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

  const products = useSelector((state) => state.products.products);
  const loadingProducts = useSelector((state) => state.products.loading);
  const errorProducts = useSelector((state) => state.products.error);

  const users = useSelector((state) => state.user.allUsers);
  const loadingUsers = useSelector((state) => state.user.loading);
  const errorUsers = useSelector((state) => state.user.error);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortBy, setSortBy] = useState('price');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editId, setEditId] = useState(null);

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    setEditId(null);
    formik.resetForm();
  };

  const deleteProducts = (id) => {
    dispatch(deleteProductThunk(id));
    dispatch()
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

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

  const getSortButtonLabel = () => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? 'Ən ucuzdan bahaya' : 'Ən bahadan ucuza';
    } else if (sortBy === 'title') {
      return sortOrder === 'asc' ? 'A-dan Z-yə' : 'Z-dən A-ya';
    }
    return 'Sırala';
  };

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
    onBlur={formik.handleBlur}
    value={formik.values.image}
  />

  <label htmlFor="title">Title</label>
  <input
    id="title"
    name="title"
    type="text"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.title}
  />

  <label htmlFor="price">Price</label>
  <input
    id="price"
    name="price"
    type="number"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.price}
  />

  <label htmlFor="category">Category</label>
  <select
    id="category"
    name="category"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
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
        {/* ...search and sort inputs... */}
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
            <AdminCardProduct
              key={item._id}
              product={item}
              onDelete={deleteProducts}
              onEdit={handleEdit}
            />
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
            <AdminCardUser key={user._id} user={user} onDelete={handleDeleteUser} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSection;
