---
title: "BroadcastChannel: postMessage() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/broadcastchannel/postmessage/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BroadcastChannel: postMessage() method

The **`postMessage()`** method of the `BroadcastChannel` interface sends a message,
which can be of any kind of `Object`,
to each listener in any browsing context with the same origin.
The message is transmitted as a `message` event
targeted at each `BroadcastChannel` bound to the channel.

## Syntax

```js
postMessage(message)
```

### Parameters

- `message`
    Data to be sent to the other window. The data is serialized using the structured clone algorithm.
    This means you can pass a broad variety of data objects safely to the destination window without having to serialize them yourself.

    > **Note:**
    > Execution contexts that can message each other may not be in the same agent cluster, and therefore cannot share memory. `SharedArrayBuffer` objects, or buffer views backed by one, cannot be posted across agent clusters. Trying to do so will generate a `messageerror` event containing a `DataCloneError` `DOMException` on the receiving end.

### Return value

None.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the `BroadcastChannel` has already been closed.
- `DataCloneError` `DOMException`
    Thrown if any part of the input data is not serializable.

## See also

- `BroadcastChannel`, the interface it belongs to.
