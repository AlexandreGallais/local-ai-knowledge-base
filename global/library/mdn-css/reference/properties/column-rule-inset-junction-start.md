---
title: "`column-rule-inset-junction-start` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-rule-inset-junction-start/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-rule-inset-junction-start` CSS property

The **`column-rule-inset-junction-start`** CSS property can be used to offset the top endpoints of column rule segments that are junction endpoints; that is, endpoints at gap junctions where rule segments intersect.

```css
column-rule-inset-junction-start: 0;
```

```css
column-rule-inset-junction-start: 0.5em;
```

```css
column-rule-inset-junction-start: 10px;
```

```css
column-rule-inset-junction-start: -100%;
```

```css
column-rule-inset-junction-start: overlap-join;
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
  </div>
</section>
```

```css
#example-element {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  rule: solid thick lightpink;
  column-rule-color: magenta;
  column-rule-break: intersection;
  gap: 1.5em;
  rule-overlap: column-over-row;
  border: 1px solid rebeccapurple;
  margin: auto;
  rule-visibility-items: around;
}
#example-element i {
  background-color: #efefef;
  color: #333333;
  padding: 1em;
}
```

## Syntax

```css
/* Keywords */
column-rule-inset-junction-start: overlap-join;

/* <length-percentage> values */
column-rule-inset-junction-start: 0;
column-rule-inset-junction-start: 1em;
column-rule-inset-junction-start: -5px;
column-rule-inset-junction-start: -25%;

/* Global values */
column-rule-inset-junction-start: inherit;
column-rule-inset-junction-start: initial;
column-rule-inset-junction-start: revert;
column-rule-inset-junction-start: revert-layer;
column-rule-inset-junction-start: unset;
```

### Values

This property is specified as a single value from the following list:

- `overlap-join`
    Specifies that the junction segment should extend across the row-rule, resolving to half the `row-gap` value plus half the used `row-rule-width` value.
- `length-percentage`
    Specifies the size of the inset. Percentage values are relative to the junction endpoint, which is the `row-gap` value.

## Description

The `column-rule-inset-junction-start` property can be used to inset or outset junction segment endpoints occurring at the top of column rule segments. The default value is `0`. Positive values reduce the segment size, while negative values and the `overlap-join` keyword increase it.

Column rules are painted within a column gap as one or more segments, with segments occurring between:

- Adjacent columns in CSS grid layouts.
- Adjacent flex items or flex lines in flex layouts, depending on the `flex-direction`.
- Adjacent columns in multi-col layouts.

Whether a column rule spans multiple rows or is broken into multiple segments is defined by the `column-rule-break` property; interior breaks between column rule segments are the size of the `row-gap`. A junction end occurs at the top of every column segment where the segment's top ends at a gap junction with other column or rule segments present.

The `column-rule-inset-junction-start` property is a constituent property of several shorthand properties:

- To inset the top and bottom column segment junction endpoints, the `column-rule-inset-junction-start` property, along with the `column-rule-inset-junction-end` property, can be set using the `column-rule-inset-junction` shorthand.

- To inset all top column segment endpoints, the `column-rule-inset-junction-start` property, along with the `column-rule-inset-cap-start` property, can be set using the `column-rule-inset-start` shorthand.

- To inset the top, bottom, left, and right segment junction endpoints the `column-rule-inset-junction` shorthand property, along with the `row-rule-inset-junction` shorthand property, can be set using the `rule-inset-junction` shorthand.

All segment endpoints, including this property's `-start`, `-cap`, and `row-` equivalents, can be set using the `rule-inset` shorthand.

### Understanding junction endpoints

A _junction segment endpoint_ is any segment endpoint at an interior gap that ends at a gap intersection where other rule or column segments are present. The `column-rule-inset-junction-start` property controls the inset of the top edge of column junction segments, allowing the segments to be shrunk or extended.

Length `column-rule-inset-junction-start` values inset segments by the specified value. Negative length values create an outset, extending the top end of the junction segment. Percentage values are relative to the size of the `row-gap`. Setting `-50%` outsets the top of the junction segment half way through the row gap above the segment, no matter how wide the row gap is.

In the following demonstration, the column rule segments in the last two rows start in junction endpoints. With `column-rule-inset-junction-start: 16px` set, the top, or start, of these segments are inset by `16px`. Change the inset `<length>` value to better visualize which column segments start in junction segment endpoints.

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
  column-rule-inset-junction-start: 16px;

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
  @supports not (column-rule-inset-junction-start: 16px) {
    body::before {
      content: "Your browser doesn't support the column-rule-inset-junction-start property";
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
  column-rule-inset-junction-start: 100%;
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
    ul.style.columnRuleInsetJunctionStart = `${inset.value}${inset.dataset["unit"]}`;
});
```

```js
visibility.addEventListener("change", () => {
  ul.style.ruleVisibilityItems = `${visibility.value}`;
  if (visibility.value === "between") {
    ul.style.columnRuleStyle = "repeat(3, solid), repeat(2, double)";
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

If you set `0px` as the value, the start of the column rules will align with the start, or top, of the row, abutting the row gap. This is the default. Note how only the start ends of the segments in the middle of the grid change when the property value changes. The segments in the first row do not change: these are _cap endpoints_, and are not affected by the `column-rule-inset-junction-start` property.

Select `around` and `between` as the `rule-visibility-items` value. This `around` value paints rules in a gap segment if an item occupies at least one of the two adjacent areas. The `between` value paints rules in gap segments only if items occupy both adjacent areas. When a rule segment ends at an interior intersection where no other rule segments are present, the segment is a _cap segment endpoint_, and isn't affected by the `column-rule-inset-junction-start` property.

### The `overlap-join` value

The `overlap-join` value outsets the top end of interior segments so they align with the top of the intersected row-rule. The value resolves to half the `row-gap` size (extending it to the middle of the gap) plus half the row rule width.

When `column-rule-inset-junction-start` is set to the `overlap-join` keyword value, the junction end segments extend up into the row gap to meet, or "join", the top edge of the row rule painted in that gap.

In the following live example, `column-rule-inset-junction-start` is set to `overlap-join`:

```html
<p>
  <label
    >Change the <code>row-gap</code>.
    <input type="range" min="10" max="40" value="30" id="gap" data-unit="px"
  /></label>
  <output id="og">30px</output>
</p>
<p>
  <label
    >Change the <code>row-rule-width</code>.
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
  column-rule: 16px solid olive;
  row-rule: 10px solid palegoldenrod;
  rule-overlap: column-over-row;
  rule-visibility-items: around;
  column-rule-break: intersection;
  column-rule-inset-junction-start: overlap-join;
  border: 1px solid;
}
ul {
  place-items: center;
  width: 70vw;
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
  @supports not (column-rule-inset-junction-start: 16px) {
    body::before {
      content: "Your browser doesn't support the column-rule-inset-junction-start property";
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
  og.innerText = ul.style.rowGap = `${gapSize.value}px`;
});

ruleWidth.addEventListener("input", () => {
  ow.innerText = ul.style.rowRuleWidth = `${ruleWidth.value}px`;
});
```

Change the size of the `row-rule-width` and the `row-gap`. Notice how, no matter the size of the gap or row rule, the top end of the column segment is always stretched to align with the top of the row rule painted in the gap.
