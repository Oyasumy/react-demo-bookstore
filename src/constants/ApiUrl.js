export var API_URL = "http://localhost:4000";

export var NUMBER_DEBT = 20000;

export const SET_NUMBER_DEBT = (num) => {
  num = parseInt(num);
  if (typeof num === "number" && Math.floor(num) === num) {
    NUMBER_DEBT = num;
    return 1;
  }
  return -1;
};

export var NUMBER_INVENTER = 20;

export const SET_NUMBER_INVENTER = (num) => {
  num = parseInt(num);
  if (typeof num === "number" && Math.floor(num) === num) {
    NUMBER_INVENTER = num;
    return 1;
  }
  return -1;
};

export var NUMBER_BOOK_CAN_BE_ENTERED = 300;

export const SET_NUMBER_BOOK_CAN_BE_ENTERED = (num) => {
  num = parseInt(num);
  if (typeof num === "number" && Math.floor(num) === num) {
    NUMBER_BOOK_CAN_BE_ENTERED = num;
    return 1;
  }
  return -1;
};

export var MINIMUM_BOOK_ENTERED = 150;

export const SET_MINIMUM_BOOK_ENTERED = (num) => {
  num = parseInt(num);
  if (typeof num === "number" && Math.floor(num) === num) {
    MINIMUM_BOOK_ENTERED = num;
    return 1;
  }
  return -1;
};

export var RATE_OF_INPUT_UNIT_PRICE = 1.05;

export const SET_RATE_OF_INPUT_UNIT_PRICE = (num) => {
  num = parseInt(num);
  if (typeof num === "number" && Math.floor(num) === num) {
    RATE_OF_INPUT_UNIT_PRICE = num;
    return 1;
  }
  return -1;
};

export const PAYMENT_SUCCESS = "Payment success";

export const ERROR_FROM_SEVER = "There was an error from the server";

export const GET_DATA_REPORT_SUCCESS = "Get data report success !!";

export const GET_DATA_REPORT_EMPTY = "Data report is Empty !!";

export const CHANGE_RULES_SUCCESS = "Change rules success !!";

export const CHANGE_RULES_FAILED = "Change rules failed !!";

export var ERROR_MINIMUM_BOOK_ENTERED =(text)=> `Minimum wage amount must be ${text}`;

export var ERROR_MAXIMUM_BOOK_ENTERED =(text) => `Unable to import book because the number of remaining books is greater than ${text}`;

