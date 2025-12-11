import { db } from '../../firebase';
import { 
  collection, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';

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
      const querySnapshot = await getDocs(collection(db, 'products'));
      const products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      dispatch(getAllProducts(products));
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
      const docRef = doc(db, 'products', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        dispatch(getProductAction({
          id: docSnap.id,
          ...docSnap.data()
        }));
      } else {
        dispatch(error("Product not found"));
      }
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
      // Add timestamp
      const productData = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      await addDoc(collection(db, 'products'), productData);
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
      const productRef = doc(db, 'products', data.id);
      
      const { id, ...updateData } = data;
      updateData.updatedAt = new Date().toISOString();
      
      await updateDoc(productRef, updateData);
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
      const productRef = doc(db, 'products', id);
      await deleteDoc(productRef);
      dispatch(getAllProductsAsync());
    } catch (err) {
      dispatch(error(err.message));
    }
  };
};

export const resetProductCreation = () => (dispatch) => {
  dispatch({
    type: "RESET_PRODUCT_CREATION"
  });
};