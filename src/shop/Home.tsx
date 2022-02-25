import React from 'react'
import Header from './Header'
import Products from './Products'
import Swal from 'sweetalert2'

export default function Home() {

  if (localStorage.getItem('account')) {
    return (
      <>
      <Header/>
      <div className="hero">
        <div className="card bg-dark text-white border-0">
          <img style={{height:'600px'}} src="./bg.jpg" className="card-img" alt="Background" height="550px" />
          <div className="card-img-overlay d-flex flex-column justify-content-center">
              <div className="container">
            <h5 style={{fontWeight:'500'}} className="card-title display-4 mb-0">NEW SEASON ARRIVALS</h5>
            <p className="card-text lead fs-2">
              CHECK OUT ALL THE TRENDS
            </p>
              </div>
          </div>
        </div>
        <Products/>
      </div>
      </>
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
