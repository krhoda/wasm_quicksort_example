# WASM Library Re-Export example

This library makes use of the library at `../../../../wasm_quicksort_example/crate` and re-exports it using a WASM library build in the same style. This is useful for demonstrating how easy it is to use published Rust libraries to re-export WASM in a single blob (as opposed to requiring a consumer to import both WASM blobs simultaniously with no hope of de-duplication). Please see the crate this imports for details on the project structure.
