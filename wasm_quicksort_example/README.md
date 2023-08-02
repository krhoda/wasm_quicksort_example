# WASM Library Packaging Example -- The JS Lib
This directory is the actual JavaScript / Rust libraries used by the projects `../examples` directory. The Rust library is found in the `crate` directory. The JavaScript is found in the `src` directory. The Rust can be published on it's own to `crates.io` and imported by other WASM facing Rust libraries. The `package.json`'s build directions combine the `src` and `crate` into various distrobutions for all sorts of targets, some of which are found in `../examples`.

The important trio of config files are the `package.json`, the `tsconfig.json`, and the `rollup.config.js`. The `rollup.config.js` sets up all the various distrobutions, the `tsconfig.json` allows for the importation of the `.wasm` files directly, amongst other things, and the `package.json` sets the build system up.

In terms of re-creating this project, here are the steps that were used to create this.

1) Create a Rollup JavaScript library by creating the listed `rollup.config.js`, `tsconfig.json`, and `package.json`. Other than filenames, project names, and library-specific dependencies, these files should be the same across projects.

2) Create a wasm-pack project inside the Rollup JavaScript library in directory named "crate". Rename the project name in the result Cargo.toml to whatever you want to publish it under.

3) Implement the Rust logic. Make sure to annotate any structs, types, or enums with Tsify to allow them to be re-exported. Publish the Rust code seperately and in addition to the JS code so that other WASM libraries can import your code at the Rust level and avoid a situation where an end-user must import multiple WASM blobs that contain the same internal dependencies.

4) Build the Rust code running the following from the root of the Rollup JS project: `$ wasm-pack build -t web --out-dir ../src/pkg crate` This will make the resulting WASM available for the Rollup project to re-compile into the more portable base64 string.

5) Fill out the TS code for the Rollup project. Create index.ts, index_core.ts, index_slim.ts and a <project_name>_wrapper.ts files in the `src` folder. The three index* files are largely the same between projects with slight changes to what they re-export and the name of the files they import, but the files given here should act as a good starting point. The wrapper file is largely going to be the same as far as how initialization is handled, but the actual post-iniailization functionality will vary from library to library.

6) Build, publish, and use it!

Numerous examples are available in the `../examples` directory to show how to use the library once it's built.
