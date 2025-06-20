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

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.user); // Redux-dan istifadə edirsənsə
  const isLoggedIn = !!user;

  const toggleDrawer = () => {
    setIsOpen(prev => !prev);
  };

  const handleNavigateWithAuth = (path, type) => {
    if (!isLoggedIn) {
      localStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({ type })
      );
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.conTop}>
        {/* Logo */}
        <div className={style.logo} onClick={() => navigate('/')}>
          <h2>St</h2>
          <h3>Adobe Stock</h3>
        </div>

        {/* Navbar */}
        <div className={style.navbar}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/illustra">Illustrations</a></li>
            <li><a href="/3d">3D</a></li>
            <li><a href="/vectors">Vectors</a></li>
            <li><a href="/templates">Templates</a></li>
          </ul>
        </div>

        {/* İkonlar */}
        <div className={style.basket}>
          <FaRegHeart onClick={() => handleNavigateWithAuth('/wishlist', 'wishlist')} />
          <SlBasketLoaded onClick={() => handleNavigateWithAuth('/basket', 'basket')} />
          <FaRegUserCircle onClick={() => handleNavigateWithAuth('/admin', 'admin')} />
        </div>

        {/* Login / Profil */}
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

        {/* Hamburger menyu */}
        <div className={style.menu} onClick={toggleDrawer}>
          <RxHamburgerMenu className={style.burger} />
        </div>

        {/* Drawer menyu */}
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
