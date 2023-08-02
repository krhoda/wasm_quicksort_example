# WASM Library Re-Export Example

This library is a WASM library that re-exports the WASM library found at `../../wasm_quicksort_example`. The use of this is to show how easy it is to re-export WASM libs in other WASM libs if the Rust is published, and how use of Tsify allows downstream libraries to make use of the auto-generated TypeScript types even if they don't use Tsify themselves!

This library includes it's own set of examples in the `./examples` folder.
