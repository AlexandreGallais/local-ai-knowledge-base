---
title: "GPUQuerySet: destroy() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpuqueryset/destroy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUQuerySet: destroy() method

The **`destroy()`** method of the
`GPUQuerySet` interface destroys the `GPUQuerySet`.

## Syntax

```js
destroy()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
const querySet = device.createQuerySet({
  type: "occlusion",
  count: 32,
});

// Some time later

querySet.destroy();
```

## See also

- The WebGPU API
