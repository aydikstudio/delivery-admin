import {
    Routes,
    Route,
  } from "react-router-dom";
  import { makeStyles } from '@mui/styles';
  import {useEffect, useState} from "react";
  import axios from "axios";
  import TextField from "@mui/material/TextField";
  import Box from "@mui/material/Box";
  import Button from '@mui/material/Button';
  
   const useStyles = makeStyles((theme) => ({
    main: {
     
    }
  }))
  
  function Auth() {
  
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
  
    async function AuthSubmitted() {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("password", password);
        formData.append("type","authSubmitted");

        await axios.post('http://delivery-food/admin/api/managedata.php', formData)
          .then(function (response) {
             
            if(response.data == 0) {
             alert("Неверный логин и/или пароль.");
            } else {
                localStorage.setItem("user_token_admin", response.data)
                window.location.reload();
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    const classes = useStyles();
  
    return (
      <>
  <Box><TextField
  hiddenLabel
  id="filled-hidden-label-small"
  placeholder="Логин"
  value={name}
  variant="filled"
  size="small"
  onChange={(e) => setName(e.target.value)}
/></Box>
<br/>
<Box><TextField
  hiddenLabel
  id="filled-hidden-label-normal"
  placeholder="Пароль"
  variant="filled"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/></Box><br/>
<Box>
<Button variant="contained" onClick={(e) => AuthSubmitted()}>Войти</Button>
</Box>
        
      </>
    );
  }
  
  export default Auth;
  