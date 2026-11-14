---
title: "`::-moz-focus-inner` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-moz-focus-inner/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-moz-focus-inner` CSS pseudo-element

The **`::-moz-focus-inner`** CSS pseudo-element is a Mozilla extension that represents an inner focus ring of the `` element as well as the ``, `<submit>`, `<reset>`, and `<color>` types of the `` element.

> **Note:**
> Using `::-moz-focus-inner` with anything than the buttons that support it doesn't match anything and has no effect.

## Syntax

```css
::-moz-focus-inner {
  /* ... */
}
```

## Example

### HTML

```html
<input type="submit" value="Input" /> <button type="submit">Button</button>
```

### CSS

```css
button::-moz-focus-inner,
input[type="color"]::-moz-focus-inner,
input[type="reset"]::-moz-focus-inner,
input[type="button"]::-moz-focus-inner,
input[type="submit"]::-moz-focus-inner {
  padding-block-start: 0px;
  padding-inline-end: 2px;
  padding-block-end: 0px;
  padding-inline-start: 2px;
  border: 2px dotted red;
}
```

## Specifications

Not part of any standard.

## See also

- Mozilla CSS extensions
- Related CSS properties:
  - `-moz-user-focus`

- Related CSS selectors:
  - `:focus`
  - `:focus-visible`
  - `:focus-within`
