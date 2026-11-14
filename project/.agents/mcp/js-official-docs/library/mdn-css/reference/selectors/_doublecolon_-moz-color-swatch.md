---
title: "`::-moz-color-swatch` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-moz-color-swatch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-moz-color-swatch` CSS pseudo-element

The **`::-moz-color-swatch`** CSS pseudo-element is a Mozilla extension that represents the color selected in an `` of `type="color"`.

> **Note:**
> Using `::-moz-color-swatch` with anything but an `` doesn't match anything and has no effect.

## Syntax

```css
::-moz-color-swatch {
  /* ... */
}
```

## Examples

### HTML

```html
<input type="color" value="#de2020" />
```

### CSS

```css
input[type="color"]::-moz-color-swatch {
  border-radius: 10px;
  border-style: none;
}
```

## Specifications

Not part of any standard.

## See also

- Similar pseudo-elements used by other browsers:
  - `::-webkit-color-swatch`, pseudo-element supported by WebKit and Blink (Safari, Chrome, and Opera)
