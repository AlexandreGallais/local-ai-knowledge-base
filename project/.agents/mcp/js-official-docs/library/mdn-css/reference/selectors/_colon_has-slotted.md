---
title: "`:has-slotted` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_has-slotted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:has-slotted` CSS pseudo-class

The **`:has-slotted`** CSS pseudo-class matches when the content of a `<slot>` element is not empty or not using the default value (see Using templates and slots for more information).

> **Note:**
> Even a single whitespace text node is sufficient to make `:has-slotted` apply.

This only works when used inside CSS placed within a shadow DOM.

```css
/* Selects the content of a <slot> element that has content that is not default  */
:has-slotted {
  color: green;
}

/* Selects the content of a <slot> element that has no content or default  */
:not(:has-slotted) {
  color: red;
}
```

## Syntax

```css
:has-slotted {
  /* ... */
}
```

## Examples

This example has two `<slot>` elements, one of which has been assigned some content and the other has not.

### HTML

```html
<p>
  <template shadowrootmode="open">
    <style>
      :has-slotted {
        color: rebeccapurple;
      }
    </style>
    <slot name="one">Placeholder 1</slot>
    <slot name="two">Placeholder 2</slot>
  </template>
  <span slot="one">Slotted content</span>
</p>
```

### Result

The `<slot>` element that has been assigned content matched the `:has-slotted` pseudo-class and has the `color` value of `rebeccapurple` applied.

## See also

- HTML `<template>` element
- HTML `<slot>` element
- `::slotted`
