import React, { useEffect, useState } from 'react';
import '../showproduct.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Showproduct = () => {

  const navigate= useNavigate()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:4000/showproductapi`);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false); // Set loading to false in case of an error
    }




  };


  return (
    <div className="container">
      <h2>Product Details</h2>
      <Link to="/addproduct" className="btn btn-success mb-3">Add Product</Link>
      <Link to="/productmanage" style={{marginLeft: "10px"}} className="btn btn-success mb-3">Manage Product</Link>
      <button   style={{marginLeft: "10px"}} className="btn btn-success mb-3">LogOut</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row" >
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <Link 
                to={`/singleproduct/${product.id}`}
                state={{ product }}
                className="product-link"
              >
                <div className="product-card">
                  <img 
                    src={`http://localhost:4000/images/product/${product.pimage}`} 
                    className="product-img" 
                    alt={product.name} 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price: ${product.price}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Showproduct;
