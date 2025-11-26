import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import { productReducer } from "./services/reducers/productReducer";
import { cartReducer } from "./services/reducers/cartReducer";
import { wishlistReducer } from "./services/reducers/wishlistReducer";

// 👇 IMPORTANT — reducers MUST match the useSelector keys
const rootReducer = combineReducers({
  productsState: productReducer,
  cartState: cartReducer,
  wishlistState: wishlistReducer,
});

// 👇 MUST import compose (ISS LINE KI WAJAH SE TERI APP CRASH HO RAHI THI)
const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
