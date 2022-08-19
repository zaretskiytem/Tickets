import React from "react";
import { ticketsApi } from "../helpers/const";

export const AdminContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_PRODUCTS") {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === "GET_PRODUCT_TO_EDIT") {
    return {
      ...state,
      productToEdit: action.payload,
    };
  }
  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    products: [],
    productToEdit: null,
  });

  const sendNewProduct = (newProduct) => {
    fetch(ticketsApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
  };

  const getProducts = () => {
    fetch(`${ticketsApi}?q=&_limit=${limit}&_page=${currentPage}`)
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);

        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_PRODUCTS",
          payload: data,
        };
        dispatch(action);
      });
  };

  const deleteProduct = (id) => {
    fetch(`${ticketsApi}/${id}`, {
      method: "DELETE",
    }).then(() => getProducts());
  };

  // ! UPDATE - 1 PART
  const getProductToEdit = (id) => {
    fetch(`${ticketsApi}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_PRODUCT_TO_EDIT",
          payload: data,
        };
        dispatch(action);
      });
  };
  // ! UPDATE - 2 PART
  const saveEditedProduct = (editedProduct) => {
    fetch(`${ticketsApi}/${editedProduct.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    });
  };

  const limit = 2;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const data = {
    products: state.products,
    productToEdit: state.productToEdit,
    sendNewProduct,
    getProducts,
    deleteProduct,
    getProductToEdit,
    saveEditedProduct,

    pagesCount,
    currentPage,
    setCurrentPage,
  };
  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
