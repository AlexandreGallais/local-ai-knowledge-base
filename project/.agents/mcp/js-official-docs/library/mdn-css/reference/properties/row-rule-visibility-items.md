---
title: "`row-rule-visibility-items` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/row-rule-visibility-items/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `row-rule-visibility-items` CSS property

The **`row-rule-visibility-items`** CSS property defines whether a row-rule segment is painted in gaps adjacent to empty areas.

```css
row-rule-visibility-items: all;
```

```css
row-rule-visibility-items: around;
```

```css
row-rule-visibility-items: between;
```

```css
row-rule-visibility-items: normal;
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
  row-rule: solid 5px red;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
}
cite {
  grid-column: 3;
  grid-row: 3;
}
```

## Syntax

```css
/* Keyword values */
row-rule-visibility-items: all;
row-rule-visibility-items: around;
row-rule-visibility-items: between;
row-rule-visibility-items: normal;

/* Global values */
row-rule-visibility-items: inherit;
row-rule-visibility-items: initial;
row-rule-visibility-items: revert;
row-rule-visibility-items: revert-layer;
row-rule-visibility-items: unset;
```

### Values

This property is specified as one of the following keyword values:

- `all`
    The row rule should be painted in all gap segments, regardless of whether adjacent areas contain an item.

- `around`
    The row rule should be painted in a gap segment if at least one of the two adjacent areas is occupied by an item.

- `between`
    The row rule should be painted in a gap segment if both adjacent areas are occupied by items.

- `normal`
    Behaves the same as `all`. This is the default.

## Description

The `row-rule-visibility-items` property defines whether, in multi-column and grid containers with more than one row, row rule segments are painted in the gaps between two adjacent areas if one or both of the areas are empty.

The `row-rule-visibility-items` and `column-rule-visibility-items` properties can both be set to the same values using the `rule-visibility-items` shorthand.

## Examples

### Basic <example-value>

In this example, we define a row rules to be drawn between two grid areas if at least one adjacent grid area contains grid items.

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

We define the ordered list (``) to be a grid container, creating 4 rows and 4 columns by setting both the `grid-template-rows` and `grid-template-columns` properties to `repeat(4, 1fr)`, and move the last item to the bottom-right grid area using `grid-row` and `grid-column`. We include a `gap` of `20px` to provide enough room between the rows to fit our `5px` dashed rule.

Finally, we set `row-rule-visibility-items` to `around`, so that a row rule segment is only painted in a row gap if one or both adjacent grid areas contain a grid item.

```css
ol {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 10px;

  row-rule: dashed 5px blue;
  row-rule-visibility-items: around;
}
li:last-child {
  grid-column: 4;
  grid-row: 4;
}
```

```css
li {
  margin-left: 1em;
}
@layer no-support {
  @supports not (row-rule-visibility-items: around) {
    body::before {
      content: "Your browser doesn't support the row-rule-visibility-items property";
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
- `column-rule-visibility-items`
- `row-rule` shorthand
- `rule` shorthand
- CSS gaps module
