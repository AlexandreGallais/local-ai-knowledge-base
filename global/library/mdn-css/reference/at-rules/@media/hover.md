---
title: "`hover` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/hover/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `hover` CSS media feature

The **`hover`** CSS media feature can be used to test whether the user's _primary_ input mechanism can hover over elements.

## Syntax

The `hover` feature is specified as a keyword value chosen from the list below.

- `none`
    The primary input mechanism cannot hover at all or cannot conveniently hover (e.g., many mobile devices emulate hovering when the user performs an inconvenient long tap), or there is no primary pointing input mechanism.
- `hover`
    The primary input mechanism can conveniently hover over elements.

## Examples

### HTML

```html
<a href="#">Try hovering over me!</a>
```

### CSS

```css
/* default hover effect */
a:hover {
  color: black;
  background: yellow;
}

@media (hover: hover) {
  /* when hover is supported */
  a:hover {
    color: white;
    background: black;
  }
}
```

## See also

- Using Media Queries
- @media
