---
title: "Profiler: Profiler() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/profiler/profiler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Profiler: Profiler() constructor

The **`Profiler()`** constructor creates a new `Profiler` object.

Once created, the new profiler will start collecting samples.

## Syntax

```js
new Profiler(options)
```

### Parameters

- `options`
    Options for this profiler. This is an object containing the following properties:
    - `maxBufferSize`
        A number indicating the maximum number of samples to take. Once this number is reached, the browser will fire the `samplebufferfull` event at the profiler, and no more samples will be recorded.
    - `sampleInterval`
        The time interval between samples, in milliseconds.

### Exceptions

- `RangeError`
    Thrown if the `sampleInterval` option is less than zero.
- `NotAllowedError` `DOMException`
    Thrown if the document was not served with a document policy that included the `"js-profiling"` configuration point.

## Examples

This example creates a profiler which will take up to 1000 samples, sampling every 10 milliseconds.

```js
const profiler = new Profiler({ sampleInterval: 10, maxBufferSize: 1000 });
```
