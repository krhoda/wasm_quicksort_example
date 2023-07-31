<script lang="ts">
	export let name: string;
	import { Sorter } from "wasm_quicksort_example";

	let v = [3, 2, 1];
	Sorter.initialize().then((sorter) => {
		let n = sorter.sort(v);
		alert(`Sorted array: ${JSON.stringify(n)}`);
	});
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
		how to build Svelte apps.
	</p>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
