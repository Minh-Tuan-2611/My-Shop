import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";

export default function Products() {

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  const getProducts = () => {
    var promise = axios.get('https://fakestoreapi.com/products');
    promise.then((results) => {
      setData(results.data);
      setFilter(results.data);
      setLoading(false);
    })
    promise.catch((err) => {

    })
  }

  useEffect(() => {
    getProducts();
  }, [])

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton style={{ height: '350px' }} />
        </div>
        <div className="col-md-3">
          <Skeleton style={{ height: '350px' }} />
        </div>
        <div className="col-md-3">
          <Skeleton style={{ height: '350px' }} />
        </div>
        <div className="col-md-3">
          <Skeleton style={{ height: '350px' }} />
        </div>
      </>
    );
  };

  const filterProduct = (type: any) => {
    var updateData = data.filter((item: any) => item.category === type);
    setFilter(updateData);
  }

  const renderProducts = () => {
    return (
      <>
        {filter.map((product: any, index: any) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={index}>
                  <img src={product.image} className="card-img-top" alt={product.title} height="250px" />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{product.title.substring(0, 12)}...</h5>
                    <p className="card-text lead font-weight-bold">
                      ${product.price}
                    </p>
                    <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </>
    )
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12 ">
            <h1 className="display-6 font-weight-bold text-center mt-3">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="buttons d-flex justify-content-center mb-3">
          <button className="btn btn-outline-dark m-2" onClick={() => setFilter(data)}>All</button>
          <button className="btn btn-outline-dark m-2" onClick={() => filterProduct("men's clothing")}>Men's Clothing</button>
          <button className="btn btn-outline-dark m-2" onClick={() => filterProduct("women's clothing")}>
            Women's Clothing
          </button>
          <button className="btn btn-outline-dark m-2" onClick={() => filterProduct("jewelery")}>Jewelery</button>
          <button className="btn btn-outline-dark m-2" onClick={() => filterProduct("electronics")}>Electronic</button>
        </div >
        <div className="row justify-content-center">
          {loading ? Loading() : renderProducts()}
        </div>
      </div>
    </div>
  )
}
