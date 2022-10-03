import { ProductsReducer, selectedReducers } from "./Products/Products.Reducer";
import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { cartReducer } from "./Cart/Cart.reducer";
import { authReducer } from "./Auth/Auth.reducer";

const rootReducer = combineReducers({
  products: ProductsReducer,
  product: selectedReducers,
  cart: cartReducer,
  auth: authReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = legacy_createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk))
);
