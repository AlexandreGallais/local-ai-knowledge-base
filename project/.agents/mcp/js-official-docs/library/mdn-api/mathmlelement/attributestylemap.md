---
title: "MathMLElement: attributeStyleMap property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mathmlelement/attributestylemap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MathMLElement: attributeStyleMap property

The **`attributeStyleMap`** read-only property of the `MathMLElement` interface returns a live `StylePropertyMap` object that contains a list of style properties of the element that are defined in the element's inline `style` attribute, or assigned using the `style` property of the `MathMLElement` interface via script.

Shorthand properties are expanded. If you set `border-top: 1px solid black`, the longhand properties (`border-top-color`, `border-top-style`, and `border-top-width`) are set instead.

The main difference between `style` property and `attributeStyleMap` property is that, the `style` property will return a `CSSStyleDeclaration` object, while the `attributeStyleMap` property will return a `StylePropertyMap` object.

Though the property itself is not writable, you could read and write inline styles through the `StylePropertyMap` object that it returns, just like through the `CSSStyleDeclaration` object that returns via the `style` property.

## Value

A live `StylePropertyMap` object.

## Examples

The following code snippet shows the relationship between the `style` attribute and the `attributeStyleMap` property:

```html
<math>
  <mrow>
    <mi>f</mi>
    <mo stretchy="false">(</mo>
    <mi id="el" style="border-top: 1px solid blue; color: red;">x</mi>
    <mo stretchy="false">)</mo>
    <mo>=</mo>
    <mi>x</mi>
  </mrow>
</math>
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

- `MathMLElement.style`
- `HTMLElement.attributeStyleMap`
- `SVGElement.attributeStyleMap`
