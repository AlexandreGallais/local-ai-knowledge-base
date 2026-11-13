---
title: "Modules across platforms (part 1 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/modules_across_platforms/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Modules across platforms

MDN focuses on JavaScript in the browser, but most developers will also work with other runtimes such as Node, Deno, or Bun. While it's easy to assume that the rules for the web apply everywhere, each of these environments (and many tools, such as bundlers and type checkers) has its own rules for resolving and interpreting modules. While we won't try to document every detail of non-browser environments, this section offers a mental model for thinking about modules across platforms, and practical guidance for writing portable module code.

## Other module formats

ECMAScript modules (ESM) were standardized and implemented almost 20 years after the birth of JavaScript. By that time most applications were already complicated enough to need module systems, so various alternatives have been implemented by runtimes and bundlers.

In essence, every module system needs three parts:

- The module code, with its own scope to encapsulate variables, such as a wrapper function.
- Some protocol for letting the module declare its exports.
- An importing mechanism to identify another module and access its exports.

### CommonJS

Node.js popularized the CommonJS system. In Node.js's implementation of CommonJS, each module is implicitly wrapped in a function. This function passes five things into the module scope: `exports`, `module`, `require`, `__dirname`, and `__filename`. Each module's exported value is a single JavaScript value contained in `module.exports`. You can obtain this value by calling `require()` with the module's ID.

```js
// -- rectangle.cjs --
module.exports = {
  area: (a, b) => a * b,
};
```

```js
// -- square.cjs --
const rectangle = require("./rectangle.cjs");
// `rectangle` contains the `module.exports` object of rectangle.cjs

module.exports = {
  area: (side) => rectangle.area(side, side),
};
```

Unlike ESM which leaves specifier resolution entirely host-defined, CommonJS defines some semantics for the module ID. It defines that relative IDs, starting with `.` or `..`, should be resolved relative to the current module, while top-level IDs starting with neither should be resolved relative to some "module name space root". Node.js picks up where the CommonJS spec left off and defines a formal resolution algorithm, which is used as the basis for resolution by many tools that recognize CJS, including bundlers and TypeScript. Most notably, the resolution logic of Node.js defines the `node_modules` folder and how to import paths pointing to directories (it uses the directory's `package.json` or `index.js`).

### AMD

CommonJS works well in Node.js, but it's synchronous, which is detrimental for browsers because loading dependencies may involve network requests. Asynchronous Module Definition (AMD) is more popular in browsers because its imports are asynchronous. In AMD, each module calls `define()` with an array of dependency IDs and a factory function. The loader resolves the dependencies before calling the factory, passing their exported values as arguments in the same order. The factory can return a value to export from the module.

```js
// -- rectangle.js --
define([], function () {
  return {
    area: (a, b) => a * b,
  };
});
```

```js
// -- square.js --
define(["./rectangle"], function (rectangle) {
  // `rectangle` contains the value returned by rectangle.js's factory
  return {
    area: (side) => rectangle.area(side, side),
  };
});
```

The `define()` function is provided by an AMD loader, such as RequireJS, rather than by the runtime (browsers don't natively understand AMD). AMD supports relative and top-level module IDs, similar to CommonJS. How these IDs map to files depends on the loader and its configuration. For example, RequireJS normally resolves top-level IDs against a configured `baseUrl` and adds the `.js` extension, so module IDs usually omit it.

### UMD

Before ESM, there was already the desire to make modules cross-platform! Universal Module Definition (UMD) is a set of wrapper patterns that allow the same file to work with different module systems. A typical UMD wrapper checks for an AMD loader, then for a CommonJS environment, and otherwise exposes the module as a global variable. Each branch uses the same factory function to create the module's exported value.

```js
// -- rectangle.js --
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.rectangle = factory();
  }
})(globalThis, function () {
  return {
    area: (a, b) => a * b,
  };
});
```

```js
// -- square.js --
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./rectangle"], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./rectangle.js"));
  } else {
    root.square = factory(root.rectangle);
  }
})(globalThis, function (rectangle) {
  return {
    area: (side) => rectangle.area(side, side),
  };
});
```

Now this same file can be imported in both Node.js running CommonJS and browsers running AMD, without any modification to the source code. In the global-variable branch, you must load the dependencies yourself, in the correct order, just like good old global scripts.

UMD does not define its own dependency resolution rules; it's handled by the AMD/CommonJS branches. People rarely hand-write UMD; it is usually generated by bundlers and transpilers.

## Using modules in Node.js

Node.js supports both ESM and CommonJS modules. When it attempts to execute a file, it must first decide if the file is CJS or ESM. For backwards compatibility, without any contextual cues, Node.js defaults to CJS (unless the file contains ESM-specific syntax like `import`/`export`, in which case it switches to ESM). To explicitly mark a file as ESM, use the `.mjs` extension, or use `.js` with `"type": "module"` in the nearest parent `package.json` file:

```json
{
  "type": "module"
}
```

To explicitly mark a file as CJS, use the `.cjs` extension, or use `"type": "commonjs"` in the nearest parent `package.json` file.

For example, create these two files in the same directory as `package.json` (which contains `"type": "module"`):

```js
// -- square.js --
export const area = (side) => side ** 2;
```

```js
// -- main.js --
import { area } from "./square.js";

console.log(area(4)); // 16
```

Run the entry module with `node main.js`. Node.js loads these files directly from the file system; no HTML page or HTTP server is needed.

Node ESM does not expose the CJS module-scoped variables: `__dirname`, `__filename`, `exports`, `module`, `require`. While you probably don't need `exports` and `module` because you have the `export` declarations, you might find `__dirname` and `__filename` useful for getting the path of the current module and `require` for synchronously loading a dependency when not at the top level. `import.meta` largely replaces `__dirname` and `__filename`, with Node-specific properties like `import.meta.dirname` and `import.meta.filename`. If you want to synchronously load dependencies, Node also provides the `createRequire` function to restore the `require` function within this module's context.

Node has different resolution logic for ESM and CJS module specifiers. Its ESM implementation is more consistent with that of browsers, which means you must keep the file extensions like `"./square.js"` instead of `"./square"`. To be compatible with the existing ecosystem, Node.js still resolves bare names to installed packages in `node_modules`. It provides built-in modules through the `node:` protocol.

```js
import { readFile } from "node:fs/promises"; // Import from built-in module
import _ from "lodash"; // Import from package in node_modules

const text = await readFile(new URL("./data.txt", import.meta.url), "utf8");
const wordCounts = _.countBy(_.words(text));
```

Whether the ESM or CJS specifier resolution rules are used depends on the importing method, not the target module. You use CJS module specifiers with `require` (including ones created by `createRequire` in ES modules) and ESM ones with `import` (including dynamic imports in CJS modules).

Node specifier resolution offers some more features, like import aliases using `"imports"` in `package.json`. See Node.js's ES module documentation for its loading rules and APIs.

### ESM/CJS interop

In Node.js, an ES module can import a CJS module, which loads the `module.exports` value as the default export:

```js
// -- main.mjs --
import square from "./square.cjs";

console.log(square.area(4)); // 16
```

Conversely, CommonJS code can use asynchronous `import()` to load ES modules. Node.js also supports `require()` of synchronous ES module graphs:

```js
const square = require("./square.mjs");
// Assuming square.mjs and its dependencies do not use top-level await

console.log(square.area(4));

import("./module-with-top-level-await.mjs").then((mod) => {
  mod.foo();
});
```

The only restriction is that `require()` cannot load a graph that uses top-level `await`:

```js
const mod = require("./module-with-top-level-await.mjs");
// Error [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead.
```

Many CJS packages are expected to export individual names, like this:

```js
const { area } = require("./square.cjs");
```

This does _not_ always translate to named imports in ESM:

```js
import { area } from "./square.cjs";
```

This is because modules must be linked before evaluated, which means Node must be able to tell if an export called `area` exists before it runs `square.cjs`. Therefore, it can only look for certain code patterns, like `module.exports = { area }` or `module.exports.area = ...`, but it will not 100% succeed, especially if CJS code was hand-written and modifies `module.exports` in a convoluted way. Most common compiler-produced CJS idioms can be correctly analyzed.

In the worst case, you may need to import the whole `module.exports` object, and then destructure it:

```js
import square from "./square.cjs";

const { area } = square;
```

Note that CJS has no concept of a "default export"; when you default-import a CJS module, you are in fact loading the whole `module.exports` object, within which there may be conceptual "named exports" as properties. Compilers would transpile `export default` declarations to CJS code that's essentially `module.exports.default = ...`, and this cannot be directly imported in an ES module (`import { default as area }` is the same as `import area`, which loads the whole `module.exports` object).

```js
// -- square.js --
// This file will be compiled into CJS
export default function area(side) {
  return side ** 2;
}
// Compiled code:
// module.exports.default = function area(side) ...
```

```js
// -- main.mjs --
import square from "./square.js";

// Can't avoid this!
const { default: area } = square;
```

For this reason, if you write ESM syntax that will get compiled to CJS and then imported by native ES modules, you should avoid default exports or provide a named export alias.

```js
// -- square.js --
// Export the exact same value as the default export
export { area };
```

### Packages

When publishing a package, its `"exports"` field defines the entry points consumers can import. Conditional exports can select different implementations for different environments or module systems. These package settings are separate from JavaScript `export` declarations, which determine the bindings each module exposes. The `"main"` field is now unnecessary and can be replaced by `"exports"`.

For a long time, Node did not allow CJS consumers to import ESM packages without using asynchronous `import()` (allowing `require()` to load ESM came much later). Therefore, packages that wish to publish in native ESM would need to publish a separate CJS copy for consumers still running CJS:

```json
{
  "name": "dual-package",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/esm/index.js",
      "require": "./dist/cjs/index.cjs",
      "default": "./dist/esm/index.js"
    }
  }
}
```

This practice, called dual packaging, is unnecessary in current Node.js as long as the package's dependency graph doesn't use top-level `await`. If different parts of your application loaded the same package in CJS and ESM forms, they may not share the same module state, creating subtle bugs.
