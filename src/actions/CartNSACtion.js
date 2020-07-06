import * as Types from "../constants/cartNS";

// add to cart
export const handleAddToCart = (data) => ({
  type: Types.ADD_TO_CART_NS,
  payload: {
    data,
  },
});

// up to cart
export const handleUpToCart = (data) => ({
  type: Types.UP_TO_CART_NS,
  payload: {
    data,
  },
});

// down to cart
export const handleDownToCart = (data) => ({
  type: Types.DOWN_TO_CART_NS,
  payload: {
    data,
  },
});

// down to cart
export const handleDeleteToCart = (data) => ({
  type: Types.DELETE_TO_CART_NS,
  payload: {
    data,
  },
});

// clear to cart
export const handleClearToCart = () => ({
  type: Types.CLEAR_CART_NS,
  
});


