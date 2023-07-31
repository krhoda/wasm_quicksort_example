import { InitInput } from "./pkg/wasm_quicksort_example.js";
export type Sortable = import("./pkg/wasm_quicksort_example.js").Sortable;
export type LoadOpts = {
    wasm?: InitInput;
};
export declare const setWasmInit: (arg: () => InitInput) => void;
export declare class Sorter {
    private constructor();
    static initialize: (options?: LoadOpts) => Promise<Sorter>;
    sort: (sortable: Sortable) => Sortable;
}
