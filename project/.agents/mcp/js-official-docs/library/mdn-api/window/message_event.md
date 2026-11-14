---
title: "Window: message event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/message_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: message event

The `message` event is fired on a `Window` object when the window receives a message, for example from a call to `Window.postMessage()` from another browsing context.

This event is not cancellable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("message", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmessage = (event) => { }
```

## Event type

A `MessageEvent`. Inherits from `Event`.

## Examples

Suppose a script sends a message to a different browsing context, such as another ``, using code like this:

```js
const targetFrame = window.top.frames[1];
const targetOrigin = "https://example.org";
const windowMessageButton = document.querySelector("#window-message");

windowMessageButton.addEventListener("click", () => {
  targetFrame.postMessage("hello there", targetOrigin);
});
```

The receiver can listen for the message using `addEventListener()` with code like this:

```js
window.addEventListener("message", (event) => {
  console.log(`Received message: ${event.data}`);
});
```

Alternatively the listener could use the `onmessage` event handler property (but note that this replaces other event listeners added using `onmessage`, if any):

```js
window.onmessage = (event) => {
  console.log(`Received message: ${event.data}`);
};
```

## See also

- Related events: `messageerror`.
- `Window.postMessage()`.
