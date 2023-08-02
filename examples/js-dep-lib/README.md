# JS Library Re-Export Example

This library is a plain JavaScript library that re-exports the WASM library found at `../../wasm_quicksort_example`. This is meant to show how to re-export the library in both a slim and full manner, but currently can only export the full version. More work is needed to understand the rough edges here. Even though it works slightly differently than the other examples, it's still in a working state and requires no special configuration from consumers -- it just isn't as flexible as hopped.

This library includes it's own set of examples in the `./examples` folder where it can seen working. An interesting difference is how the NextJS server side script must manually import the WASM, unlike it's behavior with both of the WASM libs (the plain lib and the re-export lib).
