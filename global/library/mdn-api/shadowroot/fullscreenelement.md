---
title: "ShadowRoot: fullscreenElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/fullscreenelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: fullscreenElement property

The **`fullscreenElement`** read-only property of the
`ShadowRoot` interface returns the element within the shadow tree that is currently displayed in full screen.

## Value

The `Element` which is currently is displayed in fullscreen mode,
or `null` if there is no fullscreen element.

## Examples

```js
let customElem = document.querySelector("my-shadow-dom-element");
let shadow = customElem.shadowRoot;
let fullscreenElem = shadow.fullscreenElement;
```

## See also

- `Document.fullscreenElement`
