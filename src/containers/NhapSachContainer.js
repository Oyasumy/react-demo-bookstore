import React from "react";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../actions/CartNSACtion";
// import * as actionB from "../actions/BookActions";
import * as actionB from "../actions/BookActions";
import {
  API_URL,
  MINIMUM_BOOK_ENTERED,
  ERROR_FROM_SEVER,
  ERROR_MINIMUM_BOOK_ENTERED,
  NUMBER_BOOK_CAN_BE_ENTERED,
  ERROR_MAXIMUM_BOOK_ENTERED,
  PAYMENT_SUCCESS,
  ADD_CART_TO_PAYMENT,
} from "../constants/ApiUrl";
import { useToasts } from "react-toast-notifications";
import NhapSach from "../components/NhapSach/NhapSach";

const NhapSachContainer = (props) => {
  var { listBooks, actionCartNS, cartData, actionBook } = props;

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

  // useEffect(() => {
  //   cartData.forEach((cart) => {
  //     if (cart.soluong < MINIMUM_BOOK_ENTERED) {
  //       return addToast(ERROR_MINIMUM_BOOK_ENTERED, {
  //         appearance: "error",
  //         autoDismiss: true,
  //       });
  //     }
  //   });
  // }, [cartData]);

  const upQuantity = (c) => {
    actionCartNS.handleUpToCart(c);
  };
  const deleteItem = (c) => {
    actionCartNS.handleDeleteToCart(c);
  };
  const downQuantity = (c) => {
    actionCartNS.handleDownToCart(c);
  };

  // add to cart
  const addToCartNS = (b, num) => {

    if (b.soluong > NUMBER_BOOK_CAN_BE_ENTERED) {
      return addToast(ERROR_MAXIMUM_BOOK_ENTERED(NUMBER_BOOK_CAN_BE_ENTERED), {
        appearance: "error",
        autoDismiss: true,
      });
    }

    if (num < MINIMUM_BOOK_ENTERED) {
      return addToast(ERROR_MINIMUM_BOOK_ENTERED(MINIMUM_BOOK_ENTERED), {
        appearance: "error",
        autoDismiss: true,
      });
    }


    b.num = parseInt(num);

    var { handleAddToCart } = actionCartNS;
    handleAddToCart(b);
  };

  // check out
  const checkoutNS = async (total) => {

    if (total === 0)
    return addToast(ADD_CART_TO_PAYMENT, {
      appearance: "error",
      autoDismiss: true,
    });


    // Data post to create bill
    var dataPostToCreateBill = [];
    var detailBill = [];
    var detailBooks = [];

    // Data post to get information ctbaocaoton
    var dataPost = [];
    cartData.forEach((cart) => {
      // push to dataPost
      var book = {};
      book.masach = cart.masach;
      dataPost.push(book);

      // push to dataPostToCreateBill
      var { masach: masachBill, soluong: soluongBill, dongianhap } = cart;
      var elementDetailBill = {
        masach: masachBill,
        soluong: soluongBill,
        gianhap: dongianhap,
      };

      var bookToGet = listBooks.find((m) => m.masach === cart.masach);
      var { masach: masachBook, soluong: soluongBook } = bookToGet;
      var elementDetailBook = {
        masach: masachBook,
        soluong: soluongBook,
      };

      detailBooks.push(elementDetailBook);

      detailBill.push(elementDetailBill);
    });

    dataPostToCreateBill = {
      detailBill: detailBill,
      detailBooks: detailBooks,
    };

    dataPost = { sach: dataPost };

    await axios
      .post(`${API_URL}/putbookapi/getphatsinh`, { data: dataPost })
      .then(async (res) => {

        // Create data post to update bao cao ton
        var dataUpdateBCT = [];
        var ind = 0;
        res.data.forEach((ctbct) => {
          ctbct.soluongcapnhat = cartData[ind].soluong;
          ind++;
        });
        dataUpdateBCT = { detailBooks: res.data };


        // Call Api
        await axios
          .post(`${API_URL}/putbookapi/updatectbaocaoton`, {
            data: dataUpdateBCT,
          })
          .then(async (res) => {

            // Create bill


            await axios
              .post(`${API_URL}/putbookapi/bill`, {
                data: dataPostToCreateBill,
              })
              .then((res) => {

                actionBook.handleUpdateQuantityBooksAfterCheckout(cartData);

                actionCartNS.handleClearToCart();

                // push toast success
                return addToast(PAYMENT_SUCCESS, {
                  appearance: "info",
                  autoDismiss: true,
                });
              });
          });
      })
      .catch((err) => {
        return addToast(ERROR_FROM_SEVER, {
          appearance: "error",
          autoDismiss: true,
        });
      });

    //     var { data } = res.data;
  };
  return (
    <div>
      <NhapSach
        books={listBooks}
        cartData={cartData}
        upQuantity={upQuantity}
        deleteItem={deleteItem}
        downQuantity={downQuantity}
        addToCartNS={addToCartNS}
        checkoutNS={checkoutNS}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  listBooks: state.stateBook.books,
  cartData: state.cartList.cartNhapSach,
});
const mapDispatchToProps = (dispatch) => ({
  actionCartNS: bindActionCreators({ ...action }, dispatch),
  actionBook: bindActionCreators({ ...actionB }, dispatch),
});

const withCon = connect(mapStateToProps, mapDispatchToProps);
export default compose(withCon)(NhapSachContainer);
