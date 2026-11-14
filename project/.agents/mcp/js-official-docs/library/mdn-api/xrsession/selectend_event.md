---
title: "XRSession: selectend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xrsession/selectend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XRSession: selectend event

The WebXR event **`selectend`** is sent to an `XRSession` when one of its input sources ends its primary action or when an input source that's in the process of handling an ongoing primary action is disconnected without successfully completing the action.

The `beforexrselect` is fired before this event and can prevent this event from being raised.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("selectend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onselectend = (event) => { }
```

## Event type

An `XRInputSourceEvent`. Inherits from `Event`.

## Description

### Trigger

Triggered when the user stops to press triggers or buttons, taps a touchpad, speaks a command, or performs a recognizable gesture when using a video tracking system or handheld controller with an accelerometer.

### Use cases

The `selectend` and `selectstart` events tell you when you might want to display something to the user indicating that the primary action is going on. This might be drawing a controller with the activated button in a new color, or showing the targeted object being grabbed and moved around, starting when `selectstart` arrives and stopping when `selectend` is received.

The `select` event is the event that tells your code that the user has completed the action they want to complete. This might be as simple as throwing an object or pulling the trigger of a gun in a game, or as involved as placing a dragged object in a new location.

If your primary action is a simple trigger action and you don't need to animate anything while the trigger is engaged, you can ignore the `selectstart` and `selectend` events and act on the start event.

## Examples

See the `selectstart` event for example code.

## See also

- `select` and `selectstart`
- `beforexrselect`
