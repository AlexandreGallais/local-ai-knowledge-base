---
title: "ShadowRoot: pointerLockElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/pointerlockelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: pointerLockElement property

The **`pointerLockElement`** read-only property of the `ShadowRoot` interface provides the element set as the target for mouse events while the pointer is locked.
It is `null` if lock is pending, pointer is unlocked, or the target is in another tree.

## Value

An `Element` or `null`.

## Examples

```js
let customElem = document.querySelector("my-shadow-dom-element");
let shadow = customElem.shadowRoot;
let pleElem = shadow.pointerLockElement;
```

## See also

- `Document.exitPointerLock()`
- `Element.requestPointerLock()`
- Pointer Lock
