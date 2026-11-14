---
title: "USBDevice: clearHalt() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/usbdevice/clearhalt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# USBDevice: clearHalt() method

The **`clearHalt()`** method of the `USBDevice`
interface returns a `Promise` that resolves when a halt condition is
cleared. A halt condition is when a data transfer to or from the device has a status
of `'stall'`, which requires the web page (the _host_ system, in USB
terminology) to clear that condition. See the for details.

## Syntax

```js
clearHalt(direction, endpointNumber)
```

### Parameters

- `direction`
    Indicates whether the devices input or output should be cleared. Valid values
    are `'in'` or `'out'`.
- `endpointNumber`
    Indicates the number of the endpoint to clear. The promise will reject if an invalid
    endpoint is supplied.

### Return value

A `Promise`.

## Examples

The following example shows how to test for and clear a `'stall'` condition
in the result of a data transfer.

> **Note:**
> What data can be passed to a USB device and how it is passed is particular and unique
> to each device.

```js
while (true) {
  let result = await data.transferIn(1, 6);

  if (result.data && result.data.byteLength === 6) {
    console.log(`Channel 1: ${result.data.getUint16(0)}`);
    console.log(`Channel 2: ${result.data.getUint16(2)}`);
    console.log(`Channel 5: ${result.data.getUint16(4)}`);
  }

  if (result.status === "stall") {
    console.warn("Endpoint stalled. Clearing.");
    await device.clearHalt("in", 1);
  }
}
```
