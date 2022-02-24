import {
  Routes,
  Route,
} from "react-router-dom";
import { makeStyles } from '@mui/styles';
import {useEffect, useState} from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Home from "./pages/Main";
import Orders from "./pages/Order/Orders";
import Box from "@mui/material/Box";
import HeaderComponent from "./components/header/HeaderComponent";
import Grid from '@mui/material/Grid';
import Products from "./pages/Product/Products";
import NotPage from "./pages/NotPage";
import AddProduct from "./pages/Product/AddProduct";
import Order from "./pages/Order/Order";
import Product from "./pages/Product/Product";
import Button from '@mui/material/Button';
import Container from "@mui/material/Container";
import Auth from "./pages/Auth";

 const useStyles = makeStyles((theme) => ({
  main: {
   
  }
}))

function App() {

  
  useEffect(() => {
    checkAuth()
  }, []);


  async function checkAuth() {
    const formData = new FormData();
    formData.append("token", localStorage.getItem("user_token_admin"));
    formData.append("type","checklogin");

    await axios.post('http://delivery-food/admin/api/managedata.php', formData)
    .then(function (response) {
      if(response.data == "no") {
        localStorage.removeItem("user_token_admin")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  const classes = useStyles();

  return (
    <>
    <HeaderComponent />
    <Container>
    <Grid container>
      {localStorage.getItem("user_token_admin") ? (
        <div>
        <Grid xs={2}></Grid>
        <Grid xs={10}>
          <Routes>
            <Route path="/" element={<Orders />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/products" element={<Products />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="*" element={<NotPage />} />
          </Routes>
          </Grid>
          </div>
      ) : (
          <div style={{marginTop: "50px", marginLeft: "50px", textAlign: "center"}}>
           <Auth />
          </div>
      )}
    
      </Grid>
      </Container>
    </>
  );
}

export default App;
