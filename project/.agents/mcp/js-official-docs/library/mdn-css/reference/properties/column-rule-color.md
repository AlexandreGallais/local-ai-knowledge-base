---
title: "`column-rule-color` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-rule-color/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-rule-color` CSS property

The **`column-rule-color`** CSS property defines the colors of the lines drawn between columns in multi-column grid, flex, and multi-col layouts.

```css
column-rule-color: purple;
```

```css
column-rule-color: rgb(48 125 222), rgb(222 48 125);
```

```css
column-rule-color: rgb(48 125 222), repeat(3, rgb(222 48 125));
```

```css
column-rule-color: purple, repeat(auto, orange, yellow);
```

```html
<section id="default-example">
  <p id="example-element">
    London. Michaelmas term lately over, and the Lord Chancellor sitting in
    Lincoln's Inn Hall. Implacable November weather. As much mud in the streets
    as if the waters had but newly retired from the face of the earth, and it
    would not be wonderful to meet a Megalosaurus, forty feet long or so,
    waddling like an elephantine lizard up Holborn Hill.
  </p>
</section>
```

```css
#example-element {
  columns: 7;
  column-rule: solid thick;
  gap: 7px;
}
```

## Syntax

```css
/* Single <color> value */
column-rule-color: purple;
column-rule-color: rgb(192 56 78);
column-rule-color: transparent;
column-rule-color: hsl(0 100% 50% / 60%);

/* Multiple values */
column-rule-color: purple, magenta;
column-rule-color: repeat(3, purple), repeat(3, transparent);
column-rule-color: repeat(3, purple), repeat(3, yellow, blue);
column-rule-color: purple, repeat(auto, transparent), purple;
column-rule-color: purple, repeat(auto, blue, yellow), purple;
column-rule-color:
  repeat(3, purple), repeat(auto, transparent), repeat(3, purple);

/* Global values */
column-rule-color: inherit;
column-rule-color: initial;
column-rule-color: revert;
column-rule-color: revert-layer;
column-rule-color: unset;
```

### Values

The `column-rule-color` property accepts a comma-separated list of values, including:

- `<line-color>`
    A `<color>` representing the color of the line.

- `<repeat-line-color>`
    A `repeat()` function, with an `<integer>` of `1` or more as the first argument and one or more `<color>` values as subsequent arguments. The `<integer>` specifies how many times the `<color>` values should be repeated.

- `<auto-repeat-line-color>`
    A `repeat()` function, with `auto` as the first argument and one or more `<color>` values as subsequent arguments. The provided `<color>` values are repeated as many times as needed to fill in values for any column-rules that are not explicitly specified by other components of the property value.

## Description

The `column-rule-color` property defines the colors of any lines drawn in the gaps between columns in multi-column, flex, and grid containers with more than one column.

The value is a comma-separated list of components, which can include `<line-color>`, `<repeat-line-color>`, and `<auto-repeat-line-color>` types.

The `column-rule-color`, along with the `column-rule-width` and `column-rule-style` properties, can be set using the `column-rule` shorthand. The `column-rule-color`, along with the `row-rule-color` property, can also be set using the `rule-color` shorthand.

A `<line-color>` can be declared as any valid CSS `<color>` value. If the property value consists of only one `<color>`, all the rule lines will be that color. For example, if we declare the following, the lines in the gutters between columns will all be blue:

```css
column-rule-color: blue;
```

When more than one `<line-color>` is declared, they will be applied to lines painted in the column gutters in the order specified. If there are more rules than `<line-color>` values, the list of colors is repeated until every column-rule has a color. If we declare the following, for example, every odd rule will be red, and every even rule will be yellow.

```css
column-rule-color: red, yellow;
```

### Repeated line colors

The `repeat()` function, with an integer of `1` or greater as the first argument, can be used to repeat a valid list of CSS `<color>` values passed as subsequent arguments the specified number of times. This allows the color values to be repeated as many times as you need without having to list them individually. The following declarations are equivalent:

```css
column-rule-color: blue, yellow, red, yellow, red;
column-rule-color: blue, repeat(2, yellow, red);
```

This creates a list of five colors. If the number of colors in the `column-rule-color` value's color list exceeds the number of gaps between columns, the excess color values are ignored. If the container has three columns, the rule in the first gutter will be blue and the second yellow.

### Auto-repeating line colors

The `repeat()` function also accepts `auto` as the first argument instead of a positive integer. With `auto` as the first argument, the `<color>` values passed as subsequent arguments will be repeated as many times as needed to fill in values for any column-rules that are not explicitly specified by other components of the property value.

```css
column-rule-color: blue, repeat(auto, yellow), red;
```

In this case, the first column-rule will be blue, the last will be red, and all others will be yellow. As long as there are at least two column-rules, the first will always be blue and the last will always be red. All the other rules will be yellow, which means if there are only 2 or 3 columns, there will be no yellow lines.

The `auto` keyword within the `repeat()` function creates an auto-repeater that fills in values for the column-rule line colors that would not otherwise receive values from other parts of the list, preventing the list from being cycled. A `column-rule-color` value can include, at most, one `repeat(auto, <color>)`.

## Examples

### Basic <example-value>

In this example, we define a single color for the lines drawn between columns in a multi-column layout.

#### HTML

We include a paragraph of text.

```html
<p>
  This is a bunch of text split into three columns. The `column-rule-color`
  property is used to change the color of the line that is drawn between
  columns. Don't you think that's wonderful?
</p>
```

#### CSS

We define the `` element as a multi-column container. We include a `gap` of `7px` to provide padding for the `3px` dashed rule drawn between the columns:

```css
p {
  column-count: 5;
  gap: 7px;
  column-rule-style: dashed;
  column-rule-width: 3px;

  column-rule-color: blue;
}
```

#### Result

### Multiple color values

This example demonstrates declaring more than one color, and how the values are repeated when there are fewer values in the list of colors than gutters between columns.

Using the same HTML and CSS as in the previous example, we include three comma-separated colors as the `column-rule-color` value:

```html
<p>
  This is a bunch of text split into three columns. The `column-rule-color`
  property is used to change the color of the line that is drawn between
  columns. Don't you think that's wonderful?
</p>
```

```css
p {
  column-count: 5;
  gap: 7px;
  column-rule-style: dashed;
  column-rule-width: 3px;
}

@layer no-support {
  @supports not (column-rule-color: red, blue) {
    body::before {
      content: "Your browser doesn't support multiple values for the column-rule-color property";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

```css
p {
  column-rule-color: blue, yellow, red;
}
```

#### Result

There are four gutters but only three colors, so the list gets repeated, with the first and fourth lines both being blue.

### Using the `repeat()` function

This example demonstrates using the `repeat()` function within the `column-rule-color` property value and how this function can help prevent complex values from becoming unwieldy.

#### HTML

We include a list of authors:

```html
<ul>
  <li>Kimberlé Crenshaw</li>
  <li>Angela Y. Davis</li>
  <li>Bernardine Evaristo</li>
  <li>Audre Lorde</li>
  <li>Cathy Park Hong</li>
  <li>Zoya Patel</li>
  <li>Juno Mac</li>
  <li>Molly Smith</li>
  <li>Tara Westover</li>
</ul>
```

#### CSS

We start by defining the list as a grid container, creating columns with the `grid-template-columns` property. We include a `gap` of `7px` to provide enough room between the columns to fit our `3px` dashed rule, and remove the bullets with `list-style-type` set to `none`.

Then, to demonstrate how values can become complicated and the utility of the `repeat()` function, we declare two custom properties, which we use in three `color-mix()` color function declarations to create blue, red, and yellow colors. The yellow `color-mix()` color is within a `repeat()` function, set to repeat 3 times.

We also added a border around each grid item so you can see how the line is rule in the middle of the gutter between the columns.

```css
ul {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 7px;
  list-style-type: none;
  column-rule-style: dashed;
  column-rule-width: 3px;

  --base: yellow;
  --mixin: blue;
  column-rule-color:
    color-mix(in lch decreasing hue, var(--base) 0%, var(--mixin)),
    repeat(3, color-mix(in lch decreasing hue, var(--base) 100%, var(--mixin))),
    color-mix(in lch decreasing hue, var(--base) 58%, var(--mixin));
}
li {
  border: 1px solid #dddddd;
}
```

#### Result

The grid has nine cells across, so eight gutters. The `repeat()` function repeats our two mixed color three times, creating a color list with seven colors. Since there are as more column gutters than list colors, the last color in the list is not used.

### Using `auto` within `repeat()`

This example demonstrates using `auto`, instead of an integer, within the `repeat()` function.

We use the same HTML and CSS as in the previous examples, but override the `column-rule-color` value. Here, we use `repeat(auto, <color>)` to set all the lines to be almost transparent black (`#00000033`), except the first and last, which we set to a solid `black`.

```css
ul {
  column-rule-color: black, repeat(auto, #00000033), black;
}
```

#### Result

```css
@layer no-support {
  @supports not (column-rule-color: repeat(3, red)) {
    body::before {
      content: "Your browser doesn't support `repeat()` functions within a column-rule-color property value";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

## See also

- The `<color>` data type
- `column-rule-width`
- `column-rule-style`
- `row-rule-color`
- `column-rule` shorthand
- `rule-color` shorthand
- `rule` shorthand
- Defining CSS gaps
- CSS gaps module
