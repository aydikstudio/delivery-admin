import { useState, useEffect } from "react";
import Zagalovok from "../../components/zagalovok";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import axios from "axios";

let config = require("../../config");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CategoryEdit() {
  const {id} = useParams();
  const [categories, setCategories] = useState([]);

  const [parent, setParent] = useState(0);
  const [category, setCategory] = useState(0);
  const [name, setName] = useState("");

  const [downloadreportFileCategory, setdownloadreportFileCategory] =
    useState("");





  useEffect(() => {
    getData()
    getCategories()
  }, [])


  async function getData() {
    await axios
      .get("http://delivery-food/admin/api/managedata.php?type=getDataCategoryById&id="+id)
      .then((res) => {
        if (res.data != null) {
          setName(res.data[0].name)
          setCategory(res.data[0].category_id)
          setParent(res.data[0].parent_id)
        }
      });
  }



  async function getCategories() {
    await axios
      .get("http://delivery-food/admin/api/managedata.php?type=allgetcategories")
      .then((res) => {
        if (res.data != null) {
          setCategories(res.data);
        }
      });
  }


  async function updateProduct() {
    const formData = new FormData();
 
    formData.append("downloadreportFileCategory", downloadreportFileCategory);
    formData.append("name", name);
    formData.append("category_id", category);
    formData.append("type", "updatecategory");
    formData.append("parent_id", parent);

   

  if(!downloadreportFileCategory && parent == 0) {

    alert("Добавьте фото для родительской категории");
    return;
    
  }
    return await axios
      .post("http://delivery-food/admin/api/managedata.php", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data == "yes") {
          alert("Категория обновлена");
          window.location.reload();
        }

        if (res.data == "no") {
          alert("Категория необновлена");
        }
      });
  }

  function onChangeFileOrderProduct(e) {
    setdownloadreportFileCategory(e.target.files[0]);
  }



  return (
    <>
      <Zagalovok text="Редактирование категории" />
      <Grid container style={{ textAlign: "center" }}>
        <Grid xs={12}>
          <FormControl>
            <TextField
              id="outlined-basic"
              value={name}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>


      <Grid  mt={4} container style={{ textAlign: "center" }}>

        <Grid xs={12}>
        <FormControl fullWidth>
  <Select
   labelId="demo-simple-select-label"
   id="demo-simple-select"
    value={parent}
    label="Выберите родительскую категорию"
    onChange={(e) => setParent(e.target.value)}
  >
  
     <MenuItem value={0}>Сделать родительским</MenuItem>
    {categories.filter((item1) => item1.category_id != category).map((item) => {
      return (
        <MenuItem value={item.category_id}>{item.name}</MenuItem>
      )
    })}
   
  </Select>
</FormControl>
        </Grid>
      </Grid>
      {parent == 0 && (
        <Grid container mt={2} style={{ textAlign: "center" }}>
        <Grid xs={6}>
          <Button variant="contained" component="label">
            Загрузка картинки
            <input type="file" onChange={onChangeFileOrderProduct} hidden />
          </Button>
        </Grid>
      </Grid>
      )}
      
      <Grid container mt={2} style={{ textAlign: "center" }}>
        <Grid xs={6}>
          <Button
            variant="outlined"
            onClick={(e) => updateProduct()}
          >
            Обновить
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default CategoryEdit;
