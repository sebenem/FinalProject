import React, { useEffect } from 'react'
import style from './ProductsSection.module.scss'
import { useDispatch } from 'react-redux'
import { getProductsThunk } from '../../../../redux/reducers/productSlice'
import { useParams } from 'react-router-dom'
const ProductsSection = () => {
  // const {categoryName} = useParams()
  // const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getProductsThunk())
  // }, [dispatch] )
  // const filterData = products.filter(product => product.category.toLowerCase() === categoryName.toLowerCase() )
  return (
    <div className={style.container}>
      
    </div>
  )
}

export default ProductsSection
