import React, { useState, useEffect } from "react";
import {
  Input,
  Checkbox,
  Label,
  Button,
  Icon,
  Message,
} from "semantic-ui-react";
import NumberInput from "semantic-ui-react-numberinput";
import { MDBBtn } from "mdbreact";
import { NUMBER_DEBT } from "../../constants/ApiUrl";

const Checkout = (props) => {
  var { price, customer, getInfCus, checkoutBS } = props;

  const [value, setValue] = useState("");
  const [checked, setChecked] = useState("");
  const [numberPay, setNumberPay] = useState(0);
  const [numberDebt, setNumberDebt] = useState(0);

  const [moneyRecieve, setMoneyRecieve] = useState(0);

  const [totalLast, setTotalLast] = useState(0);

  useEffect(() => {
    if (checked) {
      setNumberPay(customer.sotienno);
    } else if (checked === false) {
      setNumberPay(0);
    }
  }, [checked, customer.sotienno]);

  // useEffect(() => {
  //   var tt = parseInt(total) + parseInt(numberDebt);
  //   setTotalLast(tt);
  // }, [numberDebt]);

  useEffect(() => {
    if (Object.entries(customer).length === 0 && price === 0) {
      setTotalLast(0);
      setChecked(false);
      setNumberPay(0);
      setNumberDebt(0);
      setMoneyRecieve(0);
      setValue("");
      return;
    }
    if (numberPay === undefined) {
      setTotalLast(0);
      setNumberPay(0);
      return;
    }
    if (price === undefined || price === null) {
      setTotalLast(0);
      setNumberDebt(0);
      setNumberPay(0);
      setMoneyRecieve(0);
      return;
    }
    setTotalLast(
      parseInt(price) - parseInt(numberDebt) + parseInt(numberPay || 0)
    );
    return;
  }, [price, numberDebt, numberPay, customer]);

  useEffect(() => {}, [price, customer]);

  const setPrice = (e) => {
    setChecked(!checked);
    setNumberPay(customer.sotienno);
  };

  const handleSetNumberDebt = (e) => {
    setNumberDebt(e);
  };

  const handleSetValue = (v) => {
    v = parseInt(v);
    console.log("v", v, typeof v);
    if (isNaN(v)) return;
    if (v.toString().length > 12) return;
    setValue(v);
    // if (v%2===0) {
    //   setValue(0);

    // }
  };
  return (
    <div className="col-lg-4">
      {/* Card */}
      <div className="mb-3">
        <div className="pt-4">
          <h5 className="mb-3">The total amount of</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center ">
              <Input
                action={() => (
                  <MDBBtn onClick={() => getInfCus(value)}>Search</MDBBtn>
                )}
                placeholder="Search..."
                value={value}
                onChange={(e, { value }) => handleSetValue(value)}
              />
            </li>
            {Object.keys(customer).length > 0 ? (
              <>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Customer name
                  <span>{customer.tenkhachhang}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Address
                  <span>{customer.diachi}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                  Debt
                  <span>{customer.sotienno}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <Checkbox
                    label={<label>Pay the debt</label>}
                    defaultChecked={checked}
                    onChange={(e) => setPrice(e)}
                  />
                </li>
                {customer.sotienno < NUMBER_DEBT ? (
                  <>
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                      style={{ marginBottom: "5%" }}
                    >
                      <Button as="div" labelPosition="right">
                        <Button basic color="blue">
                          <Icon name="fork" />
                          Debt
                        </Button>
                        <Label as="a" basic color="blue" pointing="left">
                          Max: {(Math.ceil(price / 10)>=NUMBER_DEBT)?NUMBER_DEBT:(Math.ceil(price / 10)) }
                        </Label>
                      </Button>
                    </li>
                    <li
                      className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                      style={{ marginBottom: "5%" }}
                    >
                      {/* <Input labelPosition="right" type="text" placeholder="Amount">
                    <Label basic>$</Label> */}
                      {/* <NumberInput minValue={0} value={numberDebt} onChange={(e)=>setNumberDebt(e)} maxValue={Math.ceil(total/10)}/> */}
                      <NumberInput
                        minValue={0}
                        maxValue={Math.ceil(price / 10)}
                        value={`${numberDebt}`}
                        onChange={(e) => handleSetNumberDebt(e)}
                      />
                    </li>
                    {/* <Label>.00</Label>
                  </Input> */}
                  </>
                ) : (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                    style={{ marginBottom: "5%" }}
                  >
                    <Message icon>
                      <Icon name="circle notched" loading />
                      <Message.Content>
                        <Message.Header>Just one second</Message.Header>
                        The amount of debt is greater than {NUMBER_DEBT} so it
                        cannot be paid
                      </Message.Content>
                    </Message>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Please add customer before check out
                  <span>Note!!</span>
                </li>
              </>
            )}

            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>The total amount of</strong>
                <strong>
                  <p className="mb-0">(including VAT)</p>
                </strong>
              </div>
              <span>
                <strong>$ {totalLast}</strong>
              </span>
            </li>
            {price > 0 ? (
              <>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                  style={{ marginBottom: "5%" }}
                >
                  Money received
                  <Input labelPosition="right" type="text" placeholder="Amount">
                    <Label basic>$</Label>
                    <input
                      value={moneyRecieve}
                      onChange={(e) => {
                        var v = parseInt(e.target.value);
                        if (isNaN(v)) return;
                        if (v.toString().length > 12) return;
                        setMoneyRecieve(v);
                      }}
                    />
                    <Label>.00</Label>
                  </Input>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                  style={{ marginBottom: "5%" }}
                >
                  Payments
                  <Input labelPosition="right" type="text" placeholder="Amount">
                    <Label basic>$</Label>
                    <input value={totalLast} disabled />
                    <Label>.00</Label>
                  </Input>
                </li>
                <li
                  className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0"
                  style={{ marginBottom: "5%" }}
                >
                  Rest
                  <Input labelPosition="right" type="text" placeholder="Amount">
                    <Label basic>$</Label>
                    <input value={moneyRecieve - totalLast} disabled />
                    <Label>.00</Label>
                  </Input>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() =>
              checkoutBS(
                totalLast,
                numberDebt,
                numberPay,
                moneyRecieve,
                moneyRecieve - totalLast
              )
            }
          >
            go to checkout
          </button>
        </div>
      </div>
      {/* Card */}
      {/* Card */}
      <div className="mb-3">
        <div className="pt-4">
          <a
            className="dark-grey-text d-flex justify-content-between"
            data-toggle="collapse"
            href="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Add a discount code (optional)
            <span>
              <i className="fas fa-chevron-down pt-1" />
            </span>
          </a>
          <div className="collapse" id="collapseExample">
            <div className="mt-3">
              <div className="md-form md-outline mb-0">
                <input
                  type="text"
                  id="discount-code"
                  className="form-control font-weight-light"
                  placeholder="Enter discount code"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Card */}
    </div>
  );
};

export default Checkout;
