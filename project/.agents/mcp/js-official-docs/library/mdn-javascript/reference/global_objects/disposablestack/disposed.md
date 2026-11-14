---
title: "DisposableStack.prototype.disposed"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/disposablestack/disposed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DisposableStack.prototype.disposed

The **`disposed`** accessor property of `DisposableStack` instances returns a boolean indicating whether or not this `DisposableStack` has been disposed or moved by doing any of the following:

- Calling its `dispose()` method
- Calling its `move()` method
- Declaring it with `using` and letting the variable go out of scope, which automatically calls the `[Symbol.dispose]()` method.

## Examples

### Checking if a stack is disposed

```js
const disposer = new DisposableStack();
console.log(disposer.disposed); // false
disposer.dispose();
console.log(disposer.disposed); // true
```

## See also

- Polyfill of `DisposableStack.prototype.disposed` in `core-js`
- JavaScript resource management
