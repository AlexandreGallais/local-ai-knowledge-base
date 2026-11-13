---
title: "`max-block-size` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/max-block-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `max-block-size` CSS property

The **`max-block-size`** CSS property specifies the maximum size of an element in the direction opposite that of the writing direction as specified by `writing-mode`. That is, if the writing direction is horizontal, then `max-block-size` is equivalent to `max-height`; if the writing direction is vertical, `max-block-size` is the same as `max-width`.

The other dimension's maximum length is specified using the `max-inline-size` property.

This is useful because the `max-width` is always used for horizontal sizes and `max-height` is always used for vertical sizes, and if you need to set lengths based on the size of your text content, you need to be able to do so with the writing direction in mind.

Any time you would normally use `max-height` or `max-width`, you should instead use `max-block-size` to set the maximum "height" of the content (even though this may not be a vertical value) and `max-inline-size` to set the maximum "width" of the content (although this may instead be vertical rather than horizontal). See `writing-mode` examples, which show the different writing modes in action.

```css
max-block-size: 150px;
writing-mode: horizontal-tb;
```

```css
max-block-size: 150px;
writing-mode: vertical-rl;
```

```css
max-block-size: 20px;
writing-mode: horizontal-tb;
```

```css
max-block-size: 75%;
writing-mode: vertical-lr;
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    This is a box where you can change the maximum block size. <br />This will
    limit the size in the block dimension, potentially causing an overflow.
  </div>
</section>
```

```css
#example-element {
  display: flex;
  flex-direction: column;
  background-color: #5b6dcd;
  justify-content: center;
  color: white;
}
```

## Syntax

```css
/* <length> values */
max-block-size: 300px;
max-block-size: 25em;
max-block-size: anchor-size(--my-anchor self-inline, 250px);
max-block-size: calc(anchor-size(width) / 2);

/* <percentage> values */
max-block-size: 75%;

/* Keyword values */
max-block-size: none;
max-block-size: max-content;
max-block-size: min-content;
max-block-size: fit-content;
max-block-size: fit-content(20em);

/* Global values */
max-block-size: inherit;
max-block-size: initial;
max-block-size: revert;
max-block-size: revert-layer;
max-block-size: unset;
```

### Values

The `max-block-size` property's value can be any value that's legal for the `max-width` and `max-height` properties:

- `<length>`
    Defines the `max-block-size` as an absolute value.
- `<percentage>`
    Defines the `max-block-size` as a percentage of the containing block's size in block axis.
- `none`
    No limit on the size of the box.
- `max-content`
    The intrinsic preferred `max-block-size`.
- `min-content`
    The intrinsic minimum `max-block-size`.
- `fit-content`
    Use the available space, but not more than max-content, i.e., `min(max-content, max(min-content, stretch))`.
- `fit-content(<length-percentage>)`
    Uses the `fit-content` formula with the available space replaced by the specified argument, i.e., `min(max-content, max(min-content, argument))`.

### How writing-mode affects directionality

The values of `writing-mode` affect the mapping of `max-block-size` to `max-width` or `max-height` as follows:

| Values of `writing-mode`                                                  | `max-block-size` is equivalent to |
| ------------------------------------------------------------------------- | --------------------------------- |
| `horizontal-tb`, `lr`, `lr-tb`, `rl`, `rb`, `rb-rl`                       | `max-height`         |
| `vertical-rl`, `vertical-lr`, `sideways-rl`, `sideways-lr`, `tb`, `tb-rl` | `max-width`          |

> **Note:**
> The `writing-mode` values `sideways-lr` and `sideways-rl` were removed from the CSS Writing Modes Level 3 specification late in its design process. They may be restored in Level 4.

> **Note:**
> The writing modes `lr`, `lr-tb`, `rl`, `rb`, and `rb-tl` are no longer allowed in HTML contexts; they may only be used in SVG 1.x contexts.

## Examples

### Setting max-block-size with horizontal and vertical text

In this example, the same text (the opening sentences from Herman Melville's novel _Moby-Dick_) is presented in both the `horizontal-tb` and `vertical-rl` writing modes.

Everything else about the two boxes is identical, including the values used for `max-block-size`.

#### HTML

The HTML establishes the two `` blocks that will be presented with their `writing-mode` set using the classes `horizontal` or `vertical`. Both boxes share the `standard-box` class, which establishes coloring, padding, and their respective values of `max-block-size`.

```html
<p>Writing mode <code>horizontal-tb</code> (the default):</p>
<div class="standard-box horizontal">
  Call me Ishmael. Some years ago—never mind how long precisely—having little or
  no money in my purse, and nothing particular to interest me on shore, I
  thought I would sail about a little and see the watery part of the world. It
  is a way I have of driving off the spleen and regulating the circulation.
</div>

<p>Writing mode <code>vertical-rl</code>:</p>
<div class="standard-box vertical">
  Call me Ishmael. Some years ago—never mind how long precisely—having little or
  no money in my purse, and nothing particular to interest me on shore, I
  thought I would sail about a little and see the watery part of the world. It
  is a way I have of driving off the spleen and regulating the circulation.
</div>
```

#### CSS

The CSS defines three classes. The first, `standard-box`, is applied to both boxes, as seen above. It provides standard styling including the minimum and maximum block sizes, font size, and so forth.

After that come the classes `horizontal` and `vertical`, which add the `writing-mode` property to the box, with the value set to `horizontal-tb` or `vertical-rl` depending on which class is used.

```css
.standard-box {
  padding: 4px;
  background-color: #abcdef;
  color: black;
  font:
    16px "Open Sans",
    "Helvetica",
    "Arial",
    sans-serif;
  max-block-size: 160px;
  min-block-size: 100px;
}

.horizontal {
  writing-mode: horizontal-tb;
}

.vertical {
  writing-mode: vertical-rl;
}
```

#### Result

## See also

- The mapped physical properties: `max-width` and `max-height`
- Setting the other direction's maximum size: `max-inline-size`
- `writing-mode`
