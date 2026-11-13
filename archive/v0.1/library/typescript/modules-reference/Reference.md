---
title: "Modules - Reference (part 1 of 6)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/modules-reference/Reference.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Modules - Reference

## Module syntax

The TypeScript compiler recognizes standard ECMAScript module syntax in TypeScript and JavaScript files and many forms of CommonJS syntax in JavaScript files.

There are also a few TypeScript-specific syntax extensions that can be used in TypeScript files and/or JSDoc comments.

### Importing and exporting TypeScript-specific declarations

Type aliases, interfaces, enums, and namespaces can be exported from a module with an `export` modifier, like any standard JavaScript declaration:

```ts
// Standard JavaScript syntax...
export function f() {}
// ...extended to type declarations
export type SomeType = /* ... */;
export interface SomeInterface { /* ... */ }
```

They can also be referenced in named exports, even alongside references to standard JavaScript declarations:

```ts
export { f, SomeType, SomeInterface };
```

Exported types (and other TypeScript-specific declarations) can be imported with standard ECMAScript imports:

```ts
import { f, SomeType, SomeInterface } from "./module.js";
```

When using namespace imports or exports, exported types are available on the namespace when referenced in a type position:

```ts
import * as mod from "./module.js";
mod.f();
mod.SomeType; // Property 'SomeType' does not exist on type 'typeof import("./module.js")'
let x: mod.SomeType; // Ok
```

### Type-only imports and exports

When emitting imports and exports to JavaScript, by default, TypeScript automatically elides (does not emit) imports that are only used in type positions and exports that only refer to types. Type-only imports and exports can be used to force this behavior and make the elision explicit. Import declarations written with `import type`, export declarations written with `export type { ... }`, and import or export specifiers prefixed with the `type` keyword are all guaranteed to be elided from the output JavaScript.

```ts
import { f, type SomeInterface } from "./module.js";
import type { SomeType } from "./module.js";

class C implements SomeInterface {
  constructor(p: SomeType) {
    f();
  }
}

export type { C };

import { f } from "./module.js";

class C {
  constructor(p) {
    f();
  }
}
```

Even values can be imported with `import type`, but since they won’t exist in the output JavaScript, they can only be used in non-emitting positions:

```ts
import type { f } from "./module.js";
f(); // 'f' cannot be used as a value because it was imported using 'import type'
let otherFunction: typeof f = () => {}; // Ok
```

A type-only import declaration may not declare both a default import and named bindings, since it appears ambiguous whether `type` applies to the default import or to the entire import declaration. Instead, split the import declaration into two, or use `default` as a named binding:

```ts
import type fs, { BigIntOptions } from "fs";
//          ^^^^^^^^^^^^^^^^^^^^^
// Error: A type-only import can specify a default import or named bindings, but not both.

import type { default as fs, BigIntOptions } from "fs"; // Ok
```

### `import()` types

TypeScript provides a type syntax similar to JavaScript’s dynamic `import` for referencing the type of a module without writing an import declaration:

```ts
// Access an exported type:
type WriteFileOptions = import("fs").WriteFileOptions;
// Access the type of an exported value:
type WriteFileFunction = typeof import("fs").writeFile;
```

This is especially useful in JSDoc comments in JavaScript files, where it’s not possible to import types otherwise:

```ts
/** @type {import("webpack").Configuration} */
module.exports = {
  // ...
}
```

### `export =` and `import = require()`

When emitting CommonJS modules, TypeScript files can use a direct analog of `module.exports = ...` and `const mod = require("...")` JavaScript syntax:

```ts
import fs = require("fs");
export = fs.readFileSync("...");

"use strict";
const fs = require("fs");
module.exports = fs.readFileSync("...");
```

This syntax was used over its JavaScript counterparts since variable declarations and property assignments could not refer to TypeScript types, whereas special TypeScript syntax could:

```ts
interface Options { /* ... */ }
module.exports = Options; // Error: 'Options' only refers to a type, but is being used as a value here.
export = Options; // Ok

const Options = require("./a");
const options: Options = { /* ... */ }; // Error: 'Options' refers to a value, but is being used as a type here.

import Options = require("./a");
const options: Options = { /* ... */ }; // Ok
```

### Ambient modules

TypeScript supports a syntax in script (non-module) files for declaring a module that exists in the runtime but has no corresponding file. These _ambient modules_ usually represent runtime-provided modules, like `"fs"` or `"path"` in Node.js:

```ts
declare module "path" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}
```

Once an ambient module is loaded into a TypeScript program, TypeScript will recognize imports of the declared module in other files:

```ts
// 👇 Ensure the ambient module is loaded -
//    may be unnecessary if path.d.ts is included
//    by the project tsconfig.json somehow.
/// <reference path="path.d.ts" />

import { normalize, join } from "path";
```

Ambient module declarations are easy to confuse with module augmentations since they use identical syntax. This module declaration syntax becomes a module augmentation when the file is a module, meaning it has a top-level `import` or `export` statement (or is affected by `--moduleDetection force` or `auto`):

```ts
// Not an ambient module declaration anymore!
export {};
declare module "path" {
  export function normalize(p: string): string;
  export function join(...paths: any[]): string;
  export var sep: string;
}
```

Ambient modules may use imports inside the module declaration body to refer to other modules without turning the containing file into a module (which would make the ambient module declaration a module augmentation):

```ts
declare module "m" {
  // Moving this outside "m" would totally change the meaning of the file!
  import { SomeType } from "other";
  export function f(): SomeType;
}
```

A _pattern_ ambient module contains a single `*` wildcard character in its name, matching zero or more characters in import paths. This can be useful for declaring modules provided by custom loaders:

```ts
declare module "*.html" {
  const content: string;
  export default content;
}
```
