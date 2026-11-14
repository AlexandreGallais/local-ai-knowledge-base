---
title: "Performance: memory property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performance/memory/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Performance: memory property

The non-standard and legacy **`memory`** read-only property returns the size of the JavaScript heap which can be helpful to measure and reduce the memory footprint of websites.

Note that the information this API provides is unreliable as it might overestimate actual memory usage if web pages share the same heap, or might underestimate actual memory usage if web pages use workers and/or cross-site iframes that are allocated in separate heaps. It is not standardized what "heap" means exactly. The API is only available in Chromium-based browsers.

A new API aiming to replace `performance.memory` is `Performance.measureUserAgentSpecificMemory()`. It tries to estimate the memory used by a web page.

## Value

Returns an object with the following properties:

- `jsHeapSizeLimit`
    The maximum size of the heap, in bytes, that is available to the context.
- `totalJSHeapSize`
    The total allocated heap size, in bytes.
- `usedJSHeapSize`
    The currently active segment of JS heap, in bytes.

## Examples

### Getting JavaScript heap sizes

Calling `performance.memory` returns an object like this:

```json
{
  "totalJSHeapSize": 39973671,
  "usedJSHeapSize": 39127515,
  "jsHeapSizeLimit": 4294705152
}
```

## Specifications

None.

## See also

- `Performance.measureUserAgentSpecificMemory()`
