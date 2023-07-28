import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Sorter} from "wasm_quicksort_example";

function App() {
  let v = [3, 2, 1];

  Sorter.initialize().then((sorter) => {
    let n = sorter.sort(v);
    alert(`Sorted array:${JSON.stringify(n)}`);
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
