import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
// import Home from " ./routes/Home";

const AppRouter = () => {
  const [isLoggeIn, seIsLoggedIn] = useState(false);
  return (
    <Router exact path="/">
      <Switch>
        {isLoggeIn ? (
          <>
            {/* fragment */}
            <Router exact path="/">
              <Home />
            </Router>
          </>
        ) : (
          <Route>
            <Auth />
          </Route>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
