---
title: "XRSessionEvent: session property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsessionevent/session/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSessionEvent: session property

The read-only `XRSessionEvent` interface's
**`session`** property indicates which
`XRSession` the event is about.

## Value

An `XRSession` object indicating which WebXR session the event refers to.

## Examples

In this example, the `session` property is used to obtain the session object
to manage when an event is received.

```js
xrSession.addEventListener("visibilitychange", (e) => {
  switch (e.session.visibilityState) {
    case "hidden":
      myEnableRendering(true);
      break;
    case "visible":
    case "visible-blurred":
      myEnableRendering(false);
      break;
  }
});
```

This calls a function that reacts to the session's visibility state change.
