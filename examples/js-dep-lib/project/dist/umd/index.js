(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('wasm_quicksort_example')) :
    typeof define === 'function' && define.amd ? define(['exports', 'wasm_quicksort_example'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.js_wasm_rexport_example = {}, global.wasm_quicksort_example));
})(this, (function (exports, wasm_quicksort_example) { 'use strict';

    const mergesort = (sortable) => {
        if (sortable.length <= 1) {
            return sortable;
        }
        const middle = Math.floor(sortable.length / 2);
        const left = sortable.slice(0, middle);
        const right = sortable.slice(middle);
        return merge(mergesort(left), mergesort(right));
    };
    const merge = (left, right) => {
        let sorted = [];
        while (left.length && right.length) {
            if (left[0] < right[0]) {
                //@ts-ignore
                sorted.push(left.shift());
            }
            else {
                //@ts-ignore
                sorted.push(right.shift());
            }
        }
        //@ts-ignore
        return sorted.concat(left.slice().concat(right.slice()));
    };

    class Sorter {
        constructor(wSorter) {
            this.mergesort = mergesort;
            this.quicksort = (sortable) => {
                return this.wSorter.sort(sortable);
            };
            this.wSorter = wSorter;
        }
    }
    Sorter.initialize = async (loadOpts) => {
        let wSorter = await wasm_quicksort_example.Sorter.initialize(loadOpts);
        return new Sorter(wSorter);
    };

    exports.Sorter = Sorter;

}));
