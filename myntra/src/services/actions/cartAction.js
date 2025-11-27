import axios from "axios";

const API = "http://localhost:3000/cart";

export const getCartAsync = () => async (dispatch) => {
  const res = await axios.get(API);
  dispatch({ type: "GET_CART", payload: res.data });
};

export const addToCartAsync = (item) => async (dispatch) => {
  await axios.post(API, item);
  dispatch(getCartAsync());
};

export const updateCartAsync = (id, data) => async (dispatch) => {
  await axios.put(`${API}/${id}`, data);
  dispatch(getCartAsync());
};

export const removeFromCartAsync = (id) => async (dispatch) => {
  await axios.delete(`${API}/${id}`);
  dispatch(getCartAsync());
};
