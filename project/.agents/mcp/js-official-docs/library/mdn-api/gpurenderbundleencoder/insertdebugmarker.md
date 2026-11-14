---
title: "GPURenderBundleEncoder: insertDebugMarker() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpurenderbundleencoder/insertdebugmarker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPURenderBundleEncoder: insertDebugMarker() method

The **`insertDebugMarker()`** method of the
`GPURenderBundleEncoder` interface marks a specific point in a series of encoded render bundle pass <example-value> with a label.

This could be used for telemetry, or may be utilized in `GPUError` messages, browser dev tools, or other services in the future to help with debugging.

> **Note:**
> This method is functionally identical to its equivalent on `GPURenderPassEncoder` — `InsertDebugMarker()`.

## Syntax

```js
insertDebugMarker(markerLabel)
```

### Parameters

- `markerLabel`
    A string representing the label to insert.

### Return value

None (`undefined`).

## Examples

```js
// …

bundleEncoder.insertDebugMarker("my_marker");

// …
```

## See also

- The WebGPU API
