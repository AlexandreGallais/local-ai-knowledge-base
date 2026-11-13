---
title: "Modules - Theory (part 5 of 5)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/modules-reference/Theory.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Modules - Theory (part 5 of 5)

### Module resolution for libraries

When compiling an app, you choose the `moduleResolution` option for a TypeScript project based on who the module resolution host is. When compiling a library, you don’t know where the output code will run, but you’d like it to run in as many places as possible. Using `"module": "node18"` (along with the implied `"moduleResolution": "node16"`) is the best bet for maximizing the compatibility of the output JavaScript’s module specifiers, since it will force you to comply with Node.js’s stricter rules for `import` module resolution. Let’s look at what would happen if a library were to compile with `"moduleResolution": "bundler"` (or worse, `"node10"`):

```ts
export * from "./utils";
```

Assuming `./utils.ts` (or `./utils/index.ts`) exists, a bundler would be fine with this code, so `"moduleResolution": "bundler"` doesn’t complain. Compiled with `"module": "esnext"`, the output JavaScript for this export statement will look exactly the same as the input. If that JavaScript were published to npm, it would be usable by projects that use a bundler, but it would cause an error when run in Node.js:

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module '.../node_modules/dependency/utils' imported from .../node_modules/dependency/index.js
Did you mean to import ./utils.js?
```

On the other hand, if we had written:

```ts
export * from "./utils.js";
```

This would produce output that works both in Node.js _and_ in bundlers.

In short, `"moduleResolution": "bundler"` is infectious, allowing code that only works in bundlers to be produced. Likewise, `"moduleResolution": "nodenext"` is only checking that the output works in Node.js, but in most cases, module code that works in Node.js will work in other runtimes and in bundlers.

Of course, this guidance can only apply in cases where the library ships outputs from `tsc`. If the library is being bundled _before_ shipping, `"moduleResolution": "bundler"` may be acceptable. Any build tool that changes the module format or module specifiers to produce the final build of the library bears the responsibility of ensuring the safety and compatibility of the product’s module code, and `tsc` can no longer contribute to that task, since it can’t know what module code will exist at runtime.
