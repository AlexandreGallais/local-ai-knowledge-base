---
title: "SVGFETileElement: result property"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/api/svgfetileelement/result/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# SVGFETileElement: result property

The **`result`** read-only property of the `SVGFETileElement` interface describes the assigned name of an SVG filter primitive as an `SVGAnimatedString`.

It reflects the `result` attribute of the `<feTile>` element, which fills a target rectangle with a repeated, tiled pattern of an input image. The attribute value is a `custom-ident`. If supplied, then graphics that result from processing this filter primitive can be referenced by an `in` attribute on a subsequent filter primitive within the same `<filter>` element.

If no `result` attribute is defined, the filter's `result.baseVal` and `result.animVal` are empty strings, and the output of the `<feTile>` filter will only be available for re-use as the implicit input into the next filter primitive if that filter primitive provides no value for its `in` attribute.

## Value

An `SVGAnimatedString`.

## Example

```js
const feTileElement = document.querySelector("feTile");
const filterName = feTileElement.result;
console.log(filterName.baseVal); // the filter's assigned name
```

## See also

- `SVGFETileElement.in1`
- `SVGPatternElement`
- `custom-ident` data type
