import { InitInput } from "./pkg/wasm_quicksort_example.js";
export type Sortable = Array<number> | Array<string>;
export type LoadOpts = {
    wasm?: InitInput;
};
export declare const setWasmInit: (arg: () => InitInput) => void;
export declare class Sorter {
    private constructor();
    static initialize: (options?: LoadOpts) => Promise<Sorter>;
    sort: (sortable: Sortable) => Sortable;
}
