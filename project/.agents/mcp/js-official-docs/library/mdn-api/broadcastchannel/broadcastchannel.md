---
title: "BroadcastChannel: BroadcastChannel() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/broadcastchannel/broadcastchannel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BroadcastChannel: BroadcastChannel() constructor

The **`BroadcastChannel()`** constructor creates a new
`BroadcastChannel` and connects it to the underlying channel.

## Syntax

```js
new BroadcastChannel(channelName)
```

### Parameters

- `channelName`
    A string representing the name of the channel; there is one
    single channel with this name for all browsing contexts with the same origin.

## Examples

```js
// create a new channel listening to the "internal_notification" channel.

const bc = new BroadcastChannel("internal_notification");
bc.postMessage("New listening connected!");
```

## See also

- `BroadcastChannel`, the interface it belongs to.
