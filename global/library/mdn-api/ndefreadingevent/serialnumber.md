---
title: "NDEFReadingEvent: serialNumber property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/ndefreadingevent/serialnumber/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NDEFReadingEvent: serialNumber property

The **`serialNumber`** property of the `NDEFReadingEvent` interface returns the serial number of the device, which is used for anti-collision and identification, or an empty string if no serial number is available.

## Value

A string containing the device's serial number.

## Examples

This example shows how to create a convenience function that reads a single tag and then stops polling, saving battery life by cutting unneeded work. The example could easily be extended to time out after a given amount of milliseconds.

```js
const ndefReader = new NDEFReader();

function read() {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    controller.signal.onabort = reject;
    ndefReader.addEventListener(
      "reading",
      (event) => {
        controller.abort();
        resolve(event);
      },
      { once: true },
    );
    ndefReader.scan({ signal: controller.signal }).catch((err) => reject(err));
  });
}

read().then(({ serialNumber }) => {
  console.log(serialNumber);
});
```
