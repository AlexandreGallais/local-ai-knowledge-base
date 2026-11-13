---
title: "SVGAnimatedInteger: baseVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedinteger/baseval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
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
