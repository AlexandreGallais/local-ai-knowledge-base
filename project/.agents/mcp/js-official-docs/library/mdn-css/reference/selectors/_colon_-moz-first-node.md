---
title: "`:-moz-first-node` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_-moz-first-node/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:-moz-first-node` CSS pseudo-class

The **`:-moz-first-node`** CSS pseudo-class is a Mozilla extension that represents any element that is the first child node of some other element. It differs from `:first-child` because it does not match a first-child element with (non-whitespace) text before it.

> **Note:**
> Any whitespace at the start of an element is ignored for the determination of `:-moz-first-node`.

## Syntax

```css
:-moz-first-node {
  /* ... */
}
```

## Examples

### HTML

```html
<p>
  <span>This matches!</span>
  <span>This doesn't match.</span>
</p>

<p>
  Blahblah.
  <span>This doesn't match because it's preceded by text.</span>
</p>
```

### CSS

```css
span:-moz-first-node {
  background-color: lime;
}
```

## Specifications

Not part of any standard.

## See also

- `:-moz-last-node`
- `:first-child`
