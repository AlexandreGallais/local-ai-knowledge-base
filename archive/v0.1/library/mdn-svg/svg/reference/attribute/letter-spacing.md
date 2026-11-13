---
title: "letter-spacing"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/letter-spacing/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# letter-spacing

The **`letter-spacing`** attribute controls spacing between text characters.

If the attribute value is a unitless number (like `128`), the browser processes it as a `length` in the current user coordinate system.

If the attribute value has a unit identifier, such as `.25em` or `1%`, then the browser converts the `<length>` into its corresponding value in the current user coordinate system.

> **Note:**
> As a presentation attribute, `letter-spacing` also has a CSS property counterpart: `letter-spacing`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- `<text>`
- `<textPath>`
- `<tspan>`

## Examples

### Controlling SVG letter spacing

```html
<svg viewBox="0 0 400 30" xmlns="http://www.w3.org/2000/svg">
  <text y="20" letter-spacing="2">Bigger letter-spacing</text>
  <text x="200" y="20" letter-spacing="-0.5">Smaller letter-spacing</text>
</svg>
```

## Usage notes

       | Value
       | `normal` | `length`

       | Default value
       | `normal`

       | Animatable
       | Yes

For a description of the values, please refer to the CSS `letter-spacing` property.

## See also

- CSS `letter-spacing` property
