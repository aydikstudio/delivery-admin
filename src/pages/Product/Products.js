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

  const classes = useStyles();

  return (
    <>
      <Zagalovok text="Продукты" />
      <Link to="/addproduct"><Button variant="contained" style={{float: 'right', marginRight: '20px', marginBottom: "20px"}}><AddIcon /></Button></Link>
      <Grid container spacing={2}>
        
        <Grid item xs={3}>
        <Link to="/" className={classes.block}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="240"
              image={'/images/products/domikvderevne.png'}
              className={classes.productImg}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Домик в деревне
              </Typography>
            </CardContent>
          </Card>
          </Link>
        </Grid>
        
      </Grid>
    </>
  );
}

export default Products;
