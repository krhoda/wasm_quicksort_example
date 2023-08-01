export type Sortable = import("./index_core.js").Sortable;
export type LoadOpts = import("./index_core.js").LoadOpts;
import {mergesort} from "./index_core.js";
import {Sorter as WASMSorter} from "wasm_quicksort_example";

export class Sorter {
	private wSorter: WASMSorter;

	private constructor(wSorter: WASMSorter) {
		this.wSorter = wSorter;
	}

	public static initialize = async (loadOpts: LoadOpts): Promise<Sorter> => {
		let wSorter = await WASMSorter.initialize(loadOpts);
		return new Sorter(wSorter);
	}

	public mergesort = mergesort;

	public quicksort = (sortable: Sortable): Sortable => {
		return this.wSorter.sort(sortable);
	}
}
