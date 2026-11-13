---
title: "`column-rule-visibility-items` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-rule-visibility-items/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-rule-visibility-items` CSS property

The **`column-rule-visibility-items`** CSS property defines whether a column-rule segment is painted in gaps adjacent to empty areas.

```css
column-rule-visibility-items: all;
```

```css
column-rule-visibility-items: around;
```

```css
column-rule-visibility-items: between;
```

```css
column-rule-visibility-items: normal;
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
  column-rule: solid 5px red;
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
column-rule-visibility-items: all;
column-rule-visibility-items: around;
column-rule-visibility-items: between;
column-rule-visibility-items: normal;

/* Global values */
column-rule-visibility-items: inherit;
column-rule-visibility-items: initial;
column-rule-visibility-items: revert;
column-rule-visibility-items: revert-layer;
column-rule-visibility-items: unset;
```

### Values

This property is specified as one of the following keyword values:

- `all`
    The column rule should be painted in all gap segments, regardless of whether adjacent areas contain an item.

- `around`
    The column rule should be painted in a gap segment if at least one of the two adjacent areas is occupied by an item.

- `between`
    The column rule should be painted in a gap segment if both adjacent areas are occupied by items.

- `normal`
    With grid containers, behaves the same as `all`. In multicol layout, behaves the same as `between`. This is the default.

## Description

The `column-rule-visibility-items` property defines whether a column-rule segment is painted in column gaps adjacent to empty areas in multi-row and grid containers with more than one column.

The `column-rule-visibility-items` and `row-rule-visibility-items` properties can both be set using the `rule-visibility-items` shorthand.

## Examples

### Basic <example-value>

In this example, we define a column rule to be drawn between two grid areas if at least one adjacent grid area contains a grid item.

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

We define the ordered list (``) to be a grid container, creating 4 columns and 4 rows by setting both the `grid-template-columns` and `grid-template-rows` properties to `repeat(4, 1fr)`, and move the last item to the bottom-right grid area using `grid-column` and `grid-row` properties. We include a `gap` of `20px` to provide enough room between the columns to fit our `5px` dashed rule.

Finally, we set `column-rule-visibility-items` to `between`, so that a column rule is painted in a column gap only if both adjacent grid areas contain a grid item.

```css
ol {
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  column-rule: dashed 5px blue;
  column-rule-visibility-items: between;
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
  @supports not (column-rule-visibility-items: around) {
    body::before {
      content: "Your browser doesn't support the column-rule-visibility-items property";
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

- `rule-visibility-items` shorthand
- `row-rule-visibility-items`
- `column-rule` shorthand
- `rule` shorthand
- CSS gaps module
