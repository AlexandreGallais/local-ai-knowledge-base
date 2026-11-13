---
title: "Modules - Theory (part 3 of 5)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/modules-reference/Theory.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Modules - Theory (part 3 of 5)

### Module specifiers are not transformed by default

While the `module` compiler option can transform imports and exports in input files to different module formats in output files, the module _specifier_ (the string `from` which you `import`, or pass to `require`) is emitted as-written. For example, an input like:

```ts
import { add } from "./math.mjs";
add(1, 2);
```

might be emitted as either:

```ts
import { add } from "./math.mjs";
add(1, 2);
```

or:

```ts
const math_1 = require("./math.mjs");
math_1.add(1, 2);
```

depending on the `module` compiler option, but the module specifier will be `"./math.mjs"` either way. By default, module specifiers must be written in a way that works for the code’s target runtime or bundler, and it’s TypeScript’s job to understand those _output_-relative specifiers. The process of finding the file referenced by a module specifier is called _module resolution_.

> TypeScript 5.7 introduced the `--rewriteRelativeImportExtensions` option, which transforms relative module specifiers with `.ts`, `.tsx`, `.mts`, or `.cts` extensions to their JavaScript equivalents in output files. This option is useful for creating TypeScript files that can be run directly in Node.js during development _and_ still be compiled to JavaScript outputs for distribution or production use.
>
> This documentation was written before the introduction of `--rewriteRelativeImportExtensions`, and the mental model it presents is built around modeling the behavior of the host module system operating on its input files, whether that’s a bundler operating on TypeScript files or a runtime operating on `.js` outputs. With `--rewriteRelativeImportExtensions`, the way to apply that mental model is to apply it _twice_: once to the runtime or bundler processing the TypeScript input files directly, and once again to the runtime or bundler processing the transformed outputs. Most of this documentation assumes that _only_ the input files or _only_ the output files will be loaded, but the principles it presents can be extended to the case where both are loaded.
