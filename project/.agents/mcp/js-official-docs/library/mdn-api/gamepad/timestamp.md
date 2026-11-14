---
title: "Gamepad: timestamp property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/gamepad/timestamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Gamepad: timestamp property

The **`timestamp`** read-only property of the `Gamepad` interface returns a `DOMHighResTimeStamp` representing the last time the data for this gamepad was updated.

The idea behind this is to allow developers to determine if the `axes` and
`button` data have been updated from the hardware. The value must be
relative to the `navigationStart` attribute of the
`PerformanceTiming` interface. Values are monotonically
increasing, meaning that they can be compared to determine the ordering of updates, as
newer values will always be greater than or equal to older values.

> **Note:**
> This property is not currently supported anywhere.

## Value

A `DOMHighResTimeStamp` object.

## Examples

```js
const gp = navigator.getGamepads()[0];
console.log(gp.timestamp);
```

## See also

Using the Gamepad API
