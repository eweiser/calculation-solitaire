import React, { Component } from 'react';
import './App.css';

  const deckValues = [
            {v:1,f:"c1"},{v:2,f:"c2"},{v:3,f:"c3"},{v:4,f:"c4"},{v:5,f:"c5"},{v:6,f:"c6"},
            {v:7,f:"c7"},{v:8,f:"c8"},{v:9,f:"c9"},{v:10,f:"c10"},{v:11,f:"c11"},{v:12,f:"c12"},{v:13,f:"c13"},
            {v:1,f:"h1"},{v:2,f:"h2"},{v:3,f:"h3"},{v:4,f:"h4"},{v:5,f:"h5"},{v:6,f:"h6"},
            {v:7,f:"h7"},{v:8,f:"h8"},{v:9,f:"h9"},{v:10,f:"h10"},{v:11,f:"h11"},{v:12,f:"h12"},{v:13,f:"h13"},
            {v:1,f:"s1"},{v:2,f:"s2"},{v:3,f:"s3"},{v:4,f:"s4"},{v:5,f:"s5"},{v:6,f:"s6"},
            {v:7,f:"s7"},{v:8,f:"s8"},{v:9,f:"s9"},{v:10,f:"s10"},{v:11,f:"s11"},{v:12,f:"s12"},{v:13,f:"s13"},
            {v:1,f:"d1"},{v:2,f:"d2"},{v:3,f:"d3"},{v:4,f:"d4"},{v:5,f:"d5"},{v:6,f:"d6"},
            {v:7,f:"d7"},{v:8,f:"d8"},{v:9,f:"d9"},{v:10,f:"d10"},{v:11,f:"d11"},{v:12,f:"d12"},{v:13,f:"d13"}
  ];

class App extends Component {

  render() {
    const foundations = [
        [ {v:1, f:"ad"}, {v:3, f:"3c"}, {v:5, f:"5h"} ],
        [ ],
        [ {v:11, f:"jh"}, {v:12, f:"qh"} ],
        [ {v:13, f:"kc"} ],
    ];
    const targets = [ {v:1, f:"ac"}, {v:8, f:"8s"}, null, {v:4, f:"4h"} ];
    const foundationComponents = [];
    const targetComponents = [];
    for (let i = 0; i < 4; i++) {
      const foundationCards = foundations[i];
      foundationComponents.push(
          <Foundation
            i={i}
            cards={foundationCards}
          />
      );
      targetComponents.push(
        <Target
          i={i}
          topCard={targets[i]}
        />
      );
    }

    const divStyle = {
      maxWidth: "800px"
    };

    return (
      <div style={{margin: "auto", maxWidth: "800px"}}>
        <Card card="ac"/>
        <Interface
          deckSize={52}
        />
        <div style={divStyle} className="foundations">
          {foundationComponents}
        </div>
        <div style={divStyle} className="targets">
          {targetComponents}
        </div>
      </div>
    );
  }
}

const Card = ({ card }) => {
  const imagePath = "cards/" + card + ".png";
  return <img src={imagePath}/>
};

const Interface = (props) => {
  return (
    <div className="interface">
      <Status deckSize={props.deckSize}/>

      <br/>

      <div className="foundation-buttons">
        <button>Foundation 1</button>
        <button>Foundation 2</button>
        <button>Foundation 3</button>
        <button>Foundation 4</button>
      </div>

      <br/>

      <div className="target-buttons">
        <button>Target 1</button>
        <button>Target 2</button>
        <button>Target 3</button>
        <button>Target 4</button>
      </div>
    </div>
  );
}

const Status = ({ deckSize }) => {
  const deckSizeMsg = deckSize + " cards remaining";
  return <div className="status">{deckSizeMsg}</div>;
}

const Foundation = ({ i, cards }) => {
  const listStyle = {
    listStyleType: "none",
    paddingLeft: "0",
    paddingBottom: "150px"
  };
  const listElementStyle = {
    maxHeight: "40px"
  };
  const divStyle = {
    display: "inline-block",
    width: "25%",
    verticalAlign: "top"
  };

  const cardComponents = cards.map((card, cardNum) => {
    return <li style={listElementStyle} key={cardNum}><Card card={card.f}/></li>;
  });

  return (
    <div style={divStyle}>
      <ul style={listStyle}>{cardComponents}</ul>
    </div>
  );
}

const Target = ({ i, topCard }) => {
  const divStyle = {
    display: "inline-block",
    width: "25%",
  };
  return topCard ? <div style={divStyle}><Card card={topCard.f}/></div> : <div style={divStyle}/>;
};

export default App;
