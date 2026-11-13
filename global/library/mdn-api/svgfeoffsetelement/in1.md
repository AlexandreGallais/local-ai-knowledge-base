---
title: "SVGFEOffsetElement: in1 property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeoffsetelement/in1/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEOffsetElement: in1 property

The **`in1`** read-only property of the `SVGFEOffsetElement` interface reflects the `in` attribute of the given `<feOffset>` element.

## Value

An `SVGAnimatedString` object.

## Examples

### Accessing the `in` attribute of `<feOffset>` element

In this example, we access the `in` attribute value of the `<feOffset>` element by using the `in1` read-only property of the `SVGFEOffsetElement` interface.

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="offsetFilter">
      <!-- Applies an offset to the SourceGraphic -->
      <feOffset in="SourceGraphic" dx="10" dy="10" />
    </filter>
  </defs>
  <rect
    x="20"
    y="20"
    width="100"
    height="100"
    fill="lightblue"
    filter="url(#offsetFilter)" />
</svg>
```

We can access the `in` attribute of the `feOffset` element.

```js
// Select the feOffset element
const offsetElement = document.querySelector("feOffset");

// Access the in1 property
console.log(offsetElement.in1.baseVal); // Output: "SourceGraphic"
```

## See also

- `SVGAnimatedString`
