---
title: "CSSPositionValue: y property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspositionvalue/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPositionValue: y property

The **`y`** property of the `CSSPositionValue` interface returns the item's position along the vertical axis.

## Value

A `CSSNumericValue`.

## Examples

### Basic usage

The following example positions a container `` 5 pixels from the top and 10 pixels from the left of the page.

```js
let replaceEl = document.getElementById("container");
let position = new CSSPositionValue(CSS.px(5), CSS.px(10));

replaceEl.attributeStyleMap.set("object-position", position);
console.log(position.x.value, position.y.value);
```

## See also

- `CSSPositionValue()`
- `CSSPositionValue.x`
- Using the CSS Typed OM
- CSS Typed Object Model API
