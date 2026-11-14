---
title: "SVGAnimatedInteger: baseVal property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedinteger/baseval/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedInteger: baseVal property

The **`baseVal`** property of the `SVGAnimatedInteger` interface represents the base (non-animated) value of an animatable `<integer>`.

Some attributes, like the `numOctaves` attribute of the `<feTurbulence>` element or the `order` attribute of the `<feConvolveMatrix>` accept a `long` integer as a value. This property provides access to the static non-animated state of the attribute as a number.

## Value

A `long`; the base (non-animated) value of the reflected attribute.

## Examples

```js
const feTurbulence = document.querySelector("feTurbulence");

// Set the animatable 'numOctaves' attribute
feTurbulence.setAttribute("numOctaves", "4");

// Access the SVGAnimatedInteger object
const animatedInteger = feTurbulence.numOctaves;

// Get the base value
console.log(animatedInteger.baseVal); // Output: 4

// Modify the base value
animatedInteger.baseVal = 6;

// Verify the reflected attribute value
console.log(feTurbulence.getAttribute("numOctaves")); // Output: "6"
```

## See also

- `<integer>`
- `numOctaves`
- `order`
