---
title: "`overflow-x` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/overflow-x/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `overflow-x` CSS property

The **`overflow-x`** CSS property sets what shows when content overflows a block-level element's left and right edges. This may be nothing, a scroll bar, or the overflow content. This property may also be set by using the `overflow` shorthand property.

```css
overflow-x: visible;
```

```css
overflow-x: hidden;
```

```css
overflow-x: clip;
```

```css
overflow-x: scroll;
```

```css
overflow-x: auto;
```

```html
<section class="default-example" id="default-example">
  <div id="example-element">
    The value of Pi is 3.1415926535897932384626433832795029. The value of e is
    2.7182818284590452353602874713526625.
  </div>
</section>
```

```css
#example-element {
  width: 15em;
  height: 9em;
  border: medium dotted;
  padding: 0.75em;
  text-align: left;
}
```

## Syntax

```css
/* Keyword values */
overflow-x: visible;
overflow-x: hidden;
overflow-x: clip;
overflow-x: scroll;
overflow-x: auto;

/* Global values */
overflow-x: inherit;
overflow-x: initial;
overflow-x: revert;
overflow-x: revert-layer;
overflow-x: unset;
```

The `overflow-x` property is specified as a single `<overflow>` keyword value.

If `overflow-y` is `hidden`, `scroll`, or `auto`, and the `overflow-x` property is `visible` (default), the value will be implicitly computed as `auto`.

### Values

- `visible`
    Overflow content is not clipped and may be visible outside the element's padding box on left and right edges. The element box is not a scroll container.
- `hidden`
    Overflow content is clipped if necessary to fit horizontally in the elements' padding box. No scroll bars are provided.
- `clip`
    Overflow content is clipped at the element's _overflow clip edge_ that is defined using the `overflow-clip-margin` property. As a result, content overflows the element's padding box by the `<length>` value of `overflow-clip-margin` or by `0px` if not set. The difference between `clip` and `hidden` is that the `clip` keyword also forbids all scrolling, including programmatic scrolling. No new formatting context is created. To establish a formatting context, use `overflow: clip` along with `display: flow-root`. The element box is not a scroll container.
- `scroll`
    Overflow content is clipped if necessary to fit horizontally inside the element's padding box. Browsers display scroll bars in the horizontal direction whether or not any content is actually clipped. (This prevents scroll bars from appearing or disappearing when the content changes.) Printers may still print overflowing content.
- `auto`
    Overflow content is clipped at the element's padding box, and overflow content can be scrolled into view. Unlike `scroll`, user agents display scroll bars _only if_ the content is overflowing and hide scroll bars by default. If content fits inside the element's padding box, it looks the same as with `visible`, but still establishes a new block-formatting context. Desktop browsers provide scroll bars if content overflows.

> **Note:**
> The keyword value `overlay` is a legacy value alias for `auto`. With `overlay`, the scroll bars are drawn on top of the content instead of taking up space.

## Examples

### HTML

```html
<ul>
  <li>
    <code>overflow-x:hidden</code> — hides the text outside the box
    <div id="div1">ABCDEFGHIJKLMOPQRSTUVWXYZABCDEFGHIJKLMOPQRSTUVWXYZ</div>
  </li>

  <li>
    <code>overflow-x:scroll</code> — always adds a scrollbar
    <div id="div2">ABCDEFGHIJKLMOPQRSTUVWXYZABCDEFGHIJKLMOPQRSTUVWXYZ</div>
  </li>

  <li>
    <code>overflow-x:visible</code> — displays the text outside the box if
    needed
    <div id="div3">ABCDEFGHIJKLMOPQRSTUVWXYZABCDEFGHIJKLMOPQRSTUVWXYZ</div>
  </li>

  <li>
    <code>overflow-x:auto</code> — on most browsers, equivalent to
    <code>scroll</code>
    <div id="div4">ABCDEFGHIJKLMOPQRSTUVWXYZABCDEFGHIJKLMOPQRSTUVWXYZ</div>
  </li>
</ul>
```

### CSS

```css
#div1,
#div2,
#div3,
#div4 {
  border: 1px solid black;
  width: 250px;
  margin-bottom: 12px;
}

#div1 {
  overflow-x: hidden;
}
#div2 {
  overflow-x: scroll;
}
#div3 {
  overflow-x: visible;
}
#div4 {
  overflow-x: auto;
}
```

## See also

- `clip`, `display`, `text-overflow`, `white-space`
- CSS overflow module
- Learn: Overflowing content
