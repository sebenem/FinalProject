import React, { useEffect, useState } from 'react';
import style from './Header.module.scss';
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { FaRegHeart } from "react-icons/fa6";
import { SlBasketLoaded } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdNightlight } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user;

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  const toggleDrawer = () => {
    setIsOpen(prev => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  // Dark class-ını body-yə əlavə et və saxla
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigateWithAuth = (path, type) => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectAfterLogin", JSON.stringify({ type }));
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.conTop}>
        <div className={style.logo} onClick={() => navigate('/')}>
          <h2>St</h2>
          <h3>Adobe Stock</h3>
        </div>

        <div className={style.navbar}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/illustra">Illustrations</a></li>
            <li><a href="/3d">3D</a></li>
            <li><a href="/vectors">Vectors</a></li>
            <li><a href="/templates">Templates</a></li>
          </ul>
        </div>

        <div className={style.basket}>
          <FaRegHeart onClick={() => handleNavigateWithAuth('/wishlist', 'wishlist')} />
          <SlBasketLoaded onClick={() => handleNavigateWithAuth('/basket', 'basket')} />
          <FaRegUserCircle onClick={() => handleNavigateWithAuth('/admin', 'admin')} />
          <MdNightlight onClick={toggleDarkMode} style={{ cursor: 'pointer' }} />
        </div>

        <div className={style.login}>
          {!isLoggedIn ? (
            <>
              <button onClick={() => navigate('/login')}>Giriş</button>
              <button onClick={() => navigate('/signup')}>Qeydiyyat</button>
            </>
          ) : (
            <button onClick={() => navigate('/profil')}>Profilə keç</button>
          )}
        </div>

        <div className={style.menu} onClick={toggleDrawer}>
          <RxHamburgerMenu className={style.burger} />
        </div>

        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className={style.bala}
        >
          <div className={style.list}>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/illustra">Illustrations</a></li>
              <li><a href="/3d">3D</a></li>
              <li><a href="/vectors">Vectors</a></li>
              <li><a href="/templates">Templates</a></li>
            </ul>

            {!isLoggedIn ? (
              <>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/signup')}>Sign up</button>
              </>
            ) : (
              <button onClick={() => navigate('/profil')}>Profil</button>
            )}
          </div>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;

