---
title: "`text-fit` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-fit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-fit` CSS property

The **`text-fit`** CSS property can be used to scale the rendered font size of text nodes (and other inline content) so that they fit exactly within the inline dimension of their containing boxes, optionally limited by a maximum or minimum **scaling factor**.

## Syntax

```css
/* One keyword */
text-fit: none;
text-fit: grow;
text-fit: shrink;

/* Two keywords */
text-fit: grow consistent;
text-fit: shrink per-line-all;

/* Keywords and <percentage> */
text-fit: grow 300%;
text-fit: shrink 80%;
text-fit: grow per-line-all 300%;

/* Global values */
text-fit: inherit;
text-fit: initial;
text-fit: revert;
text-fit: revert-layer;
text-fit: unset;
```

### Values

This property is specified as a space-separated list of one to three values from the following list:

- `none`
    The default value. No text scaling is applied.
- `grow`
    The text node's rendered font size is scaled up until it exactly fits inside its containing box's inline dimension.
- `shrink`
    The text node's rendered font size is scaled down until it exactly fits inside its containing box's inline dimension.
- `consistent`
    All of the lines of the text node are scaled using the same scaling factor. This keyword has no effect if `none` is specified as the first keyword. If a second keyword is not specified, `consistent` is assumed.
- `per-line`
    All of the lines of the text node are scaled with their own scaling factor. The last line of the text node, and any lines that end in a forced break (for example, due to a `` element) have no text scaling applied. This keyword has no effect if `none` is specified as the first keyword.
- `per-line-all`
    All of the lines of the text node are scaled with their own scaling factor, including the last line and lines that end in a forced break. This keyword has no effect if `none` is specified as the first keyword.
- `<percentage>`
    Specifies the maximum (when `grow` is specified) or minimum (when `shrink` is specified) scaling factor. This must be `100%` or greater if `grow` is specified, or between `0%` and `100%` inclusive if `shrink` is specified, otherwise the percentage has no effect.

The mandatory first value can be `none`, `grow`, or `shrink`. The optional second value can be `consistent`, `per-line`, or `per-line-all`. The optional `percentage` value is declared last. The components must be specified in this order.

## Description

A common web design challenge is getting headings and other text features to fit neatly within their containing boxes, regardless of layout or viewport size. The most typical use case is getting a horizontal text heading to fit the width of its containing box perfectly. Complex `font-size` calculations and JavaScript workarounds were historically used to achieve this.

The `text-fit` property provides a convenient CSS-only solution, adjusting the rendered font size of the text by a specific scaling factor to fit the space available, rather than justifying it like the `text-align` property's `justify` value does.

The basic form of `text-fit` uses a single keyword:

- You can specify `grow` to scale the font size up so that the text fits exactly inside its containing box. This works well for the use case described previously.
- You can specify `shrink` to scale the font size down so that the text fits exactly inside its containing box. This works well in cases where you have a line of text that is longer than its containing box, maybe due to a really long word, and you want to shrink it to avoid overflow.

Specifically, the parts of a text node that are affected by this scaling (the **scalable parts**) are the text itself, excluding trailing whitespace, and spacing whose inline size is proportional to the text's `font-size`, such as percentage-based `letter-spacing` and `word-spacing`, and `text-autospace`. Other parts, including inline `border`, `margin`, and `padding`, are not scaled.

The `text-fit` property does not affect a container's intrinsic size, which means that the text content cannot grow in cases where the container is sized by its content, for example using the `fit-content` keyword. Setting `text-fit` also doesn't change an element's computed `font-size`: the size adjustment is applied after the final rendering.

### How is the scaling factor calculated?

The scaling factor is the ratio by which the scalable parts of a text line must be scaled in order for its inline content to fit exactly inside its containing box. The scaling factor for each line of a text node is calculated using a formula along these lines (the exact method for determining the scaling factor may differ between implementations):

```plain
(A + B) / A
```

where:

- `A` is the total inline size of the text line's scalable parts.
- `B` is the remaining space inside the text line, including any trailing whitespace, which may be negative if the text overflows.

The scaling factor for a text line with no scalable parts is `1`.

### Specifying scaling factor limits

To limit the amount by which the text can grow, you can specify a `<percentage>` value after the `grow` or `shrink` keyword.

If `grow` is specified, the percentage has to be `100%` or greater, and acts as a maximum scaling factor. For example:

```css
text-fit: grow 300%;
```

Any text this is applied to will grow to fit its containing box, but will not scale to a size greater than 300% of its original `font-size`.

If `shrink` is specified, the percentage has to be between `0%` and `100%` inclusive, and acts as a minimum scaling factor. For example:

```css
text-fit: shrink 50%;
```

Any text this is applied to will shrink to fit its containing box, but will not scale to a size less than 50% of its original `font-size`.

> **Note:**
> In many situations, word breaking behavior results in `text-fit: shrink` having no effect — the words wrap onto new lines rather than shrinking. In these cases, you need to stop the breaking behavior using something like a `white-space` value of `nowrap` to see it working. See this in action in our basic example.

### Specifying how scaling factor is applied to multiple text lines

By default, a text node with multiple lines scales all of the lines by the same scaling factor. Each line has its scaling factor calculated separately, and the smallest scaling factor is then applied to all of the lines. This is usually the behavior you'll want, to ensure that each line grows or shrinks by the same proportion.

If you want to adjust this behavior, you can specify a second value after the first keyword and before the percentage, if specified. This value can be specified as the default `consistent` keyword, which keeps the behavior described previously, but you can also specify `per-line` or `per-line-all`. Both of these cause the lines of the text node to be scaled with their own scaling factors. The difference is that, with `per-line`, the last line of the text node, and any lines that end in a forced break (for example, due to a `` element) have no text scaling applied, whereas with `per-line-all` scaling is applied to these lines.

For example, this declaration will grow all lines of a text node by their own scaling factor to fit the containing box.

```css
text-fit: grow per-line-all;
```

This declaration on the other hand will shrink all lines of a text node by their own scaling factor to fit the containing box, but not the last line or lines with forced breaks, and not below `50%` of the original `font-size`.

```css
text-fit: shrink per-line 50%;
```

## Accessibility

When using `text-fit`, designs must be tested carefully at different viewport sizes to make sure the rendered font size doesn't become too small (or too large). This can lead to content becoming illegible, especially for people with visual impairments or in low vision conditions.

In any case, text content should be resizable without loss of content or functionality; see WCAG Success Criterion 1.4.4 Resize Text.

Related guidance:

- MDN Understanding WCAG, Guideline 1.4: Make it easier for users to see and hear content including separating foreground from background
