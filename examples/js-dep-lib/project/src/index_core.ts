export type Sortable = import("wasm_quicksort_example").Sortable;
export type LoadOpts = import("wasm_quicksort_example").LoadOpts;

export const mergesort = (sortable: Sortable): Sortable => {
	if (sortable.length <= 1) {
		return sortable;
	}

	const middle = Math.floor(sortable.length / 2);

	const left = sortable.slice(0, middle);
	const right = sortable.slice(middle);

	return merge(
		mergesort(left), mergesort(right)
	);
}

const merge = (left: Sortable, right: Sortable): Sortable => {
	let sorted: Sortable = [];

	while (left.length && right.length) {
		if (left[0] < right[0]) {
			//@ts-ignore
			sorted.push(left.shift());
		} else {
			//@ts-ignore
			sorted.push(right.shift());
		}
	}

	//@ts-ignore
	return sorted.concat(left.slice().concat(right.slice())) as Sortable;
}
