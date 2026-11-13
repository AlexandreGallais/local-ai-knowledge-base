---
title: "`:-moz-last-node` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_-moz-last-node/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:-moz-last-node` CSS pseudo-class

The **`:-moz-last-node`** CSS pseudo-class is a Mozilla extension that represents any element that is the last child node of some other element. It differs from `:last-child` because it does not match a last-child element with (non-whitespace) text after it.

> **Note:**
> Any whitespace at the end of an element is ignored for the determination of `:-moz-last-node`.

## Syntax

```css
:-moz-last-node {
  /* ... */
}
```

## Examples

### HTML

```html
<p>
  <span>This does not match.</span>
  <span>This matches!</span>
</p>

<p>
  <span>This doesn't match because it's followed by text.</span>
  Blahblah.
</p>
```

### CSS

```css
span:-moz-last-node {
  background-color: lime;
}
```

## Specifications

Not part of any standard.

## See also

- `:-moz-first-node`
- `:last-child`
