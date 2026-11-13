---
title: "`grid-template-areas` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/grid-template-areas/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `grid-template-areas` CSS property

The **`grid-template-areas`** CSS property specifies named grid areas, establishing the cells in the grid and assigning them names.

Those areas are not associated with any particular grid item, but can be referenced from the grid-placement properties `grid-row-start`, `grid-row-end`, `grid-column-start`, `grid-column-end`, and their shorthands `grid-row`, `grid-column`, and `grid-area`.

```css
grid-template-areas:
  "a a a"
  "b c c"
  "b c c";
```

```css
grid-template-areas:
  "b b a"
  "b b c"
  "b b c";
```

```css
grid-template-areas:
  "a a ."
  "a a ."
  ". b c";
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <div class="transition-all" id="example-element">
      <div>One (a)</div>
      <div>Two (b)</div>
      <div>Three (c)</div>
    </div>
  </div>
</section>
```

```css
#example-element {
  border: 1px solid #c5c5c5;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(3, minmax(40px, auto));
  grid-gap: 10px;
  width: 200px;
}

#example-element :nth-child(1) {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
  grid-area: a;
}

#example-element :nth-child(2) {
  background-color: rgb(255 0 200 / 0.2);
  border: 3px solid rebeccapurple;
  grid-area: b;
}

#example-element :nth-child(3) {
  background-color: rgb(94 255 0 / 0.2);
  border: 3px solid green;
  grid-area: c;
}
```

## Syntax

```css
/* Keyword value */
grid-template-areas: none;

/* <string> values */
grid-template-areas: "a b";
grid-template-areas:
  "a b ."
  "a c d";

/* Global values */
grid-template-areas: inherit;
grid-template-areas: initial;
grid-template-areas: revert;
grid-template-areas: revert-layer;
grid-template-areas: unset;
```

### Values

- `none`
    The grid container doesn't define any named grid areas.
- `<string>`
    A row is created for every separate string listed, and a column is created for each cell in the string. Multiple cell tokens with the same name within and between rows create a single named grid area that spans the corresponding grid cells. Unless those cells form a rectangle, the declaration is invalid.

    All the remaining unnamed areas in a grid can be referred using _null cell tokens_. A null cell token is a sequence of one or more `.` (U+002E FULL STOP) characters, e.g., `.`, `...`, or `.....` etc. A null cell token can be used to create empty spaces in the grid.

## Examples

### Specifying named grid areas

#### HTML

```html
<div id="page">
  <header>Header</header>
  <nav>Navigation</nav>
  <main>Main area</main>
  <footer>Footer</footer>
</div>
```

#### CSS

```css
#page {
  display: grid;
  width: 100%;
  height: 250px;
  grid-template-areas:
    "head head"
    "nav  main"
    ".  foot";
  grid-template-rows: 50px 1fr 30px;
  grid-template-columns: 150px 1fr;
}

#page > header {
  grid-area: head;
  background-color: #8ca0ff;
}

#page > nav {
  grid-area: nav;
  background-color: #ffa08c;
}

#page > main {
  grid-area: main;
  background-color: #ffff64;
}

#page > footer {
  grid-area: foot;
  background-color: #8cffa0;
}
```

In the above code, a null token (`.`) was used to create an unnamed area in the grid container, which we used to create an empty space at the bottom left corner of the grid.

#### Result

## See also

- `grid-template-rows`
- `grid-template-columns`
- `grid-template`
- Grid template areas
- Video: Grid template areas
