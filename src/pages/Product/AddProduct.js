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
import { Link } from "react-router-dom";
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

const useStyles = makeStyles((theme) => ({
  main: {},
}));

function AddProduct() {
  const [nameGood, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [openChooseCategory, setChooseCategory] = useState(false);
  const [levelCategory1, setLevelCategory1] = useState(0);
  const [parent, setParent] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);

  const handleCategoryClickOpen = () => {
    setChooseCategory(true);
  };

  const handleCategoryClose = () => {
    // setCategoryName('');
    // setLevelCategory1('');
    setChooseCategory(false);
  };

  useEffect(() => {
    if (nameGood.length > 0 && price.length > 0 && category.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nameGood, price]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);



  async function addCategory() {

    const formData = new FormData();

    formData.append("type", "addcategory");
    formData.append("name", categoryName);
    formData.append("level", levelCategory1);
    formData.append("parent", parent);

  await axios.get("http://delivery-admin/api/managedata.php?type=addcategory&name="+categoryName+"&level="+levelCategory1+"&parent="+parent,)
      .then((res) => {
        if (res.data == "yes") {
          alert("Добавлена категория");
          setCategoryName('');
          setLevelCategory1('');
          setParent('');
          handleCategoryClose();
          handleClose();
        }
      });
  
  }


  
  useEffect(() => {
    getCategories()
  }, [open]);


  async function getCategories() {
    await axios.get("http://delivery-admin/api/managedata.php?type=allgetcategories")
    .then((res) => {
      setCategories(res.data);
    });
  }

  return (
    <>
    
      <Zagalovok text="Добавление продукта" />
      <Grid container style={{ textAlign: "center" }}>
        <Grid xs={6}>
          <FormControl>
            <TextField
              id="outlined-basic"
              label="Наименование товара"
              value={nameGood}
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container mt={2} style={{ textAlign: "center" }}>
        <Grid xs={6}>
          <FormControl>
            <TextField
              id="outlined-basic"
              label="Цена"
              variant="outlined"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container mt={2} style={{ textAlign: "center" }}>
        <Grid xs={6}>
          <FormControl>
            <Typography style={{ cursor: "pointer" }} onClick={handleOpen}>
              Выберите категорию
            </Typography>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  onClick={handleCategoryClickOpen}
                  style={{ cursor: "pointer" }}
                >
                  Добавить категорию
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  <TreeView
                    aria-label="file system navigator"
                    sx={{
                      height: 240,
                      flexGrow: 1,
                      maxWidth: 400,
                      overflowY: "auto",
                    }}
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                  >

                    {/* <TreeItem nodeId="1" label="Applications">
                      <TreeItem nodeId="2" label="Calendar" />
                    </TreeItem>
                    <TreeItem nodeId="5" label="Documents">
                      <TreeItem nodeId="10" label="OSS" />
                      <TreeItem nodeId="6" label="MUI">
                        <TreeItem nodeId="8" label="index.js" />
                      </TreeItem>
                    </TreeItem> */}

                    {

                    categories.length > 0 && categories.map((item) => {
                        return(
                          <TreeItem nodeId={item.category_id} label={item.name}>
                            {item.name}
                          </TreeItem>
                        )
                      })
                    }
                  </TreeView>
                </Typography>
                <Typography
                  onClick={handleClose}
                  style={{ cursor: "pointer" }}
                >
                  Закрыть
                </Typography>
              </Box>
              
            </Modal>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container mt={2} style={{ textAlign: "center" }}>
        <Grid xs={6}>
          <Button variant="contained" component="label">
            Upload File
            <input type="file" hidden />
          </Button>
        </Grid>
      </Grid>
      <Grid container mt={2} style={{ textAlign: "center" }}>
        <Grid xs={6}>
          <Button variant="outlined" disabled={disabled}>
            Добавить
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={openChooseCategory}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Создать категорию"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormControl>
              <TextField
                id="outlined-basic"
                label="Наименование категории"
                variant="outlined"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth style={{ marginTop: "20px" }}>
              <InputLabel id="demo-simple-select-label">Выбрать подкатегорию</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={levelCategory1}
                onChange={setLevelCategory1}
              >
                <MenuItem value={0}>Сделать родительским</MenuItem>
              </Select>
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCategoryClose}>Закрыть</Button>
          <Button onClick={addCategory} autoFocus>
            Добавить категорию
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddProduct;
