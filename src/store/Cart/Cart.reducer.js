import {
  ADD_TO_CART,
  DECREASE_QTY,
  EMPTY_CART,
  INCREASE_QTY,
  REMOVE_FROM_CART,
} from "./Cart.Type";

const initState = {
  cart: [],
};

export const cartReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      const isPresent = state.cart.find((prod) => {
        return prod.id === payload.id;
      });

      let newCart;
      if (isPresent) {
        newCart = state.cart.map((prod) => {
          if (prod.id === payload.id) {
            return { ...prod, qty: prod.qty + 1 };
          } else {
            return prod;
          }
        });
      } else {
        let newPayload = {
          ...payload,
          qty: 1,
        };
        newCart = [...state.cart, newPayload];
      }
      return { ...state, cart: newCart };
    }

    case INCREASE_QTY:
      let modifiedCart = state.cart.map((prod) => {
        if (prod.id === payload.id) {
          return { ...prod, qty: prod.qty + 1 };
        } else {
          return prod;
        }
      });

      return { ...state, cart: modifiedCart };

    case DECREASE_QTY:
      let resultantCart = state.cart.map((prod) => {
        if (prod.id === payload.id) {
          return { ...prod, qty: prod.qty - 1 };
        } else {
          return prod;
        }
      });
      return { ...state, cart: resultantCart };

    case REMOVE_FROM_CART:
      let updatedCart = state.cart.filter((prod) => {
        return prod.id !== payload.id;
      });

      return { ...state, cart: updatedCart };

    case EMPTY_CART:
      return { ...state, cart: [] };

    default:
      return state;
  }
};
