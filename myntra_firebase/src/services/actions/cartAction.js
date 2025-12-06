import { db } from '../../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where
} from 'firebase/firestore';

// Get user's cart items
export const getCartAsync = (userId) => async (dispatch) => {
  try {
    const cartRef = collection(db, 'cart');
    const q = query(cartRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const cartItems = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    dispatch({ type: "GET_CART", payload: cartItems });
  } catch (error) {
    console.error("Error getting cart:", error);
  }
};

// Add to cart
export const addToCartAsync = (item, userId) => async (dispatch) => {
  try {
    // Add userId to item
    const itemWithUser = {
      ...item,
      userId: userId,
      createdAt: new Date().toISOString()
    };
    
    await addDoc(collection(db, 'cart'), itemWithUser);
    
    // Refresh cart
    dispatch(getCartAsync(userId));
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

// Update cart item quantity
export const updateCartAsync = (id, data, userId) => async (dispatch) => {
  try {
    const cartItemRef = doc(db, 'cart', id);
    await updateDoc(cartItemRef, data);
    
    // Refresh cart
    dispatch(getCartAsync(userId));
  } catch (error) {
    console.error("Error updating cart:", error);
  }
};

// Remove from cart
export const removeFromCartAsync = (id, userId) => async (dispatch) => {
  try {
    const cartItemRef = doc(db, 'cart', id);
    await deleteDoc(cartItemRef);
    
    // Refresh cart
    dispatch(getCartAsync(userId));
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
};