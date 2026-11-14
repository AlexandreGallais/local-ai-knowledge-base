---
title: "RemotePlayback: disconnect event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/remoteplayback/disconnect_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RemotePlayback: disconnect event

The **`disconnect`** event of the `RemotePlayback` interface fires when the user agent disconnects from the remote device.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("disconnect", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ondisconnect = (event) => { }
```

## Event type

A generic `Event`.

## Example

In the following example the value of `RemotePlayback.state` is printed to the console when the user agent disconnects from the remote device.

```js
RemotePlayback.ondisconnect = () => {
  console.log(RemotePlayback.state);
};
```
