---
title: "`:popover-open` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_popover-open/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:popover-open` CSS pseudo-class

The **`:popover-open`** CSS pseudo-class represents a `popover` element (i.e., one with a `popover` attribute) that is in the showing state. You can use this to apply style to popover elements only when they are shown.

## Syntax

```css
:popover-open {
  /* ... */
}
```

## Examples

By default, popovers appear in the middle of the viewport. The default styling is achieved like this in the UA stylesheet:

```css
[popover] {
  position: fixed;
  inset: 0;
  width: fit-content;
  height: fit-content;
  margin: auto;
  border: solid;
  padding: 0.25em;
  overflow: auto;
  color: CanvasText;
  background-color: Canvas;
}
```

To override the default styles and get the popover to appear somewhere else on your viewport, you could override the above styles with something like this:

```css
:popover-open {
  width: 200px;
  height: 100px;
  position: absolute;
  inset: unset;
  bottom: 5px;
  right: 5px;
  margin: 0;
}
```

## See also

- Popover API
- `popover` HTML global attribute
