import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import Illustrations from "../pages/illustrations/Illustrations";
import Dpages from "../pages/3d/Dpages";
import Templates from "../pages/templates/Templates";
import AdminPanel from "../pages/adminpanel/AdminPanel";
import Basket from "../pages/basket/Basket";
import WishlistPages from "../pages/wishlistpages/WishlistPages";
import Try from "../pages/triIt/Try";
import Vectors from "../pages/vectors/Vectors";
import Profil from "../pages/profil/Profil";
import NotFound from "../pages/notfound/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/illustra" element={<Illustrations />} />
        <Route path="/vectors" element={<Vectors />} />
        <Route path="/3d" element={<Dpages />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/basket" element={<Basket />} />
          <Route path="/wishlist" element={<WishlistPages />} />
            <Route path="/try" element={<Try />} />
            <Route path="/profil" element={<Profil/>}/>
               <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
