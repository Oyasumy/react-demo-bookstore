import React from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../actions/CartSBACtion";
import * as actionB from "../actions/BookActions";
import {
  API_URL,
  NUMBER_DEBT,
  NUMBER_INVENTER,
  ERROR_FROM_SEVER,
  PAYMENT_SUCCESS,
  CUSTOMER_NOT_AVAILABLE,
  ERROR_SELL_BOOK_WITH_INVENTORY,
  PHONE_IS_EMPTY,
  MONEY_RECEIVE_NOT_ENOUGH,
  ADD_DEBT_OR_CART_TO_PAYMENT,
  ERROR_SELL_BOOK_WITH_DEBT
} from "../constants/ApiUrl";
import BanSach from "../components/BanSach/BanSach";
import { useToasts } from "react-toast-notifications";

const BanSachContainer = (props) => {
  var { listBooks, actionCartBS, cartData, customer, actionBook } = props;

  //   const [checkQuantity, setCheckQuantity] = useState(0);

  const { addToast } = useToasts();

  // useEffect(() => {
  //   const getData = async () => {
  //     var res = await axios.get(`${API_URL}/bookapi/books`);
  //     var { data } = res.data;

  //     actionBook.handleGetListBooks(data);
  //   };

  //   getData();
  // }, [actionBook]);
  const upQuantity = (c) => {
    actionCartBS.handleUpToCart(c);
  };
  const deleteItem = (c) => {
    actionCartBS.handleDeleteToCart(c);
  };
  const downQuantity = (c) => {
    actionCartBS.handleDownToCart(c);
  };

  const getInfCus = async (phone) => {
    if (!phone)
      return addToast(PHONE_IS_EMPTY, {
        appearance: "error",
        autoDismiss: true,
      });

    await axios
      .get(`${API_URL}/customer/${phone}`)
      .then((res) => {
        var { data } = res.data;
        data = data[0];

        if (Object.keys(data).length > 0) {
          actionCartBS.handleAddCustomerBS(data);
        }
      })
      .catch((err) => {
        return addToast(ERROR_FROM_SEVER, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  // add to cart
  const addToCartBS = (b) => {
    console.log("book", b);
    if (b.soluong - NUMBER_INVENTER < 0)
      return addToast(ERROR_SELL_BOOK_WITH_INVENTORY(NUMBER_INVENTER), {
        appearance: "error",
        autoDismiss: true,
      });

    var { handleAddToCart } = actionCartBS;
    handleAddToCart(b);
  };

  // check out
  const checkoutBS = async (
    total,
    numberDebt,
    numberPay,
    moneyReceive,
    rest
  ) => {
    // Check customer
    if (Object.keys(customer).length === 0)
      return addToast(CUSTOMER_NOT_AVAILABLE, {
        appearance: "error",
        autoDismiss: true,
      });
   
      // Check debt customer
    if (parseInt(customer.sotienno)+parseInt(numberDebt) >= NUMBER_DEBT)
      return addToast(ERROR_SELL_BOOK_WITH_DEBT(NUMBER_DEBT), {
        appearance: "error",
        autoDismiss: true,
      });

    // Check total money
    if (total === 0)
      return addToast(ADD_DEBT_OR_CART_TO_PAYMENT, {
        appearance: "error",
        autoDismiss: true,
      });

    // check number
    var ck = [];
    if (cartData.length > 0) {
      cartData.forEach((cart) => {
        var book = listBooks.filter((m) => m.masach === cart.masach);

        var vl = parseInt(book[0].soluong) - parseInt(cart.soluong);
        if (vl < NUMBER_INVENTER) {
          ck.push(cart);
        }
        // ck = vl;
      });
    }

    if (customer.sotienno >= NUMBER_DEBT && cartData.length > 0) {
      return addToast(" The debt amount exceeded the allowed debt amount", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (ck.length > 0) {
      //  return <Protal head="Something went wrong" cont="Inventory quantity is smaller than the minimum quantity" />
      return addToast(
        "Inventory quantity is smaller than the minimum quantity",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
    } else {
      if (cartData.length > 0 && cartData) {
        // Check money receive
        if (moneyReceive < total)
          return addToast(MONEY_RECEIVE_NOT_ENOUGH, {
            appearance: "error",
            autoDismiss: true,
          });

        var newCartData = [...cartData];

        try {
          // check out
          if (parseInt(numberDebt) > 0 || parseInt(numberPay) > 0) {
            var dataToPush = {};

            //
            var extra = parseInt(-numberPay) + parseInt(numberDebt);

            // get information ctcn from makhachhang
            await axios
              .get(`${API_URL}/SellBookApi/getphatsinh/${customer.makhachhang}`)
              .then(async (res) => {
                var data = res.data.data[0];
                dataToPush = {
                  makhachhang: customer.makhachhang,
                  nodau: data.nodau,
                  phatsinh: data.phatsinh,
                  sotien: extra,
                };
              });

            //update ctcn
            await axios
              .post(`${API_URL}/SellBookApi/updatectcongno`, {
                data: dataToPush,
              })
              .then((res) => {
                // check res
              });

            // Update debt customer
            await axios
              .post(`${API_URL}/customer/updatesotienno`, {
                data: {
                  makh: customer.makhachhang,
                  sotienno: customer.sotienno + extra,
                },
              })
              .then((res) => {
                // check res
              });
          }

          var detailBill = [];
          var detailBooks = [];
          cartData.forEach((cart) => {
            // Insert into detailBill
            var { masach, soluong, dongiaban: gianhap } = cart;
            var dt = {
              masach: masach,
              soluong: soluong,
              gianhap: gianhap,
            };
            detailBill.push(dt);

            // Insert into detailBook
            var book = listBooks.filter((m) => m.masach === cart.masach);

            var { masach: masachDetail, soluong: soluongDetail } = book[0];

            // Create a tempt detail
            var dtDetail = {
              masach: masachDetail,
              soluong: soluongDetail,
            };
            detailBooks.push(dtDetail);
          });
          var dataPost = {
            makhachhang: customer.makhachhang,
            detailBill: detailBill,
            detailBooks: detailBooks,
            bill: {
              total: moneyReceive,
              payment: total,
              rest: rest,
            },
          };

          // call api to make bill
          await axios
            .post(`${API_URL}/SellBookApi/bill`, { data: dataPost })
            .then((res) => {
              if (res.status === 200) {
                //handle update quantity books
                newCartData.forEach((cart) => {
                  cart.soluong = -cart.soluong;
                });

                actionBook.handleUpdateQuantityBooksAfterCheckout(newCartData);
                // clear cart
                actionCartBS.handleClearToCart();

                // clear customer
                actionCartBS.handleDeleteCustomerBS();

                // push toast success
                return addToast(PAYMENT_SUCCESS, {
                  appearance: "info",
                  autoDismiss: true,
                });
              }
            });

          // Update bao cao ton

          var dataPostToGetPS = [];
          cartData.forEach((cart) => {
            // push to dataPostToGetPS
            var book = {};
            book.masach = cart.masach;
            dataPostToGetPS.push(book);
          });
          dataPostToGetPS = { sach: dataPostToGetPS };

          await axios
            .post(`${API_URL}/putbookapi/getphatsinh`, {
              data: dataPostToGetPS,
            })
            .then(async (res) => {
              // Create data post to update bao cao ton
              var dataUpdateBCT = [];
              var ind = 0;
              var newdata = [...res.data];
              newdata.forEach((ctbct) => {
                ctbct.soluongcapnhat = -Math.abs(cartData[ind].soluong);
                ind++;
              });
              dataUpdateBCT = { detailBooks: newdata };

              // Call Api
              await axios
                .post(`${API_URL}/putbookapi/updatectbaocaoton`, {
                  data: dataUpdateBCT,
                })
                .then((res) => {});
            })
            .catch((err) => {});
        } catch (error) {
          return addToast(ERROR_FROM_SEVER, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      } else {
        // pay debt
        try {
          // get information ctcn from makhachhang
          await axios
            .get(`${API_URL}/SellBookApi/getphatsinh/${customer.makhachhang}`)
            .then(async (res) => {
              var data = res.data.data[0];
              dataToPush = {
                makhachhang: customer.makhachhang,
                nodau: data.nodau,
                phatsinh: -data.phatsinh,
                sotien: total,
              };
            });

          //update ctcn
          await axios
            .post(`${API_URL}/SellBookApi/updatectcongno`, {
              data: dataToPush,
            })
            .then((res) => {
              // check res
            });

          // Update debt customer
          await axios
            .post(`${API_URL}/customer/updatesotienno`, {
              data: {
                makh: customer.makhachhang,
                sotienno: customer.sotienno + -total,
              },
            })
            .then((res) => {
              // check res
            });

          // Inset phieu thu
          await axios
            .post(`${API_URL}/SellBookApi/insertphieuthu`, {
              data: { makhachhang: customer.makhachhang, sotien: total },
            })
            .then((res) => {
              // check res
            });
          var { handleUpdateDebtCustomerBS } = actionCartBS;
          await handleUpdateDebtCustomerBS();
          return addToast(PAYMENT_SUCCESS, {
            appearance: "info",
            autoDismiss: true,
          });
        } catch (error) {
          return addToast(ERROR_FROM_SEVER, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    }
  };
  return (
    <div>
      <BanSach
        books={listBooks}
        cartData={cartData}
        upQuantity={upQuantity}
        deleteItem={deleteItem}
        downQuantity={downQuantity}
        getInfCus={getInfCus}
        addToCartBS={addToCartBS}
        customer={customer}
        checkoutBS={checkoutBS}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  listBooks: state.stateBook.books,
  cartData: state.cartList.cartBanSach,
  customer: state.cartList.customerBS,
});
const mapDispatchToProps = (dispatch) => ({
  actionCartBS: bindActionCreators({ ...action }, dispatch),
  actionBook: bindActionCreators({ ...actionB }, dispatch),
});

const withCon = connect(mapStateToProps, mapDispatchToProps);
export default compose(withCon)(BanSachContainer);
