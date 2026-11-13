---
title: "Modules - ESM/CJS Interoperability (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/modules-reference/appendices/ESM-CJS-Interop.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Modules - ESM/CJS Interoperability (part 2 of 2)

## Interop in Node.js

Node.js shipped support for ES modules unflagged in v12. Like the bundlers and transpilers began doing years before, Node.js gave CommonJS modules a “synthetic default export” of their `exports` object, allowing the entire module contents to be accessed with a default import from ESM:

```ts
module.exports = { hello: "world" };

import greeting from "./export.cjs";
greeting.hello; // "world"
```

That’s one win for seamless migration! Unfortunately, the similarities mostly end there.

### No `__esModule` detection (the “double default” problem)

Node.js wasn’t able to respect the `__esModule` marker to vary its default import behavior. So a transpiled module with a “default export” behaves one way when “imported” by another transpiled module, and another way when imported by a true ES module in Node.js:

```ts
exports.__esModule = true;
exports.default = function doSomething() { /*...*/ }

import doSomething from "dependency";
// Works after transpilation, but not a function in Node.js ESM:
doSomething();
// Doesn't exist after transpilation, but works in Node.js ESM:
doSomething.default();
```

While the transpiled default import only makes the synthetic default export if the target module lacks an `__esModule` flag, Node.js _always_ synthesizes a default export, creating a “double default” on the transpiled module.

### Unreliable named exports

In addition to making a CommonJS module’s `exports` object available as a default import, Node.js attempts to find properties of `exports` to make available as named imports. This behavior matches bundlers and transpilers when it works; however, Node.js uses syntactic analysis to synthesize named exports before any code executes, whereas transpiled modules resolve their named imports at runtime. The result is that imports from CJS modules that work in transpiled modules may not work in Node.js:

```ts
exports.hello = "world";
exports["worl" + "d"] = "hello";

import { hello, world } from "./named-exports.cjs";
// `hello` works, but `world` is missing in Node.js 💥

import mod from "./named-exports.cjs";
mod.world;
// Accessing properties from the default always works ✅
```

### Cannot `require` a true ES module before Node.js v22

True CommonJS modules can `require` an ESM-transpiled-to-CJS module, since they’re both CommonJS at runtime. But in Node.js versions older than v22.12.0, `require` crashes if it resolves to an ES module. This means published libraries cannot migrate from transpiled modules to true ESM without breaking their CommonJS (true or transpiled) consumers:

```ts
export function doSomething() { /* ... */ }

import { doSomething } from "dependency";
// ✅ Works if dependent and dependency are both transpiled
// ✅ Works if dependent and dependency are both true ESM
// ✅ Works if dependent is true ESM and dependency is transpiled
// 💥 Crashes if dependent is transpiled and dependency is true ESM
```

### Different module resolution algorithms

Node.js introduced a new module resolution algorithm for resolving ESM imports that differed significantly from the long-standing algorithm for resolving `require` calls. While not directly related to interop between CJS and ES modules, this difference was one more reason why a seamless migration from transpiled modules to true ESM might not be possible:

```ts
export function add(a, b) {
  return a + b;
}

export * from "./add";
//            ^^^^^^^
// Works when transpiled to CJS,
// but would have to be "./add.js"
// in Node.js ESM.
```

## Conclusions

Clearly, a seamless migration from transpiled modules to ESM isn’t possible, at least in Node.js. Where does this leave us?

### Setting the right `module` compiler option is critical

Since interoperability rules differ between hosts, TypeScript can’t offer correct checking behavior unless it understands what kind of module is represented by each file it sees, and what set of rules to apply to them. This is the purpose of the `module` compiler option. (In particular, code that is intended to run in Node.js is subject to stricter rules than code that will be processed by a bundler. The compiler’s output is not checked for Node.js compatibility unless `module` is set to `node16`, `node18`, or `nodenext`.)

### Applications with CommonJS code should always enable `esModuleInterop`

In a TypeScript _application_ (as opposed to a library that others may consume) where `tsc` is used to emit JavaScript files, whether `esModuleInterop` is enabled doesn’t have major consequences. The way you write imports for certain kinds of modules will change, but TypeScript’s checking and emit are in sync, so error-free code should be safe to run in either mode. The downside of leaving `esModuleInterop` disabled in this case is that it allows you to write JavaScript code with semantics that clearly violate the ECMAScript specification, confusing intuitions about namespace imports and making it harder to migrate to running ES modules in the future.

In an application that gets processed by a third-party transpiler or bundler, on the other hand, enabling `esModuleInterop` is more important. All major bundlers and transpilers use an `esModuleInterop`-like emit strategy, so TypeScript needs to adjust its checking to match. (The compiler always reasons about what will happen in the JavaScript files that `tsc` would emit, so even if another tool is being used in place of `tsc`, emit-affecting compiler options should still be set to match the output of that tool as closely as possible.)

`allowSyntheticDefaultImports` without `esModuleInterop` should be avoided. It changes the compiler’s checking behavior without changing the code emitted by `tsc`, allowing potentially unsafe JavaScript to be emitted. Additionally, the checking changes it introduces are an incomplete version of the ones introduced by `esModuleInterop`. Even if `tsc` isn’t being used for emit, it’s better to enable `esModuleInterop` than `allowSyntheticDefaultImports`.

Some people object to the inclusion of the `__importDefault` and `__importStar` helper functions included in `tsc`’s JavaScript output when `esModuleInterop` is enabled, either because it marginally increases the output size on disk or because the interop algorithm employed by the helpers seems to misrepresent Node.js’s interop behavior by checking for `__esModule`, leading to the hazards discussed earlier. Both of these objections can be addressed, at least partially, without accepting the flawed checking behavior exhibited with `esModuleInterop` disabled. First, the `importHelpers` compiler option can be used to import the helper functions from `tslib` rather than inlining them into each file that needs them. To discuss the second objection, let’s look at a final example:

```ts
exports.__esModule = true;
exports.default = function doSomething() { /* ... */ };
exports.something = "something";

module.exports = function doSomethingElse() { /* ... */ };

export default function sayHello() { /* ... */ }
export const hello = "hello";

import doSomething from "transpiled-dependency";
import doSomethingElse from "true-cjs-dependency";
import sayHello from "./sayHello.js";
```

Assume we’re compiling `src` to CommonJS for use in Node.js. Without `allowSyntheticDefaultImports` or `esModuleInterop`, the import of `doSomethingElse` from `"true-cjs-dependency"` is an error, and the others are not. To fix the error without changing any compiler options, you could change the import to `import doSomethingElse = require("true-cjs-dependency")`. However, depending on how the types for the module (not shown) are written, you may also be able to write and call a namespace import, which would be a language-level specification violation. With `esModuleInterop`, none of the imports shown are errors (and all are callable), but the invalid namespace import would be caught.

What would change if we decided to migrate `src` to true ESM in Node.js (say, add `"type": "module"` to our root package.json)? The first import, `doSomething` from `"transpiled-dependency"`, would no longer be callable—it exhibits the “double default” problem, where we’d have to call `doSomething.default()` rather than `doSomething()`. (TypeScript understands and catches this under `--module node16`—`nodenext`.) But notably, the _second_ import of `doSomethingElse`, which needed `esModuleInterop` to work when compiling to CommonJS, works fine in true ESM.

If there’s something to complain about here, it’s not what `esModuleInterop` does with the second import. The changes it makes, both allowing the default import and preventing callable namespace imports, are exactly in line with Node.js’s real ESM/CJS interop strategy, and made migration to real ESM easier. The problem, if there is one, is that `esModuleInterop` seems to fail at giving us a seamless migration path for the _first_ import. But this problem was not introduced by enabling `esModuleInterop`; the first import was completely unaffected by it. Unfortunately, this problem cannot be solved without breaking the semantic contract between `main.ts` and `sayHello.ts`, because the CommonJS output of `sayHello.ts` looks structurally identical to `transpiled-dependency/index.js`. If `esModuleInterop` changed the way the transpiled import of `doSomething` works to be identical to the way it would work in Node.js ESM, it would change the behavior of the `sayHello` import in the same way, making the input code violate ESM semantics (thus still preventing the `src` directory from being migrated to ESM without changes).

As we’ve seen, there is no seamless migration path from transpiled modules to true ESM. But `esModuleInterop` is one step in the right direction. For those who still prefer to minimize module syntax transformations and the inclusion of the import helper functions, enabling `verbatimModuleSyntax` is a better choice than disabling `esModuleInterop`. `verbatimModuleSyntax` enforces that the `import mod = require("mod")` and `export = ns` syntax be used in CommonJS-emitting files, avoiding all the kinds of import ambiguity we’ve discussed, at the cost of ease of migration to true ESM.

### Library code needs special considerations

Libraries that ship as CommonJS should avoid using default exports, since the way those transpiled exports can be accessed varies between different tools and runtimes, and some of those ways will look confusing to users. A default export, transpiled to CommonJS by `tsc`, is accessible in Node.js as the default property of a default import:

```js
import pkg from "pkg";
pkg.default();
```

in most bundlers or transpiled ESM as the default import itself:

```js
import pkg from "pkg";
pkg();
```

and in vanilla CommonJS as the default property of a `require` call:

```js
const pkg = require("pkg");
pkg.default();
```

Users will detect a misconfigured module smell if they have to access the `.default` property of a default import, and if they’re trying to write code that will run both in Node.js and a bundler, they might be stuck. Some third-party TypeScript transpilers expose options that change the way default exports are emitted to mitigate this difference, but they don’t produce their own declaration (`.d.ts`) files, so that creates a mismatch between the runtime behavior and the type checking, further confusing and frustrating users. Instead of using default exports, libraries that need to ship as CommonJS should use `export =` for modules that have a single main export, or named exports for modules that have multiple exports:

```diff
- export default function doSomething() { /* ... */ }
+ export = function doSomething() { /* ... */ }
```

Libraries (that ship declaration files) should also take extra care to ensure the types they write are error-free under a wide range of compiler options. For example, it’s possible to write one interface that extends another in such a way that it only compiles successfully when `strictNullChecks` is disabled. If a library were to publish types like that, it would force all their users to disable `strictNullChecks` too. `esModuleInterop` can allow type declarations to contain similarly “infectious” default imports:

```ts
import express from "express";
declare function doSomething(req: express.Request): any;
export = doSomething;
```

Suppose this default import _only_ works with `esModuleInterop` enabled, and causes an error when a user without that option references this file. The user should _probably_ enable `esModuleInterop` anyway, but it’s generally seen as bad form for libraries to make their configurations infectious like this. It would be much better for the library to ship a declaration file like:

```ts
import express = require("express");
// ...
```

Examples like this have led to conventional wisdom that says libraries should _not_ enable `esModuleInterop`. This advice is a reasonable start, but we’ve looked at examples where the type of a namespace import changes, potentially _introducing_ an error, when enabling `esModuleInterop`. So whether libraries compile with or without `esModuleInterop`, they run the risk of writing syntax that makes their choice infectious.

Library authors who want to go above and beyond to ensure maximum compatibility would do well to validate their declaration files against a matrix of compiler options. But using `verbatimModuleSyntax` completely sidesteps the issue with `esModuleInterop` by forcing CommonJS-emitting files to use CommonJS-style import and export syntax. Additionally, since `esModuleInterop` only affects CommonJS, as more libraries move to ESM-only publishing over time, the relevance of this issue will decline.
