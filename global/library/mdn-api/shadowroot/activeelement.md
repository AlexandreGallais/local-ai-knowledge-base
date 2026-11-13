---
title: "ShadowRoot: activeElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/activeelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: activeElement property

The **`activeElement`** read-only property of the
`ShadowRoot` interface returns the element within the shadow tree that has focus.

## Value

The `Element` which currently has focus, or `null` if there is no focused element.

## Examples

```js
let customElem = document.querySelector("my-shadow-dom-element");
let shadow = customElem.shadowRoot;
let focusedElem = shadow.activeElement;
```

## See also

- `Document.activeElement`
