import React from "react";
import { MDBBtn } from "mdbreact";
import { Input, Button } from "semantic-ui-react";

const CartItem = (props) => {
  var { cart, upQuantity, downQuantity,deleteItem } = props;
  
  const checkData = (
    <div className="row mb-4">
      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-4" style={{  paddingLeft: "5%"}}>
          <h5>
            {" "}
            <span>Name book:</span> {cart.tensach}
          </h5>
          <p className="mb-3 text-muted text-uppercase small">
            <span>ID book:  </span>
            {cart.masach}
          </p>
          <p className="mb-3 text-muted text-uppercase small">
            <span>Price book:</span>
            {cart.dongiaban}
          </p>
          <span>
            <strong id="summary">Cost: $ {cart.soluong * cart.dongiaban}</strong>
          </span>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
          <Button.Group>
            <Button onClick={()=>upQuantity(cart)}>Up</Button>
            <Button>
              <Input
                size="small"
                value={cart.soluong}
                type="number"
                className="text-center"
                disabled
              />
            </Button>
            <Button  onClick={()=>downQuantity(cart)}>Down</Button>
          </Button.Group>

          <small
            id="passwordHelpBlock"
            className="form-text text-muted text-center"
          >
            (Note, 1 piece)
          </small>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
          <MDBBtn color="deep-orange" className="center" onClick={()=>deleteItem(cart)}>
            {" "}
            <i className="fas fa-trash-alt mr-1" /> Remove item{" "}
          </MDBBtn>
        </div>
      </div>

      <hr className="mb-4" />
    </div>
  );
  return <>{cart ? checkData : ""}</>;
};

export default CartItem;
