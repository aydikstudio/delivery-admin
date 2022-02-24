import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { makeStyles } from "@mui/styles";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CardActions from '@mui/material/CardActions';
import { Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Zagalovok from "../../components/zagalovok";


const useStyles = makeStyles((theme) => ({
  blockOrder: {
    textAlign: "center",
    width: "200px",
  },
  blockImg: {
    width: "150px"
  },
  blockPaperText: {
   display: "flex",
    alignItems: "center"
  }
}));

function Order() {
  const { id } = useParams();
 
  const [status, setStatus] = useState('unprocessed');
  const [order, setOrder] = useState({});
  const [orders, setOrders] = useState([]);
  const [summa, setSumma] = useState();

  const handleChange = (event) => {
    setStatus(event.target.value);
  };


  useEffect(() => {
    getOrder();
    getOrders();
  }, [])


  async function getOrder() {
    await axios
    .get("http://delivery-food/admin/api/managedata.php", {
      params: {
        type: "getorder",
        id: id
      },
    })
    .then(function (response) {

      if(response.data != null) {

        setOrder(response.data[0]);
        setSumma(response.data[0].summa);
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function getOrders() {

    await axios
    .get("http://delivery-food/admin/api/managedata.php", {
      params: {
        type:  "getorders",
        id: id
      }
    })
    .then(function (response) {

      if(response.data != null) {

        setOrders(response.data);      }
      
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  async function saveUpdated() {
    await axios
    .get("http://delivery-food/admin/api/managedata.php", {
      params: {
        type:  "updateddata",
        summa: summa,
        status: status,
        id: id
      }
    })
    .then(function (response) {

      if(response.data == "yes") {
        alert("Данные обновлены");
       window.location.href = "/orders";
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const classes = useStyles();
  return (
    <>
      <Zagalovok text={"Заказ №" + id} />
      <Grid container>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <Typography variant={"h6"}>Сумма</Typography>
              <TextField id="outlined-basic" label="Скорректировать сумму" variant="outlined" value={summa} onChange={(e) => setSumma(e.target.value)}/>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <Typography variant={"h6"}>Кол-во</Typography>
              <Typography compoment={"p"}>{orders.reduce((prev,curr) => prev + parseInt(curr.count), 0)} шт.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <Typography variant={"h6"}>Комментарий клиента</Typography>
              <Typography compoment={"p"}>{order.descriptions}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <Typography variant={"h6"}>Способ оплаты</Typography>
              <Typography compoment={"p"}>{order.oplata == "cash" ? "Наличные" : "Безналичная оплата"}</Typography>
              <Typography compoment={"p"}>{order.change && order.change-summa} руб.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <Typography variant={"h6"}>Контакты клиента</Typography>
              <Typography compoment={"p"}>Телефон: {order.phone}</Typography>
              <Typography compoment={"p"}>Email: {order.email}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <p>Статус: <b>{order.status}</b></p>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Статус</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={order.status}
          label="Статус"
          onChange={handleChange}
        >
          <MenuItem value={"Создан"}>Создан</MenuItem>
          <MenuItem value={"Неактуально"}>Неактуально</MenuItem>
          <MenuItem value={"Обработан"}>Обработан</MenuItem>
          <MenuItem value={"Доставлен"}>Доставлен</MenuItem>
        </Select>

      </FormControl>
              
            </CardContent>
            <CardActions style={{ justifyContent: 'center'}}>
            <Button variant="outlined" onClick={(e) => saveUpdated()}>Сохранить</Button>
      </CardActions>
          </Card>
        </Grid>
      </Grid>
      {orders.length > 0 ? orders.map((item) => {
        return (
          <Grid mt={5}>
          <Grid item xs={10}>
            <Paper elevation={3}>
            <Grid container>
            <Grid item xs={3}>
              <img src={`http://delivery-food//api/img/products/${item.img}`} className={classes.blockImg}/>
              </Grid>
              <Grid item xs={2}  className={classes.blockPaperText}>
              <Typography >{item.productName}</Typography>
              </Grid>
              <Grid item xs={2} className={classes.blockPaperText}>
              <Typography  >Кол-во: {item.count} шт.</Typography>
              </Grid>
              <Grid item xs={2} className={classes.blockPaperText}>
              <Typography  >За шт цена: {item.summa} руб.</Typography>
              </Grid>
              <Grid item xs={2} className={classes.blockPaperText}>
              <Typography >Сумма: {item.count * item.summa} руб.</Typography>
              </Grid>
              </Grid>
            </Paper>
            </Grid>
          </Grid>
          
        )
      }) : "Нет данных"}
     
    </>
  );
}

export default Order;
