import React, { useState } from 'react';
import '../App.css';
import { Link,  useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {

   const Navigate = useNavigate();
  const [data,setdata]=useState({
    email: "",
    phone: "",
    password: "",
    role: "",
   profilePic: "",



  })
    
   const accept=(e)=>{
      const{name,value}=e.target;

      setdata((pre)=>({
        ...pre,
        [name]: value
      }))
   }

   
   
   const acceptpic=(e)=>{
       setdata((pre)=>({
          ...pre,
          profilePic: e.target.files[0] 
          
       }))
       console.log(data.profilePic)
   }


   const handlesubmit=async(e)=>{
    e.preventDefault()
    console.log(data)

    try{
      const res=await axios.post(`http://localhost:4000/signupapi`, data)
      if(res.data.success)
        {
          alert("registration successfully")
          Navigate("/showproduct")
        }
     
    }
    catch(err){
       console.log(err)
    }
 }





    return (
  
            <div className="container">
  <h2>User Registration</h2>
  <form action method="post" encType="multipart/form-data" onSubmit={handlesubmit}>
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input type="email" name="email" value={data.email} onChange={accept} className="form-control" id="email" placeholder="Enter your email.." required />
    </div>
    <div className="form-group">
      <label htmlFor="phone">Phone Number:</label>
      <input type="tel" name="phone" value={data.phone} onChange={accept} className="form-control" id="phone" placeholder="Enter your Phone.." required />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" value={data.password} onChange={accept}  className="form-control" placeholder="Enter your password.." id="password" required />
    </div>
    <div className="form-group">
      <label htmlFor="role">Role:</label>
      <select name="role" value={data.role} onChange={accept} className="form-control" required>
        <option value="user">User</option>
        <option value="store_manager">Store Manager</option>
      </select>
    </div>
     <div className="form-group">
      <label htmlFor="dp">Profile Picture (DP):</label>
      <input type="file" name="profilePic" onChange={acceptpic}   className="form-control-file" id="dp" accept="image/*" required />
    </div> 
    <button type="submit" className="btn btn-primary">Register</button>&nbsp;<Link to="/">Click here to login!</Link>
  </form>
</div>


       
    );
}

export default Signup;
