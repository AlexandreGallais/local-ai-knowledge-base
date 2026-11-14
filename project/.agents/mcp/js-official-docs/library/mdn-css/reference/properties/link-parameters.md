---
title: "`link-parameters` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/link-parameters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `link-parameters` CSS property

The **`link-parameters`** CSS property sets values of external resources, such as SVGs, whose attributes have been set with the `env` CSS function

## Syntax

```css
/* single value */
link-parameters: param(--color, red);

/* multiple values */
link-parameters:
  param(--color1, red),
  param(--color2, blue),
  param(--color3, green);
```

## Values

- `none`
    No link parameters are specified.

- `param`
    A list of one or more link parameters.

## Example

### Updating the colors of an external SVG file

In this example the original SVG, on the left, is a square with `stroke` attribute set with `env(--color1, chartreuse)` and `fill` attribute set with `env(--color2, darkgreen)`. The `link-parameters` property is used to update both of these attributes on the updated square, on the right, with multiple `param` CSS functions.

```html
<div class="squares">
  <img
    class="original"
    src="square.svg"
    alt="A square with a chartreuse border and a dark green fill." />
  <img
    class="updated"
    src="square.svg"
    alt="A square with a red border and a tomato fill." />
</div>
```

```css
.squares {
  height: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
img {
  height: 100%;
}
```

```css
.updated {
  link-parameters:
    param(--color1, red),
    param(--color2, tomato);
}
```

## See also

- `param`
- `env`
