---
title: "SVGUseElement: y property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svguseelement/y/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGUseElement: y property

The **`y`** read-only property of the `SVGUseElement` interface describes the y-axis coordinate of the start point of the referenced element as an `SVGAnimatedLength`. It reflects the computed value of the `y` attribute on the `<use>` element.

The attribute value is a `<length>`, `<percentage>`, or `<number>`. The numeric value of the `SVGAnimatedLength.baseVal` is the y-coordinate of the top-left corner of the referenced element in the user coordinate system.

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
  <use x="50%" y="50%" href="#circle1" />
  <use x="25%" y="25%" href="#circle2" />
</svg>
```

We can access the computed values of the `y` attributes:

```js
const uses = document.querySelectorAll("use");
const yUse1 = uses[0].y;
const yUse2 = uses[1].y;

console.log(yUse1.baseVal.value); // output: 100 (50% of 200)
console.log(yUse2.baseVal.value); // output: 50 (25% of 200)
```

## See also

- `SVGUseElement.x`
- `SVGAnimatedLength.baseVal`
