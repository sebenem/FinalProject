import React from 'react';
import { FaEdit } from 'react-icons/fa';
import style from './AdminCard.module.scss';

const AdminCardProduct = ({ product, onDelete, onEdit }) => {
  return (
    <tr>
      <td>
        <img className={style.productImage} src={product.image} alt={product.title} />
      </td>
      <td>{product.title}</td>
      <td>{product.price} ₼</td>
      <td>
        <button onClick={() => onDelete(product._id)} className={style.deleteButton}>
          Sil
        </button>
        <button onClick={() => onEdit(product)} className={style.editButton}>
          <FaEdit />
        </button>
      </td>
    </tr>
  );
};

export default AdminCardProduct;
