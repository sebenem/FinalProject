import React from 'react'
import style from './Login.module.scss'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate =useNavigate()
  return (
    <div className={style.container}>
       <div className={style.logo} onClick={()=>navigate ('/')}>
<h2>St</h2>
<h3>Adobe Stock</h3>
        </div>
        <div className={style.login}>
            <h2>Sign in</h2>
            <p>New user? <a href=""> Create an account</a></p>
            <input type="email" placeholder='Email' />
            <input type="password" placeholder='Password' />
            <div className={style.batn}>
                <span><a href="">Qeydiyyatdan keç</a></span>
                <button>Continue</button>
            </div>
        </div>
    </div>
  )
}

export default Login


