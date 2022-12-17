import axios from "axios";
import {
  ADD_PRODUCTS,
  DELETE_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  GET_EDIT_PRODUCT,
  PRODUCTS_GET_LOADING,
  SORT_PRODUCTS_BY_PRICE,
  UPDATE_PRODUCT,
} from "./Products.Type";
import {
  PRODUCTS_GET_ERROR,
  PRODUCTS_GET_SUCCESS,
  REMOVE_SELECTED_PRODUCT,
  SELECTED_PRODUCT,
} from "./Products.Type";

export const getProductsApi = () => async (dispatch) => {
  dispatch({
    type: PRODUCTS_GET_LOADING,
  });
  try {
    const res = await axios.get("https://scrubs-foal.cyclic.app/mens");
    dispatch({
      type: PRODUCTS_GET_SUCCESS,
      payload: res.data,
    });
   
  } catch (e) {
    dispatch({
      type: PRODUCTS_GET_ERROR,
    });
  }
};

export const selectedProducts = (data) => {
  return {
    type: SELECTED_PRODUCT,
    payload: data,
  };
};

export const removeSelectedProducts = () => {
  return {
    type: REMOVE_SELECTED_PRODUCT,
  };
};

export const productsAdded = () => {
  return {
    type: ADD_PRODUCTS,
  };
};

export const productsEdited = (data) => {
  return {
    type: GET_EDIT_PRODUCT,
    payload: data,
  };
};

export const productUpdated = () => {
  return {
    type: UPDATE_PRODUCT,
  };
};

export const productsDeleted = () => {
  return {
    type: DELETE_PRODUCTS,
  };
};

export const addProductsApi = (myData) => {
  return function (dispatch) {
    axios
      .post("https://scrubs-foal.cyclic.app/mens", myData)
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: ADD_PRODUCTS,
          payload: res.data,
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteProductsApi = (id) => {
  return function (dispatch) {
    axios
      .delete(`https://scrubs-foal.cyclic.app/mens/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(productsDeleted());
        dispatch(getProductsApi());
      })
      .catch((err) => console.log(err));
  };
};

export const editProductsApi = (id) => {
  return function (dispatch) {
    axios
      .get(`https://scrubs-foal.cyclic.app/mens/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(productsEdited(res.data));
      })
      .catch((err) => console.log(err));
  };
};

export const updateProductsApi = (products, id) => {
  return function (dispatch) {
    axios
      .put(`https://scrubs-foal.cyclic.app/mens/${id}`, products)
      .then((res) => {
        console.log(res.data);
        dispatch(productUpdated());
      })
      .catch((err) => console.log(err));
  };
};

export const filterProductsApi = (products, size) => (dispatch) => {
  dispatch({
    type: FILTER_PRODUCTS_BY_SIZE,
    payload: {
      size: size,
      data:
        size === ""
          ? products
          : products.filter((x) => x.product_size.indexOf(size) >= 0),
    },
  });
};

export const sortProductsApi = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.product_strike > b.product_strike
          ? 1
          : -1
        : a.product_strike < b.product_strike
        ? 1
        : -1
    );
  }
  dispatch({
    type: SORT_PRODUCTS_BY_PRICE,
    payload: {
      sort: sort,
      data: sortedProducts,
    },
  });
};
