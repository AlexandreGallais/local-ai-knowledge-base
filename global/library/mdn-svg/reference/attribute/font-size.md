---
title: "font-size"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/font-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# font-size

The **`font-size`** attribute refers to the size of the font from baseline to baseline when multiple lines of text are set solid in a multiline layout environment.

> **Note:**
> As a presentation attribute, `font-size` also has a CSS property counterpart: `font-size`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Examples

### Controlling SVG font size

```html
<svg viewBox="0 0 200 30" xmlns="http://www.w3.org/2000/svg">
  <text y="25" font-size="smaller">smaller</text>
  <text x="100" y="25" font-size="2em">2em</text>
</svg>
```

## Usage notes

       | Value
       |
        `&#x3C;absolute-size>` | `&#x3C;relative-size>` |
        `&#x3C;length-percentage>`

       | Default value
       | `medium`

       | Animatable
       | Yes

For a description of the values, please refer to the CSS `font-size` property.

## See also

- CSS `font-size` property
