const initialState = {
  wishlist: [],
  isLoading: false,
  errorMsg: ""
};

export const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "WISHLIST_LOADING":
      return { ...state, isLoading: true };

    case "WISHLIST_ERROR":
      return { ...state, isLoading: false, errorMsg: action.payload };

    case "GET_WISHLIST":
      return { ...state, wishlist: action.payload, isLoading: false };

    default:
      return state;
  }
};
