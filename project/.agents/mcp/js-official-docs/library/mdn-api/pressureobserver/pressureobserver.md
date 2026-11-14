---
title: "PressureObserver: PressureObserver() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressureobserver/pressureobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureObserver: PressureObserver() constructor

The **`PressureObserver()`** constructor creates a new `PressureObserver` object to watch for changes to pressure changes of system resources such as the CPU.

## Syntax

```js
new PressureObserver(callback)
```

### Parameters

- `callback`
    A callback that will be invoked when pressure records are observed. When the callback is invoked, the following parameters are available:
    - `changes`
        An array containing all `PressureRecord` objects recorded since the last time the callback was called, or the last time the observer's `takeRecords()` method was called.
    - `observer`
        The `observer` object that is receiving the above records.

### Return value

A new `PressureObserver` object with the specified `callback` function that will be invoked when `PressureObserver.observe()` was called to watch pressure changes.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the Compute Pressure API is disallowed by a `compute-pressure` Permissions Policy.

## Examples

### Log current pressure

This example creates a `PressureObserver` and takes action whenever there is a pressure change. The sample interval is set to 1000ms, meaning that there will be updates at most every second.

```js
function callback(records) {
  const lastRecord = records[records.length - 1];
  console.log(`Current pressure ${lastRecord.state}`);
  if (lastRecord.state === "critical") {
    // disable video feeds
  } else if (lastRecord.state === "serious") {
    // disable video filter effects
  } else {
    // enable all video feeds and filter effects
  }
}

try {
  const observer = new PressureObserver(callback);
  await observer.observe("cpu", {
    sampleInterval: 1000, // 1000ms
  });
} catch (error) {
  // report error setting up the observer
}
```
