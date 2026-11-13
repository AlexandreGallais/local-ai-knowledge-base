---
title: "<style>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <style>

The **`<style>`** SVG element allows style sheets to be embedded directly within SVG content.

> **Note:**
> SVG's `style` element has the same attributes as the corresponding element in HTML (see HTML's `<style>` element).

## Attributes

- `type`
    This attribute defines type of the style sheet language to use as a media type string.
    _Value type_: **`<media-type>`**; _Default value_: `text/css`; _Animatable_: **no**
- `media`
    This attribute defines to which `media` the style applies.
    _Value type_: **`<media-query-list>`**; _Default value_: `all`; _Animatable_: **no**
- `title`
    This attribute is the title of the style sheet which can be used to switch between alternate style sheets.
    _Value type_: **`<string>`**; _Default value_: _none_; _Animatable_: **no**

## DOM Interface

This element implements the `SVGStyleElement` interface.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
  <style>
    circle {
      fill: gold;
      stroke: maroon;
      stroke-width: 2px;
    }
  </style>

  <circle cx="5" cy="5" r="4" />
</svg>
```

## See also

- `<<style> element in HTML>`
