#!/bin/bash

# TODO: Check for deps (cargo, wasm-pack, rollup, node)
# TODO: Make sure we're in the same dir as the bash file itself programmtically.
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
echo "Removing old bindings..."
rm -rf "${SCRIPT_DIR}/crate/bindings"

echo "Generating new bindings..."
cd "${SCRIPT_DIR}/crate"
cargo test
cd ../

for binding_file in "$SCRIPT_DIR"/crate/bindings/*
do
	x=${binding_file%.ts}
	y=${x##*/}
	# NOTE: below would be the ideal way to do it:
	# echo "export type {${y}} from './${y}'" >> "$SCRIPT_DIR"/crate/bindings/index.ts

	# NOTE -- CONTINUED: but there seems to be an issue with rollup typescript plugin
	# which has a resolution by re-naming an export, see:
	# https://github.com/rollup/plugins/issues/71#issuecomment-707143398

	# NOTE: Instead, this a leading underscore is appended to be removed by the later importer.
	echo "export type {${y} as _${y}} from './${y}'" >> "$SCRIPT_DIR"/crate/bindings/index.ts
done


echo "Building WASM lib..."
wasm-pack build -t web --out-dir ../src/pkg crate && rm -rf dist

echo "Adding bindings back"
rm -rf "${SCRIPT_DIR}/src/autogenerated"
mkdir "${SCRIPT_DIR}/src/autogenerated"
mv "${SCRIPT_DIR}/crate/bindings" "${SCRIPT_DIR}/src/autogenerated"

rollup -c
