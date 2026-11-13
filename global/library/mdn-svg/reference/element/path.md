---
title: "<path>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/path/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <path>

The **``** SVG element is the generic element to define a shape. All the basic <example-value> can be created with a path element.

## Attributes

- `d`
    This attribute defines the shape of the path.
    _Value type_: **\<string>**; _Default value_: `''`; _Animatable_: **yes**
- `pathLength`
    This attribute lets authors specify the total length for the path, in user units.
    _Value type_: **\<number>**; _Default value_: _none_; _Animatable_: **yes**

## DOM Interface

This element implements the `SVGPathElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M 10,30
           A 20,20 0,0,1 50,30
           A 20,20 0,0,1 90,30
           Q 90,60 50,90
           Q 10,60 10,30 z" />
</svg>
```

## See also

- SVG basic <example-value>: `<circle>`, `<ellipse>`, `<line>`, `<polygon>`, `<polyline>`, `<rect>`
- The MDN SVG "Getting Started" tutorial: Path
