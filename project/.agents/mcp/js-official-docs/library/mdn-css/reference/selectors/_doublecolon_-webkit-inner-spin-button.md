---
title: "`::-webkit-inner-spin-button` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-webkit-inner-spin-button/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-webkit-inner-spin-button` CSS pseudo-element

The **`::-webkit-inner-spin-button`** CSS pseudo-element is used to style the inner part of the spinner button of number picker input elements.

## Syntax

```css
::-webkit-inner-spin-button {
  /* ... */
}
```

## Examples

These examples work only in browsers based on WebKit and Blink.

### Changing the cursor in the spin controls

In this example, the CSS `cursor` is changed to `pointer` whenever the cursor is positioned over the inner part of the input's spin controls.

#### HTML

```html
<input type="number" />
```

#### CSS

```css
input[type="number"]::-webkit-inner-spin-button {
  cursor: pointer;
}
```

#### Result

## Specifications

Not part of any standard.

## See also

- `::-webkit-textfield-decoration-container`
