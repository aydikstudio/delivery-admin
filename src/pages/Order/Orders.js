import {useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link} from "react-router-dom";
import axios from "axios";
import Zagalovok from '../../components/zagalovok';
import {
  Container,
  FormControl,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";


export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    await axios
    .get("http://delivery-food/admin/api/managedata.php", {
      params: {
        type: "allorders",
      },
    })
    .then(function (response) {
      console.log(response.data);
      if(response.data != null) {
        setOrders(response.data);
      }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  return (
    <>
    <Zagalovok text="Заказы" />
    <div style={{ height: 400, width: '100%' }}>
    <TableContainer component={Paper}>
      <Table sx={{ width: 1650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Номер заказа</TableCell>
            <TableCell align="right">Номер телефона</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Сумма</TableCell>
            <TableCell align="right">Дата и время</TableCell>
            <TableCell align="right">Статус заказа</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 ? orders.map((row) => (
            <TableRow
              key={row.order_number}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell component="th" scope="row">
              <Link to={`/order/${row.order_number}`}>{row.order_number}</Link>
              </TableCell>
              <TableCell align="right">{row.phone} </TableCell>
              <TableCell align="right">{row.oplata == "cash" ? "Наличные" : "Безналичная оплата"}</TableCell>
              <TableCell align="right">{row.summa}</TableCell>
              
              <TableCell align="right">{row.date+ " "+row.time}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          )) : "Нет данных"}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
}
