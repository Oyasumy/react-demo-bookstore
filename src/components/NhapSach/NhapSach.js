import React, { useState, useEffect } from "react";
import { Container, Header, Select, Input } from "semantic-ui-react";
import { MDBBtn } from "mdbreact";
import Cart from "./Cart";
import {
  NUMBER_INVENTER,
  MINIMUM_BOOK_ENTERED,
  NUMBER_BOOK_CAN_BE_ENTERED,
} from "../../constants/ApiUrl";
import NumberInput from "semantic-ui-react-numberinput";

const NhapSach = (props) => {
  var {
    books,
    cartData,
    upQuantity,
    deleteItem,
    downQuantity,

    addToCartNS,

    checkoutNS,
  } = props;
  const [value, setValue] = useState("");
  const [option, setOption] = useState({});

  const [numberDebt, setNumberDebt] = useState(MINIMUM_BOOK_ENTERED);

  useEffect(() => {
    setValue(optionSelect(books));
  }, [books]);
  const optionSelect = (books) => {
    var result = [];
    books.map((book, i) => {
      var b = {
        key: i,
        value: book.masach,
        text: book.tensach,
      };
      return result.push(b);
    });
    return result;
  };

  const handleCheckOption = (v, books = []) => {
    var result = null;
    result = books.map((b) => {
      if (b.masach === v) {
        setOption(b);
      }
      return option;
    });

    return result;
  };
  const getValueToCart = () => {
    if (option) {
    }
    addToCartNS(option, numberDebt);
  };

  const changeNumberBook = (e) => {
    console.log("e", e);

    setNumberDebt(e);
  };

  return (
    <div>
      <Container className="bg-w">
        <Header as="h2">Dogs Roles with Humans</Header>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-2 mt-5px">
            <Select
              placeholder="Select Book"
              options={value}
              onChange={(e, { value }) => handleCheckOption(value, books)}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-2 mt-5px">
            <Input
              type="text"
              placeholder={option.tacgia}
              disabled
              tabIndex="-1"
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mb-2 mt-5px">
            <Input
              type="text"
              placeholder={
                option.soluong < NUMBER_BOOK_CAN_BE_ENTERED
                  ? "Can  be entered "
                  : "Can not be sold"
              }
              disabled
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3mb-2 mt-5vh">
            <NumberInput
              // minValue={MINIMUM_BOOK_ENTERED}
              maxValue={1000}
              value={`${numberDebt}`}
              onChange={(e) => changeNumberBook(e)}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 mt-5vh ">
            <MDBBtn
              disabled={Object.entries(option).length === 0 ? true : false}
              onClick={() => getValueToCart()}
            >
              Add
            </MDBBtn>
          </div>
        </div>
        <Container>
          {/* Cart  */}
          <Cart
            cartData={cartData}
            upQuantity={upQuantity}
            deleteItem={deleteItem}
            downQuantity={downQuantity}
            checkoutNS={checkoutNS}
          />
          {/* Cart  */}
        </Container>
      </Container>
    </div>
  );
};

export default NhapSach;
