import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import SignUp from '../pages/signup/SignUp'
import Illustrations from '../pages/illustrations/Illustrations'
import Dpages from '../pages/3d/Dpages'
import Templates from '../pages/templates/Templates'
import AdminPanel from '../pages/adminpanel/AdminPanel'

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/illustra' element={<Illustrations/>} />
      <Route path='/3d' element={<Dpages/>} />
          <Route path='/templates' element={<Templates/>} />
           <Route path='/admin' element={<AdminPanel/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default Router
