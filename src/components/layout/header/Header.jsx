import React from 'react'
import style from './Header.module.scss'
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { FaRegHeart } from "react-icons/fa6";
import { SlBasketLoaded } from "react-icons/sl";
import { FaRegUserCircle } from "react-icons/fa";

import { useNavigate } from 'react-router-dom';
const Header = () => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleWishlistClick = () => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/wishlist');
    } else {
      alert("Zəhmət olmasa əvvəlcə daxil olun.");
      navigate('/login');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.conTop}>
        <div className={style.logo} onClick={()=> navigate('/')}>
<h2>St</h2>
<h3>Adobe Stock</h3>
        </div>
       <div className={style.navbar}>
          <ul>
           <li><a href="/">Home</a></li>
            <li><a href="/illustra">Illustrations</a></li>
            <li><a href="/3d">3D</a></li>
            <li><a href="/vectors">Vectors</a></li>
            <li><a href="/templates">Templates </a></li>
          </ul>
        </div>
        <div className={style.basket}>
         <FaRegHeart onClick={()=>navigate('/wishlist')}/>
          <SlBasketLoaded onClick={()=> navigate('/basket')}/>
            <FaRegUserCircle onClick={()=> navigate('/admin')}/>
        </div>
        <div className={style.login}>
          <button onClick={()=> navigate('/login')}>Login</button>
          <button onClick={()=>navigate('/signup')}>Sign up</button>
        </div>
        
        <div className={style.menu} onClick={toggleDrawer}>
<RxHamburgerMenu className={style.burger}/>

        </div>
           <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className={style.bala}
            >
                  <div className={style.list}>
             <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/illustra">Illustrations</a></li>
            <li><a href="/3d">3D</a></li>
            <li><a href="/vectors">Vectors</a></li>
            <li><a href="/templates">Templates </a></li>
          </ul>
          <button>Login</button>
          <button>Sign up</button>
          
        </div>
            </Drawer>
     
      </div>
    
    </div>
  )
}

export default Header
