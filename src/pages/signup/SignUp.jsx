import React, { useState } from 'react'
import style from './SignUp.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/reducers/userSlice'

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.user)

  const [success, setSuccess] = useState(false) // ✅ Uğur mesajı üçün

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    date: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }

  const handleRegister = () => {
    const newUser = { ...formData }

    dispatch(registerUser(newUser)).then((res) => {
      if (!res.error) {
        setSuccess(true)
        setTimeout(() => {
          navigate('/')
        }, 2000) // ✅ 2 saniyə sonra yönləndir
      }
    })
  }

  return (
    <div className={style.container}>
      <div className={style.logo} onClick={() => navigate('/')}>
        <h2>St</h2>
        <h3>Adobe Stock</h3>
      </div>

      <div className={style.login}>
        <h2>Sign up</h2>

        <div className={style.form}>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} />
          <input type="text" name="surname" placeholder="Surname" onChange={handleChange} />
          <input type="date" name="date" onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>Qeydiyyatdan keçdiniz!</p>}

        <div className={style.batn}>
          <p>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login') }}>
             Artıq hesabınız var?
            </a>
          </p>
          <button onClick={handleRegister} disabled={loading}>
            {loading ? 'Göndərilir...' : 'Qeydiyyatdan keç'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignUp
