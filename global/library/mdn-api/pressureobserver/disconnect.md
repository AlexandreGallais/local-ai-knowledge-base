---
title: "PressureObserver: disconnect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/pressureobserver/disconnect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PressureObserver: disconnect() method

The **`disconnect()`** method of the `PressureObserver` interface stops the pressure observer callback from receiving pressure records from all sources.

## Syntax

```js
disconnect()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Stopping a pressure observer

The following example collects 20 samples and then disconnects the pressure observer to disable receiving any more pressure records.

```js
const samples = [];

function pressureChange(records, observer) {
  for (const record of records) {
    samples.push(record.state);
    // We only want 20 samples
    if (samples.length === 20) {
      observer.disconnect();
      return;
    }
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
