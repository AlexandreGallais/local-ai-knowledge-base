---
title: "HTMLElement: offsetTop property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/offsettop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: offsetTop property

The **`offsetTop`** read-only property of the `HTMLElement` interface returns the distance from the outer border of the current element (including its margin) to the top padding edge of the `offsetParent`, the _closest positioned_ ancestor element.

## Value

A number.

## Examples

```js
const d = document.getElementById("div1");
const topPos = d.offsetTop;

if (topPos > 10) {
  // object offset is more
  // than 10 pixels from its parent
}
```

## See also

- Determining the dimensions of elements
- `Element.clientTop`
- `Element.scrollTop`
- `HTMLElement.offsetHeight`
- `HTMLElement.offsetWidth`
- `HTMLElement.offsetLeft`
- `Element.getBoundingClientRect()`
