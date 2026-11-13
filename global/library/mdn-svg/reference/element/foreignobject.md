---
title: "<foreignObject>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/foreignobject/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <foreignObject>

The **`<foreignObject>`** SVG element includes elements from a different XML namespace. In the context of a browser, it is most likely (X)HTML.

## Attributes

- `height`
    The height of the foreignObject.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `auto`; _Animatable_: **yes**
- `width`
    The width of the foreignObject.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `auto`; _Animatable_: **yes**
- `x`
    The x coordinate of the foreignObject.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `y`
    The y coordinate of the foreignObject.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**

> **Note:**
> Starting with SVG2, `x`, `y`, `width`, and `height` are _Geometry Properties_, meaning those attributes can also be used as CSS properties for that element.

## DOM Interface

This element implements the `SVGForeignObjectElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <style>
    div {
      color: white;
      font: 18px serif;
      height: 100%;
      overflow: auto;
    }
  </style>

  <polygon points="5,5 195,10 185,185 10,195" />

  <!-- Common use case: embed HTML text into SVG -->
  <foreignObject x="20" y="20" width="160" height="160">
    <!--
      In the context of SVG embedded in an HTML document, the XHTML
      namespace could be omitted, but it is mandatory in the
      context of an SVG document
    -->
    <div xmlns="http://www.w3.org/1999/xhtml">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis mollis
      mi ut ultricies. Nullam magna ipsum, porta vel dui convallis, rutrum
      imperdiet eros. Aliquam erat volutpat.
    </div>
  </foreignObject>
</svg>
```
