import React, { useState } from "react";
import { Container } from "semantic-ui-react";
import { MDBInput, MDBBtn } from "mdbreact";
import {
  MINIMUM_BOOK_ENTERED,
  NUMBER_BOOK_CAN_BE_ENTERED,
  NUMBER_DEBT,
  NUMBER_INVENTER,
  SET_MINIMUM_BOOK_ENTERED,
  SET_NUMBER_BOOK_CAN_BE_ENTERED,
  SET_NUMBER_DEBT,
  SET_NUMBER_INVENTER,
  CHANGE_RULES_SUCCESS,
  CHANGE_RULES_FAILED,
} from "../../constants/ApiUrl";
import { useToasts } from "react-toast-notifications";

const ChangeRules = () => {
  const { addToast } = useToasts();

  const [minimumIn, setMinimumIn] = useState(MINIMUM_BOOK_ENTERED);
  const [inventoryIn, setInventoryIn] = useState(NUMBER_BOOK_CAN_BE_ENTERED);
  const [debtCustomer, setDebtCustomer] = useState(NUMBER_DEBT);
  const [inventoryOut, setInventoryOut] = useState(NUMBER_INVENTER);

  const CheckMinIn = (vl) => {
    var ck = SET_MINIMUM_BOOK_ENTERED(vl);
    if (ck === 1) {
      return addToast(CHANGE_RULES_SUCCESS, {
        appearance: "info",
        autoDismiss: true,
      });
    }
    return addToast(CHANGE_RULES_FAILED, {
      appearance: "error",
      autoDismiss: true,
    });
  };

  const CheckInventoryIn = (vl) => {
    var ck = SET_NUMBER_BOOK_CAN_BE_ENTERED(vl);
    if (ck === 1) {
      return addToast(CHANGE_RULES_SUCCESS, {
        appearance: "info",
        autoDismiss: true,
      });
    }
    return addToast(CHANGE_RULES_FAILED, {
      appearance: "error",
      autoDismiss: true,
    });
  };

  const CheckInventoryOut = (vl) => {
    var ck = SET_NUMBER_INVENTER(vl);
    if (ck === 1) {
      return addToast(CHANGE_RULES_SUCCESS, {
        appearance: "info",
        autoDismiss: true,
      });
    }
    return addToast(CHANGE_RULES_FAILED, {
      appearance: "error",
      autoDismiss: true,
    });
  };

  const CheckCustomer = (vl) => {
    var ck = SET_NUMBER_DEBT(vl);
    if (ck === 1) {
      return addToast(CHANGE_RULES_SUCCESS, {
        appearance: "info",
        autoDismiss: true,
      });
    }
    return addToast(CHANGE_RULES_FAILED, {
      appearance: "error",
      autoDismiss: true,
    });
  };

  return (
    <Container>
      <h2 className="text-center m-4">Thay đổi quy định</h2>
      <div className="row">
        {/* // minimum input */}
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
          <MDBInput
            label={`Thay đổi lượng nhập ít nhất ${MINIMUM_BOOK_ENTERED}`}
            name="miin"
            id="miin"
            value={minimumIn}
            onChange={(e) => {
              var v = parseInt(e.target.value);
              if (isNaN(v)) return;
              if (v.toString().length > 7) return;
              setMinimumIn(v);
            }}
          />
        </div>
        <div
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
          style={{ display: "table", margin: " auto 0" }}
        >
          <MDBBtn
            type="phone"
            color="warning"
            onClick={() => CheckMinIn(minimumIn)}
          >
            Check
          </MDBBtn>
        </div>

        {/* // minimum inventoryIn */}
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
          <MDBInput
            label={`Thay đổi lượng tồn ít nhất có thể nhập là ${NUMBER_BOOK_CAN_BE_ENTERED}`}
            name="inin"
            id="inin"
            value={inventoryIn}
            onChange={(e) => {
              var v = parseInt(e.target.value);
              if (isNaN(v)) return;
              if (v.toString().length > 7) return;
              setInventoryIn(v);
            }}
          />
        </div>
        <div
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
          style={{ display: "table", margin: " auto 0" }}
        >
          <MDBBtn
            type="phone"
            color="warning"
            onClick={() => CheckInventoryIn(inventoryIn)}
          >
            Check
          </MDBBtn>
        </div>

        {/* // maximum debt customer */}
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
          <MDBInput
            label={`Thay đổi nợ tối đa của khách hàng là ${NUMBER_DEBT}`}
            name="made"
            id="made"
            value={debtCustomer}
            onChange={(e) => {
              var v = parseInt(e.target.value);
              if (isNaN(v)) return;
              if (v.toString().length > 7) return;
              setDebtCustomer(v);
            }}
          />
        </div>
        <div
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
          style={{ display: "table", margin: " auto 0" }}
        >
          <MDBBtn
            type="phone"
            color="warning"
            onClick={() => CheckCustomer(debtCustomer)}
          >
            Check
          </MDBBtn>
        </div>

        {/* // minimum inventory book */}
        <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
          <MDBInput
            label={`Thay đổi lượng tồn ít nhất sau khi bán là ${NUMBER_INVENTER}`}
            name="mibo"
            id="mibo"
            value={inventoryOut}
            onChange={(e) => {
              var v = parseInt(e.target.value);
              if (isNaN(v)) return;
              if (v.toString().length > 7) return;
              setInventoryOut(v)}}
          />
        </div>
        <div
          className="col-xs-12 col-sm-6 col-md-3 col-lg-3"
          style={{ display: "table", margin: " auto 0" }}
        >
          <MDBBtn
            type="phone"
            color="warning"
            onClick={() => CheckInventoryOut(inventoryOut)}
          >
            Check
          </MDBBtn>
        </div>
      </div>
    </Container>
  );
};

export default ChangeRules;
