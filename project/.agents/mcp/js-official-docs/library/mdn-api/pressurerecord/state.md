---
title: "PressureRecord: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressurerecord/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureRecord: state property

The read-only **`state`** property is a string indicating the pressure state recorded.

## Value

A string indicating the pressure state recorded. The Compute Pressure API uses human-readable pressure states with the following semantics (see also the specification):

- ⚪ `"nominal"`: The conditions of the target device are at an acceptable level with no noticeable adverse effects on the user.
- 🟢 `"fair"`: Target device pressure, temperature and/or energy usage are slightly elevated, potentially resulting in reduced battery-life, as well as fans (or systems with fans) becoming active and audible. Apart from that the target device is running flawlessly and can take on additional work.
- 🟡 `"serious"`: Target device pressure, temperature and/or energy usage is consistently highly elevated. The system may be throttling as a countermeasure to reduce thermals.
- 🔴 `"critical"`: The temperature of the target device or system is significantly elevated and it requires cooling down to avoid any potential issues.

## Examples

### Using the `state` property

In the following example we log the value of the `state` property in the pressure observer callback.

```js
function callback(records) {
  const lastRecord = records[records.length - 1];
  console.log(`Current pressure is ${lastRecord.state}`);
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
