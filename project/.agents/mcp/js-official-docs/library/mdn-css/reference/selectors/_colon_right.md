---
title: "`:right` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_right/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:right` CSS pseudo-class

The **`:right`** CSS pseudo-class, used with the `@page` at-rule, represents all right-hand pages of a printed document.

```css
/* Selects any right-hand pages when printing */
@page :right {
  margin: 2in 3in;
}
```

Whether a given page is "left" or "right" is determined by the major writing direction of the document. For example, if the first page has a major writing direction of left-to-right then it will be a `:right` page; if it has a major writing direction of right-to-left then it will be a `:left` page.

> **Note:**
> This pseudo-class can be used to change only the `margin`, `padding`, `border`, and `background` properties of the _page box_. All other properties will be ignored, and only the page box, not the document content on the page, will be affected.

## Syntax

```css
:right {
  /* ... */
}
```

## Examples

### Setting margins for right-hand pages

```css
@page :right {
  margin: 2in 3in;
}
```

## See also

- `@page`
- Other page-related pseudo-classes: `:first`, `:left`
