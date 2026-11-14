---
title: "XRSession: squeezeend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/squeezeend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: squeezeend event

The WebXR event **`squeezeend`** is sent to an `XRSession` when one of its input sources ends its primary action or when an input source that's in the process of handling an ongoing primary action is disconnected without successfully completing the action.

Primary squeeze actions include things like users pressing triggers or buttons, tapping a touchpad, speaking a command, or performing a recognizable gesture when using a video tracking system or handheld controller with an accelerometer.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("squeezeend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onsqueezeend = (event) => { }
```

## Event type

An `XRInputSourceEvent`. Inherits from `Event`.

## Description

### Trigger

Triggered when users stop squeezing the controller, making a hand gesture that mimes grabbing something, or using (squeezing) a trigger.

### Use cases

The `squeezestart` event is sent indicating that the user has begun a squeeze action.

If the primary squeeze action ends successfully, the session is sent a `squeeze` event.

A `squeezeend` event is sent to indicate that the squeeze action is no longer underway. This is sent whether the squeeze action succeeded or not.

## Examples

See the `squeezestart` event for example code.
