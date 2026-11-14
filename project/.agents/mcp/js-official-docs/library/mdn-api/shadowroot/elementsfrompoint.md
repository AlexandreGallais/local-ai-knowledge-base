---
title: "ShadowRoot: elementsFromPoint() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/shadowroot/elementsfrompoint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ShadowRoot: elementsFromPoint() method

The **`elementsFromPoint()`** method of the `ShadowRoot` interface returns an array of all the shadow root elements at the specified coordinates (relative to the viewport). The elements are ordered from the topmost element (highest in the display z-order), to the bottommost element.

It operates in a similar way to the `ShadowRoot.elementFromPoint` method. Some browsers return only the shadow root elements present at that location. Other browsers include elements outside of the shadow DOM, from the shadow DOM element in the topmost layer to the document root node, such as the `<html>` or `` root element. In these browsers, it operates similar to the `Document.elementsFromPoint` method, but with the ability to cross the shadow boundary.

## Syntax

```js
elementsFromPoint(x, y)
```

### Parameters

- `x`
    The horizontal coordinate of a point, relative to the left edge of the current viewport.
- `y`
    The vertical coordinate of a point, relative to the top edge of the current viewport.

### Return value

An array of `Element` objects.

## Examples

```js
const customElem = document.querySelector("my-custom-element");
const shadow = customElem.shadowRoot;
const elements = shadow.elementsFromPoint(20, 20);
const msg = elements.map((el) => el.localName).join(" < ");
if (msg) {
  console.log(msg);
} else {
  console.log("The custom element had no descendants at x: 20, y: 20.");
}
```

If `<my-custom-element>` is near the top left corner of the viewport, and contains a single ``, the above may return either of the following, depending on the browser implementation:

```plain
div
div < my-custom-element < body < html
```

## Specifications

Not part of any standard.

## See also

- `ShadowRoot.elementFromPoint()`
- `Document.elementsFromPoint()`
