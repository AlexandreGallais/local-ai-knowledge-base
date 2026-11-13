---
title: "`grid-auto-columns` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/grid-auto-columns/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `grid-auto-columns` CSS property

The **`grid-auto-columns`** CSS property specifies the size of an implicitly-created grid column track or pattern of tracks.

If a grid item is positioned into a column that is not explicitly sized by `grid-template-columns`, implicit grid tracks are created to hold it. This can happen either by explicitly positioning into a column that is out of range, or by the auto-placement algorithm creating additional columns.

```css
grid-auto-columns: auto;
```

```css
grid-auto-columns: 1fr;
```

```css
grid-auto-columns: min-content;
```

```css
grid-auto-columns: minmax(10px, auto);
```

```html
<section class="default-example" id="default-example">
  <div class="example-container">
    <div class="transition-all" id="example-element">
      <div>One</div>
      <div>Two</div>
      <div>Three</div>
      <div>Four</div>
      <div></div>
    </div>
  </div>
</section>
```

```css
#example-element {
  border: 1px solid #c5c5c5;
  display: grid;
  grid-auto-rows: 40px;
  grid-gap: 10px;
  width: 220px;
}

#example-element > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
}

#example-element > div:nth-child(1) {
  grid-column: 1 / 3;
}

#example-element > div:nth-child(2) {
  grid-column: 2;
}
```

## Syntax

```css
/* Keyword values */
grid-auto-columns: min-content;
grid-auto-columns: max-content;
grid-auto-columns: auto;

/* <length> values */
grid-auto-columns: 100px;
grid-auto-columns: 20cm;
grid-auto-columns: 50vmax;

/* <percentage> values */
grid-auto-columns: 10%;
grid-auto-columns: 33.3%;

/* <flex> values */
grid-auto-columns: 0.5fr;
grid-auto-columns: 3fr;

/* minmax() values */
grid-auto-columns: minmax(100px, auto);
grid-auto-columns: minmax(max-content, 2fr);
grid-auto-columns: minmax(20%, 80vmax);

/* fit-content() values */
grid-auto-columns: fit-content(400px);
grid-auto-columns: fit-content(5cm);
grid-auto-columns: fit-content(20%);

/* multiple track-size values */
grid-auto-columns: min-content max-content auto;
grid-auto-columns: 100px 150px 390px;
grid-auto-columns: 10% 33.3%;
grid-auto-columns: 0.5fr 3fr 1fr;
grid-auto-columns: minmax(100px, auto) minmax(max-content, 2fr)
  minmax(20%, 80vmax);
grid-auto-columns: 100px minmax(100px, auto) 10% 0.5fr fit-content(400px);

/* Global values */
grid-auto-columns: inherit;
grid-auto-columns: initial;
grid-auto-columns: revert;
grid-auto-columns: revert-layer;
grid-auto-columns: unset;
```

### Values

- `<length>`
    Is a non-negative length.
- `<percentage>`
    Is a non-negative `<percentage>` value relative to the block size of the grid container. If the block size of the grid container is indefinite, the percentage value is treated like `auto`.
- `<flex>`
    Is a non-negative dimension with the unit `fr` specifying the track's flex factor. Each `<flex>`-sized track takes a share of the remaining space in proportion to its flex factor.

    When appearing outside a `minmax()` notation, it implies an automatic minimum (i.e., `minmax(auto, <flex>)`).

- `max-content`
    Is a keyword representing the largest maximal content contribution of the grid items occupying the grid track.
- `min-content`
    Is a keyword representing the largest minimal content contribution of the grid items occupying the grid track.
- `minmax(min, max)`
    Is a functional notation that defines a size range greater than or equal to _min_ and less than or equal to _max_. If _max_ is smaller than _min_, then _max_ is ignored and the function is treated as _min_. As a maximum, a `<flex>` value sets the track's flex factor. As a minimum, it is treated as zero (or minimal content, if the grid container is sized under a minimal content constraint).
- `fit-content( [ <length> | <percentage> ] )`
    Represents the formula `min(max-content, max(auto, argument))`, which is calculated similar to `auto` (i.e., `minmax(auto, max-content)`), except that the track size is clamped at _argument_ if it is greater than the `auto` minimum.
- `auto`
    As a maximum represents the largest `max-content` size of the items in that track.

    As a minimum represents the largest minimum size of items in that track (specified by the `min-width`/`min-height` of the items). This is often, though not always, the `min-content` size.

    If used outside of `minmax()` notation, `auto` represents the range between the minimum and maximum described above. This behaves similarly to `minmax(min-content,max-content)` in most cases.

    > **Note:**
    > `auto` track sizes (and only `auto` track sizes) can be stretched by the `align-content` and `justify-content` properties. Therefore by default, an `auto` sized track will take up any remaining space in the grid container.

## Examples

### Setting grid column size

#### HTML

```html
<div id="grid">
  <div id="item1"></div>
  <div id="item2"></div>
  <div id="item3"></div>
</div>
```

#### CSS

```css
#grid {
  height: 100px;
  display: grid;
  grid-template-areas: "a a";
  gap: 10px;
  grid-auto-columns: 200px;
}

#grid > div {
  background-color: lime;
}
```

#### Result

## See also

- `grid-auto-rows`
- `grid-auto-flow`
- `grid`
- Auto-placement in grid layout: sizing rows in the implicit grid
- Video: Introducing grid auto-placement and order
