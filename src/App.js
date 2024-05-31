// App.js
import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Showproduct from './pages/showproduct';
import Addproduct from './pages/addproduct';
import Singleproduct from './pages/singleproduct';
import Productmanage from './pages/prodcutmanage';
import Editproduct from './pages/editproduct';
 // Custom hook for authentication

function App() {
 

  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/showproduct' element={ <Showproduct />  } />
        <Route path='/addproduct' element={<Addproduct />  } />
        <Route path="/singleproduct/:id" element={ <Singleproduct /> } />
  <Route path='/productmanage' element={<Productmanage/>}/>
        <Route path="/editproduct/:id" element={ <Editproduct /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
