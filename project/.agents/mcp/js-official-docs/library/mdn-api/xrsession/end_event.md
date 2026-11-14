---
title: "XRSession: end event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/end_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: end event

An `end` event is fired at an `XRSession` object when the WebXR session has ended, either because the web application has chosen to stop the session, or because the user agent terminated the session.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("end", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onend = (event) => { }
```

## Event type

An `XRSessionEvent`. Inherits from `Event`.

## Description

### Trigger

Triggered when the WebXR session has ended, either because the web application has chosen to stop the session, or because the user agent terminated the session.

This event is not cancelable and does not bubble.

### Use cases

You can use this event to react to the ending of a WebXR session. You may want to display a UI element informing about the termination of the session, for example.

## Examples

To be informed when a WebXR session comes to an end, you can add a handler to your `XRSession` instance using `addEventListener()`, like this:

```js
xrSession.addEventListener("end", (event) => {
  /* the session has shut down */
});
```

Alternatively, you can use the `xrSession.onend` event handler property to establish a handler for the `end` event (but note that this replaces other event listeners added using `onend`, if any):

```js
xrSession.onend = (event) => {
  /* the session has shut down */
};
```
