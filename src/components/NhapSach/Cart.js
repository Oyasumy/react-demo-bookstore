import React from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  var { cartData ,downQuantity,upQuantity,deleteItem,checkoutNS} = props;
  
  // const [total, setTotal] = useState(0);

  var sumCart=0;
  const showListCart = (data) => {
    if (!data) return;
    var result = null;
    result = data.map((cart, index) => {
      sumCart+=(cart.dongiaban * cart.soluong);
      return <CartItem cart={cart} key={index} upQuantity={upQuantity} deleteItem={deleteItem} downQuantity={downQuantity}/>;
    });
    // setTotal(sumCart);
    return result;
  };
  return (
    <section>
      <div className="row">
        <div className="col-lg-8">
          <div className="mb-3">
            <div className="pt-4 wish-list">
              <h5 className="mb-4">
                Cart (<span> {cartData.length>0?cartData.length:0}</span> items)
              </h5>

              {/* Item Cart  */}
              {showListCart(cartData)}
              {/* Item Cart  */}

              <p className="text-primary mb-0">
                <i className="fas fa-info-circle mr-1" /> Do not delay the
                purchase, adding items to your cart does not mean booking them.
              </p>
            </div>
          </div>
          {/* Card */}
          {/* Card */}
          <div className="mb-3">
            <div className="pt-4">
              <h5 className="mb-4">Expected shipping delivery</h5>
              <p className="mb-0"> Thu., 12.03. - Mon., 16.03.</p>
            </div>
          </div>
          {/* Card */}
        </div>
        {/*Grid column*/}
        {/*Grid column*/}
        <Checkout  price={sumCart} checkoutNS={checkoutNS}/>
        {/*Grid column*/}
      </div>
      {/* Grid row */}
    </section>
  );
};
export default Cart;
