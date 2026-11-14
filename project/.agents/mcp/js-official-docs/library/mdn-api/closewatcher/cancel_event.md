---
title: "CloseWatcher: cancel event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/closewatcher/cancel_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CloseWatcher: cancel event

A `cancel` event is fired at a `CloseWatcher` object before the `close` event, so that `close` can be prevented from firing, if necessary. It is triggered by all close signals (e.g., the `Esc` key) as well as `CloseWatcher.requestClose()`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("cancel", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
oncancel = (event) => { }
```

## Event type

An `Event`.

## Examples

### Using the `cancel` event

In this example, we ask the user to confirm that they really want to close the component, and if they don't, we cancel the event using `Event.preventDefault()`, which prevents the `close` event from being fired.

```js
watcher.addEventListener("cancel", (e) => {
  if (e.cancelable && hasUnsavedData) {
    const userReallyWantsToClose = confirm("Are you sure you want to close?");
    if (!userReallyWantsToClose) {
      e.preventDefault();
    }
  }
});

// Trigger a close request manually
watcher.requestClose();
```
