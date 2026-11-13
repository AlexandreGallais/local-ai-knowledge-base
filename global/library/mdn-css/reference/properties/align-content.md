---
title: "`align-content` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/align-content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `align-content` CSS property

The CSS **`align-content`** property sets the distribution of space between and around content items along a flexbox's cross axis, or a grid or block-level element's block axis.

This property has no effect on single line flex containers (i.e., ones with `flex-wrap: nowrap`).

The interactive example below uses grid layout to demonstrate some of the values of this property.

```css
align-content: start;
```

```css
align-content: center;
```

```css
align-content: space-between;
```

```css
align-content: space-around;
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <div class="transition-all" id="example-element">
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
    </div>
  </div>
</section>
```

```css
#example-element {
  border: 1px solid #c5c5c5;
  display: grid;
  grid-template-columns: 60px 60px;
  grid-auto-rows: 40px;
  column-gap: 10px;
  height: 180px;
}

#example-element > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
}
```

## Syntax

```css
/* Normal alignment */
align-content: normal;

/* Basic <example-value> alignment */
/* align-content does not take left and right values */
align-content: start;
align-content: center;
align-content: end;
align-content: flex-start;
align-content: flex-end;

/* Baseline alignment */
align-content: baseline;
align-content: first baseline;
align-content: last baseline;

/* Distributed alignment */
align-content: space-between;
align-content: space-around;
align-content: space-evenly;
align-content: stretch;

/* Overflow alignment */
align-content: safe center;
align-content: unsafe center;

/* Global values */
align-content: inherit;
align-content: initial;
align-content: revert;
align-content: revert-layer;
align-content: unset;
```

### Values

This property is specified as one or two of the following keyword values:

- `normal`
    The items are packed in their default position as if no `align-content` value was set.
- `start`
    The items are packed flush to each other against the start edge of the alignment container in the cross axis.
- `center`
    The items are packed flush to each other in the center of the alignment container along the cross axis.
- `end`
    The items are packed flush to each other against the end edge of the alignment container in the cross axis.
- `flex-start`
    The items are packed flush to each other against the edge of the alignment container depending on the flex container's cross-start side.
    This only applies to flex layout items. For items that are not children of a flex container, this value is treated like `start`.
- `flex-end`
    The items are packed flush to each other against the edge of the alignment container depending on the flex container's cross-end side.
    This only applies to flex layout items. For items that are not children of a flex container, this value is treated like `end`.
- `baseline`, `first baseline`, `last baseline`
    Specifies participation in first- or last-baseline alignment: aligns the alignment baseline of the box's first or last baseline set with the corresponding baseline in the shared first or last baseline set of all the boxes in its baseline-sharing group.

    The fallback alignment for `first baseline` is `start`, the one for `last baseline` is `end`.

- `space-between`
    The items are evenly distributed within the alignment container along the cross axis. The spacing between each pair of adjacent items is the same. The first item is flush with the start edge of the alignment container in the cross axis, and the last item is flush with the end edge of the alignment container in the cross axis.
- `space-around`
    The items are evenly distributed within the alignment container along the cross axis. The spacing between each pair of adjacent items is the same. The empty space before the first and after the last item equals half of the space between each pair of adjacent items.
- `space-evenly`
    The items are evenly distributed within the alignment container along the cross axis. The spacing between each pair of adjacent items, the start edge and the first item, and the end edge and the last item, are all exactly the same.
- `stretch`
    If the combined size of the items along the cross axis is less than the size of the alignment container, any `auto`-sized items have their size increased equally (not proportionally), while still respecting the constraints imposed by `max-height`/`max-width` (or equivalent functionality), so that the combined size exactly fills the alignment container along the cross axis.
- `safe`
    Used alongside an alignment keyword. If the chosen keyword means that the item overflows the alignment container causing data loss, the item is instead aligned as if the alignment mode were `start`.
- `unsafe`
    Used alongside an alignment keyword. Regardless of the relative sizes of the item and alignment container and whether overflow which causes data loss might happen, the given alignment value is honored.

> **Note:**
> The `<content-distribution>` values (`space-between`, `space-around`, `space-evenly`, and `stretch`) have no effect in block layout as all the content in that block is treated as a single alignment-subject.

## Examples

### Effects of different align-content values

In this example, you can switch between three different `display` property values, including `flex`, `grid`, and `block`. You can also switch between the different values for `align-content`.

#### HTML

```html
<section>
  <div class="olive">Olive</div>
  <div class="coral">Coral</div>
  <div class="deepskyblue">Deep<br />sky<br />blue</div>
  <div class="orchid">Orchid</div>
  <div class="slateblue">Slateblue</div>
  <div class="maroon">Maroon</div>
</section>
```

```html
<fieldset class="controls">
  <legend>Controls</legend>
  <div class="row">
    <label for="display">display: </label>
    <select id="display">
      <option value="block" selected>block</option>
      <option value="flex">flex</option>
      <option value="grid">grid</option>
    </select>
  </div>
  <div class="row">
    <label for="alignContent">align-content: </label>
    <select id="alignContent">
      <option value="normal" selected>normal</option>
      <option value="start">start</option>
      <option value="center">center</option>
      <option value="end">end</option>
      <option value="flex-start">flex-start</option>
      <option value="flex-end">flex-end</option>
      <option value="space-between">space-between</option>
      <option value="space-around">space-around</option>
      <option value="space-evenly">space-evenly</option>
    </select>
  </div>
  <p>CSS applied</p>
  <pre>
section {
  display: <span id="displayStyle">block</span>;
  align-content: <span id="align">normal</span>
}
  </pre>
</fieldset>
```

#### CSS

```css
body {
  font-size: 1.25rem;
  display: flex;
  gap: 1rem;
}
section div {
  font-family: monospace;
  padding: 3px;
}
```

```css
section {
  border: solid 1.5px tomato;
  height: 300px;
  width: 300px;
  flex-wrap: wrap; /* used by flex only */
  gap: 0.2rem; /* not used by block */
}
.olive {
  background-color: olive;
}
.coral {
  background-color: coral;
}
.deepskyblue {
  background-color: deepskyblue;
}
.orchid {
  background-color: orchid;
}
.slateblue {
  background-color: slateblue;
  color: white;
}
.maroon {
  background-color: maroon;
  color: white;
}
```

```js
const alignContent = document.querySelector("#alignContent");
const display = document.querySelector("#display");
const container = document.querySelector("section");
const displayStyle = document.querySelector("#displayStyle");
const alignStyle = document.querySelector("#align");

alignContent.addEventListener("change", () => {
  updatePage();
});
display.addEventListener("change", () => {
  updatePage();
});
function updatePage() {
  const alVal = alignContent.value;
  const dVal = display.value;
  container.style.alignContent = alVal;
  container.style.display = dVal;
  alignStyle.innerText = alVal;
  displayStyle.innerText = dVal;
}
updatePage();
```

#### Result

Try changing the `display` value and the `align-content` value.

In block layout, child elements are treated as a single element, meaning `space-between`, `space-around`, and `space-evenly` behave differently.

## See also

- Basic <example-value> of flexbox
- Aligning items in a flex container
- Box alignment in grid layout
- CSS box alignment
- Block and inline layout in normal flow
- Block-level content
- `display`
