import * as Types from "../constants/Books";
import { RATE_OF_INPUT_UNIT_PRICE } from "../constants/ApiUrl";

var initalState = {
  books: [
    {
      masach: 1,
      tensach: "pokemon",
      theloai: "hh",
      tacgia: "ntt",
      dongianhap: 23,
      dongiaban: 11,
      soluong: 123,
    },
    {
      masach: 2,
      tensach: "conan",
      theloai: "hh",
      tacgia: "ntt",
      dongianhap: 73,
      dongiaban: 51,
      soluong: 123,
    },
  ],
  editBook: {},
  isShowModel: false,
};

const BookReducer = (state = initalState, action) => {
  var index = -1;
  var newData = {};
  var data = "";
  var books = state.books;
  switch (action.type) {
    case Types.SHOW_MODEL:
      return { ...state, isShowModel: !state.isShowModel };

    case Types.GET_LIST_BOOKS:
      return { ...state, books: action.payload.data };

    case Types.EDIT_BOOK:
      data = action.payload.data;

      return { ...state, editBook: data };

    case Types.EDIT_EMPTY_BOOK:
      return { ...state, editBook: {} };

    case Types.ADD_BOOKS:
      data = action.payload.data;
      data.dongianhap = 0;
      data.dongiaban = 0;
      data.soluong = 0;
      books = state.books;
      newData = books.concat(data);
      return { ...state, books: newData };

    case Types.DELETE_BOOKS:
      data = action.payload.data;
      books = state.books;
      index = findIndex(state, data);
      if (index > 0) {
        newData = [...books.slice(0, index), ...books.slice(index + 1)];
      }

      return {
        ...state,
        books: newData,
      };

    case Types.SET_EDIT_BOOKS:
      data = action.payload.data;
      var { dongianhap, ...res } = data;
      var dongiaban = Math.ceil(
        parseInt(dongianhap) * RATE_OF_INPUT_UNIT_PRICE
      );
      data.dongiaban = dongiaban;

      books = state.books;
      index = findIndex(state, data);

      if (index > 0) {
        newData = [...books.slice(0, index), data, ...books.slice(index + 1)];
      } else {
        newData = [data, ...books.slice(index + 1)];
      }
      return {
        ...state,
        books: newData,
      };

    case Types.UPDATE_QUANTITY_AFTER_CHECKOUT:
      data = action.payload.data;

      var newListBook = updateBook(data, books);

      return { ...state, books: newListBook };

    default:
      return state;

    case Types.UPDATE_PRICE:
      data = action.payload.data;
      console.log("bok", data);

      var newBook = books.filter((m) => m.masach === data.masach);
      newBook.forEach(m=>{
        m.dongiaban= Math.ceil(data.dongianhap * RATE_OF_INPUT_UNIT_PRICE);
        m.dongianhap=data.dongianhap
      })
      // newBook.dongianhap = data.dongianhap;
      // newBook.dongiaban = Math.ceil(data.dongianhap * RATE_OF_INPUT_UNIT_PRICE);
      console.log("bok2", newBook);
      index = findIndex(state, data);

      if (index > 0) {
        newData = [...books.slice(0, index), newBook[0],...books.slice(index + 1)];
      } else {
        newData = [newBook[0],...books.slice(index + 1)];
      }
      return {
        ...state,
        books: newData,
      };
  }
};

const findIndex = (state, products) => {
  var result = -1;
  var { books } = state;
  for (var i = 0; i < books.length; i++) {
    if (parseInt(books[i].masach) === parseInt(products.masach)) {
      result = i;
      return result;
    }
  }
  return result;
};

const updateBook = (data, books) => {
  data.forEach((cart) => {
    var ck = books.filter((b) => b.masach === cart.masach);

    ck[0].soluong += cart.soluong;
  });
  return books;
};

export default BookReducer;
