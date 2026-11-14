---
title: "StorageAccessHandle: BroadcastChannel() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/storageaccesshandle/broadcastchannel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# StorageAccessHandle: BroadcastChannel() method

> **Note:**
> See `BroadcastChannel()` to understand usage.

## Syntax

```js
BroadcastChannel(channelName)
```

### Parameters

- `channelName`
    See `BroadcastChannel()`.

### Return value

An unpartitioned `BroadcastChannel` object.

### Exceptions

- `SecurityError` `DomException`
    Thrown if access was not granted.

See `BroadcastChannel()`

## Examples

```js
document.requestStorageAccess({ BroadcastChannel: true }).then(
  (handle) => {
    console.log("BroadcastChannel access granted");
    handle.BroadcastChannel(channel_name);
  },
  () => {
    console.log("BroadcastChannel access denied");
  },
);
```

> **Note:**
> See Using the Storage Access API for a more complete example.

## See also

- `Document.requestStorageAccess()`
- Using the Storage Access API
