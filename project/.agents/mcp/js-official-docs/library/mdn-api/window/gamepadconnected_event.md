---
title: "Window: gamepadconnected event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/gamepadconnected_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: gamepadconnected event

The `gamepadconnected` event is fired when the browser detects that a gamepad has been connected or the first time a button/axis of the gamepad is used.

The event will not fire if disallowed by the document's `gamepad` Permissions Policy.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("gamepadconnected", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ongamepadconnected = (event) => { }
```

## Examples

To be informed when a gamepad is connected, you can add a handler to the window using `addEventListener()`, like this:

```js
window.addEventListener("gamepadconnected", (event) => {
  // All buttons and axes values can be accessed through
  const gamepad = event.gamepad;
});
```

Alternatively, you can use the `window.ongamepadconnected` event handler property to establish a handler for the `gamepadconnected` event (but note that this replaces other event listeners added using `ongamepadconnected`, if any):

```js
window.ongamepadconnected = (event) => {
  // All buttons and axes values can be accessed through
  const gamepad = event.gamepad;
};
```

## See also

- gamepaddisconnected
- Using Gamepad API
