---
title: "Window: orientationchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/orientationchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: orientationchange event

The `orientationchange` event is fired when the orientation of the device has changed.

This event is not cancelable and does not bubble.

This event is deprecated. Listen for the `change` event of the `ScreenOrientation` interface instead.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("orientationchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onorientationchange = (event) => { }
```

## Event type

A generic `Event`.

## Example

You can use the `orientationchange` event in an `addEventListener` method:

```js
window.addEventListener("orientationchange", (event) => {
  console.log(
    `the orientation of the device is now ${event.target.screen.orientation.angle}`,
  );
});
```

Or use the `onorientationchange` event handler property (but note that this replaces other event listeners added using `onorientationchange`, if any):

```js
window.onorientationchange = (event) => {
  console.log(
    `the orientation of the device is now ${event.target.screen.orientation.angle}`,
  );
};
```
