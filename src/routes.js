import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Game, Landing } from "./pages";

function Routes() {
  return (
    <BrowserRouter>
      <Route exact path="/game" component={Game} />
      <Route exact path="/" component={Landing} />
    </BrowserRouter>
  );
}

export default Routes;
