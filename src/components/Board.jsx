import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons"

const icons = {
  X: <FontAwesomeIcon icon={faTimes} />,
  O: <FontAwesomeIcon icon={faCircle} />,
};

class Board extends React.Component {

  createSquares(squares, onClick) {
    const nSquares = 9;

    let htmlSquares = [];
    for (let i = 0; i < nSquares; i++) {
      htmlSquares.push(
        <button key={i} className="square" onClick={() => onClick(i)}>
          {icons[squares[i]]}
        </button>,
      );
    }
    return htmlSquares;
  }

  render() {
    const className = "board " + (this.props.hasEnded ? "is-inactive" : "is-active");
    const onClick = this.props.hasEnded ? this.props.onClick : () => null;
    return (
      <div onClick={() => onClick(1)} className={className} data-message={this.props.message}>
        {this.createSquares(this.props.squares, this.props.onClick)}
      </div>
    );
  }
}

export default Board