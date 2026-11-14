---
title: "ShadowRoot: elementFromPoint() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/elementfrompoint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: elementFromPoint() method

The **`elementFromPoint()`** method, available on the `ShadowRoot` object, returns the element at the topmost shadow root layer at the specified coordinates relative to the viewport (the shadow root highest in the display z-order, that is able to receive pointer events). Shadow root elements that have `pointer-events` set to `none` are ignored.

If the specified point is outside the bounds of the shadow root, the result is `undefined`.

## Syntax

```js
elementFromPoint(x, y)
```

### Parameters

- `x`
    The horizontal coordinate of a point, relative to the left edge of the current viewport.
- `y`
    The vertical coordinate of a point, relative to the top edge of the current viewport.

### Return value

An `Element`; the topmost shadow root element located at the specified coordinates, if any.

## Examples

In this example, assuming the existence of a `<template>` in the HTML, we define a `<my-custom-element>`. If the appended custom element abuts the top-left corner of the viewport, or any portion of it overlaps that corner, the element that is the topmost layer at that point in the custom element will have a thin, dashed red border.

```js
customElements.define(
  "my-custom-element",
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById("my-custom-element-template");
      const sRoot = this.attachShadow({ mode: "open" });
      sRoot.appendChild(document.importNode(template.content, true));
      // get the topmost element in the top left corner of the viewport
      const srElement = this.shadowRoot.elementFromPoint(0, 0);
      // apply a border to that element
      srElement.style.border = "1px dashed red";
    }
  },
);
```

## Specifications

Not part of any standard.

## See also

- `ShadowRoot.elementsFromPoint()`
- `Document.elementFromPoint()`
