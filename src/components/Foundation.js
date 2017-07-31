import React from 'react';
import Card from './Card';

const Foundation = ({ cards, onFocus, autofocus }) => {
  const listStyle = {
    listStyleType: "none",
    paddingLeft: "0",
    paddingBottom: "160px"
  };
  const listElementStyle = {
    height: "40px"
  };
  const divStyle = {
    display: "inline-block",
    width: "25%",
    verticalAlign: "top"
  };

  const cardComponents = cards.map((card, cardNum) => {
    if (cardNum === cards.length - 1) {
      return <li style={listElementStyle} key={cardNum}><Card card={card.f} onFocus={onFocus} autofocus={autofocus}/></li>;
    } else {
      return <li style={listElementStyle} key={cardNum}><Card card={card.f}/></li>;
    }
  });

  return (
    <div style={divStyle}>
      <ul style={listStyle}>{cardComponents}</ul>
    </div>
  );
}

export default Foundation;
