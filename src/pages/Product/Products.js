import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";

import Zagalovok from "../../components/zagalovok";

const useStyles = makeStyles((theme) => ({
  block: {
    textDecoration: "none"
  }
}));

function Products() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
  }, [])


  async function getProducts() {
    await axios
      .get("http://delivery-food/admin/api/managedata.php?type=allgetproducts")
      .then((res) => {
        if (res.data != null) {
          setProducts(res.data);
        }
      });
  }

  const classes = useStyles();

  return (
    <>
      <Zagalovok text="Продукты" />
      <Link to="/addproduct"><Button variant="contained" style={{float: 'right', marginRight: '20px', marginBottom: "20px"}}><AddIcon /></Button></Link>
      <Grid container spacing={2}>
        

        {products.map((item) => {
          return (
            <Grid item xs={3}>
            <Link to={`product/${item.product_id}`} className={classes.block}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={`http://delivery-food//api/img/products/${item.img}`}
                  className={classes.productImg}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.productName}
                  </Typography>
                </CardContent>
              </Card>
              </Link>
            </Grid>
          )
        })}
       
        
      </Grid>
    </>
  );
}

export default Products;
