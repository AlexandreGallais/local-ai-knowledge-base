---
title: "Device Memory API"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/device_memory_api/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Device Memory API

The capabilities of a client device largely depend on the amount of available RAM. Traditionally, developers had to use heuristics and either benchmark a device or infer device capabilities based on other factors like the device manufacturer or User Agent strings.

## Determining device memory

There are two ways to determine the approximate amount of RAM a device has: use the Device Memory JavaScript API or accept Client Hints.

### JavaScript API

You may query the approximate amount of RAM a device has by retrieving `Navigator.deviceMemory` or `WorkerNavigator.deviceMemory`.

```js
const RAM = navigator.deviceMemory;
```

### Client Hints

You may also use the Client Hints HTTP Header with the `Device-Memory` directive to retrieve the same approximate RAM capacity.

## Interfaces

### Extensions to other interfaces

- `Navigator.deviceMemory` (read-only)
    Returns the approximate amount of device memory in gigabytes.
- `WorkerNavigator.deviceMemory` (read-only)
    Returns the approximate amount of device memory in gigabytes.

## See also

- `Sec-CH-Device-Memory` header
