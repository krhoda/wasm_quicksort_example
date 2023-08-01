export type Sortable = import("./index_core.js").Sortable;
export type LoadOpts = import("./index_core.js").LoadOpts;
export declare class Sorter {
    private wSorter;
    private constructor();
    static initialize: (loadOpts?: LoadOpts) => Promise<Sorter>;
    mergesort: (sortable: import("wasm_quicksort_example/dist/types/pkg/wasm_quicksort_example.js").Sortable) => import("wasm_quicksort_example/dist/types/pkg/wasm_quicksort_example.js").Sortable;
    quicksort: (sortable: Sortable) => Sortable;
}
