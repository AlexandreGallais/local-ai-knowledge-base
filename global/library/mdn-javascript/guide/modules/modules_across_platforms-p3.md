---
title: "Modules across platforms (part 3 of 3)"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/guide/modules/modules_across_platforms/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Modules across platforms (part 3 of 3)

## How TypeScript understands modules

TypeScript analyzes modules to check the types of imported values and, when compiling, produce JavaScript suitable for the runtime or bundler. To do this, it needs to understand both your TypeScript source and how the resulting JavaScript will be loaded. Its `module` and `moduleResolution` compiler options describe that environment's module format and resolution rules. These settings matter even when another tool produces the JavaScript and TypeScript only checks types.

In TypeScript, a file is either a script or a module (just like JavaScript itself, but this "module" is not necessarily an "ES module"; it may be CJS, etc.). The main difference is that variable declarations in scripts are automatically visible throughout the project, while modules create their own scope. By default, any file with a top-level `import` or `export` is a module, so sometimes adding a useless `export {}` can mark the file as a module and stop its variable declarations from becoming global. The `moduleDetection` option can force all non-declaration files to be treated as modules.

### The module format

Files understood to be "modules" in the TypeScript sense may still be compiled to the various formats, most notably ESM and CJS. (AMD and UMD are less relevant to developers these days because you just let the bundler "do the right thing" on the TypeScript source code directly, and `tsc` is explicitly not a bundler, so it doesn't optimize your code for web deployment.)

`tsc` is a transpiler, so it can compile ESM syntax into CJS. The TypeScript docs now recommend the `verbatimModuleSyntax` option, which makes the module syntax easier to reason about (for example, you don't need to worry about what `import x from "mod"` will be compiled into). All subsequent documentation will assume this option is turned on.

TypeScript provides two sets of module syntaxes. There's the familiar ES syntax `import` and `export` (which deal with individual named or default exports), and there's the special CJS syntax (which deals with the whole `module.exports` object).

```ts
import x = require("mod");
// Compiled to: const x = require("mod");

export = x;
// Compiled to: module.exports = x;
```

With `verbatimModuleSyntax`, TypeScript reports an error if ES import/export syntax would be compiled to CJS. Under Node.js module options, the `import = require()` syntax works in both CJS and ESM (generating a `createRequire` call in the latter case), while `export =` only works in CJS.

You declare the module type with the `module` option. While there are many options (comparable to a transpiler), you probably want to use one of:

- `"nodenext"`, if you are outputting code to run on Node.js-compatible runtimes. It uses the Node.js detection algorithm, like `.mts` (the `.ts` version of `.mjs`) and `"type": "module"`, for selecting between CJS and ESM. There are also versioned values like `"node16"`, but only use them if you specifically want to avoid new behavior. TypeScript also recommends this option for outputting code to run natively on browsers, because it recommends `"moduleResolution": "nodenext"` which requires this setting.
- `"preserve"`, if you are outputting code to run in bundlers or Bun. It outputs the module format as-is, with `import = require()` and `export =` compiled to CJS.
- `"esnext"`, if you want to enforce ESM syntax without transformations. It only outputs ESM, with `import = require()` and `export =` generating errors. There are also versioned values like `"es2020"`, but only use them if you specifically want to avoid new behavior.

The `module` option also decides if you can access `import.meta`, if you can use top-level `await`, if you can import other ES modules, etc. Just setting this option probably gives you sensible defaults in typical environments for most other options.

### Specifier resolution

TypeScript re-implements the specifier resolution logic of whatever environment the generated JavaScript code is intended to run in, so you need to declare which resolver to use with `moduleResolution`. Currently the only recommended values are:

- `"nodenext"`, if you are outputting code to run on Node.js-compatible runtimes. It uses the Node.js resolution algorithm; there are also versioned values like `"node16"`, but only use them if you specifically want to avoid new behavior.
- `"bundler"`, if you are outputting code to run in bundlers or Bun. It uses the resolution algorithm that most bundlers can agree on, which is essentially just node resolution without requiring explicit extensions.

For code intended to run directly in browsers, TypeScript has no dedicated browser resolver. Its recommended approximation uses `"nodenext"` for `moduleResolution`, which simultaneously requires `module: "nodenext"` too. But both `"nodenext"` and `"bundler"` are supersets of what the browser is capable of, so you must be careful not to use Node-specific things that browsers don't natively understand, like package imports or importing CommonJS.

TypeScript does not read your bundler configuration or import maps to reproduce custom specifier resolution rules you may have. You may use the `paths` option; for the Vite alias shown above, make sure TypeScript and Vite both resolve `@shapes/square` to the same module. It also has other configuration options, all with the goal of making sure TypeScript can reproduce how specifiers are resolved at runtime.

Like transpilers, by default the specifiers are taken at face value without any rewriting—path aliases using `paths` are not rewritten (so only use this option if your path aliases are natively understood by the downstream consumer), and you still use `.js` to refer to a `.ts` file because that's the actual file you import at runtime.

```ts
// -- src/main.ts --
import { area } from "./square.js";
// TypeScript can check this import against src/square.ts
// The emitted JavaScript still imports ./square.js
```

In fact, by default, it errors on `.ts` imports because they will likely not work when you compile to JavaScript. If you don't need to compile at all and intend to run TypeScript natively (either through a bundler or through a runtime that supports TypeScript), you can turn on `allowImportingTsExtensions` to silence these errors. There's also the `rewriteRelativeImportExtensions` option to opt into rewriting relative imports ending in `.ts`, `.tsx`, `.mts`, or `.cts` to their JavaScript extensions during emission. This option is generally only used if you intend to simultaneously run TypeScript natively and generate executable JavaScript.

### Type import/export

Within a module, TypeScript lets you import and export types as well as JavaScript values. The `import type` and `export type` forms are erased from the emitted JavaScript. You can also mark individual bindings with `type` when importing types and values together, so that only those bindings are erased.

```ts
import { area, type Shape } from "./shapes.js"; // Only "type Shape" removed
import type { Square } from "./square.js"; // Entire declaration removed
```

`import { type Shape }` leaves an `import {} from "./shapes.js"` declaration, which still loads and evaluates the module.

### Module declarations

When you import things from local files, TypeScript reads the target module's TypeScript source directly to understand their types. This is costly. For published libraries, TypeScript recommends generating _declaration files_ with the `.d.ts` extension, so it does not need to read the whole source file. The `.d.ts` file is usually produced by `tsc` and contains type declarations rather than executable implementations.

```ts
// -- src/square.ts --
export function area(side: number) {
  return side ** 2;
}
```

```ts
// -- dist/square.d.ts --
export function area(side: number): number;
```

Even if your project is JavaScript, you should still consider publishing a hand-written `.d.ts` file so your users can get the correct type definitions. Generally, TypeScript is able to automatically find the right `.d.ts` file when you import the package source code. Read the TypeScript declaration files guide to find out more.

## "Isomorphic" modules

The introduction of modules encourages the JavaScript ecosystem to distribute and reuse code in a modular fashion. However, that doesn'<example-value>' passwords. Can you use it in the browser front end? Can you use it on your Node.js server? The answer is: it depends.

Modules still have access to global variables, as demonstrated in What's a module?. If the module references globals like `window`, it can run in the browser, but will throw an error in your Node.js server, because `window` is not available there. Similarly, if the code requires access to `process` to be functional, it can only be used in Node.js.

In order to maximize the reusability of a module, it is often advised to make the code "isomorphic" — that is, to make it behave the same way in every runtime. This is commonly achieved in three ways:

- Separate your modules into "core" and "binding". For the "core", focus on pure JavaScript logic like computing the hash, without any DOM, network, filesystem access, and expose utility functions. For the "binding" part, you can read from and write to the global context. For example, the "browser binding" may choose to read the value from an input box, while the "Node binding" may read it from `process.env`, but values read from either place will be piped to the same core function and handled in the same way. The core can be imported in every environment and used in the same way, while only the binding, which is usually lightweight, needs to be platform-specific.
- Detect whether a particular global exists before using it. For example, the code below checks whether `process` is defined before reading from `process.env` (which is specific to Node.js and similar environments), and otherwise checks whether `window` is defined before reading from the DOM (which is specific to browsers and similar environments).

  ```js
  // myModule.js
  let password;
  if (typeof process !== "undefined") {
    // We are running in Node.js; read it from `process.env`
    password = process.env.PASSWORD;
  } else if (typeof window !== "undefined") {
    // We are running in the browser; read it from the input box
    password = document.getElementById("<example-value>").value;
  }
  ```

  This is preferable if the two branches actually end up with the same behavior ("isomorphic"). If it's impossible to provide the same functionality, or if doing so involves loading significant amounts of code while a large part remains unused, it is better to use different "bindings" instead.

- Use a polyfill to provide a fallback for missing features. For example, if you want to use the `DOMParser` API to parse XML, which is available in browsers but not natively in Node.js, you can use a similar API, like the one provided by `@xmldom/xmldom`. You can do so conditionally through dynamic imports:

  ```js
  // myModule.js
  if (typeof DOMParser === "undefined") {
    // Use @xmldom/xmldom when no native DOMParser is available
    globalThis.DOMParser = (await import("@xmldom/xmldom")).DOMParser;
  }
  // …
  ```

  The `globalThis` variable is a global object that is available in every environment and is useful if you want to read or create global variables within modules.

These practices are not unique to modules. Still, with the trend of code reusability and modularization, you are encouraged to make your code cross-platform so that it can be enjoyed by as many people as possible. Runtimes like Node.js are also actively implementing web APIs where possible to improve interoperability with the web.

## See also

- JavaScript modules
- Using modules on the web
- Understanding the module graph
- CommonJS module specification
- AMD specification
- UMD patterns
- RequireJS API
- Node.js: ECMAScript modules, CommonJS modules, and packages
- Modules in Deno
- Module resolution in Bun
- CommonJS module transformation in Babel
- Module configuration in SWC
- TypeScript: Modules theory, module reference, and choosing compiler options
- Vite: Dependency pre-bundling, features, and library mode
