---
title: "GPUCommandEncoder: insertDebugMarker() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gpucommandencoder/insertdebugmarker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# GPUCommandEncoder: insertDebugMarker() method

The **`insertDebugMarker()`** method of the
`GPUCommandEncoder` interface marks a specific point in a series of encoded commands with a label.

This could be used for telemetry, or may be utilized in `GPUError` messages, browser dev tools, or other services in the future to help with debugging.

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

commandEncoder.insertDebugMarker("my_marker");

// …
```

## See also

- The WebGPU API
