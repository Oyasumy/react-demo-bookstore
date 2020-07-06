import React from "react";
import Report from "../components/Report/Report";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import * as action from "../actions/BookActions";
import {
  API_URL,
  GET_DATA_REPORT_SUCCESS,
  ERROR_FROM_SEVER,
  GET_DATA_REPORT_EMPTY,
} from "../constants/ApiUrl";
import { useToasts } from "react-toast-notifications";

const ReportContainer = (props) => {
  var { datatableBCT, datatableBCCN, actionBook } = props;
  const { addToast } = useToasts();

  const postData = async (data, option) => {

    // Api to get Report bao cao cong no
    if (parseInt(option) === 1) {
      await axios
        .get(`${API_URL}/reportapi/getcongnoreportwithmonth/${data}`)
        .then((res) => {
          if (res.data.length > 0) {
            actionBook.handleAddListDataReportBCCN(res.data);

            return addToast(GET_DATA_REPORT_SUCCESS, {
              appearance: "info",
              autoDismiss: true,
            });
          }
          return addToast(GET_DATA_REPORT_EMPTY, {
            appearance: "warning",
            autoDismiss: true,
          });
        })
        .catch((err) => {
          return addToast(ERROR_FROM_SEVER, {
            appearance: "error",
            autoDismiss: true,
          });
        });
      return;
    }

    // Api to get Report bao cao ton
    await axios
      .get(`${API_URL}/reportapi/getbaocaotonreportwithmonth/${data}`)
      .then((res) => {
        if (res.data.length > 0) {
          actionBook.handleAddListDataReportBCT(res.data);

          return addToast(GET_DATA_REPORT_SUCCESS, {
            appearance: "info",
            autoDismiss: true,
          });
        }
        return addToast(GET_DATA_REPORT_EMPTY, {
          appearance: "warning",
          autoDismiss: true,
        });
      })
      .catch((err) => {
        return addToast(ERROR_FROM_SEVER, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  return (
    <div>
      <Report
        datatableBCT={datatableBCT}
        datatableBCCN={datatableBCCN}
        postData={postData}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  datatableBCT: state.datatable.datatableBCT,
  datatableBCCN: state.datatable.datatableBCCN,
});
const mapDispatchToProps = (dispatch) => ({
  actionBook: bindActionCreators({ ...action }, dispatch),
});

const withCon = connect(mapStateToProps, mapDispatchToProps);
export default compose(withCon)(ReportContainer);
