import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";
import {
  Container,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";

function AdminEditPage() {
  const { getProductToEdit, productToEdit, saveEditedProduct } =
    React.useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [productType, setProductType] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [time, setTime] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const handleSubmit = () => {
    const editedProduct = {
      productType,
      price,
      time,
      photo,
      desc,
      id,
    };
    for (let i in editedProduct) {
      if (typeof editedProduct[i] === "string") {
        if (!editedProduct[i].trim()) {
          alert("Заполните поле");
          return;
        }
      }
    }
    saveEditedProduct(editedProduct);
    navigate("/admin");
  };

  React.useEffect(() => {
    getProductToEdit(id);
  }, []);

  React.useEffect(() => {
    if (productToEdit) {
      setProductType(productToEdit.productType);
      setPrice(productToEdit.price);
      setTime(productToEdit.time);
      setDesc(productToEdit.desc);
      setPhoto(productToEdit.photo);
    }
  }, [productToEdit]);

  return (
    <div className="admin-edit-page">
      <Container>
        <h2>Редактировать</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            label="Тип продукта"
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            label="Стоимость"
            variant="standard"
            type="number"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Картинка"
            variant="standard"
          />
          <FormControl variant="standard">
            <InputLabel>Время</InputLabel>
            <Select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              label="Время"
            >
              <MenuItem value="9:00">9:00</MenuItem>
              <MenuItem value="10:00">10:00</MenuItem>
              <MenuItem value="11:00">11:00</MenuItem>
              <MenuItem value="12:00">12:00</MenuItem>
              <MenuItem value="13:00">13:00</MenuItem>
              <MenuItem value="14:00">14:00</MenuItem>
              <MenuItem value="15:00">15:00</MenuItem>
              <MenuItem value="16:00">16:00</MenuItem>
              <MenuItem value="17:00">17:00</MenuItem>
              <MenuItem value="18:00">18:00</MenuItem>
              <MenuItem value="19:00">19:00</MenuItem>
              <MenuItem value="20:00">20:00</MenuItem>
              <MenuItem value="21:00">21:00</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            label="Детальное описание"
            variant="standard"
          />
          <Button variant="outlined" type="submit">
            Сохранить
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminEditPage;