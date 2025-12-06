const initial = {
  cartItems: []
};

export const cartReducer = (state = initial, action) => {
  switch (action.type) {
    case "GET_CART":
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};
