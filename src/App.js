import {
  Routes,
  Route,
} from "react-router-dom";
import { makeStyles } from '@mui/styles';
import Home from "./pages/Main";
import Orders from "./pages/Orders";

import HeaderComponent from "./components/header/HeaderComponent";
import { Box } from "@mui/system";
import Grid from '@mui/material/Grid';

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
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      </Grid>
      </Grid>
      
    </>
  );
}

export default App;
