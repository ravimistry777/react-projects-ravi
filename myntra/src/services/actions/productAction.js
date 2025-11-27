import axios from "axios";

const API = "http://localhost:3000/products";

export const loading = () => ({ type: "LOADING" });
export const error = (msg) => ({ type: "ERROR", payload: msg });

export const getAllProducts = (data) => ({
  type: "GET_ALL_PRODUCT",
  payload: data
});

export const getProductAction = (data) => ({
  type: "GET_PRODUCT",
  payload: data
});

export const addProductAction = () => ({
  type: "ADD_PRODUCT"
});

export const updateProductAction = () => ({
  type: "UPDATE_PRODUCT"
});

// GET ALL PRODUCTS
export const getAllProductsAsync = () => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const res = await axios.get(API);
      dispatch(getAllProducts(res.data));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
};

// GET SINGLE PRODUCT
export const getProductAsync = (id) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      const res = await axios.get(`http://localhost:3000/products/${id}`);
      dispatch(getProductAction(res.data));
    } catch (err) {
      dispatch(error(err.message));
    }
  };
};


// ADD PRODUCT
export const addProductAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.post(API, data);
      dispatch(addProductAction());
      dispatch(getAllProductsAsync());
    } catch (err) {
      dispatch(error(err.message));
    }
  };
};

// UPDATE PRODUCT
export const updateProductAsync = (data) => {
  return async (dispatch) => {
    dispatch(loading());
    try {
      await axios.put(`${API}/${data.id}`, data);
      dispatch(updateProductAction());
      dispatch(getAllProductsAsync());
    } catch (err) {
      dispatch(error(err.message));
    }
  };
};

// DELETE PRODUCT
export const deleteProductAsync = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API}/${id}`);
      dispatch(getAllProductsAsync());
    } catch (err) {
      dispatch(error(err.message));
    }
  };
};


