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
  TableRow,
  Pagination,
  PaginationItem
} from "@mui/material";


export default function Orders() {

  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [salePerPage] = useState(20);

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



  const lastShipmentIndex = currentPage * salePerPage;
  const firstShipmentIndex = lastShipmentIndex - salePerPage;
  const currentShipment = orders.slice(firstShipmentIndex, lastShipmentIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
    <Zagalovok text="Заказы" />

    <TableContainer component={Paper} style={{ width: 1350, overflow:  "hidden"}}>
      <Table  aria-label="simple table">
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
          {currentShipment.length > 0 ? currentShipment.map((row) => (
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
         <Pagination count={orders.length} renderItem={(item) => (
    <PaginationItem
      {...item}
      onClick={(e) => paginate(item.page)}
    />
  )}/>
        </TableBody>
      </Table>
    </TableContainer>
 
    </>
  );
}
