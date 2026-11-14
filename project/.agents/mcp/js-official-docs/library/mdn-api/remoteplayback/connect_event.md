---
title: "RemotePlayback: connect event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/remoteplayback/connect_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RemotePlayback: connect event

The **`connect`** event of the `RemotePlayback` interface fires when the user agent connects to the remote device.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("connect", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onconnect = (event) => { }
```

## Event type

A generic `Event`.

## Example

In the following example the value of `RemotePlayback.state` is printed to the console when the user agent successfully connects.

```js
RemotePlayback.onconnect = () => {
  console.log(RemotePlayback.state);
};
```
