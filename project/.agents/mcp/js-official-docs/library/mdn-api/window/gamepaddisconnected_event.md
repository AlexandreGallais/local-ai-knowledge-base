---
title: "Window: gamepaddisconnected event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/gamepaddisconnected_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: gamepaddisconnected event

The `gamepaddisconnected` event is fired when the browser detects that a gamepad has been disconnected.

The event will not fire if disallowed by the document's `gamepad` Permissions Policy.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("gamepaddisconnected", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
ongamepaddisconnected = (event) => { }
```

## Examples

To be informed when a gamepad is disconnected, you can add a handler to the window using `addEventListener()`, like this:

```js
window.addEventListener("gamepaddisconnected", (event) => {
  console.log("Lost connection with the gamepad.");
});
```

Alternatively, you can use the `window.ongamepaddisconnected` event handler property to establish a handler for the `gamepaddisconnected` event (but note that this replaces other event listeners added using `ongamepaddisconnected`, if any):

```js
window.ongamepaddisconnected = (event) => {
  console.log("Lost connection with the gamepad.");
};
```

## See also

- gamepadconnected
- Using Gamepad API
