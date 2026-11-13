---
title: "SVGFEConvolveMatrixElement: edgeMode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgfeconvolvematrixelement/edgemode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGFEConvolveMatrixElement: edgeMode property

The **`edgeMode`** read-only property of the `SVGFEConvolveMatrixElement` interface reflects the `edgeMode` attribute of the given `<feConvolveMatrix>` element. The `SVG_EDGEMODE_*` constants defined on this interface are represented by the numbers 1 through 3, where the default `duplicate` is `1`, `wrap` is `2`, and `none` is `3`.

## Value

An `SVGAnimatedEnumeration` object.

## Examples

In this example, we retrieve the `<feConvolveMatrix>` filter element's `edgeMode` attribute value using the `edgeMode` property of the `SVGFEConvolveMatrixElement` interface.

If our SVG contains the following filter:

```html
<feConvolveMatrix kernelMatrix="3 0 0 0 0 0 0 0 -4" id="el" edgeMode="wrap" />
```

We can access the number associated with the enumerated keyword value of the `edgeMode` attribute of the `feConvolveMatrix` element.

```js
const el = document.getElementById("el");
console.log(el.edgeMode.baseVal); // output: 2
```

## See also

- `SVGAnimatedEnumeration`
- `SVGFEGaussianBlurElement.edgeMode`
