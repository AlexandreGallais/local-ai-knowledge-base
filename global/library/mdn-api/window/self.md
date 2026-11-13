---
title: "Window: self property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/self/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: self property

The **`Window.self`** read-only property returns the window itself, as a WindowProxy. It can be used with dot notation on a `window` object (that is, `window.self`) or standalone (`self`). The advantage of the standalone notation is that a similar notation exists for non-window contexts, such as in `Web Workers`. By using `self`, you can refer to the global scope in a way that will work not only in a window context (`self` will resolve to `window.self`) but also in a worker context (`self` will then resolve to `WorkerGlobalScope.self`).

## Value

A WindowProxy object.

## Examples

Uses of `window.self` like the following could just as well be replaced by `window`.

```js
if (window.parent.frames[0] !== window.self) {
  // this window is not the first frame in the list
}
```

Furthermore, when executing in the active document of a browsing context, `window` is a reference to the current global object and thus all of the following are equivalent:

```js
const w1 = window;
const w2 = self;
const w3 = window.window;
const w4 = window.self;
// w1, w2, w3, w4 all strictly equal, but only w2 will function in workers
```

## See also

- Polyfill of `self` in `core-js`
- Its `Worker` equivalent, `WorkerGlobalScope.self`.
