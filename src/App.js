import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import route from "./router";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { ToastProvider } from "react-toast-notifications";
function App() {
  return (
    <div className="App">
      <ToastProvider
        autoDismiss
        autoDismissTimeout={6000}
        // components={{ Toast: Snack }}
        // placement="bottom-center"
      >
        <Router>
          <Navigation />

          <Switch>{showRoute(route)}</Switch>
        </Router>
      </ToastProvider>
    </div>
  );
}

const showRoute = (route) => {
  var result = null;
  result = route.map((item) => {
    return (
      <Route
        key={item.path}
        path={item.path}
        exact={item.exact}
        component={item.main}
      />
    );
  });
  return result;
};
export default App;
