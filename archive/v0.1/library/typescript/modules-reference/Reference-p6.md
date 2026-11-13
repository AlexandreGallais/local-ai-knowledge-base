---
title: "Modules - Reference (part 6 of 6)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/modules-reference/Reference.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Modules - Reference (part 6 of 6)

1.  Import path starts with `#`, try to resolve through `"imports"`.
2.  Does `"imports"` exist in the nearest ancestor package.json? **Yes.**
3.  Does `"#internal/utils"` exist in the `"imports"` object? **No, check for pattern matches.**
4.  Does any key with a `*` match `"#internal/utils"`? **Yes, `"#internal/*"` matches and sets `utils` to be the substitution.**
5.  The value at `imports["#internal/*"]` is an object—it must be specifying conditions.
6.  Does the first condition `"import"` match this request? **Yes.**
7.  Should we attempt to map the output path to an input path? **No, because the package.json is in `node_modules`.**
8.  In `./dist/internal/*.mjs`, replace `*` with the substitution `utils`. **`./dist/internal/utils.mjs`**
9.  Does the path `./dist/internal/utils.mjs` have a recognized TypeScript file extension? **No, try extension substitution.**
10. Via extension substitution, try the following paths, returning the first one that exists, or `undefined` otherwise:
    1. `./dist/internal/utils.mts`
    2. `./dist/internal/utils.d.mts`
    3. `./dist/internal/utils.mjs`

### `node16`, `nodenext`

These modes reflect the module resolution behavior of Node.js v12 and later. (`node16` and `nodenext` are currently identical, but if Node.js makes significant changes to its module system in the future, `node16` will be frozen while `nodenext` will be updated to reflect the new behavior.) In Node.js, the resolution algorithm for ECMAScript imports is significantly different from the algorithm for CommonJS `require` calls. For each module specifier being resolved, the syntax and the module format of the importing file are first used to determine whether the module specifier will be in an `import` or `require` in the emitted JavaScript. That information is then passed into the module resolver to determine which resolution algorithm to use (and whether to use the `"import"` or `"require"` condition for package.json `"exports"` or `"imports"`).

> TypeScript files that are determined to be in CommonJS format may still use `import` and `export` syntax by default, but the emitted JavaScript will use `require` and `module.exports` instead. This means that it’s common to see `import` statements that are resolved using the `require` algorithm. If this causes confusion, the `verbatimModuleSyntax` compiler option can be enabled, which prohibits the use of `import` statements that would be emitted as `require` calls.

Note that dynamic `import()` calls are always resolved using the `import` algorithm, according to Node.js’s behavior. However, `import()` types are resolved according to the format of the importing file (for backward compatibility with existing CommonJS-format type declarations):

```ts
import x from "./mod.js";             // `import` algorithm due to file format (emitted as-written)
import("./mod.js");                   // `import` algorithm due to syntax (emitted as-written)
type Mod = typeof import("./mod.js"); // `import` algorithm due to file format
import mod = require("./mod");        // `require` algorithm due to syntax (emitted as `require`)

import x from "./mod";                // `require` algorithm due to file format (emitted as `require`)
import("./mod.js");                   // `import` algorithm due to syntax (emitted as-written)
type Mod = typeof import("./mod");    // `require` algorithm due to file format
import mod = require("./mod");        // `require` algorithm due to syntax (emitted as `require`)
```

#### Implied and enforced options

- `--moduleResolution node16` and `nodenext` must be paired with `--module node16`, `node18`, `node20`, or `nodenext`.

#### Supported features

Features are listed in order of precedence.

| | `import` | `require` |
|-| -------- | --------- |
| `paths` | ✅ | ✅ |
| `baseUrl` | ✅ | ✅ |
| `node_modules` package lookups | ✅ | ✅ |
| package.json `"exports"` | ✅ matches `types`, `node`, `import` | ✅ matches `types`, `node`, `require` |
| package.json `"imports"` and self-name imports | ✅ matches `types`, `node`, `import` | ✅ matches `types`, `node`, `require` |
| package.json `"typesVersions"` | ✅ | ✅ |
| Package-relative paths | ✅ when `exports` not present | ✅ when `exports` not present |
| Full relative paths | ✅ | ✅ |
| Extensionless relative paths | ❌ | ✅ |
| Directory modules | ❌ | ✅ |

### `bundler`

`--moduleResolution bundler` attempts to model the module resolution behavior common to most JavaScript bundlers. In short, this means supporting all the behaviors traditionally associated with Node.js’s CommonJS `require` resolution algorithm like `node_modules` lookups, directory modules, and extensionless paths, while also supporting newer Node.js resolution features like package.json `"exports"` and package.json `"imports"`.

It’s instructive to think about the similarities and differences between `--moduleResolution bundler` and `--moduleResolution nodenext`, particularly in how they decide what conditions to use when resolving package.json `"exports"` or `"imports"`. Consider an import statement in a `.ts` file:

```ts
// index.ts
import { foo } from "pkg";
```

Recall that in `--module nodenext --moduleResolution nodenext`, the `--module` setting first determines whether the import will be emitted to the `.js` file as an `import` or `require` call, then passes that information to TypeScript’s module resolver, which decides whether to match `"import"` or `"require"` conditions in `"pkg"`’s package.json `"exports"` accordingly. Let’s assume that there’s no package.json in scope of this file. The file extension is `.ts`, so the output file extension will be `.js`, which Node.js will interpret as CommonJS, so TypeScript will emit this `import` as a `require` call. So, the module resolver will use the `require` condition as it resolves `"exports"` from `"pkg"`.

The same process happens in `--moduleResolution bundler`, but the rules for deciding whether to emit an `import` or `require` call for this import statement will be different, since `--moduleResolution bundler` necessitates using `--module esnext` or `--module preserve`. In both of those modes, ESM `import` declarations always emit as ESM `import` declarations, so TypeScript’s module resolver will receive that information and use the `"import"` condition as it resolves `"exports"` from `"pkg"`.

This explanation may be somewhat unintuitive, since `--moduleResolution bundler` is usually used in combination with `--noEmit`—bundlers typically process raw `.ts` files and perform module resolution on untransformed `import`s or `require`s. However, for consistency, TypeScript still uses the hypothetical emit decided by `module` to inform module resolution and type checking. This makes `--module preserve` the best choice whenever a runtime or bundler is operating on raw `.ts` files, since it implies no transformation. Under `--module preserve --moduleResolution bundler`, you can write imports and requires in the same file that will resolve with the `import` and `require` conditions, respectively:

```ts
// index.ts
import pkg1 from "pkg";       // Resolved with "import" condition
import pkg2 = require("pkg"); // Resolved with "require" condition
```

#### Implied and enforced options

- `--moduleResolution bundler` must be paired with `--module esnext` or `--module preserve`.
- `--moduleResolution bundler` implies `--allowSyntheticDefaultImports`.

#### Supported features

- `paths` ✅
- `baseUrl` ✅
- `node_modules` package lookups ✅
- package.json `"exports"` ✅ matches `types`, `import`/`require` depending on syntax
- package.json `"imports"` and self-name imports ✅ matches `types`, `import`/`require` depending on syntax
- package.json `"typesVersions"` ✅
- Package-relative paths ✅ when `exports` not present
- Full relative paths ✅
- Extensionless relative paths ✅
- Directory modules ✅

### `node10` (formerly known as `node`)

`--moduleResolution node` was renamed to `node10` (keeping `node` as an alias for backward compatibility) in TypeScript 5.0. It reflects the CommonJS module resolution algorithm as it existed in Node.js versions earlier than v12. It should no longer be used.

#### Supported features

- `paths` ✅
- `baseUrl` ✅
- `node_modules` package lookups ✅
- package.json `"exports"` ❌
- package.json `"imports"` and self-name imports ❌
- package.json `"typesVersions"` ✅
- Package-relative paths ✅
- Full relative paths ✅
- Extensionless relative paths ✅
- Directory modules ✅

### `classic`

Do not use `classic`.
