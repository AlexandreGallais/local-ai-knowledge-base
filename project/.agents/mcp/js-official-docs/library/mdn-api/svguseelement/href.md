---
title: "SVGUseElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svguseelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGUseElement: href property

The **`href`** read-only property of the `SVGUseElement` interface reflects the `href` or `xlink:href` (deprecated) attribute of the given element.

## Value

An `SVGAnimatedString` object.

## Examples

Given the following SVG:

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <circle id="circle1" cx="50" cy="50" r="40" fill="blue" />
    <circle id="circle2" cx="50" cy="50" r="40" fill="red" />
  </defs>
  <use href="#circle1" x="50" y="50" />
  <use href="#circle2" x="100" y="50" />
</svg>
```

We can access the `href` attribute of the `<use>` elements:

```js
const uses = document.querySelectorAll("use");
console.log(uses[0].href.baseVal); // output: "#circle1"
console.log(uses[1].href.baseVal); // output: "#circle2"
```
