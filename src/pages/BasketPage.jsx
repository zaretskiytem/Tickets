import React from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
} from "@mui/material";
import { ClientContext } from "../contexts/ClientProvider";
import { AdminContext } from "../contexts/AdminProvider";

import { Delete } from "@mui/icons-material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

function BasketPage() {
  const { basketThings, getThingsFromBasket } =
    React.useContext(ClientContext);

  const {
      deleteProduct,
    } = React.useContext(AdminContext);  

  React.useEffect(() => {
    getThingsFromBasket();
  }, []);

  if (!basketThings) {
    return (
      <div className="BasketPage">
        <Container>
          <h2>Basket is empty</h2>
        </Container>
      </div>
    );
  }

  return (
    <div className="basket-page">
      <Container>
        <h2>Basket</h2>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название Продукта</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Фото</TableCell>
              <TableCell>Описание</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basketThings.products.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productType}</TableCell>
                <TableCell>
                        {item.price} 
                </TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  <img src={item.photo} alt="" width={60} />
                  </TableCell>
                <TableCell>{item.desc}</TableCell>
                <TableCell>
                  {/* <Delete onClick={() => deleteProduct(item.id)} /> */}
                
                   <Button
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}
                          onClick={() => deleteProduct(item.id)}
                        >
                          Удалить
                        </Button>
                
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell colSpan={1}>{basketThings.totalPrice}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Container>
    </div>
  );
}

export default BasketPage;
