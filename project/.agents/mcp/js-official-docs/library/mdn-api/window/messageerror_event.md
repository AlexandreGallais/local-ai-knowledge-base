---
title: "Window: messageerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/messageerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: messageerror event

The `messageerror` event is fired on a `Window` object when it receives a message that can't be deserialized.

This event is not cancellable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("messageerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onmessageerror = (event) => { }
```

## Event type

A `MessageEvent`. Inherits from `Event`.

## Examples

Listen for `messageerror` using `addEventListener()`:

```js
window.addEventListener("messageerror", (event) => {
  console.error(event);
});
```

The same, but using the `onmessageerror` event handler property (but note that this replaces other event listeners added using `onmessageerror`, if any):

```js
window.onmessageerror = (event) => {
  console.error(event);
};
```

## See also

- `Window.postMessage()`
- Related events: `message`.
