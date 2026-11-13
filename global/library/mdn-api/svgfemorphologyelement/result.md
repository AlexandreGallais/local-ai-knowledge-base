---
title: "SVGFEMorphologyElement: result property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfemorphologyelement/result/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEMorphologyElement: result property

The **`result`** read-only property of the `SVGFEMorphologyElement` interface describes the assigned name of an SVG filter primitive as a `SVGAnimatedString`.

It reflects the `result` attribute of the `<feMorphology>` element. The attribute value is a `custom-ident`. If supplied, then graphics that result from processing this filter primitive can be referenced by an `in` attribute on a subsequent filter primitive within the same `<filter>` element.

If no `result` attribute is defined, the filter's `result.baseVal` and `result.animVal` are empty strings, and the output of the `<feMorphology>` filter will only be available for re-use as the implicit input into the next filter primitive if that filter primitive provides no value for its `in` attribute.

## Value

An `SVGAnimatedString`.

## Example

```js
const feMorphologyElement = document.querySelector("feMorphology");
const filterName = feMorphologyElement.result;
console.log(filterName.baseVal); // the filter's assigned name
```

## See also

- `SVGFEMorphologyElement.in1`
- `custom-ident` data type
