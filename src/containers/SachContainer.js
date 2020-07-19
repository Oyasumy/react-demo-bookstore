import React from "react";
import Sach from "../components/Sach/Sach";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../actions/BookActions";
import { API_URL, ERROR_FROM_SEVER } from "../constants/ApiUrl";
import { useToasts } from "react-toast-notifications";

const SachContainer = (props) => {
  var { listBooks, actionBook, editBook, isShowModel } = props;

  const { addToast } = useToasts();

  // useEffect(() => {
  //   const getData = async () => {
  //     var res = await axios.get(`${API_URL}/bookapi/books`);
  //     var { data } = res.data;

  //     actionBook.handleGetListBooks(data);
  //   };
  //   getData();
  // }, [actionBook]);

  const setEditBook = (data) => {
    var { handleEditBook } = actionBook;
    handleEditBook(data);
  };
  const setEmpty = () => {
    var { handleEditEmptyBook } = actionBook;
    handleEditEmptyBook();
  };

  const setApiEditBook = async (b) => {
    await axios
      .put(`${API_URL}/bookapi/books/${b.masach}`, {
        sach: b,
      })
      .then((res) => {
        console.log("res", res);

        if (res.status === 201) {
          actionBook.handleEditBooks(b);
          return addToast("Success !!", {
            appearance: "info",
            autoDismiss: true,
          });
        }
      })
      .catch((err) => {
        return addToast(ERROR_FROM_SEVER, {
          appearance: "error",
          autoDismiss: true,
        });
      });
    actionBook.handleShowModel();
  };

  const setApiAddBook = async (b) => {
    await axios
      .post(`${API_URL}/bookapi/books`, { sach: b })
      .then((res) => {
        console.log("res", res);

        if (res.status === 201) {
          return addToast("Success !!", {
            appearance: "info",
            autoDismiss: true,
          });
        }
      })
      .catch((err) => {
        return addToast(ERROR_FROM_SEVER, {
          appearance: "error",
          autoDismiss: true,
        });
      });
    actionBook.handleAddBooks(b);
    actionBook.handleShowModel();
  };

  const setOpen = () => {
    actionBook.handleShowModel();
  };
  
  const setDelete = async (b) => {
    await axios
      .get(`${API_URL}/bookapi/booksd/${b.masach}`)
      .then((res) => {
        console.log("res", res);
        if (res.status === 201) {
          actionBook.handleDeleteBooks(b);
          return addToast("Success !!", {
            appearance: "info",
            autoDismiss: true,
          });
        }
      })
      .catch((err) => {
        return addToast(ERROR_FROM_SEVER +" OR error foreign key constraint ", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  return (
    <div>
      <Sach
        books={listBooks}
        setEditBook={setEditBook}
        setOpen={setOpen}
        bookEdit={editBook}
        isShowModel={isShowModel}
        setDelete={setDelete}
        setEmpty={setEmpty}
        setApiAddBook={setApiAddBook}
        setApiEditBook={setApiEditBook}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  listBooks: state.stateBook.books,
  editBook: state.stateBook.editBook,
  isShowModel: state.stateBook.isShowModel,
});
const mapDispatchToProps = (dispatch) => ({
  actionBook: bindActionCreators({ ...action }, dispatch),
});

const withCon = connect(mapStateToProps, mapDispatchToProps);
export default compose(withCon)(SachContainer);
