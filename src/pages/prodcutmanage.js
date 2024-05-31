// Productmanage.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Prodcutmanage = () => {
    const [manageProduct, setManageProduct] = useState([]);
    const [loading, setLoading] =useState(true)
    const navigate = useNavigate();

    const showproduct=()=>{
        fetch(`http://localhost:4000/showproductapi`)
        .then((res) => res.json())
        .then((pr) => {
            setManageProduct(pr);
            console.log(pr);
            setLoading(false)
        })
        .catch((error) => {
            console.error('Error fetching product data:', error);
            // Handle error state
        });

    }

    useEffect(() => {
        showproduct()
    }, []);

      const handledelete= async(e, uId)=>{
        e.preventDefault();
        console.log("pid",uId)
        try{
           const response=await axios.post("http://localhost:4000/deleteproduct",{uId})
           console.log(response.data.message);
           alert(response.data.message);
           showproduct()
        }
        catch(err){
            console.log(err)
        }
         
      }

    return (
        <div className="container">
            <h2>Manage Product Details</h2>
            <div className="table-responsive">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Product Description</th>
                            <th>Product Image</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>

                    
                         {
                            loading ? (
                                <h2>loading....</h2>
                            ):(
                                <tbody id="productTableBody">
                                     {manageProduct.map((value) => {
                            return (
                                <tr key={value.id}>
                                    <td>{value.name}</td>
                                    <td>{value.price}</td>
                                    <td>{value.des}</td>
                                    <td><img src={`http://localhost:4000/images/product/${value.pimage}`} height="30%" width="30%" /></td>
                                    <td><Link to={`/editproduct/${value._id}`} state={{value}} className="btn bg-success text-white">Edit</Link></td>
                                    <td><button onClick={(e)=>handledelete(e,value._id)} className="btn bg-danger text-white">Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                            )
                         }

                       
                </table>
            </div>
        </div>
    );
};

export default Prodcutmanage;
