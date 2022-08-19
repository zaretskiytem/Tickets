import React from "react";
import { ticketsApi } from "../helpers/const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_THINGS") {
    return {
      ...state,
      products: action.payload,
    };
  }
  if (action.type === "GET_THINGS_FROM_BASKET") {
    return {
      ...state,
      basketThings: action.payload,
    };
  }
  if (action.type === "GET_BASKET_COUNT") {
    return {
      ...state,
      basketCount: action.payload,
    };
  }
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    products: [],
    basketThings: {
      products: [],
      totalPrice: 0,
    },
    basketCount: 0,
  });
  const [searchWord, setSearchWord] = React.useState("");
  const [filterByPrice, setFilterByPrice] = React.useState([0, 999999]);
  const [minMax, setMinMax] = React.useState([0, 999999]);

  const limit = 2;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  // ! Math.ceil(1.2) => 2
  // ! Math.floor(1.2) => 1
  // ! Math.round(1.2) => 1, (1.6) => 2

  const getThings = () => {
    fetch(
      `${ticketsApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count") / limit);

        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_THINGS",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! Basket function
  const addThingToBasket = (thing) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let thingToBasket = {
      ...thing,
      count: 1,
      subPrice: thing.price,
    };

    // undefined, {...}
    let check = basket.products.find((item) => {
      return item.id === thingToBasket.id;
    });
    if (check) {
      basket.products = basket.products.map((item) => {
        if (item.id === thingToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(thingToBasket);
    }
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("basket", JSON.stringify(basket));
    getBasketCount();
  };

  const getThingsFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let action = {
      type: "GET_THINGS_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
  };

  // ! Фиксим прайсер!!!
  const getPrices = () => {
    fetch(ticketsApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = data[data.length - 1].price;
        let min = data[0].price;
        setFilterByPrice([min, max]);
        setMinMax([min, max]);
      });
  };

  // ! Фиксим отображение количества товара в навбаре
  const getBasketCount = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        products: [],
      };
    }
    let action = {
      type: "GET_BASKET_COUNT",
      payload: basket.products.length,
    };
    dispatch(action);
  };

  React.useEffect(() => {
    getPrices();
    getBasketCount();
  }, []);

  const data = {
    products: state.products,
    searchWord,
    filterByPrice,
    pagesCount,
    currentPage,
    basketThings: state.basketThings,
    basketCount: state.basketCount,
    minMax,
    getThings,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
    addThingToBasket,
    getThingsFromBasket,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
