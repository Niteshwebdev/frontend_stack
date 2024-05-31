import React from 'react';
import '../singleproduct.css';
import { useLocation } from 'react-router-dom';

const Singleproduct = () => {
  const location = useLocation();
  const { product } = location.state;

  return (
    <div>
      <h2>Single Product Details</h2>
      <div className="container">
        <div className="product-details">
          <img 
            src={`http://localhost:4000/images/product/${product.pimage}`} 
            alt={product.name} 
            className="product-img" 
          />
          <div className="product-info">
            <h3>{product.name}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.des}</p>
            <div className="add-to-cart">
              <label htmlFor="quantity">Quantity:</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity" 
                min={1} 
                defaultValue={1} 
                className="form-control mb-2" 
              />
              <button className="btn btn-primary">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singleproduct;
