---
title: "Using CSS anchor positioning (part 3 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/anchor_positioning/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS anchor positioning (part 3 of 4)

### Setting a `position-area`

The `position-area` property provides an alternative to the `anchor()` function for positioning elements relative to anchors. The `position-area` property works on the concept of a 3x3 grid of tiles, with the anchor element being the center tile. The `position-area` property can be used to position the anchor positioned element in any of the nine tiles, or have it span across two or three tiles.

The grid tiles are broken up into rows and columns:

- The three rows are represented by the physical values `top`, `center`, and `bottom`. They also have logical equivalents such as `start`, `center`, and `end`, and coordinate equivalents such as `y-start`, `center`, and `y-end`.
- The three columns are represented by the physical values `left`, `center`, and `right`. They also have logical equivalents such as `start`, `center`, and `end`, and coordinate equivalents such as `x-start`, `center`, and `x-end`.

The dimensions of the center tile are defined by the containing block of the anchor element, while the distance between the center tile and the grid's outer edge is defined by the positioned element's containing block.

`position-area` property values are composed of one or two values based on the row and column values described above, with spanning options available to define the region of the grid where the element should be positioned.

For example:

You can specify two values to place the positioned element in a specific grid square. For example:

- `top left` (logical equivalent `start start`) will place the positioned element in the top-left square.
- `bottom center` (logical equivalent `end center`) will place the positioned element in the bottom center square.

You can specify a row or column value plus a `span-*` value. The first value specifies the row or column to place the positioned element in, placing it initially in the center, and the other one specifies the amount of that column to span. For example:

- `top span-left` causes the positioned element to be placed in the top row, and span across the center and left tiles of that row.
- `y-end span-x-end` causes the positioned element to be placed in the end of the y column, and span across the center and x-end tiles of that column.
- `block-end span-all` causes the positioned element to be placed in the block end row, and span across the inline-start, center, and inline-end tiles of that row.

If you only specify one value, the effect is different depending on which value is set:

- A physical side value (`top`, `bottom`, `left`, or `right`) or coordinate value (`y-start`, `y-end`, `x-start`, `x-end`) acts as if the other value is `span-all`. For example, `top` gives the same effect as `top span-all`.
- A logical side value (`start` or `end`) acts as if the other value is set to the same value; for example `start` gives the same effect as `start start`.
- A value of `center` acts as if both values are set to `center` (so, `center center`).

> **Note:**
> See the `<position-area>` value reference page for a detailed description of all the available values. Mixing a logical value with a physical value will invalidate the declaration.

Let's demonstrate some of these values; this example uses the same HTML and base CSS styles as the previous example, except that we've included a `<select>` element to enable changing the positioned element's `position-area` value.

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut tellus
  elementum sagittis vitae et.
</p>

<div class="anchor">⚓︎</div>

<div class="infobox">
  <p>This is an information box.</p>
</div>

<p>
  Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. In arcu
  cursus euismod quis viverra nibh cras pulvinar. Vulputate ut pharetra sit amet
  aliquam.
</p>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>

<form>
  <label for="position-area-select">Choose a position-area:</label>
  <select id="position-area-select" name="position-area-select">
    <option>top</option>
    <option>bottom</option>
    <option>left</option>
    <option>right</option>
    <option>start</option>
    <option>end</option>
    <option>top left</option>
    <option>top right</option>
    <option>bottom left</option>
    <option>bottom right</option>
    <option>top span-left</option>
    <option>bottom span-right</option>
    <option>start span-start</option>
    <option>end span-end</option>
    <option>center</option>
    <option>center span-all</option>
    <option>bottom center</option>
    <option>end span-all</option>
  </select>
</form>
```

```css
.anchor {
  font-size: 1.8rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  width: fit-content;
  border-radius: 10px;
  border: 1px solid black;
  padding: 3px;
}

.anchor {
  anchor-name: --my-anchor;
}

body {
  width: 50%;
  margin: 0 auto;
}

form {
  background: white;
  border: 1px solid black;
  padding: 5px;
}

select {
  display: block;
  margin-top: 5px;
}

form {
  position: fixed;
  top: 0;
  right: 2px;
}
```

The infobox is given fixed positioning and associated with the anchor using CSS. When loaded, it is set to be tethered to the anchor with `position-area: top;`, which causes it to be positioned at the top of the position-area grid. This will be overridden once you select different values from the `<select>` menu.

```css
.infobox {
  color: darkblue;
  background-color: azure;
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
}
```

```css
.infobox {
  position: fixed;
  position-anchor: --my-anchor;
  position-area: top;
}
```

We also include a short script to apply new `position-area` values chosen from the `<select>` menu to the infobox:

```js
const infobox = document.querySelector(".infobox");
const selectElem = document.querySelector("select");

selectElem.addEventListener("change", () => {
  const area = selectElem.value;

  // Set the position-area to the value chosen in the select box
  infobox.style.positionArea = area;
});
```

Try selecting new `position-area` values from the `<select>` menu to see the effect they have on the position of the infobox:

### Positioned element width

In the above example, we did not explicitly size the positioned element in either dimension. We deliberately omitted sizing to allow you to observe the behavior this causes.

When a positioned element is placed into `position-area` grid cells without explicit sizing, it aligns with the grid area specified and behaves as if `width` were set to `max-content`. It is sized according to its containing block size, which is the width of its content. This size was imposed by setting `position: fixed`. Auto-sized absolutely and fixed-positioned elements are automatically sized, stretching as wide as needed to fit the text content, while constrained by the edge of the viewport. In this case, when placed on the left side of the grid with any `left` or `inline-start` value, the text wraps. If the anchored element's `max-content` size is narrower or shorter than its anchor, they won't grow to match the size of the anchor.

If the positioned element is centered vertically, such as with `position-area: bottom center`, it will align with the grid cell specified and the width will be the same as the anchor element. In this case, its minimum height is the anchor element's containing block size. It will not overflow, as the `min-width` is `min-content`, meaning it will be at least as wide as its longest word.

## Centering on the anchor using `anchor-center`

While you can center the anchor-positioned element using `position-area`'s `center` values, inset properties combined with the `anchor()` function provide more control over the exact position. CSS anchor positioning provides a way to center an anchor-positioned element relative to its anchor when inset properties, rather than `position-area`, are used to tether.

The properties `justify-self`, `align-self`, `justify-items`, and `align-items` (and their `place-items` and `place-self` shorthands) exist to allow developers to easily align elements in the inline or block direction inside various layout systems, for example along the main or cross axis in the case of flex children. CSS anchor positioning provides an additional value for these properties, `anchor-center`, which aligns a positioned element with the center of its default anchor.

This example uses the same HTML and base CSS as the previous example. The infobox is given fixed positioning and tethered to the anchor's bottom edge. `justify-self: anchor-center` is then used to make sure it is centered horizontally on the anchor's center:

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
  incididunt ut labore et dolore magna aliqua. Dui nunc mattis enim ut tellus
  elementum sagittis vitae et.
</p>

<div class="anchor">⚓︎</div>

<div class="infobox">
  <p>This is an information box.</p>
</div>

<p>
  Nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus. In arcu
  cursus euismod quis viverra nibh cras pulvinar. Vulputate ut pharetra sit amet
  aliquam.
</p>

<p>
  Malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Vel elit
  scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
  tristique. Porta lorem mollis aliquam ut porttitor. Turpis cursus in hac
  habitasse platea dictumst quisque. Dolor sit amet consectetur adipiscing elit.
  Ornare lectus sit amet est placerat. Nulla aliquet porttitor lacus luctus
  accumsan.
</p>
```

```css
.anchor {
  font-size: 1.8rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  width: fit-content;
  border-radius: 10px;
  border: 1px solid black;
  padding: 3px;
  anchor-name: --my-anchor;
}

body {
  width: 50%;
  margin: 0 auto;
}

.infobox {
  color: darkblue;
  background-color: azure;
  border: 1px solid #dddddd;
  padding: 10px;
  border-radius: 10px;
  font-size: 1rem;
}
```

```css
.infobox {
  position: fixed;
  position-anchor: --my-anchor;
  top: calc(anchor(bottom) + 5px);
  justify-self: anchor-center;
}
```

This centers the anchor-positioned element at the bottom of its anchor:
