---
title: "`column-height` CSS property (part 3 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-height/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-height` CSS property (part 3 of 3)

### `column-height` and `column-count` playground

This example builds upon the previous one by including two range sliders that allow you to adjust the multiple-column layout's column count and column height.

#### HTML and JavaScript

The HTML is the same as the previous example, with the addition of a form containing two `` elements that update the `column-count` and `column-height` values via JavaScript. The HTML and JavaScript are hidden for brevity.

```html
<form>
  <div>
    <label for="columns">
      <code>column-count <output id="columns-output">3</output></code>
    </label>
    <input type="range" min="3" max="6" value="3" id="columns" />
  </div>
  <div>
    <label for="column-height">
      <code>column-height <output id="column-height-output">20em</output></code>
    </label>
    <input type="range" min="10" max="30" value="20" id="column-height" />
  </div>
</form>
```

```js
const columnsRange = document.getElementById("columns");
const columnsOutput = document.getElementById("columns-output");
const columnHeightRange = document.getElementById("column-height");
const columnHeightOutput = document.getElementById("column-height-output");

columnsRange.addEventListener("input", () => {
  document.body.style.columnCount = columnsRange.value;
  columnsOutput.textContent = columnsRange.value;
});

columnHeightRange.addEventListener("input", () => {
  document.body.style.columnHeight = `${columnHeightRange.value}em`;
  columnHeightOutput.textContent = `${columnHeightRange.value}em`;
});
```

#### CSS

We specify the `column-rule` and `gap` with the same values as the previous example. We don't specify a `column-width`; instead, we create a multi-column layout using the `column-count` property, interactively setting the number of columns and the height of the column rows using JavaScript. Scroll snapping is not included in this example.

```css
body {
  column-count: 3;
  column-height: 20em;
  column-rule: 2px solid red;
  gap: 3em 2em;
  padding: 0 2em;
}
```

```css
form {
  border: 1px solid black;
  background-color: white;
  padding: 10px;
  position: fixed;
  bottom: 1px;
  right: 1px;
}

form div {
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: space-between;
}
```

#### Result

Adjust the number of columns and the column height to see the effect of these properties.

## See also

- `column-count`
- `column-width`
- `columns` shorthand
- `column-wrap`
- CSS multi-column layout module
