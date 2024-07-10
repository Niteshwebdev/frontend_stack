import React, { useState } from 'react';
import '../login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from './loading';

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const res = await axios.post(`https://backend-stack-xi80.onrender.com/loginapi`, data);
      if (res.status === 200) {
        alert("Login successfully");
        navigate("/showproduct");
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.status === 400) {
        alert("Enter valid details");
      } else {
        alert("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <Loading />}
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>&nbsp;
        <Link to='/signup'>Create a new account?</Link>
      </form>
    </div>
  );
};

export default Login;
