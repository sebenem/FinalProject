import { configureStore } from "@reduxjs/toolkit";
import  productSlice from "./reducers/productSlice";
import  wishlistSlice  from "./reducers/wishlistSlice";
import basketSlice from "./reducers/basketSlice";
import  categorySlice  from "./reducers/categorySlice";
import  userSlice  from "./reducers/userSlice";

export const store = configureStore({
    reducer:{
        products: productSlice,
        wishlist: wishlistSlice,
       basket: basketSlice,
        category: categorySlice,
        user: userSlice
    }
})


export default store