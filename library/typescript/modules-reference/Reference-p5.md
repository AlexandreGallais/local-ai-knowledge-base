---
title: "Modules - Reference (part 5 of 6)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/modules-reference/Reference.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Modules - Reference (part 5 of 6)

If `./subpath/index.cts` or `./subpath.d.cts` exists, resolution is complete. Otherwise, resolution searches `node_modules/@types/pkg` and other `node_modules` directories in an attempt to resolve types, according to the `node_modules` package lookups rules. If no types are found, a second pass <example-value> all `node_modules` resolves to `./subpath/index.cjs` (assuming it exists), which counts as a successful resolution, but one that does not provide types, leading to `any`-typed imports and a `noImplicitAny` error if enabled.

##### Example: explicit `"types"` condition

Scenario: `"pkg/subpath"` is requested with conditions `["types", "node", "import"]` (determined by `moduleResolution` setting and the context that triggered the module resolution request) in a package directory with the following package.json:

```json
{
  "name": "pkg",
  "exports": {
    "./subpath": {
      "import": {
        "types": "./types/subpath/index.d.mts",
        "default": "./es/subpath/index.mjs"
      },
      "require": {
        "types": "./types/subpath/index.d.cts",
        "default": "./cjs/subpath/index.cjs"
      }
    }
  }
}
```

Resolution process within the package directory:

1. Does `"exports"` exist? **Yes.**
2. Does `"exports"` have a `"./subpath"` entry? **Yes.**
3. The value at `exports["./subpath"]` is an object—it must be specifying conditions.
4. Does the first condition `"import"` match this request? **Yes.**
5. The value at `exports["./subpath"].import` is an object—it must be specifying conditions.
6. Does the first condition `"types"` match this request? **Yes.**
7. Does the path `"./types/subpath/index.d.mts"` have a recognized TypeScript file extension? **Yes, so don’t use extension substitution.**
8. Return the path `"./types/subpath/index.d.mts"` if the file exists, `undefined` otherwise.

##### Example: versioned `"types"` condition

Scenario: using TypeScript 4.7.5, `"pkg/subpath"` is requested with conditions `["types", "node", "import"]` (determined by `moduleResolution` setting and the context that triggered the module resolution request) in a package directory with the following package.json:

```json
{
  "name": "pkg",
  "exports": {
    "./subpath": {
      "types@>=5.2": "./ts5.2/subpath/index.d.ts",
      "types@>=4.6": "./ts4.6/subpath/index.d.ts",
      "types": "./tsold/subpath/index.d.ts",
      "default": "./dist/subpath/index.js"
    }
  }
}
```

Resolution process within the package directory:

1. Does `"exports"` exist? **Yes.**
2. Does `"exports"` have a `"./subpath"` entry? **Yes.**
3. The value at `exports["./subpath"]` is an object—it must be specifying conditions.
4. Does the first condition `"types@>=5.2"` match this request? **No, 4.7.5 is not greater than or equal to 5.2.**
5. Does the second condition `"types@>=4.6"` match this request? **Yes, 4.7.5 is greater than or equal to 4.6.**
6. Does the path `"./ts4.6/subpath/index.d.ts"` have a recognized TypeScript file extension? **Yes, so don’t use extension substitution.**
7. Return the path `"./ts4.6/subpath/index.d.ts"` if the file exists, `undefined` otherwise.

##### Example: subpath patterns

Scenario: `"pkg/wildcard.js"` is requested with conditions `["types", "node", "import"]` (determined by `moduleResolution` setting and the context that triggered the module resolution request) in a package directory with the following package.json:

```json
{
  "name": "pkg",
  "type": "module",
  "exports": {
    "./*.js": {
      "types": "./types/*.d.ts",
      "default": "./dist/*.js"
    }
  }
}
```

Resolution process within the package directory:

1. Does `"exports"` exist? **Yes.**
2. Does `"exports"` have a `"./wildcard.js"` entry? **No.**
3. Does any key with a `*` in it match `"./wildcard.js"`? **Yes, `"./*.js"` matches and sets `wildcard` to be the substitution.**
4. The value at `exports["./*.js"]` is an object—it must be specifying conditions.
5. Does the first condition `"types"` match this request? **Yes.**
6. In `./types/*.d.ts`, replace `*` with the substitution `wildcard`. **`./types/wildcard.d.ts`**
7. Does the path `"./types/wildcard.d.ts"` have a recognized TypeScript file extension? **Yes, so don’t use extension substitution.**
8. Return the path `"./types/wildcard.d.ts"` if the file exists, `undefined` otherwise.

##### Example: `"exports"` block other subpaths

Scenario: `"pkg/dist/index.js"` is requested in a package directory with the following package.json:

```json
{
  "name": "pkg",
  "main": "./dist/index.js",
  "exports": "./dist/index.js"
}
```

Resolution process within the package directory:

1. Does `"exports"` exist? **Yes.**
2. The value at `exports` is a string—it must be a file path for the package root (`"."`).
3. Is the request `"pkg/dist/index.js"` for the package root? **No, it has a subpath `dist/index.js`.**
4. Resolution fails; return `undefined`.

Without `"exports"`, the request could have succeeded, but the presence of `"exports"` prevents resolving any subpaths that cannot be matched through `"exports"`.

#### package.json `"typesVersions"`

A `node_modules` package or directory module may specify a `"typesVersions"` field in its package.json to redirect TypeScript’s resolution process according to the TypeScript compiler version, and for `node_modules` packages, according to the subpath being resolved. This allows package authors to include new TypeScript syntax in one set of type definitions while providing another set for backward compatibility with older TypeScript versions (through a tool like downlevel-dts). `"typesVersions"` is supported in all `moduleResolution` modes; however, the field is not read in situations when package.json `"exports"` are read.

##### Example: redirect all requests to a subdirectory

Scenario: a module imports `"pkg"` using TypeScript 5.2, where `node_modules/pkg/package.json` is:

```json
{
  "name": "pkg",
  "version": "1.0.0",
  "types": "./index.d.ts",
  "typesVersions": {
    ">=3.1": {
      "*": ["ts3.1/*"]
    }
  }
}
```

Resolution process:

1. (Depending on compiler options) Does `"exports"` exist? **No.**
2. Does `"typesVersions"` exist? **Yes.**
3. Is the TypeScript version `>=3.1`? **Yes. Remember the mapping `"*": ["ts3.1/*"]`.**
4. Are we resolving a subpath after the package name? **No, just the root `"pkg"`.**
5. Does `"types"` exist? **Yes.**
6. Does any key in `"typesVersions"` match `./index.d.ts`? **Yes, `"*"` matches and sets `index.d.ts` to be the substitution.**
7. In `ts3.1/*`, replace `*` with the substitution `./index.d.ts`: **`ts3.1/index.d.ts`**.
8. Does the path `./ts3.1/index.d.ts` have a recognized TypeScript file extension? **Yes, so don’t use extension substitution.**
9. Return the path `./ts3.1/index.d.ts` if the file exists, `undefined` otherwise.

##### Example: redirect requests for a specific file

Scenario: a module imports `"pkg"` using TypeScript 3.9, where `node_modules/pkg/package.json` is:

```json
{
  "name": "pkg",
  "version": "1.0.0",
  "types": "./index.d.ts",
  "typesVersions": {
    "<4.0": { "index.d.ts": ["index.v3.d.ts"] }
  }
}
```

Resolution process:

1. (Depending on compiler options) Does `"exports"` exist? **No.**
2. Does `"typesVersions"` exist? **Yes.**
3. Is the TypeScript version `<4.0`? **Yes. Remember the mapping `"index.d.ts": ["index.v3.d.ts"]`.**
4. Are we resolving a subpath after the package name? **No, just the root `"pkg"`.**
5. Does `"types"` exist? **Yes.**
6. Does any key in `"typesVersions"` match `./index.d.ts`? **Yes, `"index.d.ts"` matches.**
7. Does the path `./index.v3.d.ts` have a recognized TypeScript file extension? **Yes, so don’t use extension substitution.**
8. Return the path `./index.v3.d.ts` if the file exists, `undefined` otherwise.

#### package.json `"main"` and `"types"`

If a directory’s package.json `"exports"` field is not read (either due to compiler options, or because it is not present, or because the directory is being resolved as a directory module instead of a `node_modules` package) and the module specifier does not have a subpath after the package name or package.json-containing directory, TypeScript will attempt to resolve from these package.json fields, in order, in an attempt to find the main module for the package or directory:

- `"types"`
- `"typings"` (legacy)
- `"main"`

The declaration file found at `"types"` is assumed to be an accurate representation of the implementation file found at `"main"`. If `"types"` and `"typings"` are not present or cannot be resolved, TypeScript will read the `"main"` field and perform extension substitution to find a declaration file.

When publishing a typed package to npm, it’s recommended to include a `"types"` field even if extension substitution or package.json `"exports"` make it unnecessary, because npm shows a TS icon on the package registry listing only if the package.json contains a `"types"` field.

#### Package-relative file paths

If neither package.json `"exports"` nor package.json `"typesVersions"` apply, subpaths of a bare package specifier resolve relative to the package directory, according to applicable relative path resolution rules. In modes that respect [package.json `"exports"`], this behavior is blocked by the mere presence of the `"exports"` field in the package’s package.json, even if the import fails to resolve through `"exports"`, as demonstrated in an example above. On the other hand, if the import fails to resolve through `"typesVersions"`, a package-relative file path resolution is attempted as a fallback.

When package-relative paths are supported, they resolve under the same rules as any other relative path considering the `moduleResolution` mode and context. For example, in `--moduleResolution nodenext`, directory modules and extensionless paths are only supported in `require` calls, not in `import`s:

```ts
import "pkg/dist/foo";                // ❌ import, needs `.js` extension
import "pkg/dist/foo.js";             // ✅
import foo = require("pkg/dist/foo"); // ✅ require, no extension needed
```

#### package.json `"imports"` and self-name imports

When `moduleResolution` is set to `node16`, `nodenext`, or `bundler`, and `resolvePackageJsonImports` is not disabled, TypeScript will attempt to resolve import paths beginning with `#` through the `"imports"` field of the nearest ancestor package.json of the importing file. Similarly, when package.json `"exports"` lookups are enabled, TypeScript will attempt to resolve import paths beginning with the current package name—that is, the value in the `"name"` field of the nearest ancestor package.json of the importing file—through the `"exports"` field of that package.json. Both of these features allow files in a package to import other files in the same package, replacing a relative import path.

TypeScript follows Node.js’s resolution algorithm for `"imports"` and self references exactly up until a file path is resolved. At that point, TypeScript’s resolution algorithm forks based on whether the package.json containing the `"imports"` or `"exports"` being resolved belongs to a `node_modules` dependency or the local project being compiled (i.e., its directory contains the tsconfig.json file for the project that contains the importing file):

- If the package.json is in `node_modules`, TypeScript will apply extension substitution to the file path if it doesn’t already have a recognized TypeScript file extension, and check for the existence of the resulting file paths.
- If the package.json is part of the local project, an additional remapping step is performed in order to find the _input_ TypeScript implementation file that will eventually produce the output JavaScript or declaration file path that was resolved from `"imports"`. Without this step, any compilation that resolves an `"imports"` path would be referencing output files from the _previous compilation_ instead of other input files that are intended to be included in the current compilation. This remapping uses the `outDir`/`declarationDir` and `rootDir` from the tsconfig.json, so using `"imports"` usually requires an explicit `rootDir` to be set.

This variation allows package authors to write `"imports"` and `"exports"` fields that reference only the compilation outputs that will be published to npm, while still allowing local development to use the original TypeScript source files.

##### Example: local project with conditions

Scenario: `"/src/main.mts"` imports `"#utils"` with conditions `["types", "node", "import"]` (determined by `moduleResolution` setting and the context that triggered the module resolution request) in a project directory with a tsconfig.json and package.json:

```json5
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node16",
    "resolvePackageJsonImports": true,
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

```json5
// package.json
{
  "name": "pkg",
  "imports": {
    "#utils": {
      "import": "./dist/utils.d.mts",
      "require": "./dist/utils.d.cts"
    }
  }
}
```

Resolution process:

1. Import path starts with `#`, try to resolve through `"imports"`.
2. Does `"imports"` exist in the nearest ancestor package.json? **Yes.**
3. Does `"#utils"` exist in the `"imports"` object? **Yes.**
4. The value at `imports["#utils"]` is an object—it must be specifying conditions.
5. Does the first condition `"import"` match this request? **Yes.**
6. Should we attempt to map the output path to an input path? **Yes, because:**
   - Is the package.json in `node_modules`? **No, it’s in the local project.**
   - Is the tsconfig.json within the package.json directory? **Yes.**
7. In `./dist/utils.d.mts`, replace the `outDir` prefix with `rootDir`. **`./src/utils.d.mts`**
8. Replace the output extension `.d.mts` with the corresponding input extension `.mts`. **`./src/utils.mts`**
9. Return the path `"./src/utils.mts"` if the file exists.
10. Otherwise, return the path `"./dist/utils.d.mts"` if the file exists.

##### Example: `node_modules` dependency with subpath pattern

Scenario: `"/node_modules/pkg/main.mts"` imports `"#internal/utils"` with conditions `["types", "node", "import"]` (determined by `moduleResolution` setting and the context that triggered the module resolution request) with the package.json:

```json5
// /node_modules/pkg/package.json
{
  "name": "pkg",
  "imports": {
    "#internal/*": {
      "import": "./dist/internal/*.mjs",
      "require": "./dist/internal/*.cjs"
    }
  }
}
```

Resolution process:
