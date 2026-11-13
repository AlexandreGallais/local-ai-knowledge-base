---
title: "`::-moz-list-bullet` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_-moz-list-bullet/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::-moz-list-bullet` CSS pseudo-element

The **`::-moz-list-bullet`** CSS pseudo-element is a Mozilla extension that represents the marker (typically a bullet) of a list item (``) in an unordered list (``).

## Syntax

```css
li::-moz-list-bullet {
  /* ... */
}
```

## Examples

### Styling list item markers

#### HTML

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

#### CSS

```css
::-moz-list-bullet {
  color: red;
  font-size: 1.5em;
}
```

#### Result

## Specifications

Not part of any standard.

## See also

- `::-moz-list-number`
- `::marker`
