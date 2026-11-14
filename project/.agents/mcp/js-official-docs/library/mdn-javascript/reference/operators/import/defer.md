---
title: "import.defer()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/import/defer/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# import.defer()

The **`import.defer()`** syntax behaves like regular `import()` syntax, except that it results in a deferred module namespace object. The module and its dependencies are fetched and linked up front, but their synchronous evaluation is deferred until the namespace's properties are accessed.

For more information about deferred evaluation, including its interaction with top-level `await`, see the `import defer` declaration form.

## Syntax

```js
import.defer(moduleName)
import.defer(moduleName, options)
```

`import.defer()` is special syntax (a "meta property"), not a method on an `import` object.

### Parameters

See `import()`.

### Return value

Returns a promise that fulfills with a deferred module namespace object after the module graph is loaded and linked, and any eagerly evaluated top-level `await` dependencies have finished evaluating.

Like regular `import()`, the promise rejects if the module or its dependencies cannot be loaded, parsed, or linked. It also rejects if an eagerly evaluated module throws. Errors from evaluation that remains deferred are instead thrown synchronously by the namespace operation that triggers evaluation.

## Examples

### Using import.defer()

> **Note:**
> It's guaranteed that awaiting the resulting promise never accidentally calls an exported `then` method—a gotcha associated with the regular module namespace object—because the deferred module namespace object never exposes a property called `then`.

```js
const ts = await import.defer("typescript");

function compilePath(path) {
  // Evaluation of the typescript module subgraph starts here
  const program = ts.createProgram([path], {});
}
```

Never immediately destructure the returned namespace, because it triggers evaluation:

```js
const { createProgram } = await import.defer("typescript");
// The typescript module has now been evaluated.
```

## See also

- JavaScript modules guide
- `import()`
- `import defer`
