import * as Types from "../constants/Books";

const initalState = {
  datatableBCT: [],
  datatableBCCN: [],
};

const ReportReducer = (state = initalState, action) => {
  var data = null;
  switch (action.type) {
    case Types.ADD_DATA_REPORT_BCT:
      data = action.payload.data;
      return { ...state, datatableBCT: [...data], datatableBCCN: [] };

    case Types.ADD_DATA_REPORT_BCCN:
      data = action.payload.data;
      return { ...state, datatableBCCN: [...data], datatableBCT: [] };
    default:
      return state;
  }
};

export default ReportReducer;
