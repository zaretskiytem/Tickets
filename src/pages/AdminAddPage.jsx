import React from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import { AdminContext } from "../contexts/AdminProvider";

function AdminAddPage() {
  const { sendNewProduct } = React.useContext(AdminContext);

  const [productType, setProductType] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [time, setTime] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const handleSubmit = () => {
    const newProduct = {
      productType: productType.trim(),
      price,
      time: time.trim(),
      photo: photo.trim(),
      desc: desc.trim(),
    };

    for (let i in newProduct) {
      if (!newProduct[i]) {
        alert("Заполните поле!");
        return;
      }
    }
    sendNewProduct(newProduct);
    setProductType("");
    setTime("");
    setPhoto("");
    setDesc("");
    setPrice("");
  };

  return (
    <div className="admin-add-page">
      <Container>
        <h2>Добавить позиции</h2>
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
            Добавить
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default AdminAddPage;
