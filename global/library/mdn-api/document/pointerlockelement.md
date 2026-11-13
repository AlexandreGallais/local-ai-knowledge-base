---
title: "Document: pointerLockElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/pointerlockelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: pointerLockElement property

The **`pointerLockElement`** read-only property of the `Document` interface provides the element set as the target for mouse events while the pointer is locked.
It is `null` if lock is pending, pointer is unlocked, or the target is in another document.

## Value

An `Element` or `null`.

## Examples

### Checking pointer lock status

This example contains a `` element that in turn contains a ``. Clicking the button requests pointer lock for the ``.

The example also listens for the `pointerlockchange` event: when this event is fired, the event handler disables the "Lock" button if an element in the document has the pointer lock, and enables the button otherwise.

The effect of this is that if you click the "Lock" button, the pointer is locked and the button is disabled: if you then exit pointer lock (for example, by pressing the `Escape` key), the button is enabled again.

#### HTML

```html
<div id="container">
  <button id="lock">Lock</button>
</div>
```

#### CSS

```css
div {
  height: 100px;
  width: 200px;
  border: 2px solid blue;
}
```

#### JavaScript

```js
const lock = document.querySelector("#lock");
const container = document.querySelector("#container");

lock.addEventListener("click", () => {
  container.requestPointerLock();
});

document.addEventListener("pointerlockchange", () => {
  const locked = document.pointerLockElement;
  lock.disabled = Boolean(locked);
});
```

#### Result

## See also

- `Document.exitPointerLock()`
- `Element.requestPointerLock()`
- Pointer Lock
