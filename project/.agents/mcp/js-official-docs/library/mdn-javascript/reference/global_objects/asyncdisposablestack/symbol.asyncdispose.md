---
title: "AsyncDisposableStack.prototype[Symbol.asyncDispose]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/asyncdisposablestack/symbol.asyncdispose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AsyncDisposableStack.prototype[Symbol.asyncDispose]()

The **`Symbol.asyncDispose`** method of `AsyncDisposableStack` instances implements the _async disposable protocol_ and allows it to be disposed when used with `await using`. It is an alias for the `disposeAsync()` method.

## Syntax

```js
asyncDisposableStack[Symbol.asyncDispose]()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Declaring a stack with `await using`

The `Symbol.asyncDispose` method is intended to be automatically called in an `await using` declaration.

```js
async function doSomething() {
  await using disposer = new AsyncDisposableStack();
  const resource = disposer.use(new Resource());
  resource.doSomething();
  // disposer is disposed here immediately before the function exits
  // which causes the resource to be disposed
}
```

## See also

- Polyfill of `AsyncDisposableStack.prototype[Symbol.asyncDispose]` in `core-js`
- JavaScript resource management
- `AsyncDisposableStack`
- `AsyncDisposableStack.prototype.disposeAsync()`
