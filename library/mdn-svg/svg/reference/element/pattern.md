---
title: "<pattern>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/pattern/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <pattern>

The **`<pattern>`** SVG element defines a graphics object which can be redrawn at repeated x- and y-coordinate intervals ("tiled") to cover an area.

The `<pattern>` is referenced by the `fill` and/or `stroke` attributes on other graphics elements to fill or stroke those elements with the referenced pattern.

## Attributes

- `height`
    This attribute determines the height of the pattern tile.
    _Value type_: **\<length>**; _Default value_: `0`; _Animatable_: **yes**
- `href`
    This attribute reference a template pattern that provides default values for the `<pattern>` attributes.
    _Value type_: **\<URL>**; _Default value_: _none_; _Animatable_: **yes**
- `patternContentUnits`
    This attribute defines the coordinate system for the contents of the `<pattern>`.
    _Value type_: `userSpaceOnUse` | `objectBoundingBox`; _Default value_: `userSpaceOnUse`; _Animatable_: **yes**

    > **Note:**
    > This attribute has no effect if a `viewBox` attribute is specified on the `<pattern>` element.

- `patternTransform`
    This attribute contains the definition of an optional additional transformation from the pattern coordinate system onto the target coordinate system.
    _Value type_: **\<transform-list>**; _Default value_: _identity transform_; _Animatable_: **yes**
- `patternUnits`
    This attribute defines the coordinate system for attributes `x`, `y`, `width`, and `height`.
    _Value type_: `userSpaceOnUse` | `objectBoundingBox`; _Default value_: `objectBoundingBox`; _Animatable_: **yes**
- `preserveAspectRatio`
    This attribute defines how the SVG fragment must be deformed if it is embedded in a container with a different aspect ratio.
    _Value type_: (`none` | `xMinYMin` | `xMidYMin` | `xMaxYMin` | `xMinYMid` | `xMidYMid` | `xMaxYMid` | `xMinYMax` | `xMidYMax` | `xMaxYMax`) (`meet` | `slice`)?; _Default value_: `xMidYMid meet`; _Animatable_: **yes**
- `viewBox`
    This attribute defines the bound of the SVG viewport for the pattern fragment.
    _Value type_: **\<list-of-numbers>**; _Default value_: none; _Animatable_: **yes**
- `width`
    This attribute determines the width of the pattern tile.
    _Value type_: **\<length>**; _Default value_: `0`; _Animatable_: **yes**
- `x`
    This attribute determines the x coordinate shift of the pattern tile.
    _Value type_: **\<length>**; _Default value_: `0`; _Animatable_: **yes**
- `xlink:href` (deprecated)
    This attribute references a template pattern that provides default values for the `<pattern>` attributes.
    _Value type_: **\<URL>**; _Default value_: _none_; _Animatable_: **yes**

    > **Note:**
    > For browsers implementing `href`, if both `href` and `xlink:href` are set, `xlink:href` will be ignored and only `href` will be used.

- `y`
    This attribute determines the y coordinate shift of the pattern tile.
    _Value type_: **\<length>**; _Default value_: `0`; _Animatable_: **yes**

## DOM Interface

This element implements the `SVGPatternElement` interface.

## Examples

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 230 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="star" viewBox="0,0,10,10" width="10%" height="10%">
      <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2" />
    </pattern>
  </defs>

  <circle cx="50" cy="50" r="50" fill="url(#star)" />
  <circle
    cx="180"
    cy="50"
    r="40"
    fill="none"
    stroke-width="20"
    stroke="url(#star)" />
</svg>
```
