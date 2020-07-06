import React, { useState, useEffect } from "react";


const Checkout = (props) => {
  var { price, checkoutNS } = props;

  const [totalLast, setTotalLast] = useState(0);

  console.log("price",price);
  
  useEffect(() => {
    setTotalLast(price);
  }, [price]);

  return (
    <div className="col-lg-4">
      {/* Card */}
      <div className="mb-3">
        <div className="pt-4">
          <h5 className="mb-3">The total amount of</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
              <div>
                <strong>The total amount of</strong>
                <strong>
                  <p className="mb-0">(including VAT)</p>
                </strong>
              </div>
              <span>
                <strong>$ {totalLast}</strong>
              </span>
            </li>
          </ul>
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => checkoutNS(totalLast)}
          >
            go to checkout
          </button>
        </div>
      </div>
      {/* Card */}
      {/* Card */}
      <div className="mb-3"></div>
      {/* Card */}
    </div>
  );
};

export default Checkout;
