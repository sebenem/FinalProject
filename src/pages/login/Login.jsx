import React, { useEffect, useState } from 'react';
import style from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logoutUser } from '../../redux/reducers/userSlice';
import { postBasketThunk } from '../../redux/reducers/basketSlice';
import { postWishlistThunk } from '../../redux/reducers/wishlistSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector(state => state.user);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      const redirectData = localStorage.getItem("redirectAfterLogin");
      if (redirectData) {
        const { type, item } = JSON.parse(redirectData);

        if (type === "basket") {
          dispatch(postBasketThunk(item));
        } else if (type === "wishlist") {
          dispatch(postWishlistThunk(item));
        }

        localStorage.removeItem("redirectAfterLogin");
        navigate("/"); // İstəyirsənsə `navigate(-1)` də edə bilərsən
      }
    }
  }, [user, dispatch, navigate]);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === 'email') {
      setMessage('Email daxil olunur...');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(form));
    if (resultAction.meta.requestStatus === 'fulfilled') {
      // yönləndirmə useEffect-də olacaq
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (user) {
    return (
      <div className={style.container}>
        <div className={style.logo} onClick={() => navigate('/')}>
          <h2>St</h2>
          <h3>Adobe Stock</h3>
        </div>
        <div className={style.login}>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Çıxış</button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.logo} onClick={() => navigate('/')}>
        <h2>St</h2>
        <h3>Adobe Stock</h3>
      </div>
      <div className={style.login}>
        <h1>Sign in</h1>
        <p>
         Hesabınız yoxdur?<a href="#" onClick={e => { e.preventDefault(); navigate('/signup') }}>Qeydiyyatdan keçin</a>
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
              {loading ? 'Loading...' : 'Davam et'}
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
