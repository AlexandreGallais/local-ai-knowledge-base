---
title: "`display` CSS property (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/display/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `display` CSS property (part 2 of 2)

## Accessibility

### display: none

Using a `display` value of `none` on an element will remove it from the accessibility tree. This will cause the element and all its descendant elements to no longer be announced by screen reading technology.

If you want to visually hide the element, a more accessible alternative is to use a combination of properties to remove it visually from the screen but still make it available to assistive technology such as screen readers.

While `display: none` hides content from the accessibility tree, elements that are hidden but are referenced from visible elements' `aria-describedby` or `aria-labelledby` attributes are exposed to assistive technologies.

### display: contents

Current implementations in some browsers will remove from the accessibility tree any element with a `display` value of `contents` (but descendants will remain). This will cause the element itself to no longer be announced by screen reading technology. This is incorrect behavior according to the CSS specification.

- More accessible markup with display: contents | Hidde de Vries
- Display: Contents Is Not a CSS Reset | Adrian Roselli

### Tables

In some browsers, changing the `display` value of a `` element to `block`, `grid`, or `flex` will alter its representation in the accessibility tree. This will cause the table to no longer be announced properly by screen reading technology.

- Hidden content for better a11y | Go Make Things
- MDN Understanding WCAG, Guideline 1.3 explanations
- Understanding Success Criterion 1.3.1 | W3C Understanding WCAG 2.0

## Examples

### display value comparison

In this example we have two block-level container elements, each one with three inline children. Below that, we have a select menu that allows you to apply different `display` values to the containers, allowing you to compare and contrast how the different values affect the element's layout, and that of their children.

We have included `padding` and `background-color` on the containers and their children, so that it is easier to see the effect the display values are having.

#### HTML

```html
<article class="container">
  <span>First</span>
  <span>Second</span>
  <span>Third</span>
</article>

<article class="container">
  <span>First</span>
  <span>Second</span>
  <span>Third</span>
</article>

<div>
  <label for="display">Choose a display value:</label>
  <select id="display">
    <option selected>block</option>
    <option>block flow</option>
    <option>inline</option>
    <option>inline flow</option>
    <option>flow</option>
    <option>flow-root</option>
    <option>block flow-root</option>
    <option>table</option>
    <option>block table</option>
    <option>flex</option>
    <option>block flex</option>
    <option>grid</option>
    <option>block grid</option>
    <option>grid-lanes</option>
    <option>block grid-lanes</option>
    <option>list-item</option>
    <option>block flow list-item</option>
    <option>inline flow list-item</option>
    <option>block flow-root list-item</option>
    <option>inline flow-root list-item</option>
    <option>contents</option>
    <option>none</option>
    <option>inline-block</option>
    <option>inline flow-root</option>
    <option>inline-table</option>
    <option>inline table</option>
    <option>inline-flex</option>
    <option>inline flex</option>
    <option>inline-grid</option>
    <option>inline grid</option>
    <option>inline-grid-lanes</option>
    <option>inline grid-lanes</option>
  </select>
</div>
```

#### CSS

```css
html {
  font-family: "Helvetica", "Arial", sans-serif;
  letter-spacing: 1px;
  padding-top: 10px;
}

article {
  background-color: red;
}

article span {
  background-color: black;
  color: white;
  margin: 1px;
}

article,
span {
  padding: 10px;
  border-radius: 7px;
}

article,
div {
  margin: 20px;
}
```

#### JavaScript

```js
const articles = document.querySelectorAll(".container");
const select = document.querySelector("select");

function updateDisplay() {
  articles.forEach((article) => {
    article.style.display = select.value;
  });
}

select.addEventListener("change", updateDisplay);

updateDisplay();
```

#### Result

Note that some multi-keyword values are added for illustration which have the following equivalents:

- `block` = `block flow`
- `inline` = `inline flow`
- `flow` = `block flow`
- `flow-root` = `block flow-root`
- `table` = `block table`
- `flex` = `block flex`
- `grid` = `block grid`
- `list-item` = `block flow list-item`
- `inline-block` = `inline flow-root`
- `inline-table` = `inline table`
- `inline-flex` = `inline flex`
- `inline-grid` = `inline grid`

You can find more examples in the pages for each separate display type under Grouped values.

## See also

- `visibility`, `float`, `position`
- `grid`, `flex`
- CSS ruby layout module
- SVG `display` attribute
- Block and inline layout in normal flow
- Introduction to formatting contexts
- Grid lanes layout
