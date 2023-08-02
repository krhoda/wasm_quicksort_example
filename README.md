# An Example of an Opinionated, Robust, and Well-Typed Rust to WASM build system

This repository aims to be a collection of documented best practices for developing WASM libraries in Rust and publishing them for the JavaScript eco-system. It is heavily influenced by these [two](https://nickb.dev/blog/results-of-authoring-a-js-library-with-rust-and-wasm/) [articles](https://nickb.dev/blog/recommendations-when-publishing-a-wasm-library/) and [this repo](https://github.com/nickbabcock/jomini/), all by the same author (Nick Babcock). This library is a simple quicksort implementation, allowing for a minimal codebase to not distract from the complex build system that this repo is meant to demonstrate.

Additionally, this repo makes use of [this library, Tsify](https://github.com/madonoharu/tsify) to autogenerate TypeScript types from Rust code to great effect, even allowing for their re-exportation in consuming WASM/JS libraries.

The "wasm_quicksort_example" directory holds the project that should act as a template for users to make their own WASM libraries. It is in the style of a Rollup JS project encompassing a wasm-pack Rust project, it's exact set-up is described within.

The "examples" folder contains many popular application frameworks and bundlers showing how each can consume the WASM application created in "wasm_quicksort_example". It also includes a JS and WASM library that re-export the library. The "examples" folder is where there is room for improvement -- to show more variations on importing the WASM for the applications, and in the case of the JS lib, there are still some rough edges that need to be better understood and documented.

Still, as it stands, this approach is the easiest way to get a well-typed and portable WASM library. For more details, see the individual READMEs.
