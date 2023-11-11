import React, { Fragment, useEffect } from 'react'
import "./Home.css"
import ProductCard from './ProductCard'
import {clearError, getProducts} from "../../actions/productActions"
import {useSelector,useDispatch} from "react-redux"
import Loader from '../layout/Loader/Loader'
import {useAlert} from "react-alert"
import cover from "../../images/headphones.webp"

const Home = () => {
  const alert = useAlert();
  const {loading,error,products} = useSelector(state=>state.products);
  const dispatch = useDispatch();


  useEffect(()=>{

    if(error){
      alert.error(error);
      dispatch(clearError())
    }
    
     dispatch(getProducts());

  },[dispatch,alert,error])


  return (
  <Fragment>
    {loading ? <Loader /> : <Fragment>
        <div className='banner-container'>
        <div className='banner'>
            <p>Welcome to ECOMMERCE</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll
              </button>
            </a>
        </div>
        <div>
          <img src={cover} alt="cover-pic"/>
        </div>
        </div>
        <h2 className='homeHeading'>Fetured Products</h2>
        <div className='container' id='container'>
           {products && products.map((product)=>{
            return (
              <ProductCard product={product} />
            )
           })}
        </div>
    </Fragment>}
  </Fragment>
  )
}

export default Home