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

function Product() {
  const {id} = useParams();
  const [nameGood, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [openChooseCategory, setChooseCategory] = useState(false);
  const [parent, setParent] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] =  useState([]);
  const [downloadreportFileProducts, setdownloadreportFileProducts] =
    useState("");
  const [downloadreportFileCategory, setdownloadreportFileCategory] =
    useState("");

  const handleCategoryClickOpen = () => {
    setChooseCategory(true);
  };

  const handleCategoryClose = () => {
    setChooseCategory(false);
  };

  useEffect(() => {
    if (nameGood.length > 0 && price.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nameGood, price]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getData()
  }, [])


  async function getData() {
    await axios
      .get("http://delivery-food/admin/api/managedata.php?type=getProductById&id="+id)
      .then((res) => {
        if (res.data != null) {
          setName(res.data[0].productName);
          setPrice(res.data[0].price);
          setDescription(res.data[0].description);
          getDataCategoryById(res.data[0].category_id);
        }
      });
  }


  
  async function getDataCategoryById(id) {
    await axios
      .get("http://delivery-food/admin/api/managedata.php?type=getDataCategoryById&id="+id)
      .then((res) => {
        if (res.data != null) {
          setCategory(res.data[0]);
        }
      });
  }






  async function addCategory() {
    if (parent == 0) {
      if (
        downloadreportFileCategory.name.length > 0 &&
        categoryName.length > 0
      ) {
        const formData = new FormData();
        formData.append(
          "downloadreportFileCategory",
          downloadreportFileCategory
        );
        formData.append("type", "addcategory");
        formData.append("name", categoryName);
        formData.append("parent", parent);

        return await axios
          .post("http://delivery-food/admin/api/managedata.php", formData, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.data == "yes") {
              alert("Категория добавлена");
              window.location.reload();
            }
          });
      } else {
        alert("Заполните все поля и выберите изображение");
      }
    } else {
      if (categoryName.length > 0) {
        const formData = new FormData();
        formData.append("type", "addcategory");
        formData.append("name", categoryName);
        formData.append("parent", parent);

        return await axios
          .post("http://delivery-food/admin/api/managedata.php", formData, {
            headers: {
              "Content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data == "yes") {
              alert("Категория добавлена");
              window.location.reload();
            }
          });
      } else {
        alert("Заполните все поля и выберите изображение");
      }
    }
  }

  useEffect(() => {
    getCategories();
  }, [open]);

  async function getCategories() {
    await axios
      .get("http://delivery-food/admin/api/managedata.php?type=allgetcategories")
      .then((res) => {
        if (res.data != null) {
          setCategories(res.data);
        }
      });
  }

  function getChildCategories(item) {
    let array = categories.filter(
      (item1) => item1.parent_id == item.category_id
    );

    return array.map((item) => {
      if (
        categories.filter((item1) => item1.parent_id == item.category_id)
          .length > 0
      ) {
        return (
          <TreeItem
            nodeId={item.category_id}
            label={item.name}
            onClick={(e) => setCategory(item)}
          >
            {getChildCategories(item)}
          </TreeItem>
        );
      } else {
        return (
          <TreeItem
            nodeId={item.category_id}
            label={item.name}
            onClick={(e) => setCategory(item)}
          />
        );
      }
    });
  }

  async function updateProduct() {
    const formData = new FormData();
 
    formData.append("downloadreportFileProducts", downloadreportFileProducts);
    formData.append("productid", id);
    formData.append("name", nameGood);
    formData.append("description", description);
    formData.append("category", category.category_id);
    formData.append("price", price);
    formData.append("type", "updateproduct");

  
    return await axios
      .post("http://delivery-food/admin/api/managedata.php", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data == "yes") {
          alert("Продукт создан");
          window.location.reload();
        }
      });
  }

  function onChangeFileOrderProduct(e) {
    setdownloadreportFileProducts(e.target.files[0]);
  }

  function onChangeFileOrderCategory(e) {
    setdownloadreportFileCategory(e.target.files[0]);
  }

  return (
    <>
      <Zagalovok text="Редактирование продукта" />
      <Grid container style={{ textAlign: "center" }}>
        <Grid xs={12}>
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
        <Grid xs={12}>
          <FormControl>
          <TextField
  placeholder="Описание"
  multiline
  rows={2}
  maxRows={4}
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
          </FormControl>
        </Grid>
      </Grid>


  
      <Grid container mt={2} style={{ textAlign: "center" }}>
        <Grid xs={12}>
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
        <Grid xs={12}>
          <FormControl>
            <Typography style={{ cursor: "pointer" }} onClick={handleOpen}>
              {category.name || "Выберите категорию"}
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
                    {categories.length > 0 &&
                      categories
                        .filter((item) => item.parent_id == 0)
                        .map((item) => {
                          return (
                            <TreeItem
                              nodeId={item.category_id}
                              label={item.name}
                              onClick={(e) => setCategory(item)}
                            >
                              {getChildCategories(item)}
                            </TreeItem>
                          );
                        })}
                  </TreeView>
                </Typography>
                <Typography onClick={handleClose} style={{ cursor: "pointer" }}>
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
            Загрузка картинки
            <input type="file" onChange={onChangeFileOrderProduct} hidden />
          </Button>
        </Grid>
      </Grid>
      <Grid container mt={2} style={{ textAlign: "center" }}>
        <Grid xs={6}>
          <Button
            variant="outlined"
            disabled={disabled}
            onClick={(e) => updateProduct()}
          >
            Обновить
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={openChooseCategory}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Создать категорию"}</DialogTitle>
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
              <InputLabel id="demo-simple-select-label">
                Выбрать подкатегорию
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={parent}
                onChange={(e) => setParent(e.target.value)}
              >
                <MenuItem value={0}>Сделать родительским</MenuItem>
                {categories.length > 0 &&
                  categories.map((item) => {
                    return (
                      <MenuItem value={item.category_id}>{item.name}</MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            {parent == 0 && (
              <FormControl fullWidth style={{ marginTop: "20px" }}>
                <Button variant="contained" component="label">
                  Загрузка картинки
                  <input
                    type="file"
                    onChange={onChangeFileOrderCategory}
                    hidden
                  />
                </Button>
              </FormControl>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCategoryClose}>Закрыть</Button>
          <Button onClick={addCategory}>Добавить категорию</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Product;
