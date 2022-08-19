import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { AdminContext } from "../contexts/AdminProvider";
import { ClientContext } from "../contexts/ClientProvider";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { ShoppingBag } from "@mui/icons-material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

export default function HomePage() {
  const {
    getProducts,
    products,
    pagesCount,
    currentPage,
    

    setCurrentPage,
  } = React.useContext(AdminContext);

  const { addThingToBasket, } = React.useContext(ClientContext)

  React.useEffect(() => {
    getProducts();
  }, []);

  React.useEffect(() => {
    getProducts();
  }, [currentPage]);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        {products.map((item) => (
          <div className="products__container" item={item} key={item.id}>
            <Box sx={{ bgcolor: "#cfe8fc", height: "100%" }} />
            <Paper
              sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#1A2027" : "#fff",
              }}
            >
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    {/* <Img alt="complex" src="/static/images/grid/complex.jpg" /> */}
                    <Img src={item.photo} alt="#" />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {item.productType}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {/* Full resolution 1920x1080 • JPEG */}
                        {item.time}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </Grid>
                    <Grid item>
                      {/* <Typography sx={{ cursor: "pointer" }} variant="body2"> */}
                      <Stack spacing={2} direction="row">
                        <Button
                        onClick={() => addThingToBasket(item)}
                        
                        variant="outlined"
                          size="small"
                          startIcon={<ShoppingBag />}
                        >

                          {/* <Link to={`/admin/edit/${item.id}`}>Добавить в корзину</Link> */}
                        </Button>
                      </Stack>
                      {/* </Typography> */}
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      {item.price} сом
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </div>
        ))}
      </Container>
      
      <Pagination
        onChange={(_, newValue) => setCurrentPage(newValue)}
        count={pagesCount}
        variant="outlined"
        shape="rounded"
      />
    </React.Fragment>
  );
}