import axios from "axios";

const API = "http://localhost:3000/products";

const loading = () => ({ type: "LOADING" });
const errorMsg = (msg) => ({ type: "ERROR", payload: msg });

export const getAllProducts = (data) => ({
  type: "GET_ALL_PRODUCTS",
  payload: data
});

export const getProductData = (data) => ({
  type: "GET_PRODUCT",
  payload: data
});

export const addProductAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.post(API, data);
      dispatch({ type: "ADD_PRODUCT" });
    } catch (err) {
      dispatch(errorMsg(err.message));
    }
  };
};

export const getAllProductsAsync = () => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const res = await axios.get(API);
      dispatch(getAllProducts(res.data));
    } catch (err) {
      dispatch(errorMsg(err.message));
    }
  };
};

export const getProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const res = await axios.get(`${API}/${id}`);
      dispatch(getProductData(res.data));
    } catch (err) {
      dispatch(errorMsg(err.message));
    }
  };
};

export const updateProductAsync = (id, data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.put(`${API}/${id}`, data);
      dispatch({ type: "UPDATE_PRODUCT" });
    } catch (err) {
      dispatch(errorMsg(err.message));
    }
  };
};

export const deleteProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.delete(`${API}/${id}`);
      dispatch({ type: "DELETE_PRODUCT" });
      dispatch(getAllProductsAsync());
    } catch (err) {
      dispatch(errorMsg(err.message));
    }
  };
};
