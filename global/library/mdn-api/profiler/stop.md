---
title: "Profiler: stop() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/profiler/stop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Profiler: stop() method

The **`stop()`** method of the `Profiler` interface stops the profiler and returns a `Promise` which resolves to the profile itself.

## Syntax

```js
stop()
```

### Parameters

None.

### Return value

A `Promise` that resolves to an object containing the profile data. The format and interpretation of this object is described in Profile anatomy and format.

## Examples

### Recording a profile

The following code profiles the `doWork()` operation, and logs the result.

```js
const profiler = new Profiler({ sampleInterval: 10, maxBufferSize: 10000 });

doWork();

const profile = await profiler.stop();
console.log(JSON.stringify(profile));
```
