---
title: "BroadcastChannel: name property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/broadcastchannel/name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BroadcastChannel: name property

The **`name`** read-only property of the `BroadcastChannel` interface returns a string, which uniquely identifies the given channel with its name. This name is passed to the `BroadcastChannel()` constructor at creation time and is therefore read-only.

## Values

A string.

## Examples

```js
// Connect to a channel
const bc = new BroadcastChannel("test_channel");

// More operations (like postMessage, …)

// Log the channel name to the console
console.log(bc.name); // "test_channel"

// When done, disconnect from the channel
bc.close();
```

## See also

- `BroadcastChannel`, the interface it belongs to.
