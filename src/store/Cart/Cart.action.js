import {
  ADD_TO_CART,
  DECREASE_QTY,
  EMPTY_CART,
  INCREASE_QTY,
  REMOVE_FROM_CART,
} from "./Cart.Type";

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload,
  };
};

export const removeFromCart = (payload) => {
  return {
    type: REMOVE_FROM_CART,
    payload,
  };
};
export const increaseQty = (payload) => {
  return {
    type: INCREASE_QTY,
    payload,
  };
};

export const decreaseQty = (payload) => {
  return {
    type: DECREASE_QTY,
    payload,
  };
};

export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  }
}
