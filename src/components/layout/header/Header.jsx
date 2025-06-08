import React from 'react'
import style from './Header.module.scss'
import { RxHamburgerMenu } from "react-icons/rx";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import { useNavigate } from 'react-router-dom';
const Header = () => {

  const navigate = useNavigate()
      const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }

    

  return (
    <div className={style.container}>
      <div className={style.conTop}>
        <div className={style.logo}>
<h2>St</h2>
<h3>Adobe Stock</h3>
        </div>
       <div className={style.navbar}>
          <ul>
           <li><a href="/">Home</a></li>
            <li><a href="/illustra">Illustrations</a></li>
            <li><a href="/3d">3D</a></li>
            <li><a href="">Videos</a></li>
            <li><a href="/templates">Templates </a></li>
          </ul>
        </div>
        <div className={style.basket}>
         <img src="/images/gps_13897298.png" alt="Cart" /> 
<img src="/images/shopping-cart.png" alt="Cart" onClick={()=> navigate('/basket')} />
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
            <li><a href="">Videos</a></li>
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
