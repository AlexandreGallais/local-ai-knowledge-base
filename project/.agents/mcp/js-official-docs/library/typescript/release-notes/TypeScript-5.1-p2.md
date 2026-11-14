---
title: "TypeScript 5.1 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 5.1.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 5.1 (part 2 of 2)

## Breaking Changes

### ES2020 and Node.js 14.17 as Minimum Runtime Requirements

TypeScript 5.1 now ships JavaScript functionality that was introduced in ECMAScript 2020.
As a result, at minimum TypeScript must be run in a reasonably modern runtime.
For most users, this means TypeScript now only runs on Node.js 14.17 and later.

If you try running TypeScript 5.1 under an older version of Node.js such as Node 10 or 12, you may see an error like the following from running either `tsc.js` or `tsserver.js`:

```
node_modules/typescript/lib/tsserver.js:2406
  for (let i = startIndex ?? 0; i < array.length; i++) {
                           ^
 
SyntaxError: Unexpected token '<example-value>'
    at wrapSafe (internal/modules/cjs/loader.js:915:16)
    at Module._compile (internal/modules/cjs/loader.js:963:27)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:60:12)
    at internal/main/run_main_module.js:17:47
```

Additionally, if you try installing TypeScript you'll get something like the following error messages from npm:

```
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'user@example.com',
npm WARN EBADENGINE   required: { node: '>=14.17' },
npm WARN EBADENGINE   current: { node: 'v12.22.12', npm: '8.19.2' }
npm WARN EBADENGINE }
```

from Yarn:

```
error user@example.com: The engine "node" is incompatible with this module. Expected version ">=14.17". Got "12.22.12"
error Found incompatible module.
```

See more information around this change here.

### Explicit `typeRoots` Disables Upward Walks for `node_modules/@types`

Previously, when the `typeRoots` option was specified in a `tsconfig.json` but resolution to any `typeRoots` directories had failed, TypeScript would still continue walking up parent directories, trying to resolve packages within each parent's `node_modules/@types` folder.

This behavior could prompt excessive look-ups and has been disabled in TypeScript 5.1.
As a result, you may begin to see errors like the following based on entries in your `tsconfig.json`'s `types` option or `/// <reference >` directives

```
error TS2688: Cannot find type definition file for 'node'.
error TS2688: Cannot find type definition file for 'mocha'.
error TS2688: Cannot find type definition file for 'jasmine'.
error TS2688: Cannot find type definition file for 'chai-http'.
error TS2688: Cannot find type definition file for 'webpack-env"'.
```

The solution is typically to add specific entries for `node_modules/@types` to your `typeRoots`:

```jsonc
{
    "compilerOptions": {
        "types": [
            "node",
            "mocha"
        ],
        "typeRoots": [
            // Keep whatever you had around before.
            "./some-custom-types/",
            // You might need your local 'node_modules/@types'.
            "./node_modules/@types",
            // You might also need to specify a shared 'node_modules/@types'
            // if you're using a "monorepo" layout.
            "../../node_modules/@types",
        ]
    }
}
```

More information is available on the original change on our issue tracker.
