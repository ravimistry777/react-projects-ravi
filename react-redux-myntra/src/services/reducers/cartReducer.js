const initialState = {
  cart: [],
  isLoading: false,
  errorMsg: ""
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CART_LOADING":
      return { ...state, isLoading: true };

    case "CART_ERROR":
      return { ...state, isLoading: false, errorMsg: action.payload };

    case "GET_CART":
      return { ...state, cart: action.payload, isLoading: false };

    default:
      return state;
  }
};
