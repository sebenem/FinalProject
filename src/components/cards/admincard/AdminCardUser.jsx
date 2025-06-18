import React from 'react';
import style from './AdminCard.module.scss';

const AdminCardUser = ({ user, onDelete }) => {
  return (
    <tr>
      <td>{user._id}</td>
      <td>{user.name || user.username || 'Ad yoxdur'}</td>
      <td>{user.email}</td>
      <td>
        <button onClick={() => onDelete(user._id)} className={style.deleteButton}>
          Sil
        </button>
      </td>
    </tr>
  );
};

export default AdminCardUser;

