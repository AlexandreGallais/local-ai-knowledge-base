---
title: "SVGAnimatedEnumeration"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/svganimatedenumeration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SVGAnimatedEnumeration

The **`SVGAnimatedEnumeration`** interface describes attribute values which are constants from a particular enumeration and which can be animated.

From SVG 2, both `baseVal` and `animVal` reflect the non-animated value of the attribute.
The allowed values of its properties depend on the associated attribute.

## Instance properties

- `baseVal`
    An integer that is the base value of the given attribute before applying any animations.
- `animVal` (read-only)
    This is the same as `baseVal` in SVG 2.

## Instance methods

The `SVGAnimatedEnumeration` interface does not provide any specific methods.

## Basic usage

Consider this snippet with a `<clipPath>` element: Its `clipPathUnits` is associated with a `SVGAnimatedEnumeration` object.

```html
<svg viewBox="0 0 100 100" width="200" height="200">
  <clipPath id="clip1" clipPathUnits="userSpaceOnUse">
    <circle cx="50" cy="50" r="35" />
  </clipPath>

  <!-- Some reference rect to materialized to clip path -->
  <rect id="r1" x="0" y="0" width="45" height="45" />
</svg>
```

The following JavaScript gets the element, and logs the `baseVal` and `animVal` of the `SVGClipPathElement.clipPathUnits` property.
These values should be the same.

```js
const clipPathElt = document.getElementById("clip1");
console.log(clipPathElt.clipPathUnits.baseVal); // Logs 1 that correspond to userSpaceOnUse
console.log(clipPathElt.clipPathUnits.animVal); // Logs 1 that correspond to userSpaceOnUse
```
