---
title: "import.source()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/import/source/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# import.source()

The **`import.source()`** syntax behaves like regular `import()` syntax, except that it results in an object that represents the module's compiled source code. The module is fetched and compiled, but its dependencies are not loaded and it is not linked or evaluated. It can be imperatively evaluated later, such as by using dynamic import or `WebAssembly.instantiate()`.

To use `import.source()`, the target module must be of a kind that supports source phase imports. Currently, only WebAssembly modules support source phase imports, and result in `WebAssembly.Module` objects. JavaScript module source objects will be added by the ECMAScript Module Phase Imports proposal.

For more information about the semantics of source phase imports, see the `import source` declaration form.

## Syntax

```js
import.source(moduleName)
import.source(moduleName, options)
```

`import.source()` is special syntax (a "meta property"), not a method on an `import` object.

### Parameters

See `import()`.

### Return value

Returns a promise that fulfills with an `AbstractModuleSource` object representing the module's compiled source after the module is loaded and compiled successfully.

Like regular `import()`, the promise rejects if the module cannot be loaded or parsed. It also rejects with a `SyntaxError` if the module type does not support source phase imports. The import does not load dependencies, link, or evaluate the module, so errors from those later steps are not reported.

## Examples

### Using import.source()

```js
const myModuleSource = await import.source("./my-module.wasm");

const instance = await WebAssembly.instantiate(myModuleSource, {
  env: { log: console.log },
});
const { exports } = instance;
```

## See also

- JavaScript modules guide
- `import()`
- `import source`
- `AbstractModuleSource`
