---
title: "`<display-listitem>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/display-listitem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<display-listitem>` CSS type

The `list-item` keyword causes the element to generate a `::marker` pseudo-element with the content specified by its `list-style` properties (for example a bullet point) together with a principal box of the specified type for its own contents.

## Syntax

A single value of `list-item` will cause the element to behave like a list item. This can be used together with `list-style-type` and `list-style-position`.

`list-item` can also be combined with any `<display-outside>` keyword and the `flow` or `flow-root` `<display-inside>` keywords.

> **Note:**
> In browsers that support the two-value syntax, if no inner value is specified it will default to `flow`. If no outer value is specified, the principal box will have an outer display type of `block`.

## Examples

### HTML

```html
<div class="fake-list">I will display as a list item</div>
```

### CSS

```css
.fake-list {
  display: list-item;
  list-style-position: inside;
}
```

## See also

- `display`
  - `<display-outside>`
  - `<display-inside>`
  - `<display-internal>`
  - `<display-box>`
  - `<display-legacy>`
