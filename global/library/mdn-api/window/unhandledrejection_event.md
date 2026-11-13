---
title: "Window: unhandledrejection event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/unhandledrejection_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: unhandledrejection event

The **`unhandledrejection`** event is sent to the global scope of a script when a JavaScript `Promise` that has no rejection handler is rejected; typically, this is the `window`, but may also be a `Worker`.

This is useful for debugging and for providing fallback error handling for unexpected situations.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("unhandledrejection", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onunhandledrejection = (event) => { }
```

## Event type

A `PromiseRejectionEvent`. Inherits from `Event`.

## Event handler aliases

In addition to the `Window` interface, the event handler property `onunhandledrejection` is also available on the following targets:

- `HTMLBodyElement`
- `HTMLFrameSetElement`
- `SVGSVGElement`

## Usage notes

Allowing the `unhandledrejection` event to bubble will eventually result in an error message being output to the console. You can prevent this by calling `preventDefault()` on the `PromiseRejectionEvent`; see Preventing default handling below for an example.

Because this event can leak data, `Promise` rejections that originate from a cross-origin script won't fire this event.

## Examples

### Basic error logging

This example logs information about the unhandled promise rejection to the console.

```js
window.addEventListener("unhandledrejection", (event) => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
});
```

You can also use the `onunhandledrejection` event handler property to set up the event listener (but note that this replaces other event listeners added using `onunhandledrejection`, if any):

```js
window.onunhandledrejection = (event) => {
  console.warn(`UNHANDLED PROMISE REJECTION: ${event.reason}`);
};
```

### Preventing default handling

Many environments (such as Node.js) report unhandled promise rejections to the console by default. You can prevent that from happening by adding a handler for `unhandledrejection` events that—in addition to any other tasks you wish to perform—calls `preventDefault()` to cancel the event, preventing it from bubbling up to be handled by the runtime's logging code. This works because `unhandledrejection` is cancelable.

```js
window.addEventListener("unhandledrejection", (event) => {
  // code for handling the unhandled rejection
  // …

  // Prevent the default handling (such as outputting the
  // error to the console)

  event.preventDefault();
});
```

## See also

- Promise rejection events
- `rejectionhandled` event
- `Promise`
