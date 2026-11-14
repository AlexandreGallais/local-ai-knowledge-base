---
title: "`overflow-clip-margin` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/overflow-clip-margin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `overflow-clip-margin` CSS property

The **`overflow-clip-margin`** CSS property determines how far outside its bounds an element with `overflow: clip` may be painted before being clipped. The bound defined by this property is called the _overflow clip edge_ of the box.

## Syntax

```css
/* <length> values */
overflow-clip-margin: 20px;
overflow-clip-margin: 1em;

/* <visual-box> | <length> */
overflow-clip-margin: content-box 5px;

/* Global values */
overflow-clip-margin: inherit;
overflow-clip-margin: initial;
overflow-clip-margin: revert;
overflow-clip-margin: revert-layer;
overflow-clip-margin: unset;
```

The `<visual-box>` value, which defaults to `padding-box`, specifies the box edge to use as the overflow clip edge origin. The `<length>` value specified in `overflow-clip-margin` must be non-negative.

> **Note:**
> If the element does not have `overflow: clip` then this property will be ignored.

## Examples

### HTML

```html
<div class="box">
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
  cillum dolore eu fugiat nulla pariatur.
</div>
```

### CSS

```css
.box {
  border: 3px solid black;
  width: 250px;
  height: 100px;
  overflow: clip;
  overflow-clip-margin: 20px;
}
```

## See also

- Related CSS properties: `text-overflow`, `white-space`, `overflow`, `overflow-inline`, `overflow-x`, `overflow-y`, `clip`, `display`
