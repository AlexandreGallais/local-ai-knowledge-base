---
title: "`row-rule-inset-junction-start` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/row-rule-inset-junction-start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `row-rule-inset-junction-start` CSS property

The **`row-rule-inset-junction-start`** CSS property can be used to offset the start edge of row rule segments that are junction endpoints; that is, endpoints at gap junctions where rule segments intersect.

```css
row-rule-inset-junction-start: 0;
```

```css
row-rule-inset-junction-start: 0.5em;
```

```css
row-rule-inset-junction-start: 5px;
```

```css
row-rule-inset-junction-start: -50%;
```

```css
row-rule-inset-junction-start: overlap-join;
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
    <i>R</i>

    <i id="u">U</i>
    <i id="x">X</i>
    <i id="y">Y</i>
    <i id="bang">!</i>
  </div>
</section>
```

```css
#example-element {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  rule: solid thick lightpink;
  row-rule-color: magenta;
  row-rule-break: intersection;
  gap: 1.5em;
  rule-overlap: row-over-column;
  border: 1px solid rebeccapurple;
  margin: auto;
  rule-visibility-items: around;
}
#example-element i {
  padding: 8px;
  border: 1px dashed;
}
#u {
  grid-row: 3 / 4;
  grid-column: 7 / 8;
}
#y {
  grid-row: 4 / 5;
  grid-column: 4 / 5;
}
#x {
  grid-column: 3 / 4;
  grid-row: 4 / 5;
}
#bang {
  grid-column: 6 / 7;
  grid-row: 4 / 5;
}
```

## Syntax

```css
/* Keywords */
row-rule-inset-junction-start: overlap-join;

/* <length-percentage> values */
row-rule-inset-junction-start: 0;
row-rule-inset-junction-start: 1em;
row-rule-inset-junction-start: -5px;
row-rule-inset-junction-start: -25%;

/* Global values */
row-rule-inset-junction-start: inherit;
row-rule-inset-junction-start: initial;
row-rule-inset-junction-start: revert;
row-rule-inset-junction-start: revert-layer;
row-rule-inset-junction-start: unset;
```

### Values

This property is specified as a single value from the following list:

- `overlap-join`
    Specifies that the junction segment should extend across the column-rule, resolving to half the `column-gap` value plus half the used `column-rule-width` value.
- `length-percentage`
    Specifies the size of the inset. Percentage values are relative to the junction endpoint, which is the `column-gap` value.

## Description

The `row-rule-inset-junction-start` property can be used to inset or outset junction segment endpoints occurring at the start of row rule segments. The default value is `0`. Positive values reduce the segment size, while negative values and the `overlap-join` keyword increase it.

Row rules are painted within a row gap as one or more segments, with segments occurring between:

- Adjacent rows in CSS grid layouts.
- Adjacent flex items or flex lines in flex layouts, depending on the `flex-direction`.
- Adjacent rows in multi-col layouts, which may exist when `column-height` is set to a `<length>`.

Whether a row rule spans multiple columns or is broken into multiple segments is defined by the `row-rule-break` property; interior breaks between row rule segments are the size of the `column-gap`. A junction start occurs at the start of every row segment where the segment ends at a gap junction with other row or rule segments present.

The `row-rule-inset-junction-start` property is a constituent property of several shorthand properties:

- To inset both the left and right row segment junction endpoints, the `row-rule-inset-junction-start` property, along with the `row-rule-inset-junction-end` property, can be set using the `row-rule-inset-junction` shorthand.

- To inset all start row segment endpoints, the `row-rule-inset-junction-start` property, along with the `row-rule-inset-cap-start` property, can be set using the `row-rule-inset-start` shorthand.

- To inset the top, bottom, left, and right segment junction endpoints the `row-rule-inset-junction` shorthand property, along with the `column-rule-inset-junction` shorthand property, can be set using the `rule-inset-junction` shorthand.

All segment endpoints, including this property's `-end`, `-cap`, and `column-` equivalents, can be set using the `rule-inset` shorthand.

### Understanding junction endpoints

A _junction segment endpoint_ is any segment endpoint at an interior gap that starts at a gap intersection where other column rule or row rule segments are present. The `row-rule-inset-junction-start` property controls the inset of the start edge of row junction segments, allowing the segments to be shrunk or extended.

Length `row-rule-inset-junction-start` values inset junction segments by the specified value. Percentage values are relative to the size of the `column-gap`. Negative values create an outset, extending the start of the junction segment. Setting `-50%` outsets the start of the junction segment half way through the adjacent column gap, no matter how wide the column gap is.

In the following demonstration, the row rule segments in all but the first column start with junction endpoints. With `row-rule-inset-junction-start: 16px` set, the left, or start, of these segments is inset by `16px`. Change the inset `<length>` value to better visualize which row segments start at junction segment endpoints.

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
  <li>14</li>
  <li>15</li>
  <li>16</li>
  <li class="a">18</li>
  <li class="b">21</li>
  <li class="c">24</li>
</ul>

<p>
  <label
    ><code>rule-visibility-items</code> value <code>
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
    <input type="range" min="-20" max="16" value="16" id="inset" data-unit="px"
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
      min="-200"
      max="100"
      value="50"
      id="inset"
      data-unit="%"
  /></label>
  <output id="o">50%</output>
</p>
```

```css
ul {
  display: grid;
  grid-template-columns: repeat(6, auto);
  list-style-type: none;
  gap: 20px;
  row-rule: 10px solid olive;
  column-rule: 10px solid palegoldenrod;
  rule-overlap: row-over-column;
  rule-visibility-items: normal;
  rule-break: intersection;
  row-rule-inset-junction-start: 16px;

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
.a {
  grid-column: 6 / 7;
  grid-row: 3 / 4;
}
.b {
  grid-column: 3 / 4;
  grid-row: 4 / 5;
}
.c {
  grid-column: 6 / 7;
  grid-row: 4 / 5;
}
@layer no-support {
  @supports not (row-rule-inset-junction-start: 16px) {
    body::before {
      content: "Your browser doesn't support the row-rule-inset-junction-start property";
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
  row-rule-inset-junction-start: 100%;
  row-rule-style: inset;
}
```

```js
const inset = document.getElementById("inset");
const visibility = document.getElementById("visibility");
const ul = document.getElementById("ul");
const output = document.getElementById("o");

inset.addEventListener("input", () => {
  o.innerText =
    ul.style.rowRuleInsetJunctionStart = `${inset.value}${inset.dataset["unit"]}`;
});
```

```js
visibility.addEventListener("change", () => {
  ul.style.ruleVisibilityItems = `${visibility.value}`;
  if (visibility.value === "between") {
    ul.style.rowRuleStyle = "repeat(3, solid), repeat(2, double)";
  } else if (visibility.value === "around") {
    ul.style.rowRuleStyle = "repeat(3, solid), repeat(2, double)";
  } else {
    ul.style.rowRuleStyle = "solid";
  }
});
```

```js
visibility.addEventListener("change", () => {
  ul.style.ruleVisibilityItems = `${visibility.value}`;
  if (visibility.value === "between") {
    ul.style.rowRuleStyle = "repeat(2, inset), double, repeat(2, solid)";
  } else if (visibility.value === "around") {
    ul.style.rowRuleStyle = "repeat(3, inset), repeat(2, double)";
  } else {
    ul.style.rowRuleStyle = "solid";
  }
});
```

The `rule-break` property is set to `intersection`, breaking all the row and column segments at every gap junction, with the start of each interior row segment abutting a column gap by default. The default value of the `row-rule-inset-junction-start` property is `0`.

Change the inset value. Note how only the starts of the row segments in the middle of the grid change when the property value changes. The segment endpoints at the containers do not change: these are _cap endpoints_, and are not affected by the `row-rule-inset-junction-start` property.

Select `between` as the `rule-visibility-items` value. This value causes rules in gap segments to be painted only if items occupy both adjacent areas. The row rule segment between `18` and `24` now starts at an interior junction where no other rule segment is present: the start of this row segment is a _cap segment endpoint_ and isn't affected by the `row-rule-inset-junction-start` property. The `row-rule-inset-cap-start` property can be used to inset this segment endpoint.

The `around` value paints rules in gap segments if an item occupies at least one of the two adjacent areas. In this example, no junction segment endpoints became cap segment endpoints, but some segments were not drawn.

### The `overlap-join` value

The `overlap-join` value outsets the start of interior segments so they align with the far edge of the intersected column-rule. The value resolves to half the `column-gap` size (extending it to the middle of the gap) plus half the column rule width. When `row-rule-inset-junction-start` is set to the `overlap-join` keyword value, the junction start segments extend into the column gap to meet, or "join", the opposite edge of the column rule painted in that gap.

In the following live example, `row-rule-inset-junction-start` is set to `overlap-join`:

```html
<p>
  <label
    >Change the <code>column-gap</code>.
    <input type="range" min="10" max="40" value="40" id="gap" data-unit="px"
  /></label>
  <output id="og">40px</output>
</p>
<p>
  <label
    >Change the <code>column-rule-width</code>.
    <input type="range" min="0" max="40" value="16" id="rrw" data-unit="px"
  /></label>
  <output id="ow">16px</output>
</p>

<ul>
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
</ul>
```

```css
ul {
  display: grid;
  grid-template-columns: repeat(4, auto);
  list-style-type: none;
  gap: 30px;
  row-rule: 16px solid olive;
  column-rule: 10px solid palegoldenrod;
  rule-overlap: row-over-column;
  rule-visibility-items: around;
  row-rule-break: intersection;
  row-rule-inset-junction-start: overlap-join;
  border: 1px solid;
}
ul {
  place-items: center;
  margin: auto;
  padding: 0;
}
li {
  text-align: center;
  font-family: sans-serif;
  background-color: #ededed;
  padding: 2em;
  width: 100%;
  box-sizing: border-box;
}
@layer no-support {
  @supports not (row-rule-inset-junction-start: 16px) {
    body::before {
      content: "Your browser doesn't support the row-rule-inset-junction-start property";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

```js
const ul = document.querySelector("ul");
const gapSize = document.getElementById("gap");
const og = document.getElementById("og");
const ruleWidth = document.getElementById("rrw");
const ow = document.getElementById("ow");

gapSize.addEventListener("input", () => {
  og.innerText = ul.style.columnGap = `${gapSize.value}px`;
});

ruleWidth.addEventListener("input", () => {
  ow.innerText = ul.style.columnRuleWidth = `${ruleWidth.value}px`;
});
```

Change the size of the `column-rule-width` and the `column-gap`. Notice how, no matter the size of the gap or column rule, the start of the row segment is always stretched across the column rule, with the endpoint aligned with the opposite edge of the column rule painted in the gap.
