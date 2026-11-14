---
title: "`column-rule-inset-cap` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-rule-inset-cap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-rule-inset-cap` CSS property

The **`column-rule-inset-cap`** shorthand CSS property can be used to offset the column rule segment cap endpoints at the container's start and end edges, and endpoints where the segments don't intersect other row or column segments.

```css
column-rule-inset-cap: -20px;
```

```css
column-rule-inset-cap: 0;
```

```css
column-rule-inset-cap: 1em;
```

```css
column-rule-inset-cap: 100%;
```

```css
column-rule-inset-cap: overlap-join;
```

```html
<section id="default-example">
  <div id="example-element">
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

    <i id="y">Y</i>
    <i id="z">Z</i>
    <i id="bang">!</i>
  </div>
</section>
```

```css
#example-element {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  rule: solid thick rebeccapurple;
  column-rule-color: magenta;
  gap: 1em;
  rule-overlap: column-over-row;
  rule-visibility-items: between;
  border: 1px solid rebeccapurple;
  overflow: visible;
  margin: 1em;
}
#example-element i {
  padding: 8px;
  border: 1px dashed;
}
#y {
  grid-column: 4 / 5;
  grid-row: 4 / 5;
}
#z {
  grid-column: 5 / 6;
  grid-row: 4 / 5;
}
#bang {
  grid-column: 6 / 7;
  grid-row: 4 / 5;
}
```

## Constituent properties

This property is a shorthand for the following CSS properties:

- `column-rule-inset-cap-end`
- `column-rule-inset-cap-start`

## Syntax

```css
/* Keywords */
column-rule-inset-cap: overlap-join;

/* <length-percentage> values */
column-rule-inset-cap: 0;
column-rule-inset-cap: 1em;
column-rule-inset-cap: -5px;
column-rule-inset-cap: -25%;

/* Two values */
column-rule-inset-cap: overlap-join 1em;
column-rule-inset-cap: -5px -25%;

/* Global values */
column-rule-inset-cap: inherit;
column-rule-inset-cap: initial;
column-rule-inset-cap: revert;
column-rule-inset-cap: revert-layer;
column-rule-inset-cap: unset;
```

### Values

This property is specified as one or two values from the following list:

- `overlap-join`
    Resolves to `0`.
- `length-percentage`
    Specifies the size of the inset. Percentage values are relative to the crossing gap width, which is the width of the `row-gap` for segment endpoints at gap junctions and `0` for endpoints at the container's edge.

## Description

The `column-rule-inset-cap` shorthand property can be used to set the `column-rule-inset-cap-end` and `column-rule-inset-cap-start` properties, insetting or outsetting both the start and end edges of cap segment endpoints in a single declaration.

If one value is specified, both properties are set to that value. If two values are specified, `-start` is set to the first value and `-end` is set to the second. The default value is `0`, which, in the case of cap endpoints, is the same as `overlap-join`. Positive values reduce (or inset) the segment size, while negative values increase (or outset) it.

Column rules are painted within a column gap as one or more segments, with segments occurring between:

- Adjacent columns in CSS grid layouts.
- Flex items or flex lines in flex layouts, depending on the `flex-direction`.
- Columns in multi-col layouts.

Whether a column rule spans multiple rows or is broken into multiple segments is defined by the `column-rule-break` property, with interior breaks between column rule segments being the size of the `row-gap`.

Length `column-rule-inset-cap` values inset segments by the specified value; with negative length values creating an outset, causing end edge cap segments to extend beyond the container's top and bottom edges. Percentage values for end edge cap segments are relative to `0`, so have no effect.

For interior segments, percentage values are relative to the size of the `row-gap`. Setting `-50%` will extend the segment to the middle of the gap, while `-100%` will extend the segment across the entire gap.

The `column-rule-inset-cap` property is a constituent property of a few shorthand properties:

- To inset the ends of all column segments, the `column-rule-inset-cap` property, along with the `column-rule-inset-junction` property, can be set using the `column-rule-inset` shorthand.

- To inset all row and column cap endpoints, the `column-rule-inset-cap` property, along with the `row-rule-inset-cap` property, can be set using the `rule-inset-cap` shorthand.

All segment endpoints, including this property's `-junction` and `row-` equivalents, can be set using the `rule-inset` shorthand.

### Understanding cap endpoints

A _cap segment endpoint_ is any segment endpoint that is not a junction segment endpoint. This includes endpoints at the container's content edges, as well as endpoints at a gap junction where no other row or column segments are present.

The `column-rule-inset-cap` property can reduce or extend the top, bottom, or both ends of column segments at the top and bottom edge of the container and the segment end at any interior junction where no other segments are present.

Column cap segments are impacted by the `rule-visibility-items` properties, which define whether row- and column-rule segments are painted in gaps adjacent to empty areas. Changing the value from `auto` to `between` or `around` can create additional interior cap segments.

In the following demonstration, the top of the column segments in the top row and the bottom of the column segments in the bottom row start and end in cap endpoints, respectively. With `column-rule-inset-cap: 16px` set, all the column segment cap endpoints are inset by `16px`. Change the inset `<length>` value to better visualize which segments start or end in cap segment endpoints.

```html
<ul id="ul">
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
  <li>10</li>
  <li>11</li>
  <li>12</li>
  <li>13</li>
  <li>15</li>
  <li>16</li>
</ul>

<p>
  <label>
    <code>rule-visibility-items</code> value
    <select id="visibility">
      <option>all</option>
      <option>between</option>
      <option>around</option>
      <option selected>normal</option>
    </select>
  </label>
</p>
```

```html
<p>
  <label
    >Change the size of the inset.
    <input type="range" min="-40" max="16" value="16" id="inset" data-unit="px"
  /></label>
  <output id="o">16px</output>
</p>
```

```html
<p>
  <label
    >Change the size of the inset.
    <input
      type="range"
      min="-450"
      max="100"
      value="100"
      id="inset"
      data-unit="%"
  /></label>
  <output id="o">100%</output>
</p>
```

```css
ul {
  display: grid;
  grid-template-columns: repeat(6, auto);
  list-style-type: none;
  gap: 20px;
  column-rule: 10px solid olive;
  row-rule: 10px solid palegoldenrod;
  rule-overlap: column-over-row;
  rule-visibility-items: normal;
  rule-break: intersection;
  column-rule-inset-cap: 16px;

  border: 1px solid;
}
ul {
  place-items: center;
  width: 95vw;
  padding: 0;
}
li {
  text-align: center;
  font-family: sans-serif;
  background-color: #ededed;
  padding: 1em;
  width: 100%;
  box-sizing: border-box;
}
@layer no-support {
  @supports not (column-rule-inset-cap: 16px) {
    body::before {
      content: "Your browser doesn't support the column-rule-inset-cap property";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

```css
ul {
  column-rule-inset-cap: 100%;
  column-rule-style: inset;
}
```

```js
const inset = document.getElementById("inset");
const visibility = document.getElementById("visibility");
const ul = document.getElementById("ul");
const output = document.getElementById("o");

inset.addEventListener("input", () => {
  o.innerText =
    ul.style.columnRuleInsetCap = `${inset.value}${inset.dataset["unit"]}`;
});
```

```js
visibility.addEventListener("change", () => {
  ul.style.ruleVisibilityItems = `${visibility.value}`;
  if (visibility.value === "between") {
    ul.style.columnRuleStyle = "repeat(2, solid), double";
  } else if (visibility.value === "around") {
    ul.style.columnRuleStyle = "repeat(3, solid), repeat(2, double)";
  } else {
    ul.style.columnRuleStyle = "solid";
  }
});
```

```js
visibility.addEventListener("change", () => {
  ul.style.ruleVisibilityItems = `${visibility.value}`;
  if (visibility.value === "between") {
    ul.style.columnRuleStyle = "repeat(2, inset), double, repeat(2, solid)";
  } else if (visibility.value === "around") {
    ul.style.columnRuleStyle = "repeat(3, inset), repeat(2, double)";
  } else {
    ul.style.columnRuleStyle = "solid";
  }
});
```

Change the inset. When `0px` is set, the ends of the column rules align with the top and bottom edges of the container. This is the default. Setting `-32px` outsets the segments by `32px`, with the lines being drawn `32px` past the edge of the container. As column rules don't impact the box model, these lines have no impact on the layout of the container or the rest of the content.

Select `around` as the `rule-visibility-items` value. This value paints rules in a gap segment if at least one of the two adjacent areas is occupied by an item. The start end of the top-most segments are still cap segment endpoints. The bottom-most segments of the double line-style column rules, which appear when the `rule-visibility-items` property is set to `around` do not end in cap endpoints. Rather, the bottom segment of the last two column rules end at _junctions_: interior gaps where row rule segments are present. Therefore, the `column-rule-inset-cap` property does not affect those segment endpoints.

Select `between` as the `rule-visibility-items` value. This value only paints rules in gap segments if both adjacent areas are occupied by an item. In this example, the bottom row rule ends at the third column gap, with the last row segment being between `9` and `16`. The bottom of the third column rule, shown as a double line, ends at an interior gap. As a row rule segment is present, the column segment does not end in a cap segment endpoint, so it is not affected by the `column-rule-inset-cap` property. The last two column rules, however, end at interior gaps where no other rule segments are present, so these column segments are cap segment endpoints and therefore are affected by the `column-rule-inset-cap` property.

### Understanding percentage values

What a percentage value is relative to depends on the endpoint's location. Interior endpoint percentage values are relative to the width of the gap the cap endpoint touches, so generally relative to the `row-gap`, plus any additional spacing added due to `align-content` values. Percentages at container-edge endpoints are relative to `0`. For example, `column-rule-inset-cap: 50%` resolves to half the gap junction size at an interior cap and `0` at the container edges.

This example is not broken. When `rule-visibility-items` is set to `normal`, every column cap endpoint abuts the top or bottom edge of the container, so any percentage value set will be relative to `0`.

Select `around` as the `rule-visibility-items` value. The first three columns end at the container edge, so any percentage value will resolve to `0`. The last two column rules, with the double lines, end at interior gaps where row rule segments are present, so these column segments are not cap segment endpoints.

Select `between` as the `rule-visibility-items` value. The first two column rules, with the light and dark lines, end at the container edge, so they have a `0` inset. The third column rule, with the double line, ends at an interior gap where a row rule segment is present, so this column segment is not a cap segment endpoint. The last two column rules, with the solid lines, end at interior gaps where no other rule segments are present, so the percentage offset is relative to the size of the `row-gap` width, which in this case is `20px`.
