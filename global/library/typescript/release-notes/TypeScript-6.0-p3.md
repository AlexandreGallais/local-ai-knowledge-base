---
title: "TypeScript 6.0 (part 3 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 6.0.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 6.0 (part 3 of 4)

## Breaking Changes and Deprecations in TypeScript 6.0

TypeScript 6.0 arrives as a significant transition release, designed to prepare developers for TypeScript 7.0, the upcoming native port of the TypeScript compiler.
While TypeScript 6.0 maintains full compatibility with your existing TypeScript knowledge and continues to be API compatible with TypeScript 5.9, this release introduces a number of breaking changes and deprecations that reflect the evolving JavaScript ecosystem and set the stage for TypeScript 7.0.

In the two years since TypeScript 5.0, we've seen ongoing shifts in how developers write and ship JavaScript:

- Virtually every runtime environment is now "evergreen". True legacy environments (ES5) are vanishingly rare.
- Bundlers and ESM have become the most common module targets for new projects, though CommonJS remains a major target. AMD and other in-browser userland module systems are much rarer than they were in 2012.
- Almost all packages can be consumed through some module system. UMD packages still exist, but virtually no new code is available *only* as a global variable.
- `tsconfig.json` is nearly universal as a configuration mechanism.
- Appetite for "stricter" typing continues to grow.
- TypeScript build performance is top of mind. Despite the gains of TypeScript 7, performance must always remain a key goal, and options which can't be supported in a performant way need to be more strongly justified.

So TypeScript 6.0 and 7.0 are designed with these realities in mind.
For TypeScript 6.0, these deprecations can be ignored by setting `"ignoreDeprecations": "6.0"` in your tsconfig; however, note that TypeScript 7.0 *will not* support any of these deprecated options.

Some necessary adjustments can be automatically performed with a codemod or tool.
For example, the experimental `ts5to6` tool can automatically adjust `baseUrl` and `rootDir` across your codebase.

### Up-Front Adjustments

We'll cover specific adjustments below, but we have to note that some deprecations and behavior changes do not necessarily have an error message that directly points to the underlying issue.
So we'll note up-front that **many projects will need to do at least one of the following**:

* Set the `"types"` array in tsconfig, typically to `"types": ["node"]`.

  `"types": ["*"]` will restore the 5.9 behavior, but we recommend using an explicit array to improve build performance and predictability.

  You'll typically know this is the issue if you see a *lot* of type errors related to missing identifiers or unresolved built-in modules.
* Set `"rootDir": "./src"` if you were previously relying on this being inferred

  You'll often know this is the issue if you see files being written to `./dist/src/index.js` instead of `./dist/index.js`.

### Simple Default Changes

Several compiler options now have updated default values that better reflect modern development practices.

- **`strict` is now `true` by default**:
  The appetite for stricter typing continues to grow, and we've found that most new projects want `strict` mode enabled.
  If you were already using `"strict": true`, nothing changes for you.
  If you were relying on the previous default of `false`, you'll need to explicitly set `"strict": false` in your `tsconfig.json`.

- **`module` defaults to `esnext`**:
  Similarly, the new default `module` is `esnext`, acknowledging that ESM is now the dominant module format.

- **`target` defaults to current-year ES version**:
  The new default `target` is the most recent supported ECMAScript spec version (effectively a floating target).
  Right now, that target is `es2025`.
  This reflects the reality that most developers are shipping to evergreen runtimes and don't need to compile down to older ECMAScript versions.

- **`noUncheckedSideEffectImports` is now `true` by default**:
  This helps catch issues with typos in side-effect-only imports.

- **`libReplacement` is now `false` by default**:
  This flag previously incurred a large number of failed module resolutions for every run, which in turn increased the number of locations we needed to watch under `--watch` and editor scenarios.
  In a new project, `libReplacement` never does anything until other explicit configuration takes place, so it makes sense to turn this off by default for the sake of better performance by default.

If these new defaults break your project, you can specify the previous values explicitly in your `tsconfig.json`.

### `rootDir` now defaults to `.`

`rootDir` controls the directory structure of your output files relative to the output directory.
Previously, if you did not specify a `rootDir`, it was inferred based on the common directory of all non-declaration input files.
But this often meant that it was impossible to know if a file belonged to a project without trying to load and parse that project.
It also meant that TypeScript had to spend more time inferring that common source directory by analyzing every file path in the program.

In TypeScript 6.0, the default `rootDir` will always be the directory containing the `tsconfig.json` file.
`rootDir` will only be inferred when using `tsc` from the command line without a `tsconfig.json` file.

If you have source files any level deeper than your `tsconfig.json` directory and were relying on TypeScript to infer a common root directory for source files, you'll need to explicitly set `rootDir`:

```diff
  {
      "compilerOptions": {
          // ...
+         "rootDir": "./src"
      },
      "include": ["./src"]
  }
```

Likewise, if your `tsconfig.json` referenced files outside of the containing `tsconfig.json`, you would need to adjust your `rootDir` to include those files.

```diff
  {
      "compilerOptions": {
          // ...
+         "rootDir": "../src"
      },
      "include": ["../src/**/*.tests.ts"]
  }
```

See more at the discussion here and the implementation here.

### `types` now defaults to `[]`

In a `tsconfig.json`, the `types` field of `compilerOptions` specifies a list of package names to be included in the global scope during compilation.
Typically, packages in `node_modules` are automatically included via imports in your source code;
but for convenience, TypeScript would also include all packages in `node_modules/@types` by default, so that you can get global declarations like `process` or the `"fs"` module from `@types/node`, or `describe` and `it` from `@types/jest`, without needing to import them directly.

In a sense, the `types` value previously defaulted to "enumerate everything in `node_modules/@types`".
This can be *very* expensive, as a normal repository setup these days might transitively pull in hundreds of `@types` packages, especially in multi-project workspaces with flattened `node_modules`.
Modern projects almost always need only `@types/node`, `@types/jest`, or a handful of other common global-affecting packages.

In TypeScript 6.0, the default `types` value will be `[]` (an empty array).
This change prevents projects from unintentionally pulling in hundreds or even thousands of unneeded declaration files at build time.
Many projects we've looked at have improved their build time anywhere from 20-50% just by setting `types` appropriately.

**This will affect many projects.** You will likely need to add `"types": ["node"]` or a few others:

```diff
  {
      "compilerOptions": {
          // Explicitly list the @types packages you need
+         "types": ["node", "jest"]
      }
  }
```

You can also specify a `*` entry to re-enable the old enumeration behavior:

```diff
  {
      "compilerOptions": {
          // Load ALL the types - the default from TypeScript 5.9 and before.
+         "types": ["*"]
      }
  }
```

If you end up with new error messages like the following:

```
Cannot find module '...' or its corresponding type declarations.
Cannot find name 'fs'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
Cannot find name 'path'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
Cannot find name 'process'. Do you need to install type definitions for node? Try `npm i --save-dev @types/node` and then add 'node' to the types field in your tsconfig.
Cannot find name 'Bun'. Do you need to install type definitions for Bun? Try `npm i --save-dev @types/bun` and then add 'bun' to the types field in your tsconfig.
Cannot find name 'describe'. Do you need to install type definitions for a test runner? Try `npm i --save-dev @types/jest` or `npm i --save-dev @types/mocha` and then add 'jest' or 'mocha' to the types field in your tsconfig.
```

it's likely that you need to add some entries to your `types` field.

See more at the proposal here along with the implementing pull request here.

### Deprecated: `target: es5`

The ECMAScript 5 target was important for a long time to support legacy browsers; but its successor, ECMAScript 2015 (ES6), was released over a decade ago, and all modern browsers have supported it for many years.
With Internet Explorer's retirement, and the universality of evergreen browsers, there are very few use cases for ES5 output today.

TypeScript's lowest target will now be ES2015, and the `target: es5` option is deprecated. If you were using `target: es5`, you'll need to migrate to a newer target or use an external compiler.
If you still need ES5 output, we recommend using an external compiler to either directly compile your TypeScript source, or to post-process TypeScript's outputs.

See more about this deprecation here along with its implementing pull request.

### Deprecated: `--downlevelIteration`

`--downlevelIteration` only has effects on ES5 emit, and since `--target es5` has been deprecated, `--downlevelIteration` no longer serves a purpose.

Subtly, using `--downlevelIteration false` with `--target es2015` did not error in TypeScript 5.9 and earlier, even though it had no effect.
In TypeScript 6.0, setting `--downlevelIteration` at all will lead to a deprecation error.

See the implementation here.

### Deprecated: `--moduleResolution node` (a.k.a. `--moduleResolution node10`)

`--moduleResolution node` encoded a specific version of Node.js's module resolution algorithm that most-accurately reflected the behavior of Node.js 10.
Unfortunately, this target (and its name) ignores many updates to Node.js's resolution algorithm that have occurred since then, and it is no longer a good representation of the behavior of modern Node.js versions.

In TypeScript 6.0, `--moduleResolution node` (specifically, `--moduleResolution node10`) is deprecated.
Users who were using `--moduleResolution node` should usually migrate to `--moduleResolution nodenext` if they plan on targeting Node.js directly, or `--moduleResolution bundler` if they plan on using a bundler or Bun.

See more at this issue and its corresponding pull request.

### Deprecated: `amd`, `umd`, and `systemjs` values of `module`

The following flag values are no longer supported

- `--module amd`
- `--module umd`
- `--module systemjs`
- `--module none`

AMD, UMD, and SystemJS were important during the early days of JavaScript modules when browsers lacked native module support.
The semantics of "none" were never well-defined and often led to confusion.
Today, ESM is universally supported in browsers and Node.js, and both import maps and bundlers have become favored ways for filling in the gaps.
If you're still targeting these module systems, consider migrating to an appropriate ECMAScript module-emitting target, adopt a bundler or different compiler, or stay on TypeScript 5.x until you can migrate.

This also implies dropped support for the `amd-module` directive, which will no longer have any effect.

See more at the proposal issue along with the implementing pull request.

### Deprecated: `--baseUrl`

The `baseUrl` option is most-commonly used in conjunction with `paths`, and is typically used as a prefix for every value in `paths`.
Unfortunately, `baseUrl` is also considered a look-up root for module resolution.

For example, given the following `tsconfig.json`

```json5
{
  "compilerOptions": {
    // ...
    "baseUrl": "./src",
    "paths": {
      "@app/*": ["app/*"],
      "@lib/*": ["lib/*"]
    }
  }
}
```

and an import like

```ts
import * as someModule from "someModule.js";
```

TypeScript will probably resolve this to `src/someModule.js`, even if the developer only intended to add mappings for modules starting with `@app/` and `@lib/`.

In the best case, this also often leads to "worse-looking" paths that bundlers would ignore;
but it often meant that that many import paths that would never have worked at runtime are considered "just fine" by TypeScript.

`path` mappings have not required specifying `baseUrl` for a long time, and in practice, most projects that use `baseUrl` only use it as a prefix for their `paths` entries.
In TypeScript 6.0, `baseUrl` is deprecated and will no longer be considered a look-up root for module resolution.

Developers who used `baseUrl` as a prefix for path-mapping entries can simply remove `baseUrl` and add the prefix to their `paths` entries:

```diff
  {
    "compilerOptions": {
      // ...
-     "baseUrl": "./src",
      "paths": {
-       "@app/*": ["app/*"],
-       "@lib/*": ["lib/*"]
+       "@app/*": ["./src/app/*"],
+       "@lib/*": ["./src/lib/*"]
      }
    }
  }
```

Developers who actually *did* use `baseUrl` as a look-up root can also add an explicit path mapping to preserve the old behavior:

```json5
{
  "compilerOptions": {
    // ...
    "paths": {
      // A new catch-all that replaces the baseUrl:
      "*": ["./src/*"],

      // Every other path now has an explicit common prefix:
      "@app/*": ["./src/app/*"],
      "@lib/*": ["./src/lib/*"],
    }
  }
}
```

However, this is extremely rare.
We recommend most developers simply remove `baseUrl` and add the appropriate prefixes to their `paths` entries.

See more at this issue and the corresponding pull request.

### Deprecated: `--moduleResolution classic`

The `moduleResolution: classic` setting has been removed.
The `classic` resolution strategy was TypeScript's original module resolution algorithm, and predates Node.js's resolution algorithm becoming a de facto standard.
Today, all practical use cases are served by `nodenext` or `bundler`.
If you were using `classic`, migrate to one of these modern resolution strategies.

See more at this issue and the implementing pull request.
