---
title: "TypeScript 4.7 (part 1 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 4.7.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 4.7

## ECMAScript Module Support in Node.js

For the last few years, Node.js has been working to support ECMAScript modules (ESM).
This has been a very difficult feature, since the Node.js ecosystem is built on a different module system called CommonJS (CJS).
Interoperating between the two brings large challenges, with many new features to juggle;
however, support for ESM in Node.js was largely implemented in Node.js 12 and later.
Around TypeScript 4.5 we rolled out nightly-only support for ESM in Node.js to get some feedback from users and let library authors ready themselves for broader support.

TypeScript 4.7 adds this functionality with two new `module` settings: `node16` and `nodenext`.

```jsonc
{
    "compilerOptions": {
        "module": "node16",
    }
}
```

These new modes bring a few high-level features which we'll explore here.

### `type` in `package.json` and New Extensions

Node.js supports a new setting in `package.json` called `type`.
`"type"` can be set to either `"module"` or `"commonjs"`.

```jsonc
{
    "name": "my-package",
    "type": "module",

    "//": "...",
    "dependencies": {
    }
}
```

This setting controls whether `.js` and `.d.ts` files are interpreted as ES modules or CommonJS modules, and defaults to CommonJS when not set.
When a file is considered an ES module, a few different rules come into play compared to CommonJS:

* `import`/`export` statements can be used.
* Top-level `await` can be used
* Relative import paths need full extensions (we have to write `import "./foo.js"` instead of `import "./foo"`).
* Imports might resolve differently from dependencies in `node_modules`.
* Certain global-like values like `require` and `module` cannot be used directly.
* CommonJS modules get imported under certain special rules.

We'll come back to some of these.

To overlay the way TypeScript works in this system, `.ts` and `.tsx` files now work the same way.
When TypeScript finds a `.ts`, `.tsx`, `.js`, or `.jsx` file, it will walk up looking for a `package.json` to see whether that file is an ES module, and use that to determine:

* how to find other modules which that file imports
* and how to transform that file if producing outputs

When a `.ts` file is compiled as an ES module, ECMAScript `import`/`export` statements are left alone in the `.js` output;
when it's compiled as a CommonJS module, it will produce the same output you get today under `--module commonjs`.

This also means paths resolve differently between `.ts` files that are ES modules and ones that are CJS modules.
For example, let's say you have the following code today:

```ts
// ./foo.ts
export function helper() {
    // ...
}

// ./bar.ts
import { helper } from "./foo"; // only works in CJS

helper();
```

This code works in CommonJS modules, but will fail in ES modules because relative import paths need to use extensions.
As a result, it will have to be rewritten to use the extension of the *output* of `foo.ts` - so `bar.ts` will instead have to import from `./foo.js`.

```ts
// ./bar.ts
import { helper } from "./foo.js"; // works in ESM & CJS

helper();
```

This might feel a bit cumbersome at first, but TypeScript tooling like auto-imports and path completion will typically just do this for you.

One other thing to mention is the fact that this applies to `.d.ts` files too.
When TypeScript finds a `.d.ts` file in a package, it is interpreted based on the containing package.

### New File Extensions

The `type` field in `package.json` is nice because it allows us to continue using the `.ts` and `.js` file extensions which can be convenient;
however, you will occasionally need to write a file that differs from what `type` specifies.
You might also just prefer to always be explicit.

Node.js supports two extensions to help with this: `.mjs` and `.cjs`.
`.mjs` files are always ES modules, and `.cjs` files are always CommonJS modules, and there's no way to override these.

In turn, TypeScript supports two new source file extensions: `.mts` and `.cts`.
When TypeScript emits these to JavaScript files, it will emit them to `.mjs` and `.cjs` respectively.

Furthermore, TypeScript also supports two new declaration file extensions: `.d.mts` and `.d.cts`.
When TypeScript generates declaration files for `.mts` and `.cts`, their corresponding extensions will be `.d.mts` and `.d.cts`.

Using these extensions is entirely optional, but will often be useful even if you choose not to use them as part of your primary workflow.

### CommonJS Interoperability

Node.js allows ES modules to import CommonJS modules as if they were ES modules with a default export.

```ts
// ./foo.cts
export function helper() {
    console.log("hello world!");
}

// ./bar.mts
import foo from "./foo.cjs";

// prints "hello world!"
foo.helper();
```

In some cases, Node.js also synthesizes named exports from CommonJS modules, which can be more convenient.
In these cases, ES modules can use a "namespace-style" import (i.e. `import * as foo from "..."`), or named imports (i.e. `import { helper } from "..."`).

```ts
// ./foo.cts
export function helper() {
    console.log("hello world!");
}

// ./bar.mts
import { helper } from "./foo.cjs";

// prints "hello world!"
helper();
```

There isn't always a way for TypeScript to know whether these named imports will be synthesized, but TypeScript will err on being permissive and use some heuristics when importing from a file that is definitely a CommonJS module.

One TypeScript-specific note about interop is the following syntax:

```ts
import foo = require("foo");
```

In a CommonJS module, this just boils down to a `require()` call, and in an ES module, this imports `createRequire` to achieve the same thing.
This will make code less portable on runtimes like the browser (which don't support `require()`), but will often be useful for interoperability.
In turn, you can write the above example using this syntax as follows:

```ts
// ./foo.cts
export function helper() {
    console.log("hello world!");
}

// ./bar.mts
import foo = require("./foo.cjs");

foo.helper()
```

Finally, it's worth noting that the only way to import ESM files from a CJS module is using dynamic `import()` calls.
This can present challenges, but is the behavior in Node.js today.

You can read more about ESM/CommonJS interop in Node.js here.

### `package.json` Exports, Imports, and Self-Referencing

Node.js supports a new field for defining entry points in `package.json` called `"exports"`.
This field is a more powerful alternative to defining `"main"` in `package.json`, and can control what parts of your package are exposed to consumers.

Here's a `package.json` that supports separate entry-points for CommonJS and ESM:

```jsonc
// package.json
{
    "name": "my-package",
    "type": "module",
    "exports": {
        ".": {
            // Entry-point for `import "my-package"` in ESM
            "import": "./esm/index.js",

            // Entry-point for `require("my-package") in CJS
            "require": "./commonjs/index.cjs",
        },
    },

    // CJS fall-back for older versions of Node.js
    "main": "./commonjs/index.cjs",
}
```

There's a lot to this feature, which you can read more about on the Node.js documentation.
Here we'll try to focus on how TypeScript supports it.

With TypeScript's original Node support, it would look for a `"main"` field, and then look for declaration files that corresponded to that entry.
For example, if `"main"` pointed to `./lib/index.js`, TypeScript would look for a file called `./lib/index.d.ts`.
A package author could override this by specifying a separate field called `"types"` (e.g. `"types": "./types/index.d.ts"`).

The new support works similarly with import conditions.
By default, TypeScript overlays the same rules with import conditions - if you write an `import` from an ES module, it will look up the `import` field, and from a CommonJS module, it will look at the `require` field.
If it finds them, it will look for a corresponding declaration file.
If you need to point to a different location for your type declarations, you can add a `"types"` import condition.

```jsonc
// package.json
{
    "name": "my-package",
    "type": "module",
    "exports": {
        ".": {
            // Entry-point for `import "my-package"` in ESM
            "import": {
                // Where TypeScript will look.
                "types": "./types/esm/index.d.ts",

                // Where Node.js will look.
                "default": "./esm/index.js"
            },
            // Entry-point for `require("my-package") in CJS
            "require": {
                // Where TypeScript will look.
                "types": "./types/commonjs/index.d.cts",

                // Where Node.js will look.
                "default": "./commonjs/index.cjs"
            },
        }
    },

    // Fall-back for older versions of TypeScript
    "types": "./types/index.d.ts",

    // CJS fall-back for older versions of Node.js
    "main": "./commonjs/index.cjs"
}
```

> The `"types"` condition should always come first in `"exports"`.

It's important to note that the CommonJS entrypoint and the ES module entrypoint each needs its own declaration file, even if the contents are the same between them.
Every declaration file is interpreted either as a CommonJS module or as an ES module, based on its file extension and the `"type"` field of the `package.json`, and this detected module kind must match the module kind that Node will detect for the corresponding JavaScript file for type checking to be correct.
Attempting to use a single `.d.ts` file to type both an ES module entrypoint and a CommonJS entrypoint will cause TypeScript to think only one of those entrypoints exists, causing compiler errors for users of the package.

TypeScript also supports the `"imports"` field of `package.json` in a similar manner by looking for declaration files alongside corresponding files, and supports packages self-referencing themselves.
These features are generally not as involved to set up, but are supported.

### Your Feedback Wanted!

As we continue working on TypeScript 4.7, we expect to see more documentation and polish go into this functionality.
Supporting these new features has been an ambitious under-taking, and that's why we're looking for early feedback on it!
Please try it out and let us know how it works for you.

For more information, you can see the implementing PR here.

## Control over Module Detection

One issue with the introduction of modules to JavaScript was the ambiguity between existing "script" code and the new module code.
JavaScript code in a module runs slightly differently, and has different scoping rules, so tools have to make decisions as to how each file runs.
For example, Node.js requires module entry-points to be written in a `.mjs`, or have a nearby `package.json` with `"type": "module"`.
TypeScript treats a file as a module whenever it finds any `import` or `export` statement in a file, but otherwise, will assume a `.ts` or `.js` file is a script file acting on the global scope.

This doesn't quite match up with the behavior of Node.js where the `package.json` can change the format of a file, or the `--jsx` setting `react-jsx`, where any JSX file contains an implicit import to a JSX factory.
It also doesn't match modern expectations where most new TypeScript code is written with modules in mind.

That's why TypeScript 4.7 introduces a new option called `moduleDetection`.
`moduleDetection` can take on 3 values: `"auto"` (the default), `"legacy"` (the same behavior as 4.6 and prior), and `"force"`.

Under the mode `"auto"`, TypeScript will not only look for `import` and `export` statements, but it will also check whether

* the `"type"` field in `package.json` is set to `"module"` when running under `--module nodenext`/`--module node16`, and
* check whether the current file is a JSX file when running under `--jsx react-jsx`

In cases where you want every file to be treated as a module, the `"force"` setting ensures that every non-declaration file is treated as a module.
This will be true regardless of how `module`, `moduleResolution`, and `jsx` are configured.

Meanwhile, the `"legacy"` option simply goes back to the old behavior of only seeking out `import` and `export` statements to determine whether a file is a module.

You can read up more about this change on the pull request.

## Control-Flow Analysis for Bracketed Element Access

TypeScript 4.7 now narrows the types of element accesses when the indexed keys are literal types and unique symbols.
For example, take the following code:

```ts
const key = Symbol();

const numberOrString = Math.random() < 0.5 ? 42 : "hello";

const obj = {
    [key]: numberOrString,
};

if (typeof obj[key] === "string") {
    let str = obj[key].toUpperCase();
}
```

Previously, TypeScript would not consider any type guards on `obj[key]`, and would have no idea that `obj[key]` was really a `string`.
Instead, it would think that `obj[key]` was still a `string | number` and accessing `toUpperCase()` would trigger an error.

TypeScript 4.7 now knows that `obj[key]` is a string.

This also means that under `--strictPropertyInitialization`, TypeScript can correctly check that computed properties are initialized by the end of a constructor body.

```ts
// 'key' has type 'unique symbol'
const key = Symbol();

class C {
    [key]: string;

    constructor(str: string) {
        // oops, forgot to set 'this[key]'
    }

    screamString() {
        return this[key].toUpperCase();
    }
}
```

Under TypeScript 4.7, `--strictPropertyInitialization` reports an error telling us that the `[key]` property wasn't definitely assigned by the end of the constructor.

We'd like to extend our gratitude to Oleksandr Tarasiuk who provided this change!
