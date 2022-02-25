import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { DELETE_CART, INCREASE_CART, REDUCTION_CART } from '../redux/types/cartType';
import Header from './Header';
import Swal from 'sweetalert2'

export default function Cart() {

  var { cart } = useSelector((state: any) => state.cartReducer);

  var dispatch = useDispatch();

  var deleteCart = (id:any)=>{
    dispatch({
      type: DELETE_CART,
      id
    })
  }

  var increaseCart = (id:any)=>{
    dispatch({
      type: INCREASE_CART,
      id
    })
  }

  var reductionCart = (id:any)=>{
    dispatch({
      type: REDUCTION_CART,
      id
    })
  }

  const emptyCart = () => {
    return (
      <div className="px-4 rounded-3 py-5" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="container py-4">
          <div className="row justify-content-center">
            <img style={{ width: '300px' }} src="./no_cart.png" alt="" />
          </div>
          <div className="d-flex" style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h4 className="text-center">Cart Empty</h4>
            <NavLink to="/home">
              <button className="btn btn-dark m-2">
                Buy Now
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }

  const renderItem = (cart: any) => {
    return cart.map((product: any, item: any) => {
      return (
        <>
          <div className="px-4 my-5 bg-light rounded-3 py-5">
            <div className="container py-4">
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <img src={product.image} alt={product.title} height="200px" width="180px" />
                </div>
                <div className="col-md-4">
                  <h3>{product.title}</h3>
                  <p className="lead font-weight-bold">
                    {product.quantity} X ${product.price} = ${product.quantity * product.price}
                  </p>
                  <button className="btn btn-outline-dark mr-4" onClick={() => { reductionCart(product.id) }}>
                    <i className="fa fa-minus"></i>
                  </button>
                  <button className="btn btn-outline-dark mr-4" onClick={() => { increaseCart(product.id) }}>
                    <i className="fa fa-plus"></i>
                  </button>
                  <button className="btn btn-outline-dark" onClick={() => {deleteCart(product.id)}}>
                    DELETE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )
    })
  }

  if (localStorage.getItem('account')){
    return (
      <div>
        <Header />
        {cart.length === 0 ? emptyCart() : renderItem(cart)}
      </div>
    )
  }
  else{
    Swal.fire(
      'Login Please !',
      '',
      'error'
    )
    setTimeout(() =>{
      window.location.pathname = '/login';
    },1000);
    return (
      <div></div>
    )
  }
}
