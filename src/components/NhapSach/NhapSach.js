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
    updatePrice,
    checkoutNS,
  } = props;
  const [value, setValue] = useState("");
  const [option, setOption] = useState({});
  
  const [donGiaNhap, setDonGiaNhap] = useState(1);

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

  useEffect(() => {
    setDonGiaNhap(option.dongianhap)
  }, [option])

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
    setNumberDebt(e);
  };

  // const updatePrice=()=>{
  //   console.log("pr",donGiaNhap);
    
  // }

  return (
    <div>
      <Container className="bg-w">
        <Header as="h2">Dogs Roles with Humans</Header>
        <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-2 mt-5px">
            <Input
              type="text"
              placeholder={(option.dongianhap)}
              // disabled
              // as={input}
              value={donGiaNhap}
              name="dongianhap"
              onChange={(e)=>{
                var num=Math.abs( parseInt( e.target.value));
                console.log("up",num,num.toString().length);

                if(num.toString().length<6 && num){
                  setDonGiaNhap(num);
                  console.log("up2",num);
                }
              }}
              tabIndex="-1"
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-2 mt-5px">
          <MDBBtn
              disabled={Object.entries(option).length === 0 ? true : false}
              onClick={() => updatePrice(donGiaNhap,option.masach)}
            >
              Update Price
            </MDBBtn>
          </div>
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
          
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 mb-2 mt-5vh">
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
