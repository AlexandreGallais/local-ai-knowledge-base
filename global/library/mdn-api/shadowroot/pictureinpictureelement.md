---
title: "ShadowRoot: pictureInPictureElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/pictureinpictureelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: pictureInPictureElement property

The **`pictureInPictureElement`** read-only property of the
`ShadowRoot` interface returns the `Element` that is currently being
presented in picture-in-picture mode in this shadow tree, or `null` if
picture-in-picture mode is not currently in use.

## Value

A reference to the `Element` object that's currently in picture-in-picture mode.

Returns `null` if the shadow tree has no associated element in picture-in-picture mode. For example, there's no picture-in-picture element, or the element is not in the shadow tree.

## Examples

```js
let customElem = document.querySelector("my-shadow-dom-element");
let shadow = customElem.shadowRoot;
let pipElem = shadow.pictureInPictureElement;
```

## See also

- `Document.pictureInPictureElement`
