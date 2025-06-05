import React from 'react'
import style from './SignUp.module.scss'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {

  const navigate =useNavigate()

  return (
      <div className={style.container}>
         <div className={style.logo} onClick={()=>navigate ('/')}>
  <h2>St</h2>
  <h3>Adobe Stock</h3>
          </div>
          <div className={style.login}>
              <h2>Sign up</h2>
             <div className={style.form}>
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Surname' />
                <input type="date" />
                  <input type="email" placeholder='Email' />
              <input type="password" placeholder='Password' />
             </div>
            
              <div className={style.batn}>
                  <p><a href="" onClick={()=>navigate('/login')}>Continue</a></p>
                  <button>Qeydiyyatdan keç</button>
              </div>
          </div>
      </div>
  )
}

export default SignUp
