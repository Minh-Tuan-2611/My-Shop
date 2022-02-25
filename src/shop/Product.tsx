import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";
import axios from 'axios';
import Swal from 'sweetalert2'
import Header from './Header';
import { ADD_CART } from '../redux/types/cartType';

export default function Product() {

  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  var getData = () => {
    var promise = axios.get(`https://fakestoreapi.com/products/${id}`);
    promise.then((results) => {
      setLoading(false);
      setProduct(results.data);
    })
    promise.catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getData();
  }, [])

  var addCart = (product: any) => {
    dispatch({
      type: ADD_CART,
      product
    })
  }

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    )
  }

  const ShowProduct = (product: any) => {
    return (
      <>
        <div className="col-md-6">
          <img src={product.image} alt={product.title} height="400px" width="400px" />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">
            {product.category}
          </h4>
          <h1 className="display-5">{product.title}</h1>
          <p className="lead font-weight-bold">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 font-weight-bold my-4">
            $ {product.price}
          </h3>
          <p className="lead">{product.description}</p>
          <button className="btn btn-outline-dark " onClick={() => {
            Swal.fire(
              'Add Cart success',
              '',
              'success'
            )
            addCart(product);
          }}>
            Add to Cart
          </button>
          <NavLink to="/cart" className="btn btn-dark ml-2">
            Go to Cart
          </NavLink>
        </div>
      </>
      
    )
  }

  if (localStorage.getItem('account')) {
    return (
      <div>
        <Header />
        <div className="container py-5">
          <div className="row py-4">
            {loading ? Loading() : ShowProduct(product)}
          </div>
        </div>
      </div>
    )
  }
  else {
    Swal.fire(
      'Login Please !',
      '',
      'error'
    )
    setTimeout(() => {
      window.location.pathname = '/login';
    }, 1000);
    return (
      <div></div>
    )
  }
}
