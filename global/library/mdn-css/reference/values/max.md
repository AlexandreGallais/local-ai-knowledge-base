---
title: "`max()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/max/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `max()` CSS function

The **`max()`** CSS function lets you set the largest (most positive) value from a list of comma-separated expressions as the value of a CSS property value. The `max()` function can be used anywhere a `<length>`, `<frequency>`, `angle`, `<time>`, `<percentage>`, `<number>`, or `<integer>` is allowed.

```css
width: max(20vw, 400px);
```

```css
width: max(20vw, 100px);
```

```css
width: max(5vw, 100px);
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    <img
      alt="Firefox logo"
      class="logo"
      src="/shared-assets/images/examples/firefox-logo.svg" />
  </div>
</section>
```

In the first example shown above, the width will be at least 400px, but will be wider if the viewport is more than 2000px wide (in which case 1vw would be 20px, so 20vw would be 400px). This technique uses an absolute unit to specify a fixed minimum value for the property, and a relative unit to allow the value to grow to suit larger viewports.

## Syntax

```css
max(1, 2, 3)
max(1px, 2px, 3px)
```

### Parameters

The `max()` function takes one or more comma-separated expressions as its parameter, with the largest (most positive) expression value used as the value of the property to which it is assigned.

The expressions can be math expressions (using arithmetic operators), literal values, or other expressions, such as `attr()`, that evaluate to a valid argument type (like `<length>`), or nested `min()` and `max()` functions.

You can use different units for each value in your expression. You may also use parentheses to establish computation order when needed.

### Notes

- Math expressions involving percentages for widths and heights on table columns, table column groups, table rows, table row groups, and table cells in both auto and fixed layout tables _may_ be treated as if `auto` had been specified.
- It is permitted to nest `min()` and other `max()` functions as expression values. The expressions are full math expressions, so you can use direct addition, subtraction, multiplication and division without using the `calc()` function itself.
- The expression can be values combining the addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`) operators, using standard operator precedence rules. Make sure to put a space on each side of the `+` and `-` operands.
- You can (and often need to) combine `min()` and `max()` values, or use `max()` within a `clamp()` or `calc()` function.

## Accessibility

When `max()` is used for controlling text size, make sure the text is always large enough to read. A suggestion is to use the `min()` function nested within a `max()` that has as its second value a relative length unit that is always large enough to read. For example:

```css
small {
  font-size: max(min(0.5vw, 0.5em), 1rem);
}
```

This ensures a minimum size of _1rem_, with a text size that scales if the page is zoomed.

- MDN Understanding WCAG, Guideline 1.4 explanations
  Understanding Success Criterion 1.4.4: Resize Text | WAI | W3C

## Examples

### Setting a minimum size for a font

Another use case for `max()` is to allow a font size to grow while ensuring it is at least a minimum size, enabling responsive font sizes while ensuring legibility.

Let's look at some CSS:

```css
h1 {
  font-size: 2rem;
}
h1.responsive {
  font-size: max(4vw, 2em, 2rem);
}
```

The font-size will at minimum be 2rems, or twice the default size of font for the page. This ensures that it is legible and accessible.

```html
<h1>This text is always legible, but doesn't change size</h1>
<h1 class="responsive">
  This text is always legible, and is responsive, to a point
</h1>
```

Think of the `max()` function as finding the minimum value allowed for a property.

## See also

- `calc()`
- `clamp()`
- `min()`
- Learn: Values and units
