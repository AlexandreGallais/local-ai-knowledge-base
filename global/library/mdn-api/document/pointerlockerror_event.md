---
title: "Document: pointerlockerror event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/pointerlockerror_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: pointerlockerror event

The **`pointerlockerror`** event is fired when locking the pointer failed (for technical reasons or because the permission was denied).

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointerlockerror", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointerlockerror = (event) => { }
```

## Event type

A generic `Event`.

## Examples

Using `addEventListener()`:

```js
const para = document.querySelector("p");

document.addEventListener("pointerlockerror", (event) => {
  console.log("Error locking pointer");
});
```

Using the `onpointerlockerror` event handler property (but note that this replaces other event listeners added using `onpointerlockerror`, if any):

```js
document.onpointerlockerror = (event) => {
  console.log("Error locking pointer");
};
```

## See also

- Using Pointer Lock API
