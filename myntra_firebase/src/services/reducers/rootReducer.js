import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { wishlistReducer } from "./wishlistReducer";

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer
});
