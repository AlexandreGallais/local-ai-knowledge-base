---
title: "`::-moz-list-number` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-moz-list-number/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-moz-list-number` CSS pseudo-element

The **`::-moz-list-number`** CSS pseudo-element is a Mozilla extension that represents the marker (typically a number) of a list item (``) in an ordered list (``).

## Syntax

```css
li::-moz-list-number {
  /* ... */
}
```

## Examples

### HTML

```html
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>
```

### CSS

```css
li::-moz-list-number {
  font-style: italic;
  font-weight: bold;
}
```

## Specifications

Not part of any standard.

## See also

- `::-moz-list-bullet`
- `::marker`
