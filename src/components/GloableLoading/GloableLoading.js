import React from "react";
import { Fade, CircularProgress, withStyles } from "@material-ui/core";
import { compose } from "redux";
import { style } from "./style";

const GloableLoading = (props) => {
  var { classes } = props;

  const [loading] = React.useState(true);

  return (
    <div className={classes.marginLoad}>
      <Fade
        in={loading}
        style={{
          transitionDelay: loading ? "800ms" : "0ms",
        }}
        unmountOnExit
      >
        <CircularProgress className={classes.placeholder} />
      </Fade>
        <h4 className={classes.textLoading}>Loading Data . . .</h4>
    </div>
  );
};
const withSt = withStyles(style);
export default compose(withSt)(GloableLoading);
