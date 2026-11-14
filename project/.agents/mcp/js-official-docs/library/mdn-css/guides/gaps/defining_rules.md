---
title: "Defining CSS row and column gap rules"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/gaps/defining_rules/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Defining CSS row and column gap rules

When creating grid, flexbox, and multi-column, you can add decorative lines, or _rules_, in the center of the gutters between rows and columns. You can show rules in every gap or a subset of gaps, and fully animate rule widths, colors, and insets. This guide explains how to specify the width, color, and style of these rules.

## Overview

The CSS gaps module defines several properties that specify the appearance of lines painted behind content in a grid, flexbox, or multi-col container's gutters, or gaps. These lines don't affect the box model or layout. The size of the gutter is defined by the `gap` property, with the default value being `1em` on multi-column containers and `0` in all other contexts.

If a rule is wider than the `gap`, the lines are painted behind the content to avoid obscuring it. You should still ensure the color contrast of the content and both the background and the rule are sufficient to ensure legibility.

To learn more about specifying the spacing between adjacent boxes within a given layout context for layouts that have gutters and gaps, see Defining CSS gaps.

All the rule color, line-width, and line-style properties accept a comma-separated list of values, allowing for varying gap decorations within a container.

```css
rule-color: blue;
rule-width: 10px, 20px;
rule-style: solid, dashed, solid, dotted;
```

You can use the `repeat()` function within the list to define a set number of repetitions, or to automatically add as many repetitions as needed to provide a value for every line drawn.

```css
rule-color: blue, repeat(3, gray, red);
rule-width: 50px, repeat(10, 10px, 20px), 10px;
rule-style: solid, repeat(auto, dashed, dotted), solid;
```

The rule color, line-width, and line-style shorthand properties set the same values for both column and row rules.

## The `repeat()` function

Before introducing the column and row rule properties, it is important to understand the `repeat()` function.

The `repeat()` function can be used to repeat a valid list of CSS values. The first argument specifies how many times to repeat the list of values passed as subsequent arguments. This allows color, line-width, or line-style values to repeat as many times as needed without listing them individually.

The following declarations are equivalent, with both creating a list of eight colors:

```css
rule-color: blue, yellow, red, yellow, red, yellow, red, gray;
rule-color: blue, repeat(3, yellow, red), gray;
```

If the number of values exceeds the number of gaps, the excess values are ignored. For example, in a 3x3 grid container, the first row and column rules will be blue and the second yellow. The other color values in the list are unused.

If there are more gaps than values, the list is cycled. In a 10x10 grid container, there are nine gaps in each direction. In this case, the last rules are blue; the first eight row and column rules are each assigned the associated color, then the list cycles, so the ninth row and column rules get the first value in the list.

Here, with only three rows, only two values are used to color the row gaps, while the list is cycled to provide `<color>` values to each of the eleven column rules.

```css
div {
  rule-color: blue, repeat(3, yellow, red), gray;
  grid-template-columns: repeat(12, 1fr);
}
```

The `repeat()` function's first parameter is either an `integer` of `1` or greater or the keyword `auto`. If the number is invalid (`0`, negative, missing, or a non-integer number), the entire declaration is invalid and ignored. The `auto` keyword within the `repeat()` function creates an _auto-repeater_ that fills in values that would otherwise not receive values from other parts of the list, preventing the list from cycling. A property value can include, at most, one `repeat(auto, <value-list>)` auto-repeater.

By setting the following, in a grid that is 3x3 or larger, the `blue` and `gray` rules will each occur exactly once in each direction:

```css
rule-color: blue, repeat(auto, yellow, red), gray;
```

In this case, `yellow` and `red` are repeated as many times as needed to fill in values for any rules that are not explicitly specified by other components of the property value. The first rule will always be blue. If there is more than one rule, the last will always be gray. All other rules will cycle between `yellow` and `red`.

```css
div {
  rule-color: blue, repeat(auto, yellow, red), gray;
  grid-template-columns: repeat(12, 1fr);
}
```

## Line properties

Every visible rule has a color, width, and style. Each of these can be defined as a single value or as a list of values.

### Color properties

The `column-rule-color` property specifies the color of lines drawn between columns, the `row-rule-color` property defines the color of lines drawn between rows, and the `rule-color` property sets both the `column-rule-color` and `row-rule-color` to the same value. These properties are all specified as a comma-separated list of values, which can include:

- `<color>`
    A valid `<color>` value specifying the color of a line. The default is `currentcolor`.

- `<repeat-line-color>`
    A `repeat()` function, with an `<integer>` as the first argument and one or more `<color>` values as subsequent arguments. The `<integer>`, with a value of `1` or more, specifies how many times the list of `<color>` values should be repeated.

- `<auto-repeat-line-color>`
    A `repeat()` function, with `auto` as the first argument and one or more `<color>` values as subsequent arguments. This creates an auto-repeater that assigns `<color>` values to gap rules that would otherwise not receive values from the other components of the property value, preventing the property's comma-separated list from cycling. At most, you can include only one `<auto-repeat-line-color>` value in the list.

By using `auto` inside the `repeat()` function as part of the `rule-color` property, we can set the first and last rules to dark and all middle rules to light.

```css
div {
  rule-color: black, repeat(auto, lightgray), black;
}
```

If you change the number of columns from `6` to `4` or `8`, the first and last rules in each direction will still be `black` and all the other rules `lightgray`.

The gray horizontal lines are drawn over the black vertical lines. This is because, by default, the row rules are drawn on top of the column rules. This can be changed by setting the `rule-overlap` property to `column-over-row` instead of its default `row-over-column` value.

### Width properties

The `column-rule-width` property specifies the width of the lines drawn between columns, the `row-rule-width` property defines the width of the lines drawn between rows, and the `rule-width` property sets both the `column-rule-width` and `row-rule-width` to the same values. These properties are all specified as a comma-separated list of values, which can include:

- `<line-width>`
    Defines the width of the line, either as an explicit non-negative `<length>` or the keywords: `thin`, `medium`, or `thick`. The default is `medium`, which generally resolves to `3px`. Custom properties that resolve to a `<line-width>` are also valid.
- `<repeat-line-width>`
    A `repeat()` function, with an `<integer>` as the first argument and one or more `<line-width>` values as subsequent arguments. The `<integer>`, with a value of `1` or more, specifies how many times the list of `<line-width>` values should be repeated.
- `<auto-repeat-line-width>`
    A `repeat()` function, with `auto` as the first argument and one or more `<line-width>` values as subsequent arguments. This creates an auto-repeater that assigns `<line-width>` values to gap rules that would otherwise not receive values from the other components of the property value, preventing the property's comma-separated list from cycling. At most, you can include only one `<auto-repeat-line-width>` value in the list.

Unlike the `gap` properties, `rule-width` properties don't affect layout.
These properties only define rule width. Rules appear in the middle of the gap, have no effect on the size of the gap, and have no impact on the box model. Rules that are wider than the gap are drawn behind the content.

In this example, the `gap` is specified as `20px`. We define varying rule sizes using the `rule-width` property:

```css
div {
  rule-width: 10px, repeat(auto, 20px, 30px), 40px;
}
```

The black rules are centered in the gap. This is most noticeable in the first row and column gaps, where the `10px` line is drawn in the middle of the `20px` gap. Rules are drawn behind the content. This is most noticeable when `rule-width` is larger than the `gap`, and the lines show through the semi-opaque grid items.

The grid items all have black text and a semi-transparent, almost white background. Including a `background-color` on your content helps ensure that overflowing rules don't create accessibility issues. For your content to be accessible, there must be sufficient contrast between a background, be it the background color or the rule color, and the text or other important visual information.

### Line-style properties

The `column-rule-style` property specifies the style of the lines drawn between columns, the `row-rule-style` property defines the style of the lines drawn between rows, and the `rule-style` sets both the `column-rule-style` and `row-rule-style` to the same value.

These properties are all specified as a comma-separated list of values, which can include:

- `<line-style>`
    A keyword — `solid`, `dashed`, `dotted`, `double`, `groove`, `ridge`, `inset`, `outset`, `none`, or `hidden` — which defines the line style of the drawn rule. The default is `none`.
- `<repeat-line-style>`
    A `repeat()` function, with an `<integer>` as the first argument and one or more `<line-style>` values as subsequent arguments. The `<integer>`, with a value of `1` or more, specifies how many times the list of `<line-style>` values should be repeated.
- `<auto-repeat-line-style>`
    A `repeat()` function, with `auto` as the first argument and one or more `<line-style>` values as subsequent arguments. This creates an auto-repeater that assigns `<line-style>` values to gap rules that would otherwise not receive values from the other components of the property value, preventing the property's comma-separated list from cycling. At most, you can include only one `<auto-repeat-line-style>` value in the list.

As with `border`, the default value is `none`, so a rule must have a `<line-style>` declared with a value other than `hidden` or `none` for it to be painted.

In this example, we assign a list with seven values to the `column-rule-style` property. As the eight-column grid has seven column gaps, each value is used only once. The `row-rule-style` declaration has three values for three row rules, so again, each value is used once.

```css
div {
  column-rule-style: solid, dotted, dashed, double, groove, ridge, inset;
  row-rule-style: outset, none, hidden;
}
```

```css
div {
  grid-template-columns: repeat(8, 1fr);
}
```

Only the `outset` rules are drawn in the row gutters, as when the `<line-style>` is set to `none` or `hidden`, no line is painted.

### Shorthand properties

The `row-rule`, `column-rule`, and `rule` shorthands can be used to declare the colors, line-widths, and line-styles for one or more lines in a single declaration.

These shorthand properties are all specified as a comma-separated list of values, from the following list:

- `<gap-rule>`
    Specified as one, two, or three of the values `<line-width>`, `<line-style>`, and `<color>`, in any order. Just like with `border` shorthand values, the `<line-style>` must be included for a line to be painted, as it otherwise defaults to `none`. The default `<line-width>` is `medium` and the default `<color>` is `current-color`.

- `<gap-repeat-rule>`
    A `repeat()` function, with an `<integer>` as the first argument and one or more `<gap-rule>` values as subsequent arguments. The `<integer>`, with a value of `1` or more, specifies how many times the list of `<gap-rule>` values should be repeated.

- `<auto-repeat-gap-rule>`
    A `repeat()` function, with `auto` as the first argument and one or more `<gap-rule>` values as subsequent arguments. This creates an auto-repeater that assigns `<gap-rule>` values to gap rules that would otherwise not receive values from the other components of the property value, preventing the property's comma-separated list from cycling. At most, you can include only one `<auto-repeat-gap-rule>` value in the list.

The shorthand property declarations are similar to the constituent property values, but each value in the comma-separated list of values is a space-separated list of up to three component values. The `repeat()` function works the same way as with constituent properties, but again, each value is a space-separated list of components.

```css
div {
  rule:
    10px solid blue,
    repeat(auto, 20px dashed teal, 5px double orange),
    15px inset rebeccapurple;
}
```

The `rule` shorthand sets both the `column-rule` and `row-rule` to the same value.

```html
<section>
  <div>
    <i>A</i>
    <i>B</i>
    <i>C</i>
    <i>D</i>
    <i>E</i>
    <i>F</i>
    <i>G</i>
    <i>H</i>
    <i>I</i>
    <i>J</i>
    <i>K</i>
    <i>L</i>
    <i>M</i>
    <i>N</i>
    <i>O</i>
    <i>P</i>
    <i>Q</i>
    <i>R</i>
    <i>S</i>
    <i>T</i>
    <i>U</i>
    <i>V</i>
    <i>W</i>
    <i>X</i>
    <i>Y</i>
    <i>Z</i>
    <i id="bang">!</i>
  </div>
</section>
```

```css
@layer hidden {
  div {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    rule: solid 10px;
    border: 1px solid;
    overflow: visible;
    margin: 1em;
    background-color: white;
  }
  i {
    padding: 8px;
    border: 1px dashed;
    color: black;
    background-color: #ddddffcc;
  }
}
@supports not (row-rule-style: solid) {
  body::before {
    content: "Your browser doesn't support these features.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

## See also

- Overview of CSS gap decoration properties
- Defining CSS gaps
- CSS gaps module
- CSS borders and box decorations module
