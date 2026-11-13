---
title: "Modules - Reference (part 4 of 6)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/modules-reference/Reference.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Modules - Reference (part 4 of 6)

### Common features and processes

#### File extension substitution

TypeScript always wants to resolve internally to a file that can provide type information, while ensuring that the runtime or bundler can use the same path to resolve to a file that provides a JavaScript implementation. For any module specifier that would, according to the `moduleResolution` algorithm specified, trigger a lookup of a JavaScript file in the runtime or bundler, TypeScript will first try to find a TypeScript implementation file or type declaration file with the same name and analagous file extension.

| Runtime lookup | TypeScript lookup #1 | TypeScript lookup #2 | TypeScript lookup #3 | TypeScript lookup #4 | TypeScript lookup #5 |
| -------------- | -------------------- | -------------------- | -------------------- | -------------------- | -------------------- |
| `/mod.js`      | `/mod.ts`            | `/mod.tsx`           | `/mod.d.ts`          | `/mod.js`            | `./mod.jsx`          |
| `/mod.mjs`     | `/mod.mts`           | `/mod.d.mts`         | `/mod.mjs`           |                      |                      |
| `/mod.cjs`     | `/mod.cts`           | `/mod.d.cts`         | `/mod.cjs`           |                      |                      |

Note that this behavior is independent of the actual module specifier written in the import. This means that TypeScript can resolve to a `.ts` or `.d.ts` file even if the module specifier explicitly uses a `.js` file extension:

```ts
import x from "./mod.js";
// Runtime lookup: "./mod.js"
// TypeScript lookup #1: "./mod.ts"
// TypeScript lookup #2: "./mod.d.ts"
// TypeScript lookup #3: "./mod.js"
```

See _TypeScript imitates the host’s module resolution, but with types_ for an explanation of why TypeScript’s module resolution works this way.

#### Relative file path resolution

All of TypeScript’s `moduleResolution` algorithms support referencing a module by a relative path that includes a file extension (which will be substituted according to the rules above):

```ts
export {};

import {} from "./a.js"; // ✅ Works in every `moduleResolution`
```

#### Extensionless relative paths

In some cases, the runtime or bundler allows omitting a `.js` file extension from a relative path. TypeScript supports this behavior where the `moduleResolution` setting and the context indicate that the runtime or bundler supports it:

```ts
export {};

import {} from "./a";
```

If TypeScript determines that the runtime will perform a lookup for `./a.js` given the module specifier `"./a"`, then `./a.js` will undergo extension substitution, and resolve to the file `a.ts` in this example.

Extensionless relative paths are not supported in `import` paths in Node.js, and are not always supported in file paths specified in package.json files. TypeScript currently never supports omitting a `.mjs`/`.mts` or `.cjs`/`.cts` file extension, even though some runtimes and bundlers do.

#### Directory modules (index file resolution)

In some cases, a directory, rather than a file, can be referenced as a module. In the simplest and most common case, this involves the runtime or bundler looking for an `index.js` file in a directory. TypeScript supports this behavior where the `moduleResolution` setting and the context indicate that the runtime or bundler supports it:

```ts
export {};

import {} from "./dir";
```

If TypeScript determines that the runtime will perform a lookup for `./dir/index.js` given the module specifier `"./dir"`, then `./dir/index.js` will undergo extension substitution, and resolve to the file `dir/index.ts` in this example.

Directory modules may also contain a package.json file, where resolution of the `"main"` and `"types"` fields are supported, and take precedence over `index.js` lookups. The `"typesVersions"` field is also supported in directory modules.

Note that directory modules are not the same as `node_modules` packages and only support a subset of the features available to packages, and are not supported at all in some contexts.  Node.js considers them a legacy feature.

#### `paths`

##### Overview

TypeScript offers a way to override the compiler’s module resolution for bare specifiers with the `paths` compiler option. While the feature was originally designed to be used with the AMD module loader (a means of running modules in the browser before ESM existed or bundlers were widely used), it still has uses today when a runtime or bundler supports module resolution features that TypeScript does not model. For example, when running Node.js with `--experimental-network-imports`, you can manually specify a local type definition file for a specific `https://` import:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "paths": {
      "https://esm.sh/user@example.com": ["./node_modules/@types/lodash/index.d.ts"]
    }
  }
}
```

```ts
// Typed by ./node_modules/@types/lodash/index.d.ts due to `paths` entry
import { add } from "https://esm.sh/user@example.com";
```

It’s also common for apps built with bundlers to define convenience path aliases in their bundler configuration, and then inform TypeScript of those aliases with `paths`:

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "paths": {
      "@app/*": ["./src/*"]
    }
  }
}
```

##### `paths` does not affect emit

The `paths` option does _not_ change the import path in the code emitted by TypeScript. Consequently, it’s very easy to create path aliases that appear to work in TypeScript but will crash at runtime:

```json
{
  "compilerOptions": {
    "module": "nodenext",
    "paths": {
      "node-has-no-idea-what-this-is": ["./oops.ts"]
    }
  }
}
```

```ts
// TypeScript: ✅
// Node.js: 💥
import {} from "node-has-no-idea-what-this-is";
```

While it’s ok for bundled apps to set up `paths`, it’s very important that published libraries do _not_, since the emitted JavaScript will not work for consumers of the library without those users setting up the same aliases for both TypeScript and their bundler. Both libraries and apps can consider package.json `"imports"` as a standard replacement for convenience `paths` aliases.

##### `paths` should not point to monorepo packages or node_modules packages

While module specifiers that match `paths` aliases are bare specifiers, once the alias is resolved, module resolution proceeds on the resolved path as a relative path. Consequently, resolution features that happen for `node_modules` package lookups, including package.json `"exports"` field support, do not take effect when a `paths` alias is matched. This can lead to surprising behavior if `paths` is used to point to a `node_modules` package:

```ts
{
  "compilerOptions": {
    "paths": {
      "pkg": ["./node_modules/pkg/dist/index.d.ts"],
      "pkg/*": ["./node_modules/pkg/*"]
    }
  }
}
```

While this configuration may simulate some of the behavior of package resolution, it overrides any `main`, `types`, `exports`, and `typesVersions` the package’s `package.json` file defines, and imports from the package may fail at runtime.

The same caveat applies to packages referencing each other in a monorepo. Instead of using `paths` to make TypeScript artificially resolve `"@my-scope/lib"` to a sibling package, it’s best to use workspaces via npm, yarn, or pnpm to symlink your packages into `node_modules`, so both TypeScript and the runtime or bundler perform real `node_modules` package lookups. This is especially important if the monorepo packages will be published to npm—the packages will reference each other via `node_modules` package lookups once installed by users, and using workspaces allows you to test that behavior during local development.

##### Relationship to `baseUrl`

When `baseUrl` is provided, the values in each `paths` array are resolved relative to the `baseUrl`. Otherwise, they are resolved relative to the `tsconfig.json` file that defines them.

##### Wildcard substitutions

`paths` patterns can contain a single `*` wildcard, which matches any string. The `*` token can then be used in the file path values to substitute the matched string:

```json
{
  "compilerOptions": {
    "paths": {
      "@app/*": ["./src/*"]
    }
  }
}
```

When resolving an import of `"@app/components/Button"`, TypeScript will match on `@app/*`, binding `*` to `components/Button`, and then attempt to resolve the path `./src/components/Button` relative to the `tsconfig.json` path. The remainder of this lookup will follow the same rules as any other relative path lookup according to the `moduleResolution` setting.

When multiple patterns match a module specifier, the pattern with the longest matching prefix before any `*` token is used:

```json
{
  "compilerOptions": {
    "paths": {
      "*": ["./src/foo/one.ts"],
      "foo/*": ["./src/foo/two.ts"],
      "foo/bar": ["./src/foo/three.ts"]
    }
  }
}
```

When resolving an import of `"foo/bar"`, all three `paths` patterns match, but the last is used because `"foo/bar"` is longer than `"foo/"` and `""`.

##### Fallbacks

Multiple file paths can be provided for a path mapping. If resolution fails for one path, the next one in the array will be attempted until resolution succeeds or the end of the array is reached.

```json
{
  "compilerOptions": {
    "paths": {
      "*": ["./vendor/*", "./types/*"]
    }
  }
}
```

#### `baseUrl`

> `baseUrl` was designed for use with AMD module loaders. If you aren’t using an AMD module loader, you probably shouldn’t use `baseUrl`. Since TypeScript 4.1, `baseUrl` is no longer required to use `paths` and should not be used just to set the directory `paths` values are resolved from.

The `baseUrl` compiler option can be combined with any `moduleResolution` mode and specifies a directory that bare specifiers (module specifiers that don’t begin with `./`, `../`, or `/`) are resolved from. `baseUrl` has a higher precedence than `node_modules` package lookups in `moduleResolution` modes that support them.

When performing a `baseUrl` lookup, resolution proceeds with the same rules as other relative path resolutions. For example, in a `moduleResolution` mode that supports extensionless relative paths a module specifier `"some-file"` may resolve to `/src/some-file.ts` if `baseUrl` is set to `/src`.

Resolution of relative module specifiers are never affected by the `baseUrl` option.

#### `node_modules` package lookups

Node.js treats module specifiers that aren’t relative paths, absolute paths, or URLs as references to packages that it looks up in `node_modules` subdirectories. Bundlers conveniently adopted this behavior to allow their users to use the same dependency management system, and often even the same dependencies, as they would in Node.js. All of TypeScript’s `moduleResolution` options except `classic` support `node_modules` lookups. (`classic` supports lookups in `node_modules/@types` when other means of resolution fail, but never looks for packages in `node_modules` directly.) Every `node_modules` package lookup has the following structure (beginning after higher precedence bare specifier rules, like `paths`, `baseUrl`, self-name imports, and package.json `"imports"` lookups have been exhausted):

1. For each ancestor directory of the importing file, if a `node_modules` directory exists within it:
   1. If a directory with the same name as the package exists within `node_modules`:
      1. Attempt to resolve types from the package directory.
      2. If a result is found, return it and stop the search.
   2. If a directory with the same name as the package exists within `node_modules/@types`:
      1. Attempt to resolve types from the `@types` package directory.
      2. If a result is found, return it and stop the search.
2. Repeat the previous search through all `node_modules` directories, but this time, allow JavaScript files as a result, and do not search in `@types` directories.

All `moduleResolution` modes (except `classic`) follow this pattern, while the details of how they resolve from a package directory, once located, differ, and are explained in the following sections.

#### package.json `"exports"`

When `moduleResolution` is set to `node16`, `nodenext`, or `bundler`, and `resolvePackageJsonExports` is not disabled, TypeScript follows Node.js’s package.json `"exports"` spec when resolving from a package directory triggered by a bare specifier `node_modules` package lookup.

TypeScript’s implementation for resolving a module specifier through `"exports"` to a file path follows Node.js exactly. Once a file path is resolved, however, TypeScript will still try multiple file extensions in order to prioritize finding types.

When resolving through conditional `"exports"`, TypeScript always matches the `"types"` and `"default"` conditions if present. Additionally, TypeScript will match a versioned types condition in the form `"types@{selector}"` (where `{selector}` is a `"typesVersions"`-compatible version selector) according to the same version-matching rules implemented in `"typesVersions"`. Other non-configurable conditions are dependent on the `moduleResolution` mode and specified in the following sections. Additional conditions can be configured to match with the `customConditions` compiler option.

Note that the presence of `"exports"` prevents any subpaths not explicitly listed or matched by a pattern in `"exports"` from being resolved.

##### Example: subpaths, conditions, and extension substitution

Scenario: `"pkg/subpath"` is requested with conditions `["types", "node", "require"]` (determined by `moduleResolution` setting and the context that triggered the module resolution request) in a package directory with the following package.json:

```json
{
  "name": "pkg",
  "exports": {
    ".": {
      "import": "./index.mjs",
      "require": "./index.cjs"
    },
    "./subpath": {
      "import": "./subpath/index.mjs",
      "require": "./subpath/index.cjs"
    }
  }
}
```

Resolution process within the package directory:

1. Does `"exports"` exist? **Yes.**
2. Does `"exports"` have a `"./subpath"` entry? **Yes.**
3. The value at `exports["./subpath"]` is an object—it must be specifying conditions.
4. Does the first condition `"import"` match this request? **No.**
5. Does the second condition `"require"` match this request? **Yes.**
6. Does the path `"./subpath/index.cjs"` have a recognized TypeScript file extension? **No, so use extension substitution.**
7. Via extension substitution, try the following paths, returning the first one that exists, or `undefined` otherwise:
   1. `./subpath/index.cts`
   2. `./subpath/index.d.cts`
   3. `./subpath/index.cjs`
