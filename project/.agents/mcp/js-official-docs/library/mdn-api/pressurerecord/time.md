---
title: "PressureRecord: time property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressurerecord/time/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureRecord: time property

The read-only **`time`** property returns the `timestamp` recorded for a `PressureRecord`. It corresponds to the time the data was obtained from the system relative to the time origin of the global object in which the `PressureObserver` generated the notification.

## Value

A `DOMHighResTimeStamp` representing the timestamp when the `PressureRecord` was created.

## Examples

### Using the `time` property

In the following example we log the value of the `time` property in the pressure observer callback.

```js
function callback(records) {
  const lastRecord = records[records.length - 1];
  console.log(`Current pressure ${lastRecord.state}`);
  console.log(`Current pressure observed at ${lastRecord.time}`);
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
