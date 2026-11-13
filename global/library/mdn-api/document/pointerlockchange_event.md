---
title: "Document: pointerlockchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/pointerlockchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: pointerlockchange event

The **`pointerlockchange`** event is fired when the pointer is locked/unlocked.

The event handler can use `Document.pointerLockElement` to determine whether the pointer is locked, and if so, to which element it is locked.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("pointerlockchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onpointerlockchange = (event) => { }
```

## Event type

A generic `Event`.

## Examples

Using `addEventListener()`:

```js
document.addEventListener("pointerlockchange", (event) => {
  if (document.pointerLockElement)
    console.log("The pointer is locked to: ", document.pointerLockElement);
  else {
    console.log("The pointer is not locked");
  }
});
```

Using the `onpointerlockchange` event handler property (but note that this replaces other event listeners added using `onpointerlockchange`, if any):

```js
document.onpointerlockchange = (event) => {
  if (document.pointerLockElement)
    console.log("The pointer is locked to: ", document.pointerLockElement);
  else {
    console.log("The pointer is not locked");
  }
};
```

## See also

- Using Pointer Lock API
