---
title: "Navigator: deviceMemory property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/devicememory/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: deviceMemory property

The **`deviceMemory`** read-only property of the `Navigator` interface returns the approximate amount of device memory in gigabytes.

The reported value is imprecise to curtail fingerprinting.
It's approximated by rounding the actual memory to the nearest power of 2, then dividing that number by 1024.
It is then clamped within lower and upper bounds to protect the privacy of owners of very low-memory or high-memory devices.
These bounds may change over time (see browser compatibility table).

## Value

A floating point number coarsened to a power of two value, clamped to implement-defined limits.

For example, if a browser does not report below `2` or above `32` then the value is one of: `2`, `4`, `8`, `16`, `32`.

## Examples

```js
const memory = navigator.deviceMemory;
console.log(`This device approximately ${memory}GiB of RAM.`);
```

## See also

- `Sec-CH-Device-Memory` HTTP header
