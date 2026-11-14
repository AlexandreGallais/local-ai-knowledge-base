---
title: "`row-rule-style` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/row-rule-style/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `row-rule-style` CSS property

The **`row-rule-style`** CSS property defines the line style of the lines drawn between rows in multi-row grid, flex, and multi-col layouts.

```css
row-rule-style: solid;
```

```css
row-rule-style: inset, outset;
```

```css
row-rule-style: repeat(2, dashed, dotted), solid;
```

```css
row-rule-style: solid, repeat(auto, dashed, dotted), solid;
```

```css
row-rule-style: hidden;
```

```html
<section id="default-example">
  <ul id="example-element">
    <li>One fish</li>
    <li>Two fish</li>
    <li>Red fish</li>
    <li>Blue fish</li>
  </ul>
</section>
```

```css
#example-element {
  display: flex;
  flex-flow: column;
  row-rule-width: thick;
  row-rule-color: magenta;
  gap: 7px;
  text-align: left;
}
```

## Syntax

```css
/* One value */
row-rule-style: none;
row-rule-style: hidden;
row-rule-style: dotted;

/* Multiple values */
row-rule-style: groove, dashed, solid;
row-rule-style: double, repeat(5, ridge), double;
row-rule-style: solid, repeat(auto, inset, outset), solid;

/* Global values */
row-rule-style: inherit;
row-rule-style: initial;
row-rule-style: revert;
row-rule-style: revert-layer;
row-rule-style: unset;
```

### Values

The `row-rule-style` property accepts a comma-separated list of values, including:

- `<line-style>`
    A `<line-style>`: one of `none`, `hidden`, `dotted`, `dashed`, `solid`, `double`, `groove`, `ridge`, `inset`, or `outset`. The default value is `none`.

- `<repeat-line-style>`
    A `repeat()` function, with the first argument being an `<integer>` of `1` or more, and subsequent arguments being `<line-style>` values. The integer specifies how many times the `<line-style>` values should be repeated.

- `<auto-repeat-line-style>`
    A `repeat()` function, with `auto` as the first argument and one or more `<line-style>` values as subsequent arguments. The provided `<line-style>` values are repeated as many times as needed to fill in values for any row-rules that are not explicitly specified by other components of the property value.

## Description

The `row-rule-style` property defines the line style of any row rule lines drawn in the gaps between rows in multi-column, flex, and grid containers with more than one row.

The value is a comma-separated list of components, which can include `<line-style>`, `<repeat-line-style>`, and `<auto-repeat-line-style>` types.

The `row-rule-style`, along with the `row-rule-color` and `row-rule-width` properties, can be set using the `row-rule` shorthand. The `row-rule-style`, along with the `column-rule-style` property, can also be set using the `rule-style` shorthand.

If the property value has only one `<line-style>`, all the row rules will be that style. If we declare the following, all row rules will be `dashed`:

```css
row-rule-style: dashed;
```

When more than one `<line-style>` is declared, they will be applied to row-rules in the order specified. If there are more row-rules than `<line-style>` values, the list of line styles is repeated until every row rule has a style. If we declare the following, for example, every odd rule will be `dashed`, and every even rule will be `dotted`.

```css
row-rule-style: dashed, dotted;
```

### Repeated line styles

The `repeat()` function, with an integer of `1` or greater as the first argument, can be used to repeat a valid list of CSS `<line-style>` values passed as subsequent arguments the specified number of times. This allows the same style to be repeated a set number of times without repeating the same value. You can include `<line-style>` keyword values or custom properties that resolve to a valid `<line-style>`. Using `repeat()` can make values easier to write, enabling recurring patterns to be written using a single function, regardless of the number of rows. The following declarations are equivalent:

```css
row-rule-style: solid, outset, inset, outset, inset;
row-rule-style: solid, repeat(2, outset, inset);
```

This creates a list of five styles. If the number of styles in the `row-rule-style` value's style list exceeds the number of gaps between rows, the excess style values are ignored. If the container has three rows, the rule in the first gutter will be `solid` and the second `outset`.

If there are more gutters than styles, the list of styles is repeated. If the container has 6, 11, 16, or 21 rows, this sequence of styles will be repeated one, two, three, or four times, respectively, with the last rule being `inset`.

### Auto-repeating line styles

The `repeat()` function also accepts `auto` as the first argument instead of a positive integer. With `auto` as the first argument, the `<line-style>` values passed as subsequent parameters will be repeated as many times as needed to fill in values for any row-rules that are not explicitly specified by other components of the property value.

```css
row-rule-style: solid, repeat(auto, dotted), solid;
```

In this case, it doesn't matter if the container has 3, 6, 11, 16, or 21 rows; the first and last row rules will always be `solid`, and all the other row rules will be `dotted`. If there are only 2 or 3 rows, there will be no dotted row rules.

The `auto` keyword within the `repeat()` function creates an auto repeater that fills in values for row rules that would not otherwise receive values from other parts of the list, preventing the list from being cycled. Only one `repeat(auto, <line-style>)` is allowed within a `row-rule-style` value.

## Examples

### Basic <example-value>

In this example, we define a single style for the lines drawn between flex items.

#### HTML

We include a list of dynamic sports duos:

```html
<ul>
  <li>Simone Biles + Jonathan Owens</li>
  <li>Serena Williams + Venus Williams</li>
  <li>Aaron Judge + Giancarlo Stanton</li>
  <li>LeBron James + Dwyane Wade</li>
  <li>Xavi Hernandez + Andres Iniesta</li>
  <li>Kerri Walsh + Misty May Treanor</li>
</ul>
```

#### CSS

We define the list to be a flex container, creating rows by setting the `flex-direction` to `column` using the `flex-flow` shorthand. We include a `gap` of `5px` to provide enough room between the rows to fit our `3px` dashed red rule:

```css
ul {
  display: flex;
  flex-flow: column;
  gap: 5px;
  row-rule-width: 3px;
  row-rule-color: red;

  row-rule-style: dashed;
}
```

#### Result

### Repeating values

This example demonstrates how, when there are fewer values in the list of styles than row rules, the values are repeated.

#### CSS

Using the same HTML and CSS as in the previous example, we include three comma-separated styles as the `row-rule-style` value:

```css
ul {
  row-rule-style: solid, dotted, dashed;
}
```

#### Result

### Using the `repeat()` function

This example demonstrates using the `repeat()` function within the `row-rule-style` property value.

#### CSS

We use the same HTML and CSS as in the previous examples. We include a `repeat()` function, setting the list of two `<line-style>` values to be repeated 3 times.

```css
ul {
  row-rule-style: double, repeat(3, inset, dashed), double;
}
```

#### Result

The flex container has six rows, so five gutters. The `repeat()` function repeats two style values three times, creating a list of eight style values, so the last three values in the list are discarded.

### Using `auto` within `repeat()`

This example demonstrates using `auto` instead of an integer within the `repeat()` function.

#### CSS

Using `repeat(auto, <line-style>)` we set all row rules to `dotted`, except the first and last, which we set to `solid`.

```css
ul {
  row-rule-style: solid, repeat(auto, dotted), solid;
}
```

#### Result

```css
@layer no-support {
  @supports not (row-rule-style: solid, dotted) {
    body::before {
      content: "Your browser doesn't support the row-rule-style property";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

## See also

- `row-rule-color`
- `row-rule-width`
- `column-rule-style`
- `row-rule` shorthand
- `rule-style` shorthand
- `rule` shorthand
- Defining CSS gaps
- CSS gaps module
