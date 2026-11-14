---
title: "PressureObserver"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressureobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureObserver

The **`PressureObserver`** interface is part of the Compute Pressure API and is used to observe the pressure changes of system resources such as the CPU.

## Constructor

- `PressureObserver()` (experimental)
    Creates and returns a new `PressureObserver` object.

## Static properties

- `PressureObserver.knownSources` (read-only) (experimental)
    Returns an array of `source` values supported by the user agent.

## Instance methods

- `PressureObserver.observe()` (experimental)
    Invokes the pressure observer's callback function when a pressure record for the specified `source` is observed.
- `PressureObserver.unobserve()` (experimental)
    Stops the pressure observer callback from receiving pressure records from the specified `source`.
- `PressureObserver.disconnect()` (experimental)
    Stops the pressure observer callback from receiving pressure records from all sources.
- `PressureObserver.takeRecords()` (experimental)
    Returns the current list of pressure records stored in the pressure observer, emptying it out.

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

## See also

- `PerformanceObserver`
- `MutationObserver`
- `ResizeObserver`
- `IntersectionObserver`
