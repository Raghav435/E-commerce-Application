import {
  ADD_PRODUCTS,
  DELETE_PRODUCTS,
  FILTER_PRODUCTS_BY_SIZE,
  GET_EDIT_PRODUCT,
  PRODUCTS_GET_ERROR,
  PRODUCTS_GET_LOADING,
  PRODUCTS_GET_SUCCESS,
  REMOVE_SELECTED_PRODUCT,
  SELECTED_PRODUCT,
  SORT_PRODUCTS_BY_PRICE,
  UPDATE_PRODUCT,
} from "./Products.Type";

const initState = {
  data: [],
  filteredItems: [],
  size: "",
  sort: "",
  loading: false,
  error: false,
};
export const ProductsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case PRODUCTS_GET_LOADING:
      return { ...state, loading: true };

    case PRODUCTS_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
        filteredItems: payload,
      };

    case ADD_PRODUCTS:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };

    case GET_EDIT_PRODUCT:
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };

    case UPDATE_PRODUCT:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case DELETE_PRODUCTS:
      return {
        ...state,
        loading: false,
        error: false,
      };

    case PRODUCTS_GET_ERROR:
      return { ...state, loading: false, error: true };

    case FILTER_PRODUCTS_BY_SIZE:
      return {
        ...state,
        loading: false,
        error: false,
        filteredItems: payload.data,
        size: payload.size,
      };

    case SORT_PRODUCTS_BY_PRICE:
      return {
        ...state,
        loading: false,
        error: false,
        filteredItems: payload.data,
        sort: payload.sort,
      };

    default: {
      return state;
    }
  }
};

export const selectedReducers = (state = {}, { type, payload }) => {
  switch (type) {
    case SELECTED_PRODUCT: {
      return {
        ...state,
        ...payload,
      };
    }
    case REMOVE_SELECTED_PRODUCT: {
      return {};
    }
    default:
      return state;
  }
};
