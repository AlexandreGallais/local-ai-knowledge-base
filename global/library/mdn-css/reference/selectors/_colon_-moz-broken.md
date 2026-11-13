---
title: "`:-moz-broken` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_-moz-broken/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:-moz-broken` CSS pseudo-class

The **`:-moz-broken`** CSS pseudo-class is a Mozilla extension that matches elements representing broken image links.

> **Note:**
> This selector is mainly intended to be used by theme developers.

## Syntax

```css
:-moz-broken {
  /* ... */
}
```

## Examples

### HTML

```html
<img src="broken.jpg" alt="This image is broken. :-(" />
```

### CSS

```css
:-moz-broken {
  background: bisque;
  padding: 8px;
}
```

## Specifications

Not part of any standard.

## See also

- `:-moz-loading`, `:-moz-suppressed`, `:-moz-user-disabled`
- Firefox bug 11011
