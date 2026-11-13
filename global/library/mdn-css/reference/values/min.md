---
title: "`min()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/min/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `min()` CSS function

The **`min()`** CSS function lets you set the smallest (most negative) value from a list of comma-separated expressions as the value of a CSS property value. The `min()` function can be used anywhere a `<length>`, `<frequency>`, `angle`, `<time>`, `<percentage>`, `<number>`, or `<integer>` is allowed.

```css
width: min(50vw, 200px);
```

```css
width: min(100vw, 4000px);
```

```css
width: min(150vw, 100px);
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

In the first above example, the width will be at most 200px, but will be smaller if the viewport is less than 400px wide (in which case 1vw would be 4px, so 50vw would be 200px). This technique uses an absolute unit to specify a fixed maximum value for the property, and a relative unit to allow the value to shrink to suit smaller viewports.

## Syntax

```css
min(1, 2, 3)
min(1px, 2px, 3px)
```

### Parameters

The `min()` function takes one or more comma-separated expressions as its parameter, with the smallest (most negative) expression value result used as the value.

The expressions can be math expressions (using arithmetic operators), literal values, or other expressions, such as `attr()`, that evaluate to a valid argument type (like `<length>`).

You can use different units for each value in your expression, if you wish. You may also use parentheses to establish computation order when needed.

### Notes

- Math expressions involving percentages for widths and heights on table columns, table column groups, table rows, table row groups, and table cells in both auto and fixed layout tables _may_ be treated as if `auto` had been specified.
- It is permitted to nest `max()` and other `min()` functions as expression values. The expressions are full math expressions, so you can use direct addition, subtraction, multiplication and division without using the `calc()` function itself.
- The expression can be values combining the addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`) operators, using standard operator precedence rules. Make sure to put a space on each side of the `+` and `-` operands.
- You can (and often need to) combine `min()` and `max()` values, or use `min()` within a `clamp()` or `calc()` function.
- You can provide more than two arguments, if you have multiple constraints to apply.

## Accessibility

When using `min()` to set a maximum font size, ensure that the font can still be scaled at least 200% for readability (without assistive technology like a zoom function).

- MDN Understanding WCAG, Guideline 1.4 explanations
  Understanding Success Criterion 1.4.4: Resize Text | WAI | W3C

## Examples

### Setting a maximum size for a label and input

Another use case for `min()` is to set a maximum size on responsive form controls: enabling the width of labels and inputs to shrink as the width of their container shrinks.

Let's look at some CSS:

```css
input,
label {
  padding: 2px;
  box-sizing: border-box;
  display: inline-block;
  width: min(40%, 400px);
  background-color: pink;
}

.container {
  margin: 4px;
  border: 1px solid black;
  padding: 4px;
}
```

Here, the container itself, along with the margin, border, and padding, will be 100% of its parent's width. We declare the input and label to be the lesser of 40% of the container width up to the padding or 400px wide, whichever is smaller. In other words, the widest that the label and input can be is 400px. The narrowest they will be is 40% of the container's width, which on a smartwatch's screen is very small.

```html
<div class="container">
  <label for="misc">Type something:</label>
  <input type="text" id="misc" name="misc" />
</div>
```

## See also

- `calc()`
- `clamp()`
- `max()`
- Learn: Values and units
