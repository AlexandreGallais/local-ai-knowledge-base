---
title: "<view>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/view/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <view>

The **`<view>`** SVG element defines a particular view of an SVG document. A specific view can be displayed by referencing the `<view>` element's `id` as the target fragment of a URL.

## Attributes

- `preserveAspectRatio`
    This attribute defines how the SVG fragment must be deformed if it is embedded in a container with a different aspect ratio.
    _Value type_: (`none` | `xMinYMin` | `xMidYMin` | `xMaxYMin` | `xMinYMid` | `xMidYMid` | `xMaxYMid` | `xMinYMax` | `xMidYMax` | `xMaxYMax`) (`meet` | `slice`)?; _Default value_: `xMidYMid meet`; _Animatable_: **yes**
- `viewBox`
    This attribute defines the bound of the SVG viewport for the pattern fragment.
    _Value type_: **\<list-of-numbers>**; _Default value_: none; _Animatable_: **yes**
- `zoomAndPan` (deprecated)
    This attribute specifies whether the SVG document can be magnified and panned.
    _Value type_: **disable | magnify**; _Default value_: magnify; _Animatable_: **no**

## DOM Interface

This element implements the `SVGViewElement` interface.

## Example

### SVG

```svg
<svg viewBox="0 0 300 100" width="300" height="100"
      xmlns="http://www.w3.org/2000/svg">

  <view id="one" viewBox="0 0 100 100" />
  <circle cx="50" cy="50" r="40" fill="red" />

  <view id="two" viewBox="100 0 100 100" />
  <circle cx="150" cy="50" r="40" fill="green" />

  <view id="three" viewBox="200 0 100 100" />
  <circle cx="250" cy="50" r="40" fill="blue" />
</svg>
```

### HTML

```html
<img src="example.svg" alt="three circles" width="300" height="100" />
<br />
<img src="example.svg#three" alt="blue circle" width="100" height="100" />
```
