---
title: "XRSessionEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsessionevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSessionEvent

The WebXR Device API's **`XRSessionEvent`** interface describes an event which indicates the change of the state of an `XRSession`. These events occur, for example, when the session ends or the visibility of its context changes.

## Constructor

- `XRSessionEvent()`
    Creates and returns a new `XRSessionEvent` object.

## Instance properties

_In addition to properties inherited from its parent interface, `Event`, `XRSessionEvent` provides the following:_

- `session` (read-only)
    The `XRSession` to which the event refers.

## Instance methods

_While `XRSessionEvent` defines no methods, it inherits methods from its parent interface, `Event`._

## Session event types

_The following events are represented using the `XRSessionEvent` interface, and are permitted values for its `type` property._

- `end`
    Fired at the session when it has ended, after being terminated by the application or the user agent.
- `visibilitychange`
    Fired at the session whenever its visibility state changes.

## Examples

This example creates a listener that watches for the visibility state of the session to change. It reacts by calling a function `mySessionVisible()` with a Boolean indicating whether or not the session is visible; this function might, for instance, spin up or reconfigure a worker that handles rendering the scene.

```js
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
```
