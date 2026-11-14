---
title: "`::view-transition` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_view-transition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::view-transition` CSS pseudo-element

The **`::view-transition`** CSS pseudo-element represents the root of the view transitions overlay, which contains all view transition snapshot groups and sits over the top of all other page content.

During a view transition, `::view-transition` is included in the associated pseudo-element tree as explained in The view transition pseudo-element tree. It is the top-level node of this tree, and has one or more `::view-transition-group()`s as children.

`::view-transition` is given the following default styling in the UA stylesheet:

```css
:root::view-transition {
  position: fixed;
  inset: 0;
}
```

All `::view-transition-group()` pseudo-elements are positioned relative to the view transition root.

## Syntax

```css
::view-transition {
  /* ... */
}
```

## Examples

```css
::view-transition {
  background-color: rgb(0 0 0 / 25%);
}
```

## See also

- View Transition API
- Smooth transitions with the View Transition API
