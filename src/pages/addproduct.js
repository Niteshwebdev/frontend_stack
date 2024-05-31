import React, { useState } from 'react';
import '../addproduct.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Addproduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    des: "",
    pimage: null
  });

  const accept = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const acceptPic = (e) => {
    setProduct((prev) => ({
      ...prev,
      pimage: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("des", product.des);
    formData.append("pimage", product.pimage);

    try {
      const res = await axios.post(`http://localhost:4000/addproductapi`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res);
      if (res.data.success) {
        alert("Product added successfully");
        navigate("/showproduct");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Product Data</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={accept}
            className="form-control"
            id="productName"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={accept}
            className="form-control"
            id="productPrice"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescription">Product Description:</label>
          <textarea
            className="form-control"
            name="des"
            onChange={accept}
            id="productDescription"
            rows={3}
            required
            defaultValue={""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Product Image:</label>
          <input
            type="file"
            name="pimage"
            onChange={acceptPic}
            className="form-control-file"
            id="productImage"
            accept="image/*"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Addproduct;
