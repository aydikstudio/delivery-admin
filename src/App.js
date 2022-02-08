import {
  Routes,
  Route,
} from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Home from "./pages/Main";
import Orders from "./pages/Order/Orders";

import HeaderComponent from "./components/header/HeaderComponent";
import Grid from '@mui/material/Grid';
import Products from "./pages/Product/Products";
import NotPage from "./pages/NotPage";
import AddProduct from "./pages/Product/AddProduct";
import Order from "./pages/Order/Order";

 const useStyles = makeStyles((theme) => ({
  main: {
   
  }
}))

function App() {

  
  const classes = useStyles();

  return (
    <>
    <HeaderComponent />
    <Grid container>
    <Grid xs={2}></Grid>
    <Grid xs={10}>
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="*" element={<NotPage />} />
      </Routes>
      </Grid>
      </Grid>
      
    </>
  );
}

export default App;
