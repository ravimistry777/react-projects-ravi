import { db } from '../../firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc,
  query,
  where
} from 'firebase/firestore';

// Get user's wishlist
export const getWishlistAsync = (userId) => async (dispatch) => {
  try {
    console.log("Fetching wishlist for user:", userId);
    
    const wishlistRef = collection(db, 'wishlist');
    const q = query(wishlistRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    const wishlistItems = querySnapshot.docs.map(doc => ({
      id: doc.id,  // 🔥 IMPORTANT: Firebase document ID
      ...doc.data()
    }));
    
    console.log("Fetched wishlist items:", wishlistItems);
    
    dispatch({ type: "GET_WISHLIST", payload: wishlistItems });
  } catch (error) {
    console.error("Error getting wishlist:", error);
    dispatch({ type: "ERROR", payload: error.message });
  }
};

// Add to wishlist
export const addToWishlistAsync = (item, userId) => async (dispatch) => {
  try {
    console.log("Adding to wishlist:", { item, userId });
    
    // Add userId to item
    const itemWithUser = {
      ...item,
      userId: userId,
      createdAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'wishlist'), itemWithUser);
    console.log("Added to wishlist with ID:", docRef.id);
    
    // Refresh wishlist
    dispatch(getWishlistAsync(userId));
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    dispatch({ type: "ERROR", payload: error.message });
  }
};

// Remove from wishlist - FIXED VERSION
export const removeFromWishlistAsync = (id, userId) => async (dispatch) => {
  try {
    console.log("🚀 REMOVING FROM WISHLIST:", { 
      documentId: id, 
      userId: userId,
      timestamp: new Date().toISOString()
    });
    
    if (!id) {
      console.error("❌ ERROR: No ID provided for removal");
      return;
    }
    
    const wishlistItemRef = doc(db, 'wishlist', id);
    console.log("🗑️ Deleting document reference:", wishlistItemRef.path);
    
    await deleteDoc(wishlistItemRef);
    console.log("✅ SUCCESS: Item removed from wishlist");
    
    // Refresh wishlist
    dispatch(getWishlistAsync(userId));
  } catch (error) {
    console.error("❌ ERROR removing from wishlist:", error);
    console.error("Error details:", error.message, error.code);
  }
};