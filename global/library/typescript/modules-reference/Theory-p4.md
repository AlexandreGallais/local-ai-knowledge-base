---
title: "Modules - Theory (part 4 of 5)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/modules-reference/Theory.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Modules - Theory (part 4 of 5)

## Module resolution

Let’s return to our first example and review what we’ve learned about it so far:

```ts
import sayHello from "greetings";
sayHello("world");
```

So far, we’ve discussed how the host’s module system and TypeScript’s `module` compiler option might impact this code. We know that the input syntax looks like ESM, but the output format depends on the `module` compiler option, potentially the file extension, and `package.json` `"type"` field. We also know that what `sayHello` gets bound to, and even whether the import is even allowed, may vary depending on the module kinds of this file and the target file. But we haven’t yet discussed how to _find_ the target file.

### Module resolution is host-defined

While the ECMAScript specification defines how to parse and interpret `import` and `export` statements, it leaves module resolution up to the host. If you’re creating a hot new JavaScript runtime, you’re free to create a module resolution scheme like:

```ts
import monkey from "🐒"; // Looks for './eats/bananas.js'
import cow from "🐄";    // Looks for './eats/grass.js'
import lion from "🦁";   // Looks for './eats/you.js'
```

and still claim to implement “standards-compliant ESM.” Needless to say, TypeScript would have no idea what types to assign to `monkey`, `cow`, and `lion` without built-in knowledge of this runtime’s module resolution algorithm. Just as `module` informs the compiler about the host’s expected module format, `moduleResolution`, along with a few customization options, specify the algorithm the host uses to resolve module specifiers to files. This also clarifies why TypeScript doesn't modify import specifiers during emit: the relationship between an import specifier and a file on disk (if one even exists) is host-defined, and TypeScript is not a host.

The available `moduleResolution` options are:

- **`classic`**: TypeScript’s oldest module resolution mode, this is unfortunately the default when `module` is set to anything other than `commonjs`, `node16`, or `nodenext`. It was probably made to provide best-effort resolution for a wide range of RequireJS configurations. It should not be used for new projects (or even old projects that don’t use RequireJS or another AMD module loader), and is scheduled for deprecation in TypeScript 6.0.
- **`node10`**: Formerly known as `node`, this is the unfortunate default when `module` is set to `commonjs`. It’s a pretty good model of Node.js versions older than v12, and sometimes it’s a passable approximation of how most bundlers do module resolution. It supports looking up packages from `node_modules`, loading directory `index.js` files, and omitting `.js` extensions in relative module specifiers. Because Node.js v12 introduced different module resolution rules for ES modules, though, it’s a very bad model of modern versions of Node.js. It should not be used for new projects.
- **`node16`**: This is the counterpart of `--module node16` and `--module node18` and is set by default with that `module` setting. Node.js v12 and later support both ESM and CJS, each of which uses its own module resolution algorithm. In Node.js, module specifiers in import statements and dynamic `import()` calls are not allowed to omit file extensions or `/index.js` suffixes, while module specifiers in `require` calls are. This module resolution mode understands and enforces this restriction where necessary, as determined by the module format detection rules instated by `--module node16`/`node18`. (For `node16` and `nodenext`, `module` and `moduleResolution` go hand-in-hand: setting one to `node16` or `nodenext` while setting the other to something else is an error.)
- **`nodenext`**: Currently identical to `node16`, this is the counterpart of `--module nodenext` and is set by default with that `module` setting. It’s intended to be a forward-looking mode that will support new Node.js module resolution features as they’re added.
- **`bundler`**: Node.js v12 introduced some new module resolution features for importing npm packages—the `"exports"` and `"imports"` fields of `package.json`—and many bundlers adopted those features without also adopting the stricter rules for ESM imports. This module resolution mode provides a base algorithm for code targeting a bundler. It supports `package.json` `"exports"` and `"imports"` by default, but can be configured to ignore them. It requires setting `module` to `esnext`.

### TypeScript imitates the host’s module resolution, but with types

Remember the three components of TypeScript’s job concerning modules?

1. Compile files into a valid **output module format**
2. Ensure that imports in those **outputs** will **resolve successfully**
3. Know what **type** to assign to **imported names**.

Module resolution is needed to accomplish last two. But when we spend most of our time working in input files, it can be easy to forget about (2)—that a key <example-value> of module resolution is validating that the imports or `require` calls in the output files, containing the same module specifiers as the input files, will actually work at runtime. Let’s look at a new example with multiple files:

```ts
export function add(a: number, b: number) {
  return a + b;
}

import { add } from "./math";
add(1, 2);
```

When we see the import from `"./math"`, it might be tempting to think, “This is how one TypeScript file refers to another. The compiler follows this (extensionless) path in order to assign a type to `add`.”

This isn’t entirely wrong, but the reality is deeper. The resolution of `"./math"` (and subsequently, the type of `add`) need to reflect the reality of what happens at runtime to the _output_ files. A more robust way to think about this process would look like this:

This model makes it clear that for TypeScript, module resolution is mostly a matter of accurately modeling the host’s module resolution algorithm between output files, with a little bit of remapping applied to find type information. Let’s look at another example that appears unintuitive through the lens of the simple model, but makes perfect sense with the robust model:

```ts

export function add(a: number, b: number) {
  return a + b;
}

import { add } from "./math.mjs";
add(1, 2);
```

Node.js ESM `import` declarations use a strict module resolution algorithm that requires relative paths to include file extensions. When we only think about input files, it’s a little strange that `"./math.mjs"` seems to resolve to `math.mts`. Since we’re using an `outDir` to put compiled outputs in a different directory, `math.mjs` doesn’t even exist next to `main.mts`! Why should this resolve? With our new mental model, it’s no problem:

Understanding this mental model may not immediately eliminate the strangeness of seeing output file extensions in input files, and it’s natural to think in terms of shortcuts: _`"./math.mjs"` refers to the input file `math.mts`. I have to write the output extension, but the compiler knows to look for `.mts` when I write `.mjs`._ This shortcut is even how the compiler works internally, but the more robust mental model explains _why_ module resolution in TypeScript works this way: given the constraint that the module specifier in the output file will be the same as the module specifier in the input file, this is the only process that accomplishes our two goals of validating output files and assigning types.

### The role of declaration files

In the previous example, we saw the “remapping” part of module resolution working between input and output files. But what happens when we import library code? Even if the library was written in TypeScript, it may not have published its source code. If we can’t rely on mapping the library’s JavaScript files back to a TypeScript file, we can verify that our import works at runtime, but how do we accomplish our second goal of assigning types?

This is where declaration files (`.d.ts`, `.d.mts`, etc.) come into play. The best way to understand how declaration files are interpreted is to understand where they come from. When you run `tsc --declaration` on an input file, you get one output JavaScript file and one output declaration file:

Because of this relationship, the compiler _assumes_ that wherever it sees a declaration file, there is a corresponding JavaScript file that is perfectly described by the type information in the declaration file. For performance reasons, in every module resolution mode, the compiler always looks for TypeScript and declaration files first, and if it finds one, it doesn’t continue looking for the corresponding JavaScript file. If it finds a TypeScript input file, it knows a JavaScript file _will_ exist after compilation, and if it finds a declaration file, it knows a compilation (perhaps someone else’s) already happened and created a JavaScript file at the same time as the declaration file.

The declaration file tells the compiler not only that a JavaScript file exists, but also what its name and extension are:

| Declaration file extension | JavaScript file extension | TypeScript file extension |
| -------------------------- | ------------------------- | ------------------------- |
| `.d.ts`                    | `.js`                     | `.ts`                     |
| `.d.ts`                    | `.js`                     | `.tsx`                    |
| `.d.mts`                   | `.mjs`                    | `.mts`                    |
| `.d.cts`                   | `.cjs`                    | `.cts`                    |
| `.d.*.ts`                  | `.*`                      |                           |

The last row expresses that non-JS files can be typed with the `allowArbitraryExtensions` compiler option to support cases where the module system supports importing non-JS files as JavaScript objects. For example, a file named `styles.css` can be represented by a declaration file named `styles.d.css.ts`.

> “But wait! Plenty of declaration files are written by hand, _not_ generated by `tsc`. Ever heard of DefinitelyTyped?” you might object. And it’s true—hand-writing declaration files, or even moving/copying/renaming them to represent outputs of an external build tool, is a dangerous, error-prone venture. DefinitelyTyped contributors and authors of typed libraries not using `tsc` to generate both JavaScript and declaration files should ensure that every JavaScript file has a sibling declaration file with the same name and matching extension. Breaking from this structure can lead to false-positive TypeScript errors for end users. The npm package `@arethetypeswrong/cli` can help catch and explain these errors before they’re published.

### Module resolution for bundlers, TypeScript runtimes, and Node.js loaders

So far, we’ve really emphasized the distinction between _input files_ and _output files_. Recall that when specifying a file extension on a relative module specifier, TypeScript typically makes you use the _output_ file extension:

```ts
export function add(a: number, b: number) {
  return a + b;
}

import { add } from "./math.ts";
//                  ^^^^^^^^^^^
// An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.
```

This restriction applies since TypeScript won’t rewrite the extension to `.js`, and if `"./math.ts"` appears in an output JS file, that import won’t resolve to another JS file at runtime. TypeScript really wants to prevent you from generating an unsafe output JS file. But what if there _is_ no output JS file? What if you’re in one of these situations:

- You’re bundling this code, the bundler is configured to transpile TypeScript files in-memory, and it will eventually consume and erase all the imports you’ve written to produce a bundle.
- You’re running this code directly in a TypeScript runtime like Node, Deno or Bun.
- You’re using `ts-node`, `tsx`, or another transpiling loader for Node.

In these cases, you can turn on `noEmit` (or `emitDeclarationOnly`) and `allowImportingTsExtensions` to disable emitting unsafe JavaScript files and silence the error on `.ts`-extensioned imports.

With or without `allowImportingTsExtensions`, it’s still important to pick the most appropriate `moduleResolution` setting for the module resolution host. For bundlers and the Bun runtime, it’s `bundler`. These module resolvers were inspired by Node.js, but didn’t adopt the strict ESM resolution algorithm that disables extension searching that Node.js applies to imports. The `bundler` module resolution setting reflects this, enabling `package.json` `"exports"` support like `node16`—`nodenext`, while always allowing extensionless imports. See _Choosing compiler options_ for more guidance.
