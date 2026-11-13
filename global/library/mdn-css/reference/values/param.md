---
title: "`param()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/param/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `param()` CSS function

The **`param()`** CSS function is used to set link parameters. It can be used in the `link-parameters` CSS property, in the URL fragment of an external resource, or in the `<url-modifier>` of the `url()` CSS function.

## Syntax

```css
/* a single value */
param(--color, red);

/* multiple values */
param(--color1, red),
param(--color2, blue),
param(--color3, green);
```

## Values

- `<dashed-ident>`
    A `<dashed-ident>` is a user-defined variable that is used as an identifier in the `env` CSS function to update the value.

- `<declaration_value>` (optional)
    A `<declaration_value>` is the value of the attribute being updated. If the `<declaration-value>` is omitted, it represents an empty value.

## Examples

All of the following examples use the same SVG file, which has attributes set with `env` CSS function.

```svg
<!-- example of the code in the external SVG file -->
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <rect
    width="100"
    height="100"
    stroke="env(--color1, chartreuse)"
    stroke-width="10"
    fill="env(--color2, darkgreen)"
   />
</svg>
```

### Using `link-parameters` property

In this example the SVG attributes are updated with the `link-parameters` CSS property and `param()` function.

```html
<div class="squares">
  <img
    class="original"
    src="square.svg"
    alt="A square with a chartreuse border and a dark green fill." />
  <img
    class="greyscale"
    src="square.svg"
    alt="A square with a slate grey border and a light grey fill." />
  <img
    class="high-contrast"
    src="square.svg"
    alt="A square with a fuchsia border and a yellow fill." />
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
.greyscale {
  link-parameters:
    param(--color1, slategrey),
    param(--color2, lightgrey);
  &:hover {
    link-parameters:
      param(--color1, lightgrey),
      param(--color2, slategrey);
  }
}
.high-contrast {
  link-parameters:
    param(--color1, fuchsia),
    param(--color2, yellow);
  &:hover {
    link-parameters:
      param(--color1, yellow),
      param(--color2, fuchsia);
  }
}
```

### Passing `param()` into URL modifier

In this example the SVG attributes are updated by passing the `param()` function into the URL fragment of the `src` attribute of the `` HTML element.

```html
<img
  src="square.svg#param(--color1, slategrey)&param(--color2, lightgrey)"
  alt="A square with a slate grey border and a light grey fill."
/>
```

### Using `param()` with `background-image` property

In this example the SVG attributes are updated by passing the `param()` function into the `url()` data type of the `background-image` CSS property.

```css
.foo {
  background-image: url(
    "square.svg"
    param(--color1, slategrey)
    param(--color2, lightgrey)
  );
}
```

## See also

- `link-parameters`
- `env`
