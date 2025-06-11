import React, { useState } from 'react';
import style from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../../redux/reducers/userSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.user);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState(''); // Email mesajı üçün

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    if (e.target.name === 'email') {
      setMessage('Email daxil olunur...');

      // 3 saniyədən sonra mesajı sil
      setTimeout(() => {
        setMessage('');
      }, 3000);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(form));
    if (resultAction.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('token');
    navigate('/login');
  }

  // Əgər user varsa, email və logout göstər, yoxdursa login formu
  if (user) {
    return (
      <div className={style.container}>
        <div className={style.logo} onClick={() => navigate('/')}>
          <h2>St</h2>
          <h3>Adobe Stock</h3>
        </div>
        <div className={style.login}>
          <h2>Welcome, {user.email}</h2>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '20px',
              padding: '10px 15px',
              cursor: 'pointer',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            Çıxış
          </button>
        </div>
      </div>
    );
  }

  // Əks halda login formu göstər
  return (
    <div className={style.container}>
      <div className={style.logo} onClick={() => navigate('/')}>
        <h2>St</h2>
        <h3>Adobe Stock</h3>
      </div>

      <div className={style.login}>
        <h1>Sign in</h1>
        <p>
          New user?{' '}
          <a href="#" onClick={e => { e.preventDefault(); navigate('/signup') }}>
            Create an account
          </a>
        </p>

        <form className={style.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setMessage('Email sahəsinə daxil oldunuz')}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className={style.batn}>
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Continue'}
            </button>
          </div>
        </form>

        {message && <p style={{ color: 'blue', marginTop: '10px' }}>{message}</p>}
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
