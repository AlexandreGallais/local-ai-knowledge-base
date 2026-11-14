---
title: "Modules: node:module API (part 5 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/module.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: node:module API (part 5 of 8)

| `format`                | Description                                           | Acceptable types for `source` returned by `load`   |
| ----------------------- | ----------------------------------------------------- | -------------------------------------------------- |
| `'addon'`               | Load a Node.js addon                                  | {null}                                             |
| `'builtin'`             | Load a Node.js builtin module                         | {null}                                             |
| `'commonjs-typescript'` | Load a Node.js CommonJS module with TypeScript syntax | {string\|ArrayBuffer\|TypedArray\|null\|undefined} |
| `'commonjs'`            | Load a Node.js CommonJS module                        | {string\|ArrayBuffer\|TypedArray\|null\|undefined} |
| `'json'`                | Load a JSON file                                      | {string\|ArrayBuffer\|TypedArray}                  |
| `'module-typescript'`   | Load an ES module with TypeScript syntax              | {string\|ArrayBuffer\|TypedArray}                  |
| `'module'`              | Load an ES module                                     | {string\|ArrayBuffer\|TypedArray}                  |
| `'wasm'`                | Load a WebAssembly module                             | {ArrayBuffer\|TypedArray}                          |

The value of `source` is ignored for format `'builtin'` because currently it is
not possible to replace the value of a Node.js builtin (core) module.

> These types all correspond to classes defined in ECMAScript.

* The specific {ArrayBuffer} object is a {SharedArrayBuffer}.
* The specific {TypedArray} object is a {Uint8Array}.

If the source value of a text-based format (i.e., `'json'`, `'module'`)
is not a string, it is converted to a string using `util.TextDecoder`.
