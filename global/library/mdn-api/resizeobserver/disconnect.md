---
title: "ResizeObserver: disconnect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/resizeobserver/disconnect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ResizeObserver: disconnect() method

The **`disconnect()`** method of the
`ResizeObserver` interface unobserves all observed `Element`
or `SVGElement` targets.

## Syntax

```js
disconnect()
```

### Parameters

None.

### Return value

None (`undefined`).

### Exceptions

None.

## Examples

```js
btn.addEventListener("click", () => {
  resizeObserver.disconnect();
});
```
