---
title: "SVGElement: attributeStyleMap property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgelement/attributestylemap/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGElement: attributeStyleMap property

The **`attributeStyleMap`** read-only property of the `SVGElement` interface returns a live `StylePropertyMap` object that contains a list of style properties of the element that are defined in the element's inline `style` attribute, or assigned using the `style` property of the `SVGElement` interface via script.

Shorthand properties are expanded. If you set `border-top: 1px solid black`, the longhand properties (`border-top-color`, `border-top-style`, and `border-top-width`) are set instead.

The main difference between `style` property and `attributeStyleMap` property is that, the `style` property will return a `CSSStyleDeclaration` object, while the `attributeStyleMap` property will return a `StylePropertyMap` object.

Though the property itself is not writable, you could read and write inline styles through the `StylePropertyMap` object that it returns, just like through the `CSSStyleDeclaration` object that returns via the `style` property.

## Value

A live `StylePropertyMap` object.

## Examples

The following code snippet shows the relationship between the `style` attribute and the `attributeStyleMap` property:

```html
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 250 250"
  width="250"
  height="250">
  <circle
    cx="100"
    cy="100"
    r="50"
    id="el"
    style="border-top: 1px solid blue; color: red;" />
</svg>
<div id="output"></div>
```

```css
#el {
  font-size: 16px;
}

#output {
  white-space: pre-line;
}
```

```js
const element = document.getElementById("el");
const output = document.getElementById("output");

for (const property of element.attributeStyleMap) {
  output.textContent += `${property[0]} = ${property[1][0].toString()}\n`;
}
```

## See also

- `SVGElement.style`
- `HTMLElement.attributeStyleMap`
- `MathMLElement.attributeStyleMap`
