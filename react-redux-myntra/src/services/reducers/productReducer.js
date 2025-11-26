const initialState = {
  products: [],
  product: null,
  isLoading: false,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  errorMsg: ""
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };

    case "ERROR":
      return { ...state, isLoading: false, errorMsg: action.payload };

    case "GET_ALL_PRODUCTS":
      return { ...state, products: action.payload, isLoading: false };

    case "GET_PRODUCT":
      return { ...state, product: action.payload, isLoading: false };

    case "ADD_PRODUCT":
      return { ...state, isCreated: true, isLoading: false };

    case "UPDATE_PRODUCT":
      return { ...state, isUpdated: true, isLoading: false };

    case "DELETE_PRODUCT":
      return { ...state, isDeleted: true, isLoading: false };

    default:
      return state;
  }
};
