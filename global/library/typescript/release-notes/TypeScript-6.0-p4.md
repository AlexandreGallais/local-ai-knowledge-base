---
title: "TypeScript 6.0 (part 4 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 6.0.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 6.0 (part 4 of 4)

### Deprecated: `--esModuleInterop false` and `--allowSyntheticDefaultImports false`

The following settings can no longer be set to `false`:

- `esModuleInterop`
- `allowSyntheticDefaultImports`

`esModuleInterop` and `allowSyntheticDefaultImports` were originally opt-in to avoid breaking existing projects.
However, the behavior they enable has been the recommended default for years.
Setting them to `false` often led to subtle runtime issues when consuming CommonJS modules from ESM.
In TypeScript 6.0, the safer interop behavior is always enabled.

If you have imports that rely on the old behavior, you may need to adjust them:

```ts
// Before (with esModuleInterop: false)
import * as express from "express";

// After (with esModuleInterop always enabled)
import express from "express";
```

See more at this issue and its implementing pull request.

### Deprecated: `--alwaysStrict false`

The `alwaysStrict` flag refers to inference and emit of the `"use strict";` directive.
In TypeScript 6.0, all code will be assumed to be in JavaScript strict mode, which is a set of JS semantics that most-noticeably affects syntactic corner cases around reserved words.
If you have "sloppy mode" code that uses reserved words like `await`, `static`, `private`, or `public` as regular identifiers, you'll need to rename them.
If you relied on subtle semantics around the meaning of `this` in non-strict code, you may need to adjust your code as well.

See more at this issue and its corresponding pull request.

### Deprecated: `outFile`

The `--outFile` option has been removed from TypeScript 6.0. This option was originally designed to concatenate multiple input files into a single output file. However, external bundlers like Webpack, Rollup, esbuild, Vite, Parcel, and others now do this job faster, better, and with far more configurability. Removing this option simplifies the implementation and allows us to focus on what TypeScript does best: type-checking and declaration emit. If you're currently using `--outFile`, you'll need to migrate to an external bundler. Most modern bundlers have excellent TypeScript support out of the box.

### Deprecated: legacy `module` Syntax for namespaces

Early versions of TypeScript used the `module` keyword to declare namespaces:

```ts
// ❌ Deprecated syntax - now an error
module Foo {
    export const bar = 10;
}
```

This syntax was later aliased to the modern preferred form using the `namespace` keyword:

```ts
// ✅ The correct syntax
namespace Foo {
    export const bar = 10;
}
```

When `namespace` was introduced, the `module` syntax was simply discouraged.
A few years ago, the TypeScript language service started marking the keyword as deprecated, suggesting `namespace` in its place.

In TypeScript 6.0, using `module` where `namespace` is expected is now a hard deprecation.
This change is necessary because `module` blocks are a potential ECMAScript proposal that would conflict with the legacy TypeScript syntax.

The ambient module declaration form remains fully supported:

```ts
// ✅ Still works perfectly
declare module "some-module" {
    export function doSomething(): void;
}
```

See this issue and its corresponding pull request for more details.

### Deprecated: `asserts` Keyword on Imports

The `asserts` keyword was proposed to the JavaScript language via the import assertions proposal;
however, the proposal eventually morphed into the import attributes proposal, which uses the `with` keyword instead of `asserts`.

Thus, the `asserts` syntax is now deprecated in TypeScript 6.0, and using it will lead to an error:

```ts
// ❌ Deprecated syntax - now an error.
import blob from "./blahb.json" asserts { type: "json" }
//                              ~~~~~~~
// error: Import assertions have been replaced by import attributes. Use 'with' instead of 'asserts'.
```

Instead, use the `with` syntax for import attributes:

```ts
// ✅ Works with the new import attributes syntax.
import blob from "./blahb.json" with { type: "json" }
```

See more at this issue and its corresponding pull request.

### Deprecated: `no-default-lib` Directives

The `/// <reference no-default-lib="true"/>` directive has been largely misunderstood and misused.
In TypeScript 6.0, this directive is no longer supported.
If you were using it, consider using `--noLib` or `--libReplacement` instead.

See more here and at the corresponding pull request.

### Specifying Command-Line Files When `tsconfig.json` Exists is Now an Error

Currently, if you run `tsc foo.ts` in a folder where a `tsconfig.json` exists, the config file is completely ignored.
This was often very confusing if you expected checking and emit options to apply to the input file.

In TypeScript 6.0, if you run `tsc` with file arguments in a directory containing a `tsconfig.json`, an error will be issued to make this behavior explicit:

```
error TS5112: tsconfig.json is present but will not be loaded if files are specified on commandline. Use '--ignoreConfig' to skip this error.
```

If it is the case that you wanted to ignore the `tsconfig.json` and just compile `foo.ts` with TypeScript's defaults, you can use the new `--ignoreConfig` flag.

```sh
tsc --ignoreConfig foo.ts
```

See more at this issue and its corresponding pull request.

## Preparing for TypeScript 7.0

TypeScript 6.0 is designed as a transition release.
While options deprecated in TypeScript 6.0 will continue to work without errors when `"ignoreDeprecations": "6.0"` is set, those options will be **removed entirely in TypeScript 7.0** (the native TypeScript port).
If you're seeing deprecation warnings after upgrading to TypeScript 6.0, we strongly recommend addressing them before adopting TypeScript 7.0 (or trying native previews) in your project.
