import React, { useState, useEffect } from "react";
import { MDBDataTableV5, MDBInput, MDBBtn } from "mdbreact";
import { Container, Select } from "semantic-ui-react";

export default function Basic(props) {
  var { postData, datatableBCT: DTBCT, datatableBCCN: DTBCCN } = props;

  const [datatableBCT, setDatatableBCT] = React.useState({});
  const [datatableBCCN, setDatatableBCCN] = React.useState({});


  useEffect(() => {

    if (DTBCT.length > 0) {

      setDatatableBCT({
        columns: [
          {
            label: "Inventory Report Detail",
            field: "mactbaocaoton",
            width: 100,
            attributes: {
              "aria-controls": "DataTable",
              "aria-label": "Inventory Report",
            },
          },
          {
            label: "Inventory Report",
            field: "mabaocaoton",
            width: 100,
          },
          {
            label: "Book ID",
            field: "masach",
            width: 100,
          },
          {
            label: "Name Book",
            field: "tensach",
            sort: "asc",
            width: 200,
          },
          {
            label: "Initial Inventory",
            field: "tondau",
            sort: "asc",
            width: 150,
          },
          {
            label: "Quantity Arising",
            field: "phatsinh",
            sort: "asc",
            width: 150,
          },
          {
            label: "Last Inventory",
            field: "toncuoi",
            sort: "asc",
            width: 150,
          },
        ],
        rows: DTBCT,
      });
      setDatatableBCCN({});
    }
    if (DTBCCN.length > 0) {

      setDatatableBCCN({
        columns: [
          {
            label: "Debt Report Detail",
            field: "mactcongno",
            width: 100,
            attributes: {
              "aria-controls": "DataTable",
              "aria-label": "Debt Report",
            },
          },
          {
            label: "Debt Report",
            field: "macongno",
            width: 100,
          },
          {
            label: "Customer ID",
            field: "makhachhang",
            width: 100,
          },
          {
            label: "Name Customer",
            field: "tenkhachhang",
            sort: "asc",
            width: 200,
          },
          {
            label: "Initial Debt",
            field: "nodau",
            sort: "asc",
            width: 150,
          },
          {
            label: "Quantity Arising",
            field: "phatsinh",
            sort: "asc",
            width: 150,
          },
          {
            label: "Last Debt",
            field: "nocuoi",
            sort: "asc",
            width: 150,
          },
        ],
        rows: DTBCCN,
      });
      setDatatableBCT({});
    }
  }, [DTBCT, DTBCCN]);

  const [value, setValue] = useState(0);
  const [option, setOption] = useState(0);

  const countryOptions = [
    { key: "1", value: "1", text: "Báo cáo công nợ" },
    { key: "2", value: "2", text: "Báo cáo tồn" },
  ];

  const handleChange = (e) => {
    var data = e.target.value;
    if (data < 0) return;
    if (data > 12) return;
    setValue(data);
  };
  return (
    <>
      <Container>
        <div className="row" style={{ justifyContent: "flex-end" }}>
          <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2">
            <MDBInput
              label="Month input"
              name="month"
              id="month"
              value={value}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div
            className="col-xs-12 col-sm-2 col-md-2 col-lg-2"
            style={{ display: "table", margin: " auto 0" }}
          >
            <Select
              placeholder="Select your Report"
              options={countryOptions}
              onChange={(e, { value }) => setOption(value)}
            />
          </div>
          <div
            className="col-xs-12 col-sm-2 col-md-2 col-lg-2"
            style={{ display: "table", margin: " auto 0" }}
          >
            <MDBBtn
              type="phone"
              color="warning"
              onClick={() => postData(value, option)}
            >
              Check
            </MDBBtn>
          </div>
        </div>
        {DTBCT.length > 0 || DTBCCN.length > 0 ? (
         ! DTBCCN.length > 0 ? (
            <MDBDataTableV5
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={datatableBCT}
            />
          ) : (
            <MDBDataTableV5
              hover
              entriesOptions={[5, 20, 25]}
              entries={5}
              pagesAmount={4}
              data={datatableBCCN}
            />
          )
        ) : (
          <p className="text-center mt-4">Not available Report</p>
        )}
      </Container>
    </>
  );
}
