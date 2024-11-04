export function dfs(grid, startNode, finishNode) {
    const visitedNodesInOrder = [];
    const stack = [];
    startNode.isVisited = true;
    stack.push(startNode);
  
    while (stack.length) {
      const currentNode = stack.pop();
      if (!currentNode) continue;
  
      // If we reach the finish node, return the visited nodes
      if (currentNode === finishNode) {
        visitedNodesInOrder.push(currentNode);
        return visitedNodesInOrder;
      }
  
      if (!currentNode.isVisited) {
        currentNode.isVisited = true;
        visitedNodesInOrder.push(currentNode);
      }
  
      const neighbors = getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited && !neighbor.isWall) {
          neighbor.previousNode = currentNode;
          stack.push(neighbor);
        }
      }
    }
  
    // Return visited nodes in case no path is found
    return visitedNodesInOrder;
  }
  
  function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { row, col } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }
  