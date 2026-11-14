---
title: "Modules: node:module API (part 8 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/module.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: node:module API (part 8 of 8)

## Source Map Support

> Stability: 1 - Experimental

Node.js supports TC39 ECMA-426 Source Map format (it was called Source map
revision 3 format).

The APIs in this section are helpers for interacting with the source map
cache. This cache is populated when source map parsing is enabled and
source map include directives are found in a modules' footer.

To enable source map parsing, Node.js must be run with the flag
`--enable-source-maps`, or with code coverage enabled by setting
`NODE_V8_COVERAGE=dir`, or be enabled programmatically via
`module.setSourceMapsSupport()`.

```mjs
// module.mjs
// In an ECMAScript module
import { findSourceMap, SourceMap } from 'node:module';
```

```cjs
// module.cjs
// In a CommonJS module
const { findSourceMap, SourceMap } = require('node:module');
```

### `module.getSourceMapsSupport()`

* Returns: {Object}
  * `enabled` {boolean} If the source maps support is enabled
  * `nodeModules` {boolean} If the support is enabled for files in `node_modules`.
  * `generatedCode` {boolean} If the support is enabled for generated code from `eval` or `new Function`.

This method returns whether the Source Map v3 support for stack
traces is enabled.

### `module.findSourceMap(path)`

* `path` {string}
* Returns: {module.SourceMap|undefined} Returns `module.SourceMap` if a source
  map is found, `undefined` otherwise.

`path` is the resolved path for the file for which a corresponding source map
should be fetched.

### `module.setSourceMapsSupport(enabled[, options])`

* `enabled` {boolean} Enable the source map support.
* `options` {Object} Optional
  * `nodeModules` {boolean} If enabling the support for files in
    `node_modules`. **Default:** `false`.
  * `generatedCode` {boolean} If enabling the support for generated code from
    `eval` or `new Function`. **Default:** `false`.

This function enables or disables the Source Map v3 support for
stack traces.

It provides same features as launching Node.js process with commandline options
`--enable-source-maps`, with additional options to alter the support for files
in `node_modules` or generated codes.

Only source maps in JavaScript files that are loaded after source maps has been
enabled will be parsed and loaded. Preferably, use the commandline options
`--enable-source-maps` to avoid losing track of source maps of modules loaded
before this API call.

### Class: `module.SourceMap`

#### `new SourceMap(payload[, { lineLengths }])`

* `payload` {Object}
* `lineLengths` {number\[]}

Creates a new `sourceMap` instance.

`payload` is an object with keys matching the Source map format:

* `file` {string}
* `version` {number}
* `sources` {string\[]}
* `sourcesContent` {string\[]}
* `names` {string\[]}
* `mappings` {string}
* `sourceRoot` {string}

`lineLengths` is an optional array of the length of each line in the
generated code.

#### `sourceMap.payload`

* Returns: {Object}

Getter for the payload used to construct the `SourceMap` instance.

#### `sourceMap.findEntry(lineOffset, columnOffset)`

* `lineOffset` {number} The zero-indexed line number offset in
  the generated source
* `columnOffset` {number} The zero-indexed column number offset
  in the generated source
* Returns: {Object}

Given a line offset and column offset in the generated source
file, returns an object representing the SourceMap range in the
original file if found, or an empty object if not.

The object returned contains the following keys:

* `generatedLine` {number} The line offset of the start of the
  range in the generated source
* `generatedColumn` {number} The column offset of start of the
  range in the generated source
* `originalSource` {string} The file name of the original source,
  as reported in the SourceMap
* `originalLine` {number} The line offset of the start of the
  range in the original source
* `originalColumn` {number} The column offset of start of the
  range in the original source
* `name` {string}

The returned value represents the raw range as it appears in the
SourceMap, based on zero-indexed offsets, _not_ 1-indexed line and
column numbers as they appear in Error messages and CallSite
objects.

To get the corresponding 1-indexed line and column numbers from a
lineNumber and columnNumber as they are reported by Error stacks
and CallSite objects, use `sourceMap.findOrigin(lineNumber,
columnNumber)`

#### `sourceMap.findOrigin(lineNumber, columnNumber)`

* `lineNumber` {number} The 1-indexed line number of the call
  site in the generated source
* `columnNumber` {number} The 1-indexed column number
  of the call site in the generated source
* Returns: {Object}

Given a 1-indexed `lineNumber` and `columnNumber` from a call site in
the generated source, find the corresponding call site location
in the original source.

If the `lineNumber` and `columnNumber` provided are not found in any
source map, then an empty object is returned. Otherwise, the
returned object contains the following keys:

* `name` {string|undefined} The name of the range in the
  source map, if one was provided
* `fileName` {string} The file name of the original source, as
  reported in the SourceMap
* `lineNumber` {number} The 1-indexed lineNumber of the
  corresponding call site in the original source
* `columnNumber` {number} The 1-indexed columnNumber of the
  corresponding call site in the original source
