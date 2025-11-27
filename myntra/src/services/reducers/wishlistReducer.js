const initial = {
  wishlistItems: []
};

export const wishlistReducer = (state = initial, action) => {
  switch (action.type) {
    case "GET_WISHLIST":
      return { ...state, wishlistItems: action.payload };
    default:
      return state;
  }
};
