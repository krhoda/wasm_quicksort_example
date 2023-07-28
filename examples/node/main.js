const { Sorter } = require("wasm_quicksort_example");

let v = [3, 2, 1];
console.log("Before using the sorter, the array in question is unsorted:");
console.log(JSON.stringify(v));

Sorter.initialize().then((sorter) => {
  let n = sorter.sort(v);
  console.log(`Sorted array: ${JSON.stringify(n)}`);
});
