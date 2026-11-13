---
title: "CSSPositionValue"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csspositionvalue/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSPositionValue

The **`CSSPositionValue`** interface of the CSS Typed Object Model API represents values for properties that take a position, for example `object-position`.

## Constructor

- `CSSPositionValue()` (non-standard) (deprecated)
    Creates a new `CSSPositionValue` object.

## Instance properties

- `CSSPositionValue.x` (non-standard) (deprecated)
    Returns the item's position along the web page's horizontal axis.
- `CSSPositionValue.y` (non-standard) (deprecated)
    Returns the item's position along the vertical axis.

## Instance methods

None.

## Examples

The following example positions a container `` 5 pixels from the top and 10 pixels from the left of the page.

```js
const replacedEl = document.getElementById("image");
const position = new CSSPositionValue(CSS.px(35), CSS.px(40));

replacedEl.attributeStyleMap.set("object-position", position);
console.log(position.x.value, position.y.value);
console.log(replacedEl.computedStyleMap().get("object-position"));
```

We set the `object-position` property, then check the values returned.

```css
#image {
  width: 300px;
  height: 300px;
  border: 1px solid black;
  background-color: #dededf;
  object-fit: none;
}
```

```html
<p>
  Check the developer tools to see the log in the console and to inspect the
  style attribute on the image.
</p>
<img id="image" src="mdn.svg" alt="MDN Logo" />
```

## See also

- `CSSImageValue`
- `CSSKeywordValue`
- `CSSNumericValue`
- `CSSTransformValue`
- `CSSUnparsedValue`
- Using the CSS Typed OM
- CSS Typed Object Model API
