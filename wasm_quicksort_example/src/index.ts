export * from "./index_core.js";
import wasm_quicksort_example_wasm from "./pkg/wasm_quicksort_example_bg.wasm";
import {setWasmInit} from "./quicksort_wrapper.js"

// @ts-ignore
setWasmInit(() => wasm_quicksort_example_wasm());
