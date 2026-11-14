---
title: "DisposableStack.prototype[Symbol.dispose]()"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/global_objects/disposablestack/symbol.dispose/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DisposableStack.prototype[Symbol.dispose]()

The **`Symbol.dispose`** method of `DisposableStack` instances implements the _disposable protocol_ and allows it to be disposed when used with `using` or `await using`. It is an alias for the `dispose()` method.

## Syntax

```js
disposableStack[Symbol.dispose]()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Declaring a stack with `using`

The `Symbol.dispose` method is intended to be automatically called in a `using` declaration.

```js
{
  using disposer = new DisposableStack();
  const resource = disposer.use(new Resource());
  resource.doSomething();
  // stack is disposed here immediately before the function exits
  // which causes the resource to be disposed
}
```

## See also

- Polyfill of `DisposableStack.prototype[Symbol.dispose]` in `core-js`
- JavaScript resource management
- `DisposableStack`
- `DisposableStack.prototype.dispose()`
