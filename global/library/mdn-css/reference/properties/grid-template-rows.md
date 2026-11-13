---
title: "`grid-template-rows` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/grid-template-rows/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `grid-template-rows` CSS property

The **`grid-template-rows`** CSS property defines the line names and track sizing functions of the grid rows.

```css
grid-template-rows: auto;
```

```css
grid-template-rows: 40px 4em 40px;
```

```css
grid-template-rows: 1fr 2fr 1fr;
```

```css
grid-template-rows: 3ch auto minmax(10px, 60px);
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <div class="transition-all" id="example-element">
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
      <div>Four</div>
      <div>Five</div>
    </div>
  </div>
</section>
```

```css
#example-element {
  border: 1px solid #c5c5c5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  width: 200px;
}

#example-element > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
}
```

## Syntax

```css
/* Keyword value */
grid-template-rows: none;

/* <track-list> values */
grid-template-rows: 100px 1fr;
grid-template-rows: [line-name] 100px;
grid-template-rows: [line-name1] 100px [line-name2 line-name3];
grid-template-rows: minmax(100px, 1fr);
grid-template-rows: fit-content(40%);
grid-template-rows: repeat(3, 200px);
grid-template-rows: subgrid;

/* <auto-track-list> values */
grid-template-rows: 200px repeat(auto-fill, 100px) 300px;
grid-template-rows:
  minmax(100px, max-content)
  repeat(auto-fill, 200px) 20%;
grid-template-rows:
  [line-name1] 100px [line-name2]
  repeat(auto-fit, [line-name3 line-name4] 300px)
  100px;
grid-template-rows:
  [line-name1 line-name2] 100px
  repeat(auto-fit, [line-name1] 300px) [line-name3];

/* Global values */
grid-template-rows: inherit;
grid-template-rows: initial;
grid-template-rows: revert;
grid-template-rows: revert-layer;
grid-template-rows: unset;
```

This property may be specified as:

- either the keyword value `none`
- or a `<track-list>` value
- or an `<auto-track-list>` value.

### Values

- `none`
    A keyword meaning that there is no explicit grid. Any rows will be implicitly generated and their size will be determined by the `grid-auto-rows` property.
- `[line-name]`
    A `custom-ident` specifying a name for the line in that location. The ident may be any valid string other than the reserved words `span` and `auto`. Lines may have multiple names separated by a space inside the square brackets, for example `[line-name-a line-name-b]`.
- `<length>`
    A non-negative length.
- `<percentage>`
    A non-negative `<percentage>` value, relative to the block size of the grid container. If the size of the grid container depends on the size of its tracks, the browser treats the percentage as `auto` for the purpose of calculating the intrinsic size of the grid container. The percentage is then resolved against the resulting grid container size for laying out the grid and its items. The browser may adjust the intrinsic size contributions of the track to the size of the grid container and may increase the final size of the track by the minimum amount that would result in honoring the percentage.
- `<flex>`
    A non-negative dimension with the unit `fr` specifying the track's flex factor. Each `<flex>`-sized track takes a share of the remaining space in proportion to its flex factor. When appearing outside a `minmax()` notation, it implies an automatic minimum (i.e., `minmax(auto, <flex>)`).
- `max-content`
    A keyword representing the largest maximal content contribution of the grid items occupying the grid track.
- `min-content`
    A keyword representing the largest minimal content contribution of the grid items occupying the grid track.
- `minmax(min, max)`
    A functional notation that defines a size range, greater than or equal to _min_, and less than or equal to _max_. If _max_ is smaller than _min_, then _max_ is ignored and the function is treated as _min_. As a maximum, a `<flex>` value sets the track's flex factor. It is invalid as a minimum.
- `auto`
    As a maximum value, it represents the largest `max-content` size of the items in that track.

    As a minimum value, it represents the largest minimum size of items in that track (specified by the `min-width`/`min-height` properties of the items). This often corresponds to the `min-content` size, but not always.

    If used outside of `minmax()` notation, `auto` represents the range between the minimum and maximum values described above. In most cases, this behaves similarly to `minmax(min-content,max-content)`.

    > **Note:**
    > `auto` track sizes (and only `auto` track sizes) can be stretched by the `align-content` and `justify-content` properties. Therefore, by default, an `auto`-sized track will take up any remaining space in the grid container.

- `fit-content( [ <length> | <percentage> ] )`
    Represents the formula `min(max-content, max(auto, argument))`, which is calculated similar to `auto` (i.e., `minmax(auto, max-content)`), except that the track size is clamped at _argument_ if it is greater than the `auto` minimum.
- `repeat( [ <positive-integer> | auto-fill | auto-fit ] , <track-list> )`
    Represents a repeated fragment of the track list, allowing a large number of rows that exhibit a recurring pattern to be written in a more compact form.
- `subgrid`
    Indicates that the grid will adopt the spanned portion of its parent grid in that axis. Rather than being specified explicitly, the sizes of the grid rows/columns will be taken from the parent grid's definition.

## Examples

### Specifying grid row sizes

#### HTML

```html
<div id="grid">
  <div id="areaA">A</div>
  <div id="areaB">B</div>
</div>
```

#### CSS

```css
#grid {
  display: grid;
  height: 100px;
  grid-template-rows: 30px 1fr;
}

#areaA {
  background-color: lime;
}

#areaB {
  background-color: yellow;
}
```

#### Result

## See also

- `grid-template-columns`
- `grid-template-areas`
- `grid-template`
- Basic <example-value> of grid layout: grid tracks
- Video: Defining a grid
- Subgrid
