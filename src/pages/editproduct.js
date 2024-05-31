// Editproduct.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';


const Editproduct = () => {

    const navigate=useNavigate()
   
    const location = useLocation();
    console.log(location.state.value);

    const [productdata,setproductdata]=useState({
        uid: location.state.value._id,
        name: location.state.value.name,
        price: location.state.value.price,
        des: location.state.value.des,
        pimage: location.state.value.pimage,
    })


    const handleonchange=(e)=>{
         const {name, value}=e.target;

         setproductdata((pre)=>({
               ...pre,
               [name]: value,
         }))

    }

    const acceptpic=(e)=>{
        setproductdata((pre)=>({
           ...pre,
           pimage: e.target.files[0] 
           
        }))
        
    }


    const handlesubmit=async(e)=>{
           e.preventDefault();
           console.log(productdata);

           try{

                const data = new FormData()

                for(const key in productdata)
            {
                    data.append(key,productdata[key])
                }

                const res= await axios.post(`http://localhost:4000/updateproduct`,data)

                if(res.status==200)
                    {
                        console.log("product updated succeesfully")
                        navigate("/productmanage")
                    }
           }
           catch(err){
              console.log(err)
           }
    }


    return (
        <div className="container">
            <h2>Edit Product</h2>
            <form onSubmit={handlesubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={productdata.name}  onChange={handleonchange} className="form-control" id="name" placeholder="Enter product name.." required />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" value={productdata.price}  onChange={handleonchange} className="form-control" id="price" placeholder="Enter product price.." required />
                </div>
                <div className="form-group">
                    <label htmlFor="des">Description</label>
                    <input type="text" name="des" value={productdata.des}  onChange={handleonchange}  className="form-control" id="des" placeholder="Enter product description.." required />
                </div>
                <div className="form-group">
                    <label htmlFor="productimage">Product Image</label>
                    <input type="file" name="pimage" onChange={acceptpic} className="form-control-file" id="productimage" accept="image/*" required />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </div>
    );
};

export default Editproduct;
