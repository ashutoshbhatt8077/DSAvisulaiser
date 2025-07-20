// DSA Visualizer: Complete script.js with Bubble Sort, Merge Sort, DFS, BFS

const visualizerContainer = document.getElementById('visualizer-container');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const algorithmSelect = document.getElementById('algorithm-select');

let barArray = [];
let numBars = 30;

function generateBars() {
  barArray = [];
  visualizerContainer.innerHTML = '';

  for (let i = 0; i < numBars; i++) {
    let height = Math.floor(Math.random() * 300) + 20;
    barArray.push(height);

    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${height}px`;
    visualizerContainer.appendChild(bar);
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
  const bars = document.getElementsByClassName('bar');

  for (let i = 0; i < barArray.length - 1; i++) {
    for (let j = 0; j < barArray.length - i - 1; j++) {
      bars[j].style.backgroundColor = 'red';
      bars[j + 1].style.backgroundColor = 'red';
      await delay(100);

      if (barArray[j] > barArray[j + 1]) {
        [barArray[j], barArray[j + 1]] = [barArray[j + 1], barArray[j]];
        bars[j].style.height = `${barArray[j]}px`;
        bars[j + 1].style.height = `${barArray[j + 1]}px`;
      }

      bars[j].style.backgroundColor = 'white';
      bars[j + 1].style.backgroundColor = 'white';
    }
    bars[barArray.length - i - 1].style.backgroundColor = 'lime';
  }
  bars[0].style.backgroundColor = 'lime';
}

// Merge Sort
async function mergeSortHelper(arr, start, end) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSortHelper(arr, start, mid);
  await mergeSortHelper(arr, mid + 1, end);
  await merge(arr, start, mid, end);
}

async function merge(arr, start, mid, end) {
  const bars = document.getElementsByClassName('bar');
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    bars[k].style.backgroundColor = 'orange';
    await delay(200);

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      bars[k].style.height = `${left[i]}px`;
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = `${right[j]}px`;
      j++;
    }
    bars[k].style.backgroundColor = 'white';
    k++;
  }

  while (i < left.length) {
    arr[k] = left[i];
    bars[k].style.backgroundColor = 'orange';
    await delay(200);
    bars[k].style.height = `${left[i]}px`;
    bars[k].style.backgroundColor = 'white';
    i++; k++;
  }

  while (j < right.length) {
    arr[k] = right[j];
    bars[k].style.backgroundColor = 'orange';
    await delay(200);
    bars[k].style.height = `${right[j]}px`;
    bars[k].style.backgroundColor = 'white';
    j++; k++;
  }
}

async function mergeSort() {
  await mergeSortHelper(barArray, 0, barArray.length - 1);
  const bars = document.getElementsByClassName('bar');
  for (let bar of bars) {
    bar.style.backgroundColor = 'lime';
    await delay(20);
  }
}

// DFS and BFS Grid Visualizer
function generateGrid(rows = 10, cols = 20) {
  visualizerContainer.innerHTML = '';
  visualizerContainer.style.flexWrap = 'wrap';

  for (let i = 0; i < rows * cols; i++) {
    const cell = document.createElement('div');
    cell.classList.add('bar');
    cell.style.width = '30px';
    cell.style.height = '30px';
    cell.style.margin = '1px';
    visualizerContainer.appendChild(cell);
  }
}

async function dfs(start, visited, grid, cols) {
  const stack = [start];

  while (stack.length) {
    const current = stack.pop();
    if (visited[current]) continue;
    visited[current] = true;

    const cell = grid[current];
    cell.style.backgroundColor = 'red';
    await delay(100);
    cell.style.backgroundColor = 'lime';

    const neighbors = getNeighbors(current, cols, grid.length);
    for (let n of neighbors) {
      if (!visited[n]) stack.push(n);
    }
  }
}

async function bfs(start, visited, grid, cols) {
  const queue = [start];

  while (queue.length) {
    const current = queue.shift();
    if (visited[current]) continue;
    visited[current] = true;

    const cell = grid[current];
    cell.style.backgroundColor = 'blue';
    await delay(100);
    cell.style.backgroundColor = 'lime';

    const neighbors = getNeighbors(current, cols, grid.length);
    for (let n of neighbors) {
      if (!visited[n]) queue.push(n);
    }
  }
}

function getNeighbors(index, cols, total) {
  const neighbors = [];
  const row = Math.floor(index / cols);
  const col = index % cols;

  const moves = [
    [0, 1], [1, 0], [0, -1], [-1, 0]
  ];

  for (let [dx, dy] of moves) {
    const newRow = row + dx;
    const newCol = col + dy;
    const newIndex = newRow * cols + newCol;
    if (newRow >= 0 && newCol >= 0 && newCol < cols && newIndex < total) {
      neighbors.push(newIndex);
    }
  }
  return neighbors;
}

// Button Event Listener
startBtn.addEventListener('click', () => {
  const algo = algorithmSelect.value;
  if (algo === 'bubbleSort') {
    generateBars();
    bubbleSort();
  } else if (algo === 'mergeSort') {
    generateBars();
    mergeSort();
  } else if (algo === 'dfs') {
    generateGrid();
    const grid = document.getElementsByClassName('bar');
    const visited = Array(grid.length).fill(false);
    dfs(0, visited, grid, 20);
  } else if (algo === 'bfs') {
    generateGrid();
    const grid = document.getElementsByClassName('bar');
    const visited = Array(grid.length).fill(false);
    bfs(0, visited, grid, 20);
  }
});

resetBtn.addEventListener('click', () => {
  const algo = algorithmSelect.value;
  if (algo === 'dfs' || algo === 'bfs') generateGrid();
  else generateBars();
});

generateBars();
