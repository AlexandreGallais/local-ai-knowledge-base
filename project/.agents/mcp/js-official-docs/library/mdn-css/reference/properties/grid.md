---
title: "`grid` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/grid/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `grid` CSS property

The **`grid`** CSS shorthand property sets all of the explicit and implicit grid properties in a single declaration.

Using `grid` you specify one axis using `grid-template-rows` or `grid-template-columns`, you then specify how content should auto-repeat in the other axis using the implicit grid properties: `grid-auto-rows`, `grid-auto-columns`, and `grid-auto-flow`.

```css
grid: auto-flow / 1fr 1fr 1fr;
```

```css
grid: auto-flow dense / 40px 40px 1fr;
```

```css
grid: repeat(3, 80px) / auto-flow;
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
  grid-gap: 10px;
  width: 200px;
}

#example-element :nth-child(1) {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
}

#example-element :nth-child(2) {
  background-color: rgb(255 0 200 / 0.2);
  border: 3px solid rebeccapurple;
  grid-column: auto / span 3;
  grid-row: auto / span 2;
}

#example-element :nth-child(3) {
  background-color: rgb(94 255 0 / 0.2);
  border: 3px solid green;
  grid-column: auto / span 2;
}
```

> **Note:**
> The sub-properties you don't specify are set to their initial value, as normal for shorthands. Also, the gutter properties are NOT reset by this shorthand.

## Constituent properties

This property is a shorthand for the following CSS properties:

- `grid-auto-columns`
- `grid-auto-flow`
- `grid-auto-rows`
- `grid-template-areas`
- `grid-template-columns`
- `grid-template-rows`

## Syntax

```css
/* <'grid-template'> values */
grid: none;
grid: "a" 100px "b" 1fr;
grid: [line-name1] "a" 100px [line-name2];
grid: "a" 200px "b" min-content;
grid: "a" minmax(100px, max-content) "b" 20%;
grid: 100px / 200px;
grid: minmax(400px, min-content) / repeat(auto-fill, 50px);

/* <'grid-template-rows'> /
   [ auto-flow && dense? ] <'grid-auto-columns'>? values */
grid: 200px / auto-flow;
grid: 30% / auto-flow dense;
grid: repeat(3, 200px) / auto-flow 300px;
grid: [line1] minmax(20em, max-content) / auto-flow dense 40%;

/* [ auto-flow && dense? ] <'grid-auto-rows'>? /
   <'grid-template-columns'> values */
grid: auto-flow / 200px;
grid: auto-flow dense / 30%;
grid: auto-flow 300px / repeat(3, 200px);
grid: auto-flow dense 40% / [line1] minmax(20em, max-content);

/* Global values */
grid: inherit;
grid: initial;
grid: revert;
grid: revert-layer;
grid: unset;
```

### Values

- `<'grid-template'>`
    Defines the `grid-template` including `grid-template-columns`, `grid-template-rows` and `grid-template-areas`.
- `<'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>?`
    Sets up an auto-flow by setting the row tracks explicitly via the `grid-template-rows` property (and the `grid-template-columns` property to `none`) and specifying how to auto-repeat the column tracks via `grid-auto-columns` (and setting `grid-auto-rows` to `auto`). `grid-auto-flow` is also set to `column` accordingly, with `dense` if it's specified.

    All other `grid` sub-properties are reset to their initial values.

- `[ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>`
    Sets up an auto-flow by setting the column tracks explicitly via the `grid-template-columns` property (and the `grid-template-rows` property to `none`) and specifying how to auto-repeat the row tracks via `grid-auto-rows` (and setting `grid-auto-columns` to `auto`). `grid-auto-flow` is also set to `row` accordingly, with `dense` if it's specified.

    All other `grid` sub-properties are reset to their initial values.

## Examples

### Creating a grid layout

#### HTML

```html
<div id="container">
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

#### CSS

```css
#container {
  display: grid;
  grid: repeat(2, 60px) / auto-flow 80px;
}

#container > div {
  background-color: #8ca0ff;
  width: 50px;
  height: 50px;
}
```

#### Result

## See also

- `grid-template`
- `grid-template-rows`
- `grid-template-columns`
- `grid-template-areas`
- `grid-auto-columns`
- `grid-auto-rows`
- `grid-auto-flow`
- Line-based placement with CSS grid
- Grid template areas: grid definition shorthands
