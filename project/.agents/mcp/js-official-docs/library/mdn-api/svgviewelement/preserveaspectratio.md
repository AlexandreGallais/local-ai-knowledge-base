---
title: "SVGViewElement: preserveAspectRatio property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svgviewelement/preserveaspectratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGViewElement: preserveAspectRatio property

The **`preserveAspectRatio`** read-only property of the `SVGViewElement` interface reflects the `preserveAspectRatio` attribute of the given `<view>` element. It defines how the content within the `view` should be scaled to fit its viewport while preserving its aspect ratio.

## Value

An `SVGAnimatedPreserveAspectRatio` object.

## Example

Given the following SVG, we can use the `preserveAspectRatio` property to retrieve the scaling behavior for a `view` element:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <view id="view1" preserveAspectRatio="xMidYMid meet"></view>
  <circle cx="100" cy="100" r="80" fill="blue" />
</svg>
```

We can access the `preserveAspectRatio` attribute:

```js
const view = document.querySelector("view");

console.log(view.preserveAspectRatio.baseVal); // output: SVGPreserveAspectRatio {align: 1, meetOrSlice: 1}
```

## See also

- `preserveAspectRatio`
