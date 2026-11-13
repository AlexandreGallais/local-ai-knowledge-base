---
title: "SVGUseElement: width property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svguseelement/width/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGUseElement: width property

The **`width`** read-only property of the `SVGUseElement` interface describes the width of the referenced element as an `SVGAnimatedLength`. It reflects the computed value of the `width` attribute on the `<use>` element.

The attribute value is a `<length>`, `<percentage>`, or `<number>`. The numeric value of the `SVGAnimatedLength.baseVal` is the width of the referenced element in the user coordinate system.

## Value

An `SVGAnimatedLength`.

## Examples

Given the following SVG:

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <circle id="circle1" cx="50" cy="50" r="40" fill="blue" />
    <circle id="circle2" cx="50" cy="50" r="40" fill="red" />
  </defs>
  <use x="50%" y="50%" href="#circle1" width="50" />
  <use x="25%" y="50%" href="#circle2" width="100" />
</svg>
```

We can access the computed values of the `width` attributes:

```js
const uses = document.querySelectorAll("use");
const widthUse1 = uses[0].width;
const widthUse2 = uses[1].width;

console.log(widthUse1.baseVal.value); // output: 50
console.log(widthUse2.baseVal.value); // output: 100
```

## See also

- `SVGUseElement.height`
- `SVGAnimatedLength.baseVal`
