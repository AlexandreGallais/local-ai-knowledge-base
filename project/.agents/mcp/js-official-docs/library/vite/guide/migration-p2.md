---
title: "Migration from v7 (part 2 of 2)"
tool: "vite"
version: "8.3"
source: "https://github.com/vitejs/vite/blob/b39e6e63dcbfc3cf4be871acf3554efbd6d0e268/docs/guide/migration.md"
commit: "b39e6e63dcbfc3cf4be871acf3554efbd6d0e268"
license: "MIT"
---

# Migration from v7 (part 2 of 2)

## Advanced

These breaking changes are expected to only affect a minority of use cases:

- Extglobs are not supported yet (rolldown-vite#365)
- TypeScript legacy namespace is only supported partially. See Oxc Transformer's related documentation for more details.
- `define` does not share reference for objects: When you pass an object as a value to `define`, each variable will have a separate copy of the object. See Oxc Transformer's related documentation for more details.
- `bundle` object changes (`bundle` is an object passed in `generateBundle` / `writeBundle` hooks, returned by `build` function):
  - Assigning to `bundle[foo]` is not supported. This is discouraged by Rollup as well. Please use `this.emitFile()` instead.
  - the reference is not shared across the hooks (rolldown-vite#410)
  - `structuredClone(bundle)` errors with `DataCloneError: #<Object> could not be cloned`. This is not supported anymore. Please clone it with `structuredClone({ ...bundle })`. (rolldown-vite#128)
- All parallel hooks in Rollup work as sequential hooks. See Rolldown's documentation for more details.
- `"use strict";` is not injected sometimes. See Rolldown's documentation for more details.
- Transforming to ES5 and below with plugin-legacy is not supported (rolldown-vite#452)
- Passing the same browser with multiple versions of it to `build.target` option now errors: esbuild selects the latest version of it, which was probably not what you intended.
- Missing support by Rolldown: The following features are not supported by Rolldown and are no longer supported by Vite.
  - `build.rollupOptions.output.format: 'system'` (rolldown#2387)
  - `build.rollupOptions.output.format: 'amd'` (rolldown#2528)
  - `shouldTransformCachedModule` hook (rolldown#4389)
  - `resolveImportMeta` hook (rolldown#1010)
  - `renderDynamicImport` hook (rolldown#4532)
  - `resolveFileUrl` hook
- `parseAst` / `parseAstAsync` functions are now deprecated in favor of `parseSync` / `parse` functions which have more features.
- comments are removed before the `renderChunk` hook instead of after the `renderChunk` hook
- comments other than the ones listed here are moved, while Rollup only removes comments if the adjacent code is removed

## Migration from v6

Check the Migration from v6 Guide in the Vite v7 docs first to see the needed changes to port your app to Vite 7, and then proceed with the changes on this page.
