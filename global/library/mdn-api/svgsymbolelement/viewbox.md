---
title: "SVGSymbolElement: viewBox property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgsymbolelement/viewbox/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGSymbolElement: viewBox property

The **`viewBox`** read-only property of the `SVGSymbolElement` interface reflects the `viewBox` attribute of the given `<symbol>` element.

## Value

An `SVGAnimatedRect` object.

## Examples

### Accessing the `viewBox` Property

```html
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
  <defs>
    <symbol id="exampleSymbol" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="blue" />
    </symbol>
  </defs>
  <use href="#exampleSymbol" x="50" y="50" width="100" height="100" />
</svg>
```

```js
const symbolElement = document.getElementById("exampleSymbol");

// Access the viewBox property
const viewBox = symbolElement.viewBox.baseVal;

console.log(viewBox.x); // Output: 0
console.log(viewBox.y); // Output: 0
console.log(viewBox.width); // Output: 100
console.log(viewBox.height); // Output: 100
```

## See also

- `viewBox`
