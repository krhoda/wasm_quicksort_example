export * from "./index_core.js";
import wasm_mergesort_example_wasm from "./pkg/wasm_mergesort_example_bg.wasm";
import {setWasmInit} from "./mergesort_wrapper.js"

// @ts-ignore
setWasmInit(() => wasm_mergesort_example_wasm());
