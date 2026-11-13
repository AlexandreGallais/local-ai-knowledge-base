---
title: "TypeScript 5.7 (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 5.7.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 5.7

## Checks for Never-Initialized Variables

For a long time, TypeScript has been able to catch issues when a variable has not yet been initialized in all prior branches.

```ts
let result: number
if (someCondition()) {
    result = doSomeWork();
}
else {
    let temporaryWork = doSomeWork();
    temporaryWork *= 2;
    // forgot to assign to 'result'
}

console.log(result); // error: Variable 'result' is used before being assigned.
```

Unfortunately, there are some places where this analysis doesn't work.
For example, if the variable is accessed in a separate function, the type system doesn't know when the function will be called, and instead takes an "optimistic" view that the variable will be initialized.

```ts
function foo() {
    let result: number
    if (someCondition()) {
        result = doSomeWork();
    }
    else {
        let temporaryWork = doSomeWork();
        temporaryWork *= 2;
        // forgot to assign to 'result'
    }

    printResult();

    function printResult() {
        console.log(result); // no error here.
    }
}
```

While TypeScript 5.7 is still lenient on variables that have *possibly* been initialized, the type system is able to report errors when variables have *never* been initialized at all.

```ts
function foo() {
    let result: number
    
    // do work, but forget to assign to 'result'

    function printResult() {
        console.log(result); // error: Variable 'result' is used before being assigned.
    }
}
```

This change was contributed thanks to the work of GitHub user Zzzen!

## Path Rewriting for Relative Paths

There are several tools and runtimes that allow you to run TypeScript code "in-place", meaning they do not require a build step which generates output JavaScript files.
For example, ts-node, tsx, Deno, and Bun all support running `.ts` files directly.
More recently, Node.js has been investigating such support with `--experimental-strip-types` (soon to be unflagged!) and  `--experimental-transform-types`.
This is extremely convenient because it allows us to iterate faster without worrying about re-running a build task.

There is some complexity to be aware of when using these modes though.
To be maximally compatible with all these tools, a TypeScript file that's imported "in-place" **must** be imported with the appropriate TypeScript extension at runtime.
For example, to import a file called `foo.ts`, we have to write the following in Node's new experimental support:

```ts
// main.ts

import * as foo from "./foo.ts"; // <- we need foo.ts here, not foo.js
```

Typically, TypeScript would issue an error if we did this, because it expects us to import *the output file*.
Because some tools do allow `.ts` imports, TypeScript has supported this import style with an option called `--allowImportingTsExtensions` for a while now.
This works fine, but what happens if we need to actually generate `.js` files out of these `.ts` files?
This is a requirement for library authors who will need to be able to distribute just `.js` files, but up until now TypeScript has avoided rewriting any paths.

To support this scenario, we've added a new compiler option called `--rewriteRelativeImportExtensions`.
When an import path is *relative* (starts with `./` or `../`), ends in a TypeScript extension (`.ts`, `.tsx`, `.mts`, `.cts`), and is a non-declaration file, the compiler will rewrite the path to the corresponding JavaScript extension (`.js`, `.jsx`, `.mjs`, `.cjs`).

```ts
// Under --rewriteRelativeImportExtensions...

// these will be rewritten.
import * as foo from "./foo.ts";
import * as bar from "../someFolder/bar.mts";

// these will NOT be rewritten in any way.
import * as a from "./foo";
import * as b from "some-package/file.ts";
import * as c from "@some-scope/some-package/file.ts";
import * as d from "#/file.ts";
import * as e from "./file.js";
```

This allows us to write TypeScript code that can be run in-place and then compiled into JavaScript when we're ready.

Now, we noted that TypeScript generally avoided rewriting paths.
There are several reasons for this, but the most obvious one is dynamic imports.
If a developer writes the following, it's not trivial to handle the path that `import` receives.
In fact, it's impossible to override the behavior of `import` within any dependencies.

```ts
function getPath() {
    if (Math.random() < 0.5) {
        return "./foo.ts";
    }
    else {
        return "./foo.js";
    }
}

let myImport = await import(getPath());
```

Another issue is that (as we saw above) only *relative* paths are rewritten, and they are written "naively".
This means that any path that relies on TypeScript's `baseUrl` and `paths` will not get rewritten:

```json5
// tsconfig.json

{
    "compilerOptions": {
        "module": "nodenext",
        // ...
        "paths": {
            "@/*": ["./src/*"]
        }
    }
}
```

```ts
// Won't be transformed, won't work.
import * as utilities from "@/utilities.ts";
```

Nor will any path that might resolve through the `exports` and `imports` fields of a `package.json`.

```json5
// package.json
{
    "name": "my-package",
    "imports": {
        "#root/*": "./dist/*"
    }
}
```

```ts
// Won't be transformed, won't work.
import * as utilities from "#root/utilities.ts";
```

As a result, if you've been using a workspace-style layout with multiple packages referencing each other, you might need to use conditional exports with scoped custom conditions to make this work:

```json5
// my-package/package.json

{
    "name": "my-package",
    "exports": {
        ".": {
            "@my-package/development": "./src/index.ts",
            "import": "./lib/index.js"
        },
        "./*": {
            "@my-package/development": "./src/*.ts",
            "import": "./lib/*.js"
        }
    }
}
```

Any time you want to import the `.ts` files, you can run it with `node --conditions=@my-package/development`.

Note the "namespace" or "scope" we used for the condition `@my-package/development`.
This is a bit of a makeshift solution to avoid conflicts from dependencies that might also use the `development` condition.
If everyone ships a `development` in their package, then resolution may try to resolve to a `.ts` file which will not necessarily work.
This idea is similar to what's described in Colin McDonnell's essay *Live types in a TypeScript monorepo*, along with tshy's guidance for loading from source.

For more specifics on how this feature works, read up on the change here.

## Support for `--target es2024` and `--lib es2024`

TypeScript 5.7 now supports `--target es2024`, which allows users to target ECMAScript 2024 runtimes.
This target primarily enables specifying the new `--lib es2024` which contains many features for `SharedArrayBuffer` and `ArrayBuffer`, `Object.groupBy`, `Map.groupBy`, `Promise.withResolvers`, and more.
It also moves `Atomics.waitAsync` from `--lib es2022` to `--lib es2024`.

Note that as part of the changes to `SharedArrayBuffer` and `ArrayBuffer`, the two now diverge a bit.
To bridge the gap and preserve the underlying buffer type, all `TypedArrays` (like `Uint8Array` and others) are now also generic.

```ts
interface Uint8Array<TArrayBuffer extends ArrayBufferLike = ArrayBufferLike> {
    // ...
}
```

Each `TypedArray` now contains a type parameter named `TArrayBuffer`, though that type parameter has a default type argument so that we can continue to refer to `Int32Array` without explicitly writing out `Int32Array<ArrayBufferLike>`.

If you encounter any issues as part of this update, you may need to update `@types/node`.

This work was primarily provided thanks to Kenta Moriuchi!

## Searching Ancestor Configuration Files for Project Ownership

When a TypeScript file is loaded in an editor using TSServer (like Visual Studio or VS Code), the editor will try to find the relevant `tsconfig.json` file that "owns" the file.
To do this, it walks up the directory tree from the file being edited, looking for any file named `tsconfig.json`.

Previously, this search would stop at the first `tsconfig.json` file found;
however, imagine a project structure like the following:

```
project/
├── src/
│   ├── foo.ts
│   ├── foo-test.ts
│   ├── tsconfig.json
│   └── tsconfig.test.json
└── tsconfig.json
```

Here, the idea is that `src/tsconfig.json` is the "main" configuration file for the project, and `src/tsconfig.test.json` is a configuration file for running tests.

```json5
// src/tsconfig.json
{
    "compilerOptions": {
        "outDir": "../dist"
    },
    "exclude": ["**/*.test.ts"]
}
```

```json5
// src/tsconfig.test.json
{
    "compilerOptions": {
        "outDir": "../dist/test"
    },
    "include": ["**/*.test.ts"],
    "references": [
        { "path": "./tsconfig.json" }
    ]
}
```

```json5
// tsconfig.json
{
    // This is a "workspace-style" or "solution-style" tsconfig.
    // Instead of specifying any files, it just references all the actual projects.
    "files": [],
    "references": [
        { "path": "./src/tsconfig.json" },
        { "path": "./src/tsconfig.test.json" },
    ]
}
```

The problem here is that when editing `foo-test.ts`, the editor would find `project/src/tsconfig.json` as the "owning" configuration file - but that's not the one we want!
If the walk stops at this point, that might not be desirable.
The only way to avoid this previously was to rename `src/tsconfig.json` to something like `src/tsconfig.src.json`, and then all files would hit the top-level `tsconfig.json` which references every possible project.

```
project/
├── src/
│   ├── foo.ts
│   ├── foo-test.ts
│   ├── tsconfig.src.json
│   └── tsconfig.test.json
└── tsconfig.json
```

Instead of forcing developers to do this, TypeScript 5.7 now continues walking up the directory tree to find other appropriate `tsconfig.json` files for editor scenarios.
This can provide more flexibility in how projects are organized and how configuration files are structured.

You can get more specifics on the implementation on GitHub here and here.

## Faster Project Ownership Checks in Editors for Composite Projects

Imagine a large codebase with the following structure:

```
packages
├── graphics/
│   ├── tsconfig.json
│   └── src/
│       └── ...
├── sound/
│   ├── tsconfig.json
│   └── src/
│       └── ...
├── networking/
│   ├── tsconfig.json
│   └── src/
│       └── ...
├── input/
│   ├── tsconfig.json
│   └── src/
│       └── ...
└── app/
    ├── tsconfig.json
    ├── some-script.js
    └── src/
        └── ...
```

Each directory in `packages` is a separate TypeScript project, and the `app` directory is the main project that depends on all the other projects.

```json5
// app/tsconfig.json
{
    "compilerOptions": {
        // ...
    },
    "include": ["src"],
    "references": [
        { "path": "../graphics/tsconfig.json" },
        { "path": "../sound/tsconfig.json" },
        { "path": "../networking/tsconfig.json" },
        { "path": "../input/tsconfig.json" }
    ]
}
```

Now notice we have the file `some-script.js` in the `app` directory.
When we open `some-script.js` in the editor, the TypeScript language service (which also handles the editor experience for JavaScript files!) has to figure out which project the file belongs to so it can apply the right settings.

In this case, the nearest `tsconfig.json` does *not* include `some-script.js`, but TypeScript will proceed to ask "could one of the projects *referenced* by `app/tsconfig.json` include `some-script.js`?".
To do so, TypeScript would previously load up each project, one-by-one, and stop as soon as it found a project which contained `some-script.js`.
Even if `some-script.js` isn't included in the root set of files, TypeScript would still parse all the files within a project because some of the root set of files can still *transitively* reference `some-script.js`.

What we found over time was that this behavior caused extreme and unpredictable behavior in larger codebases.
Developers would open up stray script files and find themselves waiting for their entire codebase to be opened up.

Thankfully, every project that can be referenced by another (non-workspace) project must enable a flag called `composite`, which enforces a rule that all input source files must be known up-front.
So when probing a `composite` project, TypeScript 5.7 will only check if a file belongs to the *root set of files* of that project.
This should avoid this common worst-case behavior.

For more information, see the change here.

### Validated JSON Imports in `--module nodenext`

When importing from a `.json` file under `--module nodenext`, TypeScript will now enforce certain rules to prevent runtime errors.

For one, an import attribute containing `type: "json"` needs to be present for any JSON file import.

```ts
import myConfig from "./myConfig.json";
//                   ~~~~~~~~~~~~~~~~~
// ❌ error: Importing a JSON file into an ECMAScript module requires a 'type: "json"' import attribute when 'module' is set to 'NodeNext'.

import myConfig from "./myConfig.json" with { type: "json" };
//                                          ^^^^^^^^^^^^^^^^
// ✅ This is fine because we provided `type: "json"`
```

On top of this validation, TypeScript will not generate "named" exports, and the contents of a JSON import will only be accessible via a default.

```ts
// ✅ This is okay:
import myConfigA from "./myConfig.json" with { type: "json" };
let version = myConfigA.version;

///////////

import * as myConfigB from "./myConfig.json" with { type: "json" };

// ❌ This is not:
let version = myConfig.version;

// ✅ This is okay:
let version = myConfig.default.version;
```

See here for more information on this change.
