import React from "react";
import ReactDOM from "react-dom";

import "./styles/reset.css";
import "./styles/index.css";
import Game from "./components/Game";

class Layout extends React.Component {
  render() {
    return (
      <div className="content-container">
        <div className="header">
          <span className="header__title">tic tac toe</span>
          <span className="header__subtitle">@marciorasf</span>
        </div>
        <Game />
      </div>
    );
  }
}

ReactDOM.render(<Layout />, document.getElementById("root"));
