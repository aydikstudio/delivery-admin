import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link} from "react-router-dom";
import Zagalovok from '../../components/zagalovok';

const columns = [
  { field: 'id', headerName: 'id заказа', width: 100,  renderCell: (cellValues) => {
    return <Link to={`/order/${cellValues.row.id}`}>{`${cellValues.row.id}`}</Link>;
  }},
  {
    field: 'number_phone',
    headerName: 'Номер телефона',
    width: 150,
    
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    
  },
  {
    field: 'summa_order',
    headerName: 'Сумма заказа',
    width: 150,
  },
  {
    field: 'date_order',
    headerName: 'Дата заказа',
    width: 200,
    
  },
  

  {
    field: 'status_order',
    headerName: 'Статус заказа',
    width: 160,
    
  },
];

const rows = [
  { id: 1, number_phone: '7888888888', email: 'Jon@mail.ru', summa_order: 355555, date_order: "02.10.2021 12:12:2021", status_order: 'Не обработано' }
];




export default function Orders() {


  return (
    <>
    <Zagalovok text="Заказы" />
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
    </>
  );
}
