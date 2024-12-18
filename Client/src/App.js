import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.css';
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
// import Home from "./Pages/Frontend/Home";
import Index from "./Pages/Frontend/User/Index";
import ProductIndex from "./Pages/Frontend/Product";
import EditProduct from "./Pages/Frontend/Product/EditProduct";


function App() {
 


  return (
    <Routes>
      <Route
        path="/"
        element={ <Index/> }
      />
      <Route
        path="/auth/register"
        element={ <Register />}
      />
      <Route
        path="/auth/login"
        element={ <Login />}
      />
      <Route
        path="/todo"
        element={<Index/>}
      />
      <Route 
         path='/product/add-product'
         element={<ProductIndex/>}
         />
      <Route 
         path='/products/editProduct/:id'
         element={<EditProduct/>}
         />

      
    </Routes>
  );
}

export default App;
