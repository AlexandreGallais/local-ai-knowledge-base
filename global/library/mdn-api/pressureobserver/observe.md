---
title: "PressureObserver: observe() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressureobserver/observe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureObserver: observe() method

The **`observe()`** method of the `PressureObserver` interface tells the pressure observer to start observing pressure changes. After this method is called, the observer will call its callback function when a pressure record for the specified `source` is observed.

When a matching `PressureRecord` is obtained, the pressure observer's callback function is invoked.

## Syntax

```js
observe(source)
observe(source, options)
```

### Parameters

- `source`
    A string specifying which `source` to observe. See `PressureRecord.source` for a list of sources and `PressureObserver.knownSources` for a list of sources the user agent supports.
- `options` (optional)
    An object to configure observation with the following properties:
    - `sampleInterval` (optional)
        A number representing the requested sampling interval expressed in milliseconds. Defaults to 0 meaning it will get updates as fast as the system can handle it.

### Return value

A `Promise` that fulfills with `undefined`.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if the Compute Pressure API is disallowed by a `compute-pressure` Permissions Policy.
- `NotSupportedError` `DOMException`
    Thrown if the `source` parameter is not one of the supported sources for this user agent.

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
