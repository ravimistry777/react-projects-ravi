// store/cartSlice.js - Updated with rupee prices
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
    selectedProduct: null,
    isCartOpen: false,
    activeCategoryFilter: 'All'
  },
  reducers: {
    toggleCartView(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    setCategoryFilter(state, action) {
      state.activeCategoryFilter = action.payload;
    },
    addProductToCart(state, action) {
      const product = action.payload;
      const matchingItem = state.items.find(item => item.id === product.id);
      state.totalQuantity++;
      
      if (!matchingItem) {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          totalPrice: product.price,
          image: product.image,
          category: product.category
        });
      } else {
        matchingItem.quantity++;
        matchingItem.totalPrice += product.price;
      }
      state.totalAmount += product.price;
    },
    removeProductFromCart(state, action) {
      const targetId = action.payload;
      const matchingItem = state.items.find(item => item.id === targetId);
      if (matchingItem) {
        state.totalQuantity--;
        
        if (matchingItem.quantity === 1) {
          state.items = state.items.filter(item => item.id !== targetId);
        } else {
          matchingItem.quantity--;
          matchingItem.totalPrice -= matchingItem.price;
        }
        state.totalAmount -= matchingItem.price;
      }
    },
    inspectProductDetails(state, action) {
      state.selectedProduct = action.payload;
    },
    clearInspectionState(state) {
      state.selectedProduct = null;
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;