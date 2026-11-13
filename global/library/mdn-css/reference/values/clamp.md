---
title: "`clamp()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/clamp/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `clamp()` CSS function

The **`clamp()`** CSS function clamps a value within a range of values between a defined minimum bound and a maximum bound. The function takes three parameters: a minimum value, a preferred value, and a maximum allowed value.

```css
font-size: clamp(1rem, 2.5vw, 2rem);
```

```css
font-size: clamp(1.5rem, 2.5vw, 4rem);
```

```css
font-size: clamp(1rem, 10vw, 2rem);
```

```html
<section class="default-example" id="default-example">
  <div class="transition-all" id="example-element">
    The font-size of this text varies depending on the base font of the page,
    and the size of the viewport.
  </div>
</section>
```

Note that using `clamp()` for font sizes, as in these examples, allows you to set a font-size that grows with the size of the viewport, but doesn't go below a minimum font-size or above a maximum font-size. It has the same effect as the code in Fluid Typography but in one line, and without the use of media queries.

## Syntax

```css
/* Static values */
width: clamp(200px, 40%, 400px);
width: clamp(20rem, 30vw, 70rem);
width: clamp(10vw, 20em, 100vw);

/* Calculated values */
width: clamp(min(10vw, 20rem), 300px, max(90vw, 55rem));
width: clamp(100px, calc(30% / 2rem + 10px), 900px);
```

### Parameters

The `clamp(min, val, max)` function accepts three comma-separated expressions as its parameters.

- `min`
    The minimum value is the smallest (most negative) value. This is the lower bound in the range of allowed values. If the preferred value is less than this value, the minimum value will be used.

- `val`
    The preferred value is the expression whose value will be used as long as the result is between the minimum and maximum values.

- `max`
    The maximum value is the largest (most positive) expression value to which the value of the property will be assigned if the preferred value is greater than this upper bound.

The expressions can be math functions (see `calc()` for more information), literal values, other expressions that evaluate to a valid argument type (like `<length>`), or nested `min()` and `max()` functions. For math expressions, you can use addition, subtraction, multiplication, and division without using the `calc()` function itself. You may also use parentheses to establish computation order when needed.

You can use different units for each value in your expressions and different units in any math function making up any of the arguments.

Keep the following aspects in mind while working with the function:

- Math expressions involving percentages for widths and heights on table columns, table column groups, table rows, table row groups, and table cells in both auto and fixed layout tables _may_ be treated as if `auto` had been specified.
- It is permitted to nest `max()` and `min()` functions as expression values, in which case the inner ones are treated as basic parentheses. The expressions are full math expressions, so you can use direct addition, subtraction, multiplication and division without using the `calc()` function itself.
- The expression can be values combining the addition (`+`), subtraction (`-`), multiplication (`*`), and division (`/`) operators, using standard operator precedence rules. Make sure to put a space on each side of the `+` and `-` operands. You can use different units for each value in your expression. You may also use parentheses to establish computation order when needed.
- Oftentimes you will want to use `min()` and `max()` within a `clamp()` function.

### Return value

`clamp(MIN, VAL, MAX)` is resolved as `max(MIN, min(VAL, MAX))`.

Based on the provided parameters, the function returns `<length>`, `<frequency>`, `angle`, `<time>`, `<percentage>`, `<number>`, or `<integer>`.

## Accessibility

When `clamp()` is used for controlling text size, make sure that the maximum allowed value is a relative length unit that is no less than twice the minimum allowed value, for example:

```css
font-size: clamp(1rem, 2.5vw, 2rem);
```

This helps to ensure that text size can scale to at least 200% if the page is zoomed.

- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.4: Resize Text | WAI | W3C

## Examples

### min(), max(), and clamp() comparison

In this example we have a web page that uses `min()`, `max()`, and `clamp()` to set sizes responsively.

The example adjusts the sizes of page elements in three ways:

- the lengths of the lines of text
- the font size of paragraph text
- the font size of heading text

In all three cases, the page uses a combination of a viewport-relative units (`vw` and `percentage`), to set a size that varies with the viewport width, and a value that is not viewport relative (`rem` and `px`) to implement minimum and/or maximum sizes.

The example is at <https://mdn.github.io/css-examples/min-max-clamp/>. Open it in a new window and try adjusting the window width.

The **line length** (controlled by the `width` of the `<body>` element) will increase as the window width increases, but only up to a certain point (`1000px`), and beyond that point, it won't increase anymore. We're using `min()` to set a **maximum line length**: it can go under `1000px`, but won't go over. This is helpful because long lines are harder to read, so we often want to limit how long a line can be. To achieve this we use `min(1000px, calc(70% + 100px))`: when the result of the percentage-based calculation goes above `1000px`, we switch to the fixed `1000px` value.

The **size of the paragraph text**, controlled by the `font-size` of the `` element, decreases as the window gets narrower, but only up to a certain point, and beyond that point (the point where `1.2vw` is less than `1.2rem`) it doesn't get any smaller: it stays at `1.2rem`. We're using `max()` to set a **minimum font size**: the font can grow above `1.2rem` but will never go below it. This is helpful because really small text is hard to read. To achieve this we use `max(1.2rem, 1.2vw)`. This means that the `font-size` will be set at `1.2rem`, unless the computed value of `1.2vw` is greater than that of `1.2rem`, in which case it will be set to `1.2vw` instead.

The **size of the heading text**, controlled by the `font-size` of the `<h1>` element, has a viewport-relative value with both a maximum and a minimum threshold. To achieve this we use `clamp(1.8rem, 2.5vw, 2.8rem)`. The viewport-relative value is `2.5vw` but it is clamped between `1.8rem` and `2.8rem`, so:

- if the calculated value of `2.5vw` is less than `1.8rem`, then `1.8rem` will be used
- if the calculated value of `2.5vw` is greater than `2.8rem`, then `2.8rem` will be used.

This prevents the heading text from getting too small in a very narrow window, or too big in a very wide window.

#### HTML

```html
<h1>Basic <example-value> test</h1>
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In orci orci,
  eleifend id risus nec, mattis rutrum velit. Suspendisse fringilla egestas erat
  eu convallis. Phasellus eu velit ut magna dapibus elementum cursus at ligula.
  Ut tempus varius nibh, nec auctor sapien iaculis sit amet. Fusce iaculis,
  libero quis elementum viverra, nulla ante accumsan lectus, sit amet convallis
  lacus ipsum vel est. Curabitur et urna non est consectetur pulvinar vel id
  risus. Ut vestibulum, sem in semper aliquet, felis arcu euismod sapien, ac
  imperdiet massa nisl quis sem. Vestibulum ac elementum felis, in tempor velit.
  Pellentesque purus ex, mattis at ornare quis, porta condimentum mi. Donec
  vestibulum ligula vel nulla blandit, quis euismod nulla vestibulum.
  Suspendisse potenti. Nunc neque mauris, tempor sed facilisis at, ultrices eget
  nulla. Pellentesque convallis ante nec augue porttitor, id tempus ante luctus.
</p>

<p>
  Integer rutrum sollicitudin tellus, quis cursus nulla scelerisque nec. Nunc eu
  facilisis lorem. Maecenas faucibus sapien eleifend, semper tellus at, pharetra
  quam. Cras feugiat vulputate tortor at rhoncus. Class aptent taciti sociosqu
  ad litora torquent per conubia nostra, per inceptos himenaeos. Nam non felis
  quis sem lobortis sodales vel id libero. Phasellus sit amet placerat lorem.
</p>
```

#### CSS

```css
html {
  font-family: sans-serif;
}

body {
  margin: 0 auto;
  width: min(1000px, calc(70% + 100px));
}

h1 {
  letter-spacing: 2px;
  font-size: clamp(1.8rem, 2.5vw, 2.8rem);
}

p {
  line-height: 1.5;
  font-size: max(1.2rem, 1.2vw);
}
```

## See also

- `calc()`
- `max()`
- `min()`
- Learn: CSS Values and units
