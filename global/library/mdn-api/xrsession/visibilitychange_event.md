---
title: "XRSession: visibilitychange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/visibilitychange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: visibilitychange event

The **`visibilitychange`** event is sent to an `XRSession` to inform it when it becomes visible or hidden, or when it becomes visible but not currently focused. Upon receiving the event, you can check the value of the session's `visibilityState` property to determine the new visibility state.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("visibilitychange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onvisibilitychange = (event) => { }
```

## Event type

An `XRSessionEvent`. Inherits from `Event`.

## Description

### Trigger

Triggered when an `XRSession` becomes visible or hidden, or when it becomes visible but not currently focused.

When the `XRSession` receives this event, the visibility state has already been changed.

### Use cases

Upon receiving the event, you can check the value of the session's `visibilityState` property to determine the new visibility state.

## Examples

This example demonstrates how to listen for a `visibilitychange` event on a WebXR session, using `addEventListener()` to begin listening for the event:

```js
navigator.xr.requestSession("inline").then((xrSession) => {
  xrSession.addEventListener("visibilitychange", (e) => {
    switch (e.session.visibilityState) {
      case "visible":
      case "visible-blurred":
        mySessionVisible(true);
        break;
      case "hidden":
        mySessionVisible(false);
        break;
    }
  });
});
```

When a visibility state change occurs, the event is received and dispatched to a function `mySessionVisible()`, with a Boolean parameter indicating whether or not the session is presently being displayed to the user.

You can also create the event handler by assigning it to the `XRSession`'s `onvisibilitychange` event handler property, like this (but note that this replaces other event listeners added using `onvisibilitychange`, if any):

```js
xrSession.onvisibilitychange = (e) => {
  /* event handled here */
};
```
