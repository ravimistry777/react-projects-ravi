import axios from "axios";
const API = "http://localhost:3000/wishlist";

const load = () => ({ type: "WISHLIST_LOADING" });
const err = (msg) => ({ type: "WISHLIST_ERROR", payload: msg });

export const getWishlistAsync = () => {
  return async (dispatch) => {
    dispatch(load());
    try {
      const res = await axios.get(API);
      dispatch({ type: "GET_WISHLIST", payload: res.data });
    } catch (error) {
      dispatch(err(error.message));
    }
  };
};

export const addToWishlistAsync = (item) => {
  return async (dispatch) => {
    dispatch(load());
    try {
      await axios.post(API, item);
      dispatch(getWishlistAsync());
    } catch (error) {
      dispatch(err(error.message));
    }
  };
};

export const removeWishlistAsync = (id) => {
  return async (dispatch) => {
    dispatch(load());
    try {
      await axios.delete(`${API}/${id}`);
      dispatch(getWishlistAsync());
    } catch (error) {
      dispatch(err(error.message));
    }
  };
};
