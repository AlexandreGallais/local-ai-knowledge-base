---
title: "PressureRecord: source property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressurerecord/source/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureRecord: source property

The read-only **`source`** property is a string indicating the origin source from which the record is coming.

## Value

A string indicating the origin source from which the record is coming. The current version of the Compute Pressure API specification supports two main source types:

- `"thermals"` represents the global thermal state of the entire system.
- `"cpu"` represents the average pressure of the central processing unit (CPU) across all its cores. This state can be affected by other apps and sites than the observing site.

Use the static `PressureObserver.knownSources` hint to see which source types are supported by your browser. Note that availability can also vary by your operating system and your hardware. Call `observe()` and check for a `NotSupportedError` to see if pressure observation is possible.

## Examples

### Using the `source` property

In the following example we log the value of the `source` property in the pressure observer callback.

```js
function callback(records) {
  const lastRecord = records[records.length - 1];
  console.log(`Current pressure source: ${lastRecord.source}`);
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
