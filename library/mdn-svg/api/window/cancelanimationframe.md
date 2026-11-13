---
title: "Window: cancelAnimationFrame() method"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/window/cancelanimationframe/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# Window: cancelAnimationFrame() method

The **`window.cancelAnimationFrame()`** method cancels an
animation frame request previously scheduled through a call to
`window.requestAnimationFrame()`.

## Syntax

```js
cancelAnimationFrame(requestID)
```

### Parameters

- `requestID`
    The ID value returned by the call to `window.requestAnimationFrame()`
    that requested the callback.

### Return value

None (`undefined`).

## Examples

```js
const start = document.timeline.currentTime;

let myReq;

function step(timestamp) {
  const progress = timestamp - start;
  d.style.left = `${Math.min(progress / 10, 200)}px`;
  if (progress < 2000) {
    // it's important to update the requestId each time you're calling requestAnimationFrame
    myReq = requestAnimationFrame(step);
  }
}
myReq = requestAnimationFrame(step);
// the cancellation uses the last requestId
cancelAnimationFrame(myReq);
```

## See also

- `Window.requestAnimationFrame()`
- `DedicatedWorkerGlobalScope.cancelAnimationFrame()`
