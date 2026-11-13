---
title: "Modules - Reference (part 2 of 6)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/modules-reference/Reference.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Modules - Reference (part 2 of 6)

## The `module` compiler option

This section discusses the details of each `module` compiler option value. See the _Module output format_ theory section for more background on what the option is and how it fits into the overall compilation process. In brief, the `module` compiler option was historically only used to control the output module format of emitted JavaScript files. The more recent `node16`, `node18`, and `nodenext` values, however, describe a wide range of characteristics of Node.js’s module system, including what module formats are supported, how the module format of each file is determined, and how different module formats interoperate.

### `node16`, `node18`, `node20`, `nodenext`

Node.js supports both CommonJS and ECMAScript modules, with specific rules for which format each file can be and how the two formats are allowed to interoperate. `node16`, `node18`, and `nodenext` describe the full range of behavior for Node.js’s dual-format module system, and **emit files in either CommonJS or ESM format**. This is different from every other `module` option, which are runtime-agnostic and force all output files into a single format, leaving it to the user to ensure the output is valid for their runtime.

> A common misconception is that `node16`—`nodenext` only emit ES modules. In reality, these modes describe versions of Node.js that _support_ ES modules, not just projects that _use_ ES modules. Both ESM and CommonJS emit are supported, based on the detected module format of each file. Because they are the only `module` options that reflect the complexities of Node.js’s dual module system, they are the **only correct `module` options** for all apps and libraries that are intended to run in Node.js v12 or later, whether they use ES modules or not.

The fixed-version `node16` and `node18` modes represent the module system behavior stabilized in their respective Node.js versions, while the `nodenext` mode changes with the latest stable versions of Node.js. The following table summarizes the current differences between the three modes:

|          | `target` | `moduleResolution` | import assertions | import attributes | JSON imports        | require(esm) |
|----------|----------|--------------------|-------------------|-------------------|---------------------|--------------|
| node16   | `es2022` | `node16`           | ❌                | ❌                 | no restrictions     | ❌           |
| node18   | `es2022` | `node16`           | ✅                | ✅                 | needs `type "json"` | ❌           |
| nodenext | `esnext` | `nodenext`         | ❌                | ✅                 | needs `type "json"` | ✅           |

#### Module format detection

- `.mts`/`.mjs`/`.d.mts` files are always ES modules.
- `.cts`/`.cjs`/`.d.cts` files are always CommonJS modules.
- `.ts`/`.tsx`/`.js`/`.jsx`/`.d.ts` files are ES modules if the nearest ancestor package.json file contains `"type": "module"`, otherwise CommonJS modules.

The detected module format of input `.ts`/`.tsx`/`.mts`/`.cts` files determines the module format of the emitted JavaScript files. So, for example, a project consisting entirely of `.ts` files will emit all CommonJS modules by default under `--module nodenext`, and can be made to emit all ES modules by adding `"type": "module"` to the project package.json.

#### Interoperability rules

- **When an ES module references a CommonJS module:**
  - The `module.exports` of the CommonJS module is available as a default import to the ES module.
  - Properties (other than `default`) of the CommonJS module’s `module.exports` may or may not be available as named imports to the ES module. Node.js attempts to make them available via static analysis. TypeScript cannot know from a declaration file whether that static analysis will succeed, and optimistically assumes it will. This limits TypeScript’s ability to catch named imports that may crash at runtime. See #54018 for more details.
- **When a CommonJS module references an ES module:**
  - In `node16` and `node18`, `require` cannot reference an ES module. For TypeScript, this includes `import` statements in files that are detected to be CommonJS modules, since those `import` statements will be transformed to `require` calls in the emitted JavaScript.
  - In `nodenext`, to reflect the behavior of Node.js v22.12.0 and later, `require` can reference an ES module. In Node.js, an error is thrown if the ES module, or any of its imported modules, uses top-level `await`. TypeScript does not attempt to detect this case and will not emit a compile-time error. The result of the `require` call is the module’s Module Namespace Object, i.e., the same as the result of an `await import()` of the same module (but without the need to `await` anything).
  - A dynamic `import()` call can always be used to import an ES module. It returns a Promise of the module’s Module Namespace Object (what you’d get from `import * as ns from "./module.js"` from another ES module).

#### Emit

The emit format of each file is determined by the detected module format of each file. ESM emit is similar to `--module esnext`, but has a special transformation for `import x = require("...")`, which is not allowed in `--module esnext`:

```ts
import x = require("mod");
```

```js
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
const x = __require("mod");
```

CommonJS emit is similar to `--module commonjs`, but dynamic `import()` calls are not transformed. Emit here is shown with `esModuleInterop` enabled:

```ts
import fs from "fs"; // transformed
const dynamic = import("mod"); // not transformed
```

```js
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs")); // transformed
const dynamic = import("mod"); // not transformed
```

#### Implied and enforced options

- `--module nodenext` implies and enforces `--moduleResolution nodenext`.
- `--module node18` or `node16` implies and enforces `--moduleResolution node16`.
- `--module nodenext` implies `--target esnext`.
- `--module node18` or `node16` implies `--target es2022`.
- `--module nodenext` or `node18` or `node16` implies `--esModuleInterop`.

#### Summary

- `node16`, `node18`, and `nodenext` are the only correct `module` options for all apps and libraries that are intended to run in Node.js v12 or later, whether they use ES modules or not.
- `node16`, `node18`, and `nodenext` emit files in either CommonJS or ESM format, based on the detected module format of each file.
- Node.js’s interoperability rules between ESM and CJS are reflected in type checking.
- ESM emit transforms `import x = require("...")` to a `require` call constructed from a `createRequire` import.
- CommonJS emit leaves dynamic `import()` calls untransformed, so CommonJS modules can asynchronously import ES modules.

### `preserve`

In `--module preserve` (added in TypeScript 5.4), ECMAScript imports and exports written in input files are preserved in the output, and CommonJS-style `import x = require("...")` and `export = ...` statements are emitted as CommonJS `require` and `module.exports`. In other words, the format of each individual import or export statement is preserved, rather than being coerced into a single format for the whole compilation (or even a whole file).

While it’s rare to need to mix imports and require calls in the same file, this `module` mode best reflects the capabilities of most modern bundlers, as well as the Bun runtime.

> Why care about TypeScript’s `module` emit with a bundler or with Bun, where you’re likely also setting `noEmit`? TypeScript’s type checking and module resolution behavior are affected by the module format that it _would_ emit. Setting `module` gives TypeScript information about how your bundler or runtime will process imports and exports, which ensures that the types you see on imported values accurately reflect what will happen at runtime or after bundling. See `--moduleResolution bundler` for more discussion.

#### Examples

```ts
import x, { y, z } from "mod";
import mod = require("mod");
const dynamic = import("mod");

export const e1 = 0;
export default "default export";
```

```js
import x, { y, z } from "mod";
const mod = require("mod");
const dynamic = import("mod");

export const e1 = 0;
export default "default export";
```

#### Implied and enforced options

- `--module preserve` implies `--moduleResolution bundler`.
- `--module preserve` implies `--esModuleInterop`.

> The option `--esModuleInterop` is enabled by default in `--module preserve` only for its type checking behavior. Since imports never transform into require calls in `--module preserve`, `--esModuleInterop` does not affect the emitted JavaScript.

### `es2015`, `es2020`, `es2022`, `esnext`

#### Summary

- Use `esnext` with `--moduleResolution bundler` for bundlers, Bun, and tsx.
- Do not use for Node.js. Use `node16`, `node18`, or `nodenext` with `"type": "module"` in package.json to emit ES modules for Node.js.
- `import mod = require("mod")` is not allowed in non-declaration files.
- `es2020` adds support for `import.meta` properties.
- `es2022` adds support for top-level `await`.
- `esnext` is a moving target that may include support for Stage 3 proposals to ECMAScript modules.
- Emitted files are ES modules, but dependencies may be any format.

#### Examples

```ts
import x, { y, z } from "mod";
import * as mod from "mod";
const dynamic = import("mod");
console.log(x, y, z, mod, dynamic);

export const e1 = 0;
export default "default export";
```

```js
import x, { y, z } from "mod";
import * as mod from "mod";
const dynamic = import("mod");
console.log(x, y, z, mod, dynamic);

export const e1 = 0;
export default "default export";
```

### `commonjs`

#### Summary

- You probably shouldn’t use this. Use `node16`, `node18`, or `nodenext` to emit CommonJS modules for Node.js.
- Emitted files are CommonJS modules, but dependencies may be any format.
- Dynamic `import()` is transformed to a Promise of a `require()` call.
- `esModuleInterop` affects the output code for default and namespace imports.

#### Examples

> Output is shown with `esModuleInterop: false`.

```ts
import x, { y, z } from "mod";
import * as mod from "mod";
const dynamic = import("mod");
console.log(x, y, z, mod, dynamic);

export const e1 = 0;
export default "default export";
```

```js
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e1 = void 0;
const mod_1 = require("mod");
const mod = require("mod");
const dynamic = Promise.resolve().then(() => require("mod"));

console.log(mod_1.default, mod_1.y, mod_1.z, mod);
exports.e1 = 0;
exports.default = "default export";
```

```ts
import mod = require("mod");
console.log(mod);

export = {
    p1: true,
    p2: false
};
```

```js
"use strict";
const mod = require("mod");
console.log(mod);

module.exports = {
    p1: true,
    p2: false
};
```

### `system`

#### Summary

- Designed for use with the SystemJS module loader.

#### Examples

```ts
import x, { y, z } from "mod";
import * as mod from "mod";
const dynamic = import("mod");
console.log(x, y, z, mod, dynamic);

export const e1 = 0;
export default "default export";
```

```js
System.register(["mod"], function (exports_1, context_1) {
    "use strict";
    var mod_1, mod, dynamic, e1;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (mod_1_1) {
                mod_1 = mod_1_1;
                mod = mod_1_1;
            }
        ],
        execute: function () {
            dynamic = context_1.import("mod");
            console.log(mod_1.default, mod_1.y, mod_1.z, mod, dynamic);
            exports_1("e1", e1 = 0);
            exports_1("default", "default export");
        }
    };
});
```

### `amd`

#### Summary

- Designed for AMD loaders like RequireJS.
- You probably shouldn’t use this. Use a bundler instead.
- Emitted files are AMD modules, but dependencies may be any format.
- Supports `outFile`.

#### Examples

```ts
import x, { y, z } from "mod";
import * as mod from "mod";
const dynamic = import("mod");
console.log(x, y, z, mod, dynamic);

export const e1 = 0;
export default "default export";
```

```js
define(["require", "exports", "mod", "mod"], function (require, exports, mod_1, mod) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.e1 = void 0;
    const dynamic = new Promise((resolve_1, reject_1) => { require(["mod"], resolve_1, reject_1); });

    console.log(mod_1.default, mod_1.y, mod_1.z, mod, dynamic);
    exports.e1 = 0;
    exports.default = "default export";
});
```

### `umd`

#### Summary

- Designed for AMD or CommonJS loaders.
- Does not expose a global variable like most other UMD wrappers.
- You probably shouldn’t use this. Use a bundler instead.
- Emitted files are UMD modules, but dependencies may be any format.

#### Examples

```ts
import x, { y, z } from "mod";
import * as mod from "mod";
const dynamic = import("mod");
console.log(x, y, z, mod, dynamic);

export const e1 = 0;
export default "default export";
```

```js
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "mod", "mod"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.e1 = void 0;
    const mod_1 = require("mod");
    const mod = require("mod");
    const dynamic = __syncRequire ? Promise.resolve().then(() => require("mod")) : new Promise((resolve_1, reject_1) => { require(["mod"], resolve_1, reject_1); });

    console.log(mod_1.default, mod_1.y, mod_1.z, mod, dynamic);
    exports.e1 = 0;
    exports.default = "default export";
});
```
