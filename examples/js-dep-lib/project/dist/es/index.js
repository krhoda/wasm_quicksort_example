import { Sorter as Sorter$1 } from 'wasm_quicksort_example';

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
    wSorter;
    constructor(wSorter) {
        this.wSorter = wSorter;
    }
    static initialize = async (loadOpts) => {
        let wSorter = await Sorter$1.initialize(loadOpts);
        return new Sorter(wSorter);
    };
    mergesort = mergesort;
    quicksort = (sortable) => {
        return this.wSorter.sort(sortable);
    };
}

export { Sorter };
