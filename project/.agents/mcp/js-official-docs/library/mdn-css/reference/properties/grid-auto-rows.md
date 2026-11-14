---
title: "`grid-auto-rows` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/grid-auto-rows/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `grid-auto-rows` CSS property

The **`grid-auto-rows`** CSS property specifies the size of an implicitly-created grid row track or pattern of tracks.

If a grid item is positioned into a row that is not explicitly sized by `grid-template-rows`, implicit grid tracks are created to hold it. This can happen either by explicitly positioning into a row that is out of range, or by the auto-placement algorithm creating additional rows.

```css
grid-auto-rows: auto;
```

```css
grid-auto-rows: 50px;
```

```css
grid-auto-rows: min-content;
```

```css
grid-auto-rows: minmax(30px, auto);
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
  grid-auto-rows: 40px;
  grid-gap: 10px;
  width: 220px;
}

#example-element > div {
  background-color: rgb(0 0 255 / 0.2);
  border: 3px solid blue;
  font-size: 22px;
}

#example-element div:last-child {
  font-size: 13px;
}
```

## Syntax

```css
/* Keyword values */
grid-auto-rows: min-content;
grid-auto-rows: max-content;
grid-auto-rows: auto;

/* <length> values */
grid-auto-rows: 100px;
grid-auto-rows: 20cm;
grid-auto-rows: 50vmax;

/* <percentage> values */
grid-auto-rows: 10%;
grid-auto-rows: 33.3%;

/* <flex> values */
grid-auto-rows: 0.5fr;
grid-auto-rows: 3fr;

/* minmax() values */
grid-auto-rows: minmax(100px, auto);
grid-auto-rows: minmax(max-content, 2fr);
grid-auto-rows: minmax(20%, 80vmax);

/* fit-content() values */
grid-auto-rows: fit-content(400px);
grid-auto-rows: fit-content(5cm);
grid-auto-rows: fit-content(20%);

/* multiple track-size values */
grid-auto-rows: min-content max-content auto;
grid-auto-rows: 100px 150px 390px;
grid-auto-rows: 10% 33.3%;
grid-auto-rows: 0.5fr 3fr 1fr;
grid-auto-rows: minmax(100px, auto) minmax(max-content, 2fr) minmax(20%, 80vmax);
grid-auto-rows: 100px minmax(100px, auto) 10% 0.5fr fit-content(400px);

/* Global values */
grid-auto-rows: inherit;
grid-auto-rows: initial;
grid-auto-rows: revert;
grid-auto-rows: revert-layer;
grid-auto-rows: unset;
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

### Setting grid row size

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
  width: 200px;
  display: grid;
  grid-template-areas: "a a";
  gap: 10px;
  grid-auto-rows: 100px;
}

#grid > div {
  background-color: lime;
}
```

#### Result

## See also

- `grid-auto-columns`
- `grid-auto-flow`
- `grid`
- Auto-placement in grid layout - sizing rows in the implicit grid
- Video: Introducing grid auto-placement and order
