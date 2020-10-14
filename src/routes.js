import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Game, Landing } from "./pages";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Landing} />
      <Route exact path="/game" component={Game} />
    </BrowserRouter>
  );
}

export default Routes;
