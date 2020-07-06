import React  from "react";
import Sach from "../components/Sach/Sach";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../actions/BookActions";
import { API_URL } from "../constants/ApiUrl";

const SachContainer = (props) => {
  var { listBooks, actionBook, editBook, isShowModel } = props;

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
    await axios.put(`${API_URL}/bookapi/books/${b.masach}`, {
      sach: b,
    });
    actionBook.handleEditBooks(b);
    actionBook.handleShowModel();
  };

  const setApiAddBook = async (b) => {
    await axios.post(`${API_URL}/bookapi/books`, { sach: b });
    actionBook.handleAddBooks(b);
    actionBook.handleShowModel();
  };
  const setOpen = () => {
    actionBook.handleShowModel();
  };
  const setDelete =(b)=>{
      
      actionBook.handleDeleteBooks(b);
  }
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
