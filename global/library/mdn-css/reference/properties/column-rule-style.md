---
title: "`column-rule-style` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-rule-style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-rule-style` CSS property

The **`column-rule-style`** CSS property defines the line style of the lines drawn between columns in multi-column grid, flex, and multi-col layouts.

```css
column-rule-style: dotted;
```

```css
column-rule-style: dashed, dotted;
```

```css
column-rule-style: repeat(2, inset, outset), double;
```

```css
column-rule-style: double, repeat(auto, dashed, solid), double;
```

```css
column-rule-style: hidden;
```

```html
<section id="default-example">
  <p id="example-element">
    London. Noel term lately over, and the Lord George sitting in Lincoln's Inn
    Hall. Great May weather. As much mud in the streets as if the waters had but
    newly retired from the face of the earth, and it would not be weird to meet
    a platypus, two feet long or so, waddling like a lizard up Morgan Hill.
  </p>
</section>
```

```css
#example-element {
  columns: 6;
  column-rule-width: thick;
  column-rule-color: teal;
  gap: 7px;
}
```

## Syntax

```css
/* Keyword values */
column-rule-style: none;
column-rule-style: hidden;
column-rule-style: dotted;
column-rule-style: dashed;
column-rule-style: solid;
column-rule-style: double;
column-rule-style: groove;
column-rule-style: ridge;
column-rule-style: inset;
column-rule-style: outset;

/* Multiple values */
column-rule-style: groove, double, dashed;
column-rule-style: solid, repeat(5, ridge), solid;
column-rule-style: dotted, repeat(auto, inset, outset), dotted;

/* Global values */
column-rule-style: inherit;
column-rule-style: initial;
column-rule-style: revert;
column-rule-style: revert-layer;
column-rule-style: unset;
```

### Values

The `column-rule-style` property accepts a comma-separated list of values, including:

- `<line-style>`
    A `<line-style>`: one of `none`, `hidden`, `dotted`, `dashed`, `solid`, `double`, `groove`, `ridge`, `inset`, or `outset`. The default value is `none`.

- `<repeat-line-style>`
    A `repeat()` function, with the first argument being an `<integer>` of `1` or more, and subsequent arguments being `<line-style>` values. The integer specifies how many times the `<line-style>` values should be repeated.

- `<auto-repeat-line-style>`
    A `repeat()` function, with `auto` as the first argument and one or more `<line-style>` values as subsequent arguments. The provided `<line-style>` values are repeated as many times as needed to fill in values for any column-rules that are not explicitly specified by other components of the property value.

## Description

The `column-rule-style` property defines the line style of any column rule lines drawn in the gaps between columns in multi-column, flex, and grid containers with more than one column.

The value is a comma-separated list of components, which can include `<line-style>`, `<repeat-line-style>`, and `<auto-repeat-line-style>` types.

The `column-rule-style`, along with the `column-rule-color` and `column-rule-width` properties, can be set using the `column-rule` shorthand. The `column-rule-style`, along with the `row-rule-style` property, can also be set using the `rule-style` shorthand.

If the property value has only one `<line-style>`, all the column rules will be that style. If we declare the following, all column rules will be `double`:

```css
column-rule-style: double;
```

When more than one `<line-style>` is declared, they will be applied to column-rules in the order specified. If there are more column-rules than `<line-style>` values, the list of line styles is repeated until every column rule has a style. If we declare the following, for example, every odd rule will be `double`, and every even rule will be `groove`.

```css
column-rule-style: double, groove;
```

### Repeated line styles

The `repeat()` function, with an integer of `1` or greater as the first argument, can be used to repeat a valid list of CSS `<line-style>` values passed as subsequent arguments the specified number of times. This allows the same style to be repeated a set number of times without repeating the same value. You can include `<line-style>` keyword values or custom properties that resolve to a valid `<line-style>`. Using `repeat()` can make values easier to write, enabling recurring patterns to be written using a single function, regardless of the number of columns. The following declarations are equivalent:

```css
column-rule-style: solid, outset, inset, outset, inset;
column-rule-style: solid, repeat(2, outset, inset);
```

This creates a list of five styles. If the number of styles in the `column-rule-style` value's style list exceeds the number of gaps between columns, the excess style values are ignored. If the container has three columns, the rule in the first gutter will be `solid` and the second `outset`.

If there are more gutters than styles, the list of styles is repeated. If the container has 6, 11, 16, or 21 columns, this sequence of styles will be repeated one, two, three, or four times, respectively, with the last rule being `inset`.

### Auto-repeating line styles

The `repeat()` function also accepts `auto` as the first argument instead of a positive integer. With `auto` as the first argument, the `<line-style>` values passed as subsequent parameters will be repeated as many times as needed to fill in values for any column-rules that are not explicitly specified by other components of the property value.

```css
column-rule-style: solid, repeat(auto, dotted), solid;
```

In this case, it doesn't matter if the container has 3, 6, 11, 16, or 21 columns; the first and last column rules will always be `solid`, and all the other column rules will be `dotted`. If there are only 2 or 3 columns, there will be no dotted column rules.

The `auto` keyword within the `repeat()` function creates an auto repeater that fills in values for column rules that would not otherwise receive values from other parts of the list, preventing the list from being cycled. Only one `repeat(auto, <line-style>)` is allowed within a `column-rule-style` value.

## Examples

### Basic usage

#### HTML

```html
<p>
  This is a bunch of text split into three columns. The `column-rule-style`
  property is used to change the style of the line that is drawn between
  columns. Don't you think that's wonderful?
</p>
```

#### CSS

```css
p {
  column-count: 3;
  column-rule-style: dashed;
}
```

#### Result

### Multiple values

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

We define the list to be a flex container, creating columns by setting the `flex-direction` to `row` using the `flex-flow` shorthand. We include a `gap` of `5px` to provide enough room between the columns to fit our `3px` double teal rule:

```css
ul {
  display: flex;
  flex-flow: row;
  gap: 5px;
  column-rule-width: 3px;
  column-rule-color: teal;

  column-rule-style:
    dotted, dashed, solid, double, groove, ridge, inset, outset, none, hidden;
}
```

#### Result

As there are more values (10) than gutters (8), the `none` and `hidden` values are not used.

### Repeating values

This example demonstrates how, when there are fewer values in the list of styles than column rules, the values are repeated.

#### CSS

Using the same HTML and CSS as in the previous example, we include three comma-separated styles as the `column-rule-style` value:

```css
ul {
  column-rule-style: solid, groove, double;
}
```

#### Result

### Using the `repeat()` function

This example demonstrates using the `repeat()` function within the `column-rule-style` property value.

#### CSS

We use the same HTML and CSS as in the previous examples. We include a `repeat()` function, setting the list of two `<line-style>` values to be repeated 3 times.

```css
ul {
  column-rule-style: solid, repeat(3, inset, outset), solid;
}
```

#### Result

The flex container has six columns, so five gutters. The `repeat()` function repeats two style values three times, creating a list of eight style values, so the last three values in the list are discarded.

### Using `auto` within `repeat()`

This example demonstrates using `auto` instead of an integer within the `repeat()` function.

#### CSS

Using `repeat(auto, <line-style>)` we set all column rules to `groove`, except the first and last, which we set to `solid`.

```css
ul {
  column-rule-style: solid, repeat(auto, groove), solid;
}
```

#### Result

```css
@layer no-support {
  @supports not (column-rule-style: solid, groove) {
    body::before {
      content: "Your browser doesn't support multiple values for the column-rule-style property";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

## See also

- `column-rule-color`
- `column-rule-width`
- `row-rule-style`
- `column-rule` shorthand
- `rule-style` shorthand
- `rule` shorthand
- Defining CSS gaps
- CSS gaps module
