import { InitInput } from "./pkg/wasm_mergesort_example.js";
export type Sortable = import("./pkg/wasm_mergesort_example.js").Sortable;
export type LoadOpts = {
    wasm?: InitInput;
};
export declare const setWasmInit: (arg: () => InitInput) => void;
export declare class Sorter {
    private constructor();
    static initialize: (options?: LoadOpts) => Promise<Sorter>;
    quicksort: (sortable: Sortable) => Sortable;
    mergesort: (sortable: Sortable) => Sortable;
}
