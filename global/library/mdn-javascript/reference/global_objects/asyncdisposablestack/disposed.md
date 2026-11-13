---
title: "AsyncDisposableStack.prototype.disposed"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncdisposablestack/disposed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncDisposableStack.prototype.disposed

The **`disposed`** accessor property of `AsyncDisposableStack` instances returns a boolean indicating whether or not this `AsyncDisposableStack` has been disposed or moved by doing any of the following:

- Calling its `disposeAsync()` method
- Calling its `move()` method
- Declaring it with `await using` and letting the variable go out of scope, which automatically calls the `[Symbol.asyncDispose]()` method.

## Examples

### Checking if a stack is disposed

```js
const disposer = new AsyncDisposableStack();
console.log(disposer.disposed); // false
await disposer.disposeAsync();
console.log(disposer.disposed); // true
```

## See also

- Polyfill of `AsyncDisposableStack.prototype.disposed` in `core-js`
- JavaScript resource management
