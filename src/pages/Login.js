import React, { useState } from 'react';
import '../login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const res = await axios.post(`http://localhost:4000/loginapi`, formData);
      if(res.status === 200) {
        alert("Login successfully");      
        navigate("/showproduct");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred");
    }
  };

  return (
    <div className="container">
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            name="email" 
            value={data.email} 
            onChange={handleChange} 
            className="form-control" 
            id="email" 
            placeholder="Enter your email" 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            name="password" 
            value={data.password} 
            onChange={handleChange} 
            className="form-control" 
            id="password" 
            placeholder="Enter your password" 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>&nbsp;
        <Link to='/signup'>Create a new account?</Link>
      </form>
    </div>
  );
};

export default Login;
