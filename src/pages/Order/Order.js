import {useState} from "react";
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
  const [status, setStatus] = useState('unprocessed');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const { id } = useParams();
  const classes = useStyles();

  return (
    <>
      <Zagalovok text={"Заказ №" + id} />
      <Grid container>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <Typography variant={"h6"}>Сумма</Typography>
              <Typography compoment={"p"}>3000 руб.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <Typography variant={"h6"}>Кол-во</Typography>
              <Typography compoment={"p"}>20 шт.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <Typography variant={"h6"}>Комментарий клиента</Typography>
              <Typography compoment={"p"}>Позвонить за 20 мин.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <Typography variant={"h6"}>Способ оплаты</Typography>
              <Typography compoment={"p"}>Наличными.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
              <Typography variant={"h6"}>Контакты клиента</Typography>
              <Typography compoment={"p"}>Телефон: +79152783333</Typography>
              <Typography compoment={"p"}>Email: +79152783333</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={2}>
          <Card className={classes.blockOrder}>
            <CardContent>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Статус</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Статус"
          onChange={handleChange}
        >
          <MenuItem value={"deleted"}>Удалено</MenuItem>
          <MenuItem value={"unprocessed"}>Необработано</MenuItem>
          <MenuItem value={"processed"}>Обработано</MenuItem>
          <MenuItem value={"delivered"}>Доставлено</MenuItem>
        </Select>

      </FormControl>
              
            </CardContent>
            <CardActions style={{ justifyContent: 'center'}}>
            <Button variant="outlined">Сохранить</Button>
      </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid mt={15}>
      <Grid item xs={10}>
        <Paper elevation={3}>
        <Grid container>
        <Grid item xs={3}>
          <img src="/images/products/domikvderevne.png" className={classes.blockImg}/>
          </Grid>
          <Grid item xs={3}  className={classes.blockPaperText}>
          <Typography >Домик в деревне</Typography>
          </Grid>
          <Grid item xs={3} className={classes.blockPaperText}>
          <Typography  >Кол-во: 3 шт.</Typography>
          </Grid>
          <Grid item xs={3} className={classes.blockPaperText}>
          <Typography >Сумма: 3000 руб.</Typography>
          </Grid>
          </Grid>
        </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Order;
