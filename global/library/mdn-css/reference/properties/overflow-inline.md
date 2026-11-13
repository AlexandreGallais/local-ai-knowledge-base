---
title: "`overflow-inline` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/overflow-inline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `overflow-inline` CSS property

The **`overflow-inline`** CSS property sets what shows when content overflows the inline start and end edges of a box. This may be nothing, a scroll bar, or the overflow content.

> **Note:**
> The `overflow-inline` property maps to `overflow-y` or `overflow-x` depending on the writing mode of the document.

## Syntax

```css
/* Keyword values */
overflow-inline: visible;
overflow-inline: hidden;
overflow-inline: clip;
overflow-inline: scroll;
overflow-inline: auto;

/* Global values */
overflow-inline: inherit;
overflow-inline: initial;
overflow-inline: revert;
overflow-inline: revert-layer;
overflow-inline: unset;
```

### Values

This property is specified as one of the following `<overflow>` keyword values:

- `visible`
    Content is not clipped and may be rendered outside the padding box's inline start and end edges.
- `hidden`
    Content is clipped if necessary to fit the inline dimension in the padding box. No scrollbars are provided.
- `clip`
    Overflow content is clipped at the element's overflow clip edge that is defined using the `overflow-clip-margin` property.
- `scroll`
    Content is clipped if necessary to fit in the padding box in the inline dimension. Browsers display scrollbars whether or not any content is actually clipped. (This prevents scrollbars from appearing or disappearing when the content changes.) Printers may still print overflowing content.
- `auto`
    Depends on the user agent. If content fits inside the padding box, it looks the same as `visible`, but still establishes a new block-formatting context. Desktop browsers provide scrollbars if content overflows.

## Examples

### Setting inline overflow behavior

#### HTML

```html
<ul>
  <li>
    <code>overflow-inline: hidden</code> (hides the text outside the box)
    <div id="div1">ABCDEFGHIJKLMOPQRSTUVWXYZABCDEFGHIJKLMOPQRSTUVWXYZ</div>
  </li>

  <li>
    <code>overflow-inline: scroll</code> (always adds a scrollbar)
    <div id="div2">ABCDEFGHIJKLMOPQRSTUVWXYZABCDEFGHIJKLMOPQRSTUVWXYZ</div>
  </li>

  <li>
    <code>overflow-inline: visible</code> (displays the text outside the box if
    needed)
    <div id="div3">ABCDEFGHIJKLMOPQRSTUVWXYZABCDEFGHIJKLMOPQRSTUVWXYZ</div>
  </li>

  <li>
    <code>overflow-inline: auto</code> (equivalent to <code>scroll</code>
    in most browsers)
    <div id="div4">ABCDEFGHIJKLMOPQRSTUVWXYZABCDEFGHIJKLMOPQRSTUVWXYZ</div>
  </li>

  <li>
    <code>overflow-inline: clip</code> (hides the text outside the box beyond
    the overflow clip edge)
    <code>clip</code>
    <div id="div5">ABCDEFGHIJKLMOPQRSTUVWXYZABCDEFGHIJKLMOPQRSTUVWXYZ</div>
  </li>
</ul>
```

#### CSS

```css
div {
  border: 1px solid black;
  width: 250px;
  margin-bottom: 12px;
}

#div1 {
  overflow-inline: hidden;
}
#div2 {
  overflow-inline: scroll;
}
#div3 {
  overflow-inline: visible;
}
#div4 {
  overflow-inline: auto;
}
#div5 {
  overflow-inline: clip;
  overflow-clip-margin: 2em;
}
```

#### Result

## See also

- `clip`, `display`, `overflow`, `overflow-block`, `overflow-clip-margin`, `overflow-x`, `overflow-y`, `text-overflow`, `white-space`
- CSS overflow module
- CSS logical properties
- CSS writing modes
- Learn: Overflowing content
