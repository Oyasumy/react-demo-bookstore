import React, { useEffect } from "react";
import { MDBRow, MDBCol, MDBCard, MDBIcon } from "mdbreact";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import axios from "axios";
import * as actionB from "../../actions/BookActions";
import { API_URL } from "../../constants/ApiUrl";
const EcommercePage = (props) => {
  var { actionBook } = props;
  useEffect(() => {
    const getData = async () => {
      var res = await axios.get(`${API_URL}/bookapi/books`);
      var { data } = res.data;

      actionBook.handleGetListBooks(data);
    };

    getData();
  }, [actionBook]);


 
  return (
    <section className="text-center my-5">
      <h2 className="h1-responsive font-weight-bold text-center my-5">
        Our bestsellers
      </h2>
      
      <p className="grey-text text-center w-responsive mx-auto mb-5">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit, error
        amet numquam iure provident voluptate esse quasi, veritatis totam
        voluptas nostrum quisquam eum porro a pariatur veniam.
      </p>
      <MDBRow>
        <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
          <MDBCard collection className="z-depth-1-half">
            <div className="view zoom">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/5.jpg"
                className="img-fluid"
                alt=""
              />
              <div className="stripe dark">
                <a href="#!">
                  <p>
                    Red trousers <MDBIcon icon="angle-right" />
                  </p>
                </a>
              </div>
            </div>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
          <MDBCard collection className="z-depth-1-half">
            <div className="view zoom">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/8.jpg"
                className="img-fluid"
                alt=""
              />
              <div className="stripe dark">
                <a href="#!">
                  <p>
                    Sweatshirt <MDBIcon icon="angle-right" />
                  </p>
                </a>
              </div>
            </div>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
          <MDBCard collection className="z-depth-1-half">
            <div className="view zoom">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/9.jpg"
                className="img-fluid"
                alt=""
              />
              <div className="stripe dark">
                <a href="#!">
                  <p>
                    Accessories <MDBIcon icon="angle-right" />
                  </p>
                </a>
              </div>
            </div>
          </MDBCard>
        </MDBCol>
        <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
          <MDBCard collection className="z-depth-1-half">
            <div className="view zoom">
              <img
                src="https://mdbootstrap.com/img/Photos/Horizontal/E-commerce/Vertical/7.jpg"
                className="img-fluid"
                alt=""
              />
              <div className="stripe dark">
                <a href="#!">
                  <p>
                    Sweatshirt <MDBIcon icon="angle-right" />
                  </p>
                </a>
              </div>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </section>
  );
};

const mapStateToProps = (state) => ({
  listBooks: state.stateBook.books,
  cartData: state.cartList.cartBanSach,
  customer: state.cartList.customerBS,
});
const mapDispatchToProps = (dispatch) => ({
  actionBook: bindActionCreators({ ...actionB }, dispatch),
});

const withCon = connect(mapStateToProps, mapDispatchToProps);
export default compose(withCon)(EcommercePage);
