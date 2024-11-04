import React, { Component } from 'react';
import CustomNode from '../Node/CustomNode';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import './CustomPathfindingVisualizer.css';

const START_NODE_ROW = 8;
const START_NODE_COL = 10;
const FINISH_NODE_ROW = 8;
const FINISH_NODE_COL = 30;

export default class CustomPathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({ grid });
  }

  handleMouseDown(row, col) {
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({ grid: newGrid });
  }

  handleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 15 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'custom-node custom-node-visited';
        }
      }, 15 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (!node.isStart && !node.isFinish) {
          document.getElementById(`node-${node.row}-${node.col}`).className =
            'custom-node custom-node-shortest-path';
        }
      }, 40 * i);
    }
  }

  visualizeDijkstra() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeBFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = bfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  visualizeDFS() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dfs(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgorithm(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  resetGrid() {
    const grid = getInitialGrid();
    this.setState({ grid });
    grid.forEach(row => {
      row.forEach(node => {
        const nodeElement = document.getElementById(`node-${node.row}-${node.col}`);
        if (node.isStart) {
          nodeElement.className = 'custom-node custom-node-start';
        } else if (node.isFinish) {
          nodeElement.className = 'custom-node custom-node-finish';
        } else {
          nodeElement.className = 'custom-node';
        }
      });
    });
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <div className="top-buttons">
          <button className="visualize-button" onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
          </button>
          <button className="visualize-button" onClick={() => this.visualizeBFS()}>
            Visualize BFS
          </button>
          <button className="visualize-button" onClick={() => this.visualizeDFS()}>
            Visualize DFS
          </button>
          <div className="explanation-tab">
            Explanation
            <div className="explanation-content">
              <h2>Visualizing Pathfinding Algorithms</h2>
              <p>
                This project visualizes three pathfinding algorithms: <strong>Dijkstra's Algorithm</strong>, <strong>Breadth-First Search (BFS)</strong>, and <strong>Depth-First Search (DFS)</strong>.
              </p>
              <h3>What is Breadth-First Search (BFS)?</h3>
              <p>
                <strong>BFS</strong> explores nodes in layers, visiting all nodes at the current depth level before moving to the next. It guarantees the shortest path in unweighted grids.
              </p>
              <h3>What is Depth-First Search (DFS)?</h3>
              <p>
                <strong>DFS</strong> explores as deep as possible down a path before backtracking. While it can find a path, it does not guarantee the shortest path in unweighted grids.
              </p>
            </div>
          </div>
          <button className="reset-button" onClick={() => this.resetGrid()}>
            Reset Board
          </button>
        </div>
        <div className="custom-grid">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="row">
              {row.map((node, nodeIdx) => {
                const { row, col, isFinish, isStart, isWall } = node;
                return (
                  <CustomNode
                    key={nodeIdx}
                    col={col}
                    row={row}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                    onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                    onMouseUp={() => this.handleMouseUp()}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="complexity-tab">
          Algorithm Complexities
          <div className="complexity-content">
            <h2>Time and Space Complexities</h2>
            <ul>
              <li>
                <strong>Dijkstra's Algorithm</strong>: 
                <ul>
                  <li>Time Complexity: <em>O((V + E) log V)</em>, where <em>V</em> is the number of vertices and <em>E</em> is the number of edges.</li>
                  <li>Space Complexity: <em>O(V)</em>.</li>
                </ul>
              </li>
              <li>
                <strong>Breadth-First Search (BFS)</strong>: 
                <ul>
                  <li>Time Complexity: <em>O(V + E)</em>.</li>
                  <li>Space Complexity: <em>O(V)</em>.</li>
                </ul>
              </li>
              <li>
                <strong>Depth-First Search (DFS)</strong>: 
                <ul>
                  <li>Time Complexity: <em>O(V + E)</em>.</li>
                  <li>Space Complexity: <em>O(V)</em> in the worst case (recursive stack).</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 16; row++) {
    const currentRow = [];
    for (let col = 0; col < 40; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
