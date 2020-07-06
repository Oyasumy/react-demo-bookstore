import * as Types from "../constants/cartBS";
import * as TypesNS from "../constants/cartNS";

var initialValue = {
  cartBanSach: [],
  cartNhapSach: [],
  
  customerBS: {},
};

const CartReducer = (state = initialValue, action) => {
  var { cartBanSach, cartNhapSach } = state;
  var data = null;
  var result = null;
  switch (action.type) {
    case Types.ADD_TO_CART_BS:
      data = action.payload.data;
      result = checkItemFormCartBS(cartBanSach, data);
      localStorage.setItem("carts", JSON.stringify(result));
      return { ...state, cartBanSach: [...result] };

    case Types.UP_TO_CART_BS:
      data = action.payload.data;
      result = checkItemFormCartBS(cartBanSach, data);
      localStorage.setItem("carts", JSON.stringify(result));
      return { ...state, cartBanSach: [...result] };

    case Types.DOWN_TO_CART_BS:
      data = action.payload.data;
      result = checkDownCart(cartBanSach, data);
      localStorage.setItem("carts", JSON.stringify(result));
      return { ...state, cartBanSach: [...result] };

    case Types.CLEAR_CART_BS:
      localStorage.removeItem("carts");
      return { ...state, cartBanSach: [] };

    case Types.DELETE_TO_CART_BS:
      data = action.payload.data;
      var ind = findmasach(data, cartBanSach);
      result = cartBanSach.splice(ind, 1);
      console.log("res", result);
      localStorage.setItem("carts", JSON.stringify(cartBanSach));
      return { ...state, cartBanSach: [...cartBanSach] };

    case Types.ADD_CUSTOMER:
      data = action.payload.data;
      localStorage.setItem("customerBS", JSON.stringify(data));
      return { ...state, customerBS: data };

    case Types.UPDATE_DEBT_CUSTOMER:
      var newCustomer = { ...state.customerBS, sotienno: 0 };
      localStorage.setItem("customerBS", JSON.stringify(newCustomer));
      return { ...state, customerBS: newCustomer };

    case Types.DELETE_CUSTOMER:
      localStorage.removeItem("customerBS");
      return { ...state, customerBS: {} };

    // cart nhap sach
    case TypesNS.ADD_TO_CART_NS:
      
      data = action.payload.data;
      console.log("red ns",data);
      result = checkItemFormCartNS(cartNhapSach, data);
      localStorage.setItem("carts", JSON.stringify(result));
      return { ...state, cartNhapSach: [...result] };

    case TypesNS.UP_TO_CART_NS:
      data = action.payload.data;
      result = upToCartNS(cartNhapSach, data);
      localStorage.setItem("carts", JSON.stringify(result));
      return { ...state, cartNhapSach: [...result] };

    case TypesNS.DOWN_TO_CART_NS:
      data = action.payload.data;
      result = checkDownCartNS(cartNhapSach, data);
      localStorage.setItem("carts", JSON.stringify(result));
      return { ...state, cartNhapSach: [...result] };

    case TypesNS.CLEAR_CART_NS:
      localStorage.removeItem("carts");
      return { ...state, cartNhapSach: [] };

    case TypesNS.DELETE_TO_CART_NS:
      data = action.payload.data;
      ind = findmasach(data, cartNhapSach);
      result = cartNhapSach.splice(ind, 1);
      console.log("res", result);
      localStorage.setItem("carts", JSON.stringify(cartNhapSach));
      return { ...state, cartNhapSach: [...cartNhapSach] };

    default:
      return state;
  }
};

const checkItemFormCartBS = (cart, product) => {
  var ck = -1;
  cart.forEach((item) => {
    if (item.masach === product.masach) {
      
      item.soluong +=1;
      ck = 1;
    }
  });
  if (ck < 0) {
    cart.push({ ...product, soluong: 1 });
  }
  return cart;
};
const checkItemFormCartNS = (cart, product) => {
  var ck = -1;
  cart.forEach((item) => {
    if (item.masach === product.masach) {
      
      item.soluong += parseInt(product.num);
      ck = 1;
    }
  });
  if (ck < 0) {
    cart.push({ ...product, soluong: product.num });
  }
  return cart;
};
const upToCartNS = (cart, product) => {
  var ck = -1;
  cart.forEach((item) => {
    if (item.masach === product.masach) {

      item.soluong += 1;
      ck = 1;
    }
  });
  if (ck < 0) {
    cart.push({ ...product, soluong: product.num });
  }
  return cart;
};
const checkDownCart = (cart, product) => {
  cart.forEach((item) => {
    if (item.masach === product.masach) {
      if (item.soluong > 0) {
        item.soluong -= 1;
      }
    }
  });
  return cart;
};

const checkDownCartNS = (cart, product) => {
  cart.forEach((item) => {
    if (item.masach === product.masach) {
      if (item.soluong > 150) {
        item.soluong -= 1;
      }
    }
  });
  return cart;
};
const findmasach = (product, cart) => {
  var ind = -1;

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].masach === product.masach) {
      ind = i;
    }
  }
  return ind;
};
export default CartReducer;
