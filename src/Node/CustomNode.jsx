import React, { Component } from 'react';
import './CustomNode.css';

export default class CustomNode extends Component {
  render() {
    const { col, row, isFinish, isStart, isWall, onMouseDown, onMouseEnter, onMouseUp } = this.props;
    const extraClassName = isFinish
      ? 'custom-node-finish'
      : isStart
      ? 'custom-node-start'
      : isWall
      ? 'custom-node-wall'
      : '';

    return (
      <div
        id={`node-${row}-${col}`}
        className={`custom-node ${extraClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
