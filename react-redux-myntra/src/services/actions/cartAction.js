import axios from "axios";
const API = "http://localhost:3000/cart";

const load = () => ({ type: "CART_LOADING" });
const err = (msg) => ({ type: "CART_ERROR", payload: msg });

export const getCartAsync = () => {
  return async (dispatch) => {
    dispatch(load());
    try {
      const res = await axios.get(API);
      dispatch({ type: "GET_CART", payload: res.data });
    } catch (error) {
      dispatch(err(error.message));
    }
  };
};

export const addToCartAsync = (item) => {
  return async (dispatch) => {
    dispatch(load());
    try {
      await axios.post(API, item);
      dispatch(getCartAsync());
    } catch (error) {
      dispatch(err(error.message));
    }
  };
};

export const updateCartItemAsync = (id, item) => {
  return async (dispatch) => {
    dispatch(load());
    try {
      await axios.put(`${API}/${id}`, item);
      dispatch(getCartAsync());
    } catch (error) {
      dispatch(err(error.message));
    }
  };
};

export const removeCartItemAsync = (id) => {
  return async (dispatch) => {
    dispatch(load());
    try {
      await axios.delete(`${API}/${id}`);
      dispatch(getCartAsync());
    } catch (error) {
      dispatch(err(error.message));
    }
  };
};
