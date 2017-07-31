import React from 'react';

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

export default Interface;
