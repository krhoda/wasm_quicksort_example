import init, {InitInput, quicksort} from "./pkg/wasm_quicksort_example.js";
// TODO: Generate this from the Rust types.
export type Sortable = Array<number> | Array<string>;

export type LoadOpts =  {
	wasm?: InitInput
};

let wasmInit: (() => InitInput) | undefined = undefined;
export const setWasmInit = (arg: () => InitInput) => {
  wasmInit = arg;
};

let initialized: Promise<void> | undefined = undefined;

export class Sorter {
	private constructor() {}

	public static initialize = async (options?: LoadOpts) => {
		if (initialized === undefined) {
			//@ts-ignore
			const loadModule = options?.wasm ?? wasmInit();
			initialized = init(loadModule).then(() => void 0);
		}

		await initialized;
		return new Sorter();
	}

	public sort = (sortable: Sortable): Sortable => {
		let s = JSON.stringify(sortable);
		s = quicksort(s);
		return JSON.parse(s) as Sortable;
	}
}
