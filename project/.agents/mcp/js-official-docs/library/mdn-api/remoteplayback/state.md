---
title: "RemotePlayback: state property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/remoteplayback/state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RemotePlayback: state property

The **`state`** read-only property of the `RemotePlayback` interface returns the current state of the `RemotePlayback` connection.

## Value

One of:

- `"connecting"`
    The user agent is attempting to initiate remote playback with the selected device.
- `"connected"`
    The transition from local to remote playback has happened. All commands will now take place on the remote device.
- `"disconnected"`
    The remote playback has not been initiated, has failed to initiate, or has been stopped.

## Examples

In the following example the value of `RemotePlayback.state` is printed to the console when the user agent successfully connects.

```js
RemotePlayback.onconnect = () => {
  console.log(RemotePlayback.state);
};
```
