---
title: "Profiler"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/profiler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Profiler

The **`Profiler`** interface of the JS Self-Profiling API enables you to create a profile of some part of your web application's execution.

## Constructor

- `Profiler()` (experimental)
    Creates a new `Profiler` object, and starts collecting samples.

## Instance methods

- `Profiler.stop()` (experimental)
    Stops the profiler, returning a `Promise` that resolves to the profile.

## Events

- `samplebufferfull`
    Fired when the profile has recorded enough samples to fill its internal buffer.

## Examples

### Recording a profile

The following code profiles the `doWork()` operation, and logs the result.

```js
const profiler = new Profiler({ sampleInterval: 10, maxBufferSize: 10000 });

doWork();

const profile = await profiler.stop();
console.log(JSON.stringify(profile));
```

### Profiling page load

The following code profiles the time between the script first running and the window's `load` event firing.

```js
const profiler = new Profiler({ sampleInterval: 10, maxBufferSize: 10000 });

window.addEventListener("load", async () => {
  const profile = await profiler.stop();
  console.log(JSON.stringify(profile));
});
```
