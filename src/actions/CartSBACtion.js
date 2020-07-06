import * as Types from "../constants/cartBS";

// add to cart
export const handleAddToCart = (data) => ({
  type: Types.ADD_TO_CART_BS,
  payload: {
    data,
  },
});

// up to cart
export const handleUpToCart = (data) => ({
  type: Types.UP_TO_CART_BS,
  payload: {
    data,
  },
});

// down to cart
export const handleDownToCart = (data) => ({
  type: Types.DOWN_TO_CART_BS,
  payload: {
    data,
  },
});

// down to cart
export const handleDeleteToCart = (data) => ({
  type: Types.DELETE_TO_CART_BS,
  payload: {
    data,
  },
});

// clear to cart
export const handleClearToCart = () => ({
  type: Types.CLEAR_CART_BS,
  
});

// add customer
export const handleAddCustomerBS = (data) => ({
  type: Types.ADD_CUSTOMER,
  payload: {
    data,
  },
});

// delete customer
export const handleDeleteCustomerBS = () => ({
  type: Types.DELETE_CUSTOMER,
});

// update debt customer
export const handleUpdateDebtCustomerBS = () => ({
  type: Types.UPDATE_DEBT_CUSTOMER,
});
