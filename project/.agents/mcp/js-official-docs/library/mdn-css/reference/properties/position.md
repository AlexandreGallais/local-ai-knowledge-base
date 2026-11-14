---
title: "`position` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/position/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `position` CSS property

The **`position`** CSS property sets how an element is positioned in a document. The `top`, `right`, `bottom`, and `left` physical properties and the `inset-block-start`, `inset-block-end`, `inset-inline-start`, and `inset-inline-end` flow-relative logical properties can be used to determine the final location of positioned elements.

```css
position: static;
```

```css
position: relative;
top: 40px;
left: 40px;
```

```css
position: absolute;
inset-inline-start: 40px;
inset-block-start: 40px;
```

```css
position: sticky;
top: 20px;
```

```html
<section class="default-example" id="default-example">
  <div id="example-element-container">
    <p>
      In this demo you can control the <code>position</code> property for the
      yellow box.
    </p>
    <div class="box"></div>
    <div class="box" id="example-element"></div>
    <div class="box"></div>
    <p class="clear">
      To see the effect of <code>sticky</code> positioning, select the
      <code>position: sticky</code> option and scroll this container.
    </p>
    <p>
      The element will scroll along with its container, until it is at the top
      of the container (or reaches the offset specified in <code>top</code>),
      and will then stop scrolling, so it stays visible.
    </p>
    <p>
      The rest of this text is only supplied to make sure the container
      overflows, so as to enable you to scroll it and see the effect.
    </p>
    <hr />
    <p>
      Far out in the uncharted backwaters of the unfashionable end of the
      western spiral arm of the Galaxy lies a small unregarded yellow sun.
      Orbiting this at a distance of roughly ninety-two million miles is an
      utterly insignificant little blue green planet whose ape-descended life
      forms are so amazingly primitive that they still think digital watches are
      a pretty neat idea.
    </p>
  </div>
</section>
```

```css
section {
  align-items: flex-start;
  overflow: auto;
}

.box {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
  float: left;
  width: 65px;
  height: 65px;
}

.box + .box {
  margin-left: 10px;
}

.clear {
  clear: both;
  padding-top: 1em;
}

#example-element-container {
  position: relative;
  text-align: left;
}

#example-element {
  background-color: yellow;
  border: 3px solid red;
  z-index: 1;
}
```

## Syntax

```css
position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;

/* Global values */
position: inherit;
position: initial;
position: revert;
position: revert-layer;
position: unset;
```

### Values

This property is specified as one of the following keyword values:

- `static`
    The element is positioned according to the Normal Flow of the document. The `top`, `right`, `bottom`, `left`, and `z-index` properties have _no effect_. This is the default value.
- `relative`
    The element is positioned according to the normal flow of the document, and then offset _relative to itself_ based on the values of `top`, `right`, `bottom`, and `left`. The offset does not affect the position of any other elements; thus, the space given for the element in the page layout is the same as if position were `static`.

    This value creates a new stacking context when the value of `z-index` is not `auto`. Its effect on `table-*-group`, `table-row`, `table-column`, `table-cell`, and `table-caption` elements is undefined.

- `absolute`
    The element is removed from the normal document flow, and no space is created for the element in the page layout. The element is positioned relative to its closest positioned ancestor (if any) or to the initial containing block. Its final position is determined by the values of `top`, `right`, `bottom`, and `left`.

    This value creates a new stacking context when the value of `z-index` is not `auto`. The margins of absolutely positioned boxes do not collapse with other margins.

- `fixed`
    The element is removed from the normal document flow, and no space is created for the element in the page layout. The element is positioned relative to its initial containing block, which is the viewport in the case of visual media. Its final position is determined by the values of `top`, `right`, `bottom`, and `left`.

    This value always creates a new stacking context. In printed documents, the element is placed in the same position on _every page_.

- `sticky`
    The element is positioned according to the normal flow of the document, and then offset relative to its _nearest scrolling ancestor_ and containing block (nearest block-level ancestor), including table-related elements, based on the values of `top`, `right`, `bottom`, and `left`. The offset does not affect the position of any other elements.

    This value always creates a new stacking context. Note that a sticky element "sticks" to its nearest ancestor that has a "scrolling mechanism" (created when `overflow` is `hidden`, `scroll`, `auto`, or `overlay`), even if that ancestor isn't the nearest actually scrolling ancestor.

    > **Note:**
    > At least one inset property (`top`, `inset-block-start`, `right`, `inset-inline-end`, etc.) needs to be set to a non-`auto` value for the axis on which the element needs to be made sticky. If both `inset` properties for an axis are set to `auto`, on that axis the `sticky` value will behave as `relative`.

## Description

### Types of positioning

- A **positioned element** is an element whose computed `position` value is either `relative`, `absolute`, `fixed`, or `sticky`. (In other words, it's anything except `static`.)
- A **relatively positioned element** is an element whose computed `position` value is `relative`. The `top` and `bottom` properties specify the vertical offset from its normal position; the `left` and `right` properties specify the horizontal offset.
- An **absolutely positioned element** is an element whose computed `position` value is `absolute` or `fixed`. The `top`, `right`, `bottom`, and `left` properties specify offsets from the edges of the element's containing block. (The containing block is the ancestor relative to which the element is positioned.) If the element has margins, they are added to the offset. The element establishes a new block formatting context (BFC) for its contents.
- A **stickily positioned element** is an element whose computed `position` value is `sticky`. It's treated as relatively positioned until its containing block crosses a specified threshold (such as setting `top` to value other than auto) within its flow root (or the container it scrolls within), at which point it is treated as "stuck" until meeting the opposite edge of its containing block.

Most of the time, absolutely positioned elements that have `height` and `width` set to `auto` are sized so as to fit their contents. However, non-replaced, absolutely positioned elements can be made to fill the available vertical space by specifying both `top` and `bottom` and leaving `height` unspecified (that is, `auto`). They can likewise be made to fill the available horizontal space by specifying both `left` and `right` and leaving `width` as `auto`.

Except for the case just described (of absolutely positioned elements filling the available space):

- If both `top` and `bottom` are specified (technically, not `auto`), `top` wins.
- If both `left` and `right` are specified, `left` wins when `direction` is `ltr` (English, horizontal Japanese, etc.) and `right` wins when `direction` is `rtl` (Persian, Arabic, Hebrew, etc.).

## Accessibility

Ensure that elements positioned with an `absolute` or `fixed` value do not obscure other content when the page is zoomed to increase text size.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Visual Presentation: Understanding SC 1.4.8 | Understanding WCAG 2.0

### Performance & Accessibility

Scrolling elements containing `fixed` or `sticky` content can cause performance and accessibility issues. As a user scrolls, the browser must repaint the sticky or fixed content in a new location. Depending on the content needing to be repainted, the browser performance, and the device's processing speed, the browser may not be able to manage repaints at 60 fps. Such a scenario can lead to jank and, more importantly, accessibility concerns for people with sensitivities. One solution is to add `will-change: transform` to the positioned elements to render the element in its own layer, improving repaint speed and therefore improving performance and accessibility.
