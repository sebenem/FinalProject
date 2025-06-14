import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AdminSection.module.scss';
import { useFormik } from 'formik';
import { FaChevronDown, FaChevronUp, FaEdit } from 'react-icons/fa';
import {
  addFormikThunk,
  deleteProductThunk,
  editProductThunk,
  getProductsThunk
} from '../../../redux/reducers/productSlice';

const AdminSection = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

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
  }, [dispatch]);

  if (loading) return <p className={styles.loading}>Yüklənir...</p>;
  if (error) return <p className={styles.error}>Xəta baş verdi...</p>;

  return (
    <div className={styles.admin}>
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
          onClick={() =>
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
          }
        >
          {getSortButtonLabel()}
        </button>
      </div>

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
                <img
                  className={styles.productImage}
                  src={item.image}
                  alt={item.title}
                />
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
                <button
                  onClick={() => handleEdit(item)}
                  className={styles.editButton}
                >
                  <FaEdit />
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
