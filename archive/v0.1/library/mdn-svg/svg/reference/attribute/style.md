---
title: "style"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/style/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# style

The **`style`** attribute allows you to style an element using CSS declarations. It functions identically to the `style` attribute in HTML.

You can use this attribute with any SVG element.

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
  <rect
    width="80"
    height="40"
    x="10"
    y="10"
    style="fill: skyblue; stroke: cadetblue; stroke-width: 2;" />
</svg>
```

## Usage notes

       | Value
       | `&#x3C;style>`

       | Default value
       | None

       | Animatable
       | No

- `<style>`
    The syntax of style data depends on the style sheet language. By default, the style sheet language is CSS.

## See also

- `<style>`
- HTML `style` attribute
