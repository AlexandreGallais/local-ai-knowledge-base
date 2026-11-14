---
title: "`rule-visibility-items` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/rule-visibility-items/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rule-visibility-items` CSS property

The **`rule-visibility-items`** CSS shorthand property defines whether rule segments are painted in both row and column gaps adjacent to empty areas.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `column-rule-visibility-items`
- `row-rule-visibility-items`

```css
rule-visibility-items: all;
```

```css
rule-visibility-items: around;
```

```css
rule-visibility-items: between;
```

```css
rule-visibility-items: normal;
```

```html
<section id="default-example">
  <section id="example-element">
    <p>One fish</p>
    <p>Two fish</p>
    <p>Red fish</p>
    <p>Blue fish</p>
    <cite>-- Dr. Seuss</cite>
  </section>
</section>
```

```css
#example-element {
  display: grid;
  rule: solid 5px red;
  gap: 10px;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
}
cite {
  grid-row: 3;
  grid-column: 3;
}
```

## Syntax

```css
/* Keyword values */
rule-visibility-items: all;
rule-visibility-items: around;
rule-visibility-items: between;
rule-visibility-items: normal;

/* Global values */
rule-visibility-items: inherit;
rule-visibility-items: initial;
rule-visibility-items: revert;
rule-visibility-items: revert-layer;
rule-visibility-items: unset;
```

### Values

This property is specified as one of the following keyword values:

- `all`
    Rules should be painted in all gap segments, regardless of whether adjacent areas contain an item.

- `around`
    A rule should be painted in a gap segment if at least one of the two adjacent areas is occupied by an item.

- `between`
    A rule should be painted in a gap segment only if both adjacent areas are occupied by items.

- `normal`
    With grid containers, behaves the same as `all`. In multicol layout, behaves the same as `between`. This is the default.

## Description

The `rule-visibility-items` property defines whether rule segments are painted in gaps adjacent to empty areas in the gaps between rows and columns in multi-row and grid containers with more than one row or column.

The value is a single keyword that sets the same value for both the `column-rule-visibility-items` and `row-rule-visibility-items` properties.

## Examples

### Basic <example-value>

In this example, we define a rule to be drawn between two grid areas if at least one adjacent grid area contains a grid item.

#### HTML

We include a list of dynamic sports duos:

```html
<ol>
  <li>Simone Biles + Jonathan Owens</li>
  <li>Serena Williams + Venus Williams</li>
  <li>Aaron Judge + Giancarlo Stanton</li>
  <li>LeBron James + Dwyane Wade</li>
  <li>Xavi Hernandez + Andres Iniesta</li>
  <li>Kerri Walsh + Misty May Treanor</li>
</ol>
```

#### CSS

We define the ordered list (``) to be a grid container, creating 4 columns and 4 rows by setting both the `grid-template-columns` and `grid-template-rows` properties to `repeat(4, 1fr)`, and move the last item to the bottom-right grid area using the `grid-column` and `grid-row` properties. We include a `gap` of `20px` to provide enough room between the columns to fit our `5px` rules. We set the column rules to `dashed` and the row rules to `solid`.

Finally, we set `rule-visibility-items` to `between`, so that row- and column-rules are painted only if both grid areas adjacent to them contain a grid item.

```css
ol {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  column-rule: dashed 5px blue;
  row-rule: solid 5px red;

  rule-visibility-items: around;
}
li:last-child {
  grid-row: 4;
  grid-column: 4;
}
```

```css
li {
  margin-left: 1em;
}
@layer no-support {
  @supports not (rule-visibility-items: around) {
    body::before {
      content: "Your browser doesn't support the rule-visibility-items shorthand";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

## See also

- `column-rule-visibility-items` shorthand
- `row-rule-visibility-items`
- `rule` shorthand
- CSS gaps module
