---
title: "PressureRecord"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressurerecord/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureRecord

The **`PressureRecord`** interface is part of the Compute Pressure API and describes the pressure trend of a source at a specific moment of transition.

## Instance properties

- `PressureRecord.source` (read-only) (experimental)
    A string indicating the origin source from which the record is coming.
- `PressureRecord.state` (read-only) (experimental)
    A string indicating the pressure state recorded.
- `PressureRecord.time` (read-only) (experimental)
    A `DOMHighResTimeStamp` indicating the timestamp of the record.

## Instance methods

- `PressureRecord.toJSON()` (experimental)
    Returns a JSON-serializable plain object representing the `PressureRecord` object. Automatically called by `JSON.stringify()`.

## Examples

### Using the `PressureRecord` object

In the following example we log the properties of the `PressureRecord` object in the pressure observer callback.

```js
function callback(records) {
  const lastRecord = records[records.length - 1];
  console.log(`Current pressure is ${lastRecord.state}`);
  console.log(`Current pressure observed at ${lastRecord.time}`);
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
