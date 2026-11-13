---
title: "SVGAnimatedInteger: animVal property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svganimatedinteger/animval/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedInteger: animVal property

The **`animVal`** property of the `SVGAnimatedInteger` interface represents the animated value of an `<integer>`. If no animation is applied, `animVal` equals `baseVal`.

Some attributes, like the `numOctaves` attribute of the `<feTurbulence>` element or the `order` attribute of the `<feConvolveMatrix>` accept a `long` integer as a value. This property provides access to the current animated state of the attribute as a number.

## Value

A `long`; the animated value of the attribute.

## Examples

```js
const feTurbulence = document.querySelector("feTurbulence");

// Set the animatable 'numOctaves' attribute
feTurbulence.setAttribute("numOctaves", "4");

// Access the SVGAnimatedInteger object
const animatedInteger = feTurbulence.numOctaves;

// Get the animated value (read-only)
console.log(animatedInteger.animVal); // Output: 4 (the current animated value)
```

## See also

- `<integer>`
- `numOctaves`
- `order`
