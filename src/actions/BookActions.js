import * as Types from "../constants/Books";

// handle edit book
export const handleEditBook = (data) => ({
  type: Types.EDIT_BOOK,
  payload: {
    data,
  },
});

// handle show model
export const handleShowModel = () => ({
  type: Types.SHOW_MODEL,
});

// handle set empty edit book
export const handleEditEmptyBook = () => ({
  type: Types.EDIT_EMPTY_BOOK,
});

// handle get list books
export const handleGetListBooks = (data) => ({
  type: Types.GET_LIST_BOOKS,
  payload: {
    data,
  },
});

// handle add books
export const handleAddBooks = (data) => ({
  type: Types.ADD_BOOKS,
  payload: {
    data,
  },
});

// handle add books
export const handleEditBooks = (data) => ({
  type: Types.SET_EDIT_BOOKS,
  payload: {
    data,
  },
});

// handle add books
export const handleDeleteBooks = (data) => ({
  type: Types.DELETE_BOOKS,
  payload: {
    data,
  },
});

// update quantity book 
export const handleUpdateQuantityBooksAfterCheckout = (data) => ({
  type: Types.UPDATE_QUANTITY_AFTER_CHECKOUT,
  payload: {
    data,
  },
});

// update quantity book 
export const handleAddListDataReportBCT = (data) => ({
  type: Types.ADD_DATA_REPORT_BCT,
  payload: {
    data,
  },
});

// update quantity book 
export const handleAddListDataReportBCCN = (data) => ({
  type: Types.ADD_DATA_REPORT_BCCN,
  payload: {
    data,
  },
});

// update quantity book 
export const handleUpdatePrice = (data) => ({
  type: Types.UPDATE_PRICE,
  payload: {
    data,
  },
});