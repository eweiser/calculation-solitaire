import React, { Component } from 'react';
import update from 'immutability-helper';
import './App.css';


class App extends Component {
  constructor() {
    super();
    const deck = shuffle(deckValues.slice());
    this.state = {
      deck: deck,
      nextCard: deck.shift(),
      foundations: Array(4).fill([]),
      targets: Array(4).fill(null),
      focusedFoundation: null,
      nextCardFocused: true
    };
  }

  render() {
    const foundationComponents = [];
    const targetComponents = [];
    for (let i = 0; i < 4; i++) {
      const foundationCards = this.state.foundations[i];
      foundationComponents.push(
          <Foundation
            i={i}
            cards={foundationCards}
            onFoundationFocus={(i) => this.onFoundationFocus(i)}
          />
      );
      targetComponents.push(
        <Target
          i={i}
          topCard={this.state.targets[i]}
        />
      );
    }

    const divStyle = {
      maxWidth: "800px"
    };

    return (
      <div style={{margin: "auto", maxWidth: "800px"}}>
        <NextCard cardObj={this.state.nextCard} onFocus={() => this.onNextCardFocus()}/>
        <Status deckSize={this.state.deck.length} victory={this.isWin()}/>
        <div style={divStyle} className="foundations">
          {foundationComponents}
        </div>
        <Interface
            onFoundationClick={(i) => this.onFoundationClick(i)}
            onTargetClick={(i) => this.onTargetClick(i)}
            foundationsDisabled={!(this.state.nextCardFocused && this.state.nextCard)}
            disabledStatuses={[0,1,2,3].map((i) => !this.canSendToTarget(i))}
        />
        <div style={divStyle} className="targets">
          {targetComponents}
        </div>
      </div>
    );
  }

  isWin() {
    for (let i = 0; i < this.state.targets.length; i++) {
      const target = this.state.targets[i];
      if (!target || target.v < 13) {
        return false;
      }
    }

    return true;
  }

  onFoundationFocus(i) {
    this.setState({
        nextCardFocused: false,
        focusedFoundation: i
    });
  }

  onNextCardFocus() {
    this.setState({
        nextCardFocused: true,
        focusedFoundation: null
    });
  }

  onFoundationClick(i) {
    if (!this.state.nextCardFocused) {
      return;
    }

    const deck = this.state.deck.slice();
    const nextCard = deck.shift();
    const foundations = update(this.state.foundations, {[i]: {$push: [ this.state.nextCard ]}});
    
    this.setState({
        deck: deck,
        nextCard: nextCard,
        foundations: foundations
    });
  }

  onTargetClick(i) {
    if (!this.canSendToTarget(i)) {
      return;
    }

    const targets = update(this.state.targets, {[i]: {$set: this.focusedCard()}});
    const stateChange = { targets: targets };
    if (this.state.nextCardFocused) {
      const deck = this.state.deck.slice();
      const nextCard = deck.shift();

      stateChange["deck"] = deck;
      stateChange["nextCard"] = nextCard;
    } else {
      const foundationLength = this.state.foundations[this.state.focusedFoundation].length - 1
      const foundations = update(this.state.foundations, {[this.state.focusedFoundation]: {$splice: [[foundationLength]]}});
      stateChange["foundations"] = foundations;
    }

    stateChange["targets"] = targets;

    this.setState(stateChange);
  }

  canSendToTarget(i) {
    const card = this.focusedCard();
    if (!card) {
      return false;
    }

    const targetValue = this.state.targets[i] ? this.state.targets[i].v : 0;
    return (targetValue < 13) && (card.v % 13 === (targetValue + (i + 1)) % 13);
  }

  focusedCard() {
    if (this.state.nextCardFocused) {
      return this.state.nextCard;
    }

    const foundation = this.state.foundations[this.state.focusedFoundation];
    return foundation[foundation.length-1];
  }
}

const Card = ({ card, onFocus, autofocus }) => {
  const imagePath = "cards/" + card + ".png";
  if (onFocus) {
    return <img tabIndex="0" src={imagePath} onFocus={onFocus} ref={input => input && autofocus && false && input.focus()}/>
  } else {
    return <img src={imagePath}/>
  }
};

const NextCard = ({cardObj, onFocus}) => {
  if (!cardObj) {
    return (
      <div></div>
    );
  }

  return <Card card={cardObj.f} onFocus={onFocus} autofocus={true}/>;
};

const Interface = ({ onFoundationClick, onTargetClick, foundationsDisabled, disabledStatuses }) => {
  return (
    <div style={{marginBottom: "16px"}}className="interface">
      <div className="foundation-buttons">
        <button style={{width:"25%"}} onClick={() => { onFoundationClick(0) }} disabled={foundationsDisabled}>Foundation 1</button>
        <button style={{width:"25%"}} onClick={() => { onFoundationClick(1) }} disabled={foundationsDisabled}>Foundation 2</button>
        <button style={{width:"25%"}} onClick={() => { onFoundationClick(2) }} disabled={foundationsDisabled}>Foundation 3</button>
        <button style={{width:"25%"}} onClick={() => { onFoundationClick(3) }} disabled={foundationsDisabled}>Foundation 4</button>
      </div>

      <div className="target-buttons">
        <button style={{width:"25%"}} onClick={() => { onTargetClick(0) }} disabled={disabledStatuses[0]}>Target 1</button>
        <button style={{width:"25%"}} onClick={() => { onTargetClick(1) }} disabled={disabledStatuses[1]}>Target 2</button>
        <button style={{width:"25%"}} onClick={() => { onTargetClick(2) }} disabled={disabledStatuses[2]}>Target 3</button>
        <button style={{width:"25%"}} onClick={() => { onTargetClick(3) }} disabled={disabledStatuses[3]}>Target 4</button>
      </div>
    </div>
  );
}

const Status = ({ deckSize, victory }) => {
  let message;
  if (victory) {
    message = "VICTORY";
  } else if (!deckSize) {
    message = "GAME OVER";
  } else {
    message = deckSize + " cards remaining";
  }
  return <div className="status">{message}</div>;
}

const Foundation = ({ i, cards, onFoundationFocus }) => {
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
      return <li style={listElementStyle} key={cardNum}><Card card={card.f} onFocus={() => onFoundationFocus(i)}/></li>;
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

const Target = ({ i, topCard }) => {
  const divStyle = {
    display: "inline-block",
    width: "25%",
  };
  return topCard ? <div style={divStyle}><Card card={topCard.f}/></div> : <div style={divStyle}/>;
};

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

const deckValues = Object.freeze([
        {v:1,f:"ca"},{v:2,f:"c2"},{v:3,f:"c3"},{v:4,f:"c4"},{v:5,f:"c5"},{v:6,f:"c6"},
        {v:7,f:"c7"},{v:8,f:"c8"},{v:9,f:"c9"},{v:10,f:"c10"},{v:11,f:"cj"},{v:12,f:"cq"},{v:13,f:"ck"},
        {v:1,f:"ha"},{v:2,f:"h2"},{v:3,f:"h3"},{v:4,f:"h4"},{v:5,f:"h5"},{v:6,f:"h6"},
        {v:7,f:"h7"},{v:8,f:"h8"},{v:9,f:"h9"},{v:10,f:"h10"},{v:11,f:"hj"},{v:12,f:"hq"},{v:13,f:"hk"},
        {v:1,f:"sa"},{v:2,f:"s2"},{v:3,f:"s3"},{v:4,f:"s4"},{v:5,f:"s5"},{v:6,f:"s6"},
        {v:7,f:"s7"},{v:8,f:"s8"},{v:9,f:"s9"},{v:10,f:"s10"},{v:11,f:"sj"},{v:12,f:"sq"},{v:13,f:"sk"},
        {v:1,f:"da"},{v:2,f:"d2"},{v:3,f:"d3"},{v:4,f:"d4"},{v:5,f:"d5"},{v:6,f:"d6"},
        {v:7,f:"d7"},{v:8,f:"d8"},{v:9,f:"d9"},{v:10,f:"d10"},{v:11,f:"dj"},{v:12,f:"dq"},{v:13,f:"dk"}
]);

export default App;
