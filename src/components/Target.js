import React from 'react';
import Card from './Card';

const Target = ({ i, topCard }) => {
  const divStyle = {
    display: "inline-block",
    width: "25%",
  };
  return topCard ? <div style={divStyle}><Card card={topCard.f}/></div> : <div style={divStyle}/>;
};

export default Target;
