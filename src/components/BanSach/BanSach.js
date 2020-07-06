import React, { useState, useEffect } from "react";
import { Container, Header, Select, Input } from "semantic-ui-react";
import { MDBBtn } from "mdbreact";
import Cart from "./Cart";
import { NUMBER_INVENTER } from "../../constants/ApiUrl";

const BanSach = (props) => {
  var {
    books,
    cartData,
    upQuantity,
    deleteItem,
    downQuantity,
    getInfCus,
    addToCartBS,
    customer,
    checkoutBS,
  } = props;
  const [value, setValue] = useState("");
  const [option, setOption] = useState({});

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
    addToCartBS(option);
  };
  return (
    <div>
      <Container className="bg-w">
        <Header as="h2">Dogs Roles with Humans</Header>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-2 mt-5px">
            <Select
              placeholder="Select Book"
              options={value}
              onChange={(e, { value }) => handleCheckOption(value, books)}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-2 mt-5px">
            <Input
              type="text"
              placeholder={option.tacgia}
              disabled
              tabIndex="-1"
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-2 mt-5px">
            <Input
              type="text"
              placeholder={
                option.soluong > NUMBER_INVENTER
                  ? `
Quantity can buy ${option.soluong - NUMBER_INVENTER}`
                  : "Can not be sold"
              }
              disabled
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 mb-2">
            <MDBBtn disabled={Object.entries(option).length === 0 ? true : false}
            onClick={() => getValueToCart()}>Add</MDBBtn>
          </div>
        </div>
        <Container>
          {/* Cart  */}
          <Cart
            cartData={cartData}
            upQuantity={upQuantity}
            deleteItem={deleteItem}
            downQuantity={downQuantity}
            getInfCus={getInfCus}
            customer={customer}
            checkoutBS={checkoutBS}
          />
          {/* Cart  */}
        </Container>
      </Container>
    </div>
  );
};

export default BanSach;
