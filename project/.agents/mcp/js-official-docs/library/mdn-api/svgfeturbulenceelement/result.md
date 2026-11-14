---
title: "SVGFETurbulenceElement: result property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeturbulenceelement/result/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFETurbulenceElement: result property

The **`result`** read-only property of the `SVGFETurbulenceElement` interface describes the assigned name of an SVG filter primitive as a `SVGAnimatedString`.

It reflects the `result` attribute of the `<feTurbulence>` element, which allows the synthesis of artificial textures. The attribute value is a `custom-ident`. If supplied, then graphics that result from processing this filter primitive can be referenced by an `in` attribute on a subsequent filter primitive within the same `<filter>` element.

If no `result` attribute is defined, the filter's `result.baseVal` and `result.animVal` are empty strings, and the output of the `<feTurbulence>` filter will only be available for re-use as the implicit input into the next filter primitive if that filter primitive provides no value for its `in` attribute.

## Value

An `SVGAnimatedString`.

## Example

```js
const feTurbulenceElement = document.querySelector("feTurbulence");
const filterName = feTurbulenceElement.result;
console.log(filterName.baseVal); // the filter's assigned name
```

## See also

- `custom-ident` data type
