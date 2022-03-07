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
import { Container, Pagination, PaginationItem } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  block: {
    textDecoration: "none"
  }
}));

function Products() {

  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [salePerPage] = useState(20);

  useEffect(() => {
    getProducts()
  }, [])


  async function getProducts() {
    await axios
      .get("http://delivery-food/admin/api/managedata.php?type=allgetproducts")
      .then((res) => {
        if (res.data != null) {
          setProductsFiltered(res.data);
          setProducts(res.data);
        }
      });
  }

  function filterData(e) {
    let filteredList = [];
    if (products.length > 0) {
      filteredList = products.filter(function (item) {
        return (
          item.productName
            .toLowerCase()
            .search(e.target.value.trim().toLowerCase()) !== -1
        );
      });

      setProductsFiltered(filteredList);
    }
  }


  const lastShipmentIndex = currentPage * salePerPage;
  const firstShipmentIndex = lastShipmentIndex - salePerPage;
  const currentShipment = productsFiltered.slice(firstShipmentIndex, lastShipmentIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  

  const classes = useStyles();

  return (
    <>
     <Container maxWidth="md" >
      <Zagalovok text="Продукты" />
      <input
                  type="text"
                  class="form-control"
                  placeholder="Наименование товара"
                  onChange={(e) => filterData(e)}
                />
      <Link to="/addproduct"><Button variant="contained" style={{float: 'right', marginRight: '20px', marginBottom: "20px"}}><AddIcon /></Button></Link>
      </Container>

      <Container style={{width: "1500px"}}>
      <Grid container spacing={2}>
     

        {currentShipment.map((item) => {
          return (
            <Grid item xs={3}>
            <Link to={`/product/${item.productId}`} className={classes.block}>
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
      <Pagination count={products.length} renderItem={(item) => (
    <PaginationItem
      {...item}
      onClick={(e) => paginate(item.page)}
    />
  )}/>
      </Container>
    </>
  );
}

export default Products;
