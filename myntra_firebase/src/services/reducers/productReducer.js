const initialState = {
  products: [],
  product: null,
  isLoading: false,
  isCreated: false,
  errorMsg: ""
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {

    case "LOADING":
      return { ...state, isLoading: true };

    case "ERROR":
      return { ...state, errorMsg: action.payload, isLoading: false };

    case "GET_ALL_PRODUCT":
      return { ...state, products: action.payload, isLoading: false };

    case "GET_PRODUCT":
      return { ...state, product: action.payload ,isLoading: false };

    case "ADD_PRODUCT":
      return { ...state, isCreated: true };

    case "UPDATE_PRODUCT":
      return { ...state, isCreated: true };

    case "RESET_PRODUCT_CREATION":
      return { ...state, isCreated: false, error: null }; 

    default:
      return state;
  }
};
