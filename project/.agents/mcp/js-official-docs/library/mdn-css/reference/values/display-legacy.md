---
title: "`<display-legacy>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/display-legacy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<display-legacy>` CSS type

CSS 2 used a single-keyword syntax for the `display` property, requiring separate keywords for block-level and inline-level variants of the same layout mode. This page details those values.

## Syntax

Valid `<display-legacy>` values:

- `inline-block`
    The element generates a block element box that will be flowed with surrounding content as if it were a single inline box (behaving much like a replaced element would).

    It is equivalent to `inline flow-root`.

- `inline-table`
    The `inline-table` value does not have a direct mapping in HTML. It behaves like an HTML `` element, but as an inline box, rather than a block-level box. Inside the table box is a block-level context.

    It is equivalent to `inline table`.

- `inline-flex`
    The element behaves like an inline element and lays out its content according to the flexbox model.

    It is equivalent to `inline flex`.

- `inline-grid`
    The element behaves like an inline element and lays out its content according to the grid model.

    It is equivalent to `inline grid`.

## Examples

In the below example, we are creating an inline flex container with the legacy keyword inline-flex.

### HTML

```html
<div class="container">
  <div>Flex Item</div>
  <div>Flex Item</div>
</div>

Not a flex item
```

### CSS

```css
.container {
  display: inline-flex;
}
```

### Result

In the new syntax the inline flex container would be created using two values, inline for the outer display type, and flex for the inner display type.

```css
.container {
  display: inline flex;
}
```

## See also

- `display`
  - `<display-outside>`
  - `<display-inside>`
  - `<display-listitem>`
  - `<display-internal>`
  - `<display-box>`
