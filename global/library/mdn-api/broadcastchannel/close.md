---
title: "BroadcastChannel: close() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/broadcastchannel/close/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BroadcastChannel: close() method

The **`close()`** method of the `BroadcastChannel` interface terminates the connection to
the underlying channel, allowing the object to be garbage collected.
This is a necessary step to perform
as there is no other way for a browser to know
that this channel is not needed anymore.

## Syntax

```js
close()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

```js
// Connect to a channel
const bc = new BroadcastChannel("test_channel");

// More operations (like postMessage, …)

// When done, disconnect from the channel
bc.close();
```

## See also

- `BroadcastChannel`, the interface it belongs to.
