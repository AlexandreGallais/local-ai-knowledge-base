---
title: "CloseWatcher: close event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closewatcher/close_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseWatcher: close event

A `close` event is fired at a `CloseWatcher` object when a close request was received and only fired if the `cancel` event that preceded the `close` one was not canceled.

The `close` event handler is where the code to close the UI component should be called: this ensures that the component will be closed properly either from the platform-specific close signal or from a call to `CloseWatcher.requestClose()`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("close", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onclose = (event) => { }
```

## Event type

An `Event`.

## Examples

### Using the `close` event

Use the `close` to listen for close requests.

```js
watcher.addEventListener("close", () => {
  // Close your UI component
  sidebar.hide();
});
```
