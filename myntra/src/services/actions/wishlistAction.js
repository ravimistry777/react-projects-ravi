import axios from "axios";

const API = "http://localhost:3000/wishlist";

export const getWishlistAsync = () => async (dispatch) => {
  const res = await axios.get(API);
  dispatch({ type: "GET_WISHLIST", payload: res.data });
};

export const addToWishlistAsync = (item) => async (dispatch) => {
  await axios.post(API, item);
  dispatch(getWishlistAsync());
};

export const removeFromWishlistAsync = (id) => async (dispatch) => {
  await axios.delete(`${API}/${id}`);
  dispatch(getWishlistAsync());
};
