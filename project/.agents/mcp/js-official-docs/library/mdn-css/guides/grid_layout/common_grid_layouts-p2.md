---
title: "Realizing common layouts using grids (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/grid_layout/common_grid_layouts/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Realizing common layouts using grids (part 2 of 2)

## A product listing with auto-placement

In this last example in this guide, we create a layout that entirely relies on auto-placement.

Many layouts are essentially sets of "cards" – product listings, image galleries, and so on. A grid enables creating these listings in a way that is responsive without needing to add media queries. In this example, we combine CSS grid and flexbox layouts to make a basic <example-value> listing layout.

The markup for the listing is an unordered list of items. Each item contains a heading, some text of varying height, and a call to action link.

```html
<ul class="listing">
  <li>
    <h2>Item One</h2>
    <div class="body">
      <p>The content of this listing item goes here.</p>
    </div>
    <div class="cta">
      <a href="">Call to action!</a>
    </div>
  </li>
  <li>
    <h2>Item Two</h2>
    <div class="body">
      <p>The content of this listing item goes here.</p>
    </div>
    <div class="cta">
      <a href="">Call to action!</a>
    </div>
  </li>
  <li class="wide">
    <h2>Item Three</h2>
    <div class="body">
      <p>The content of this listing item goes here.</p>
      <p>This one has more text than the other items.</p>
      <p>Quite a lot more</p>
      <p>Perhaps we could do something different with it?</p>
    </div>
    <div class="cta">
      <a href="">Call to action!</a>
    </div>
  </li>
  <li>
    <h2>Item Four</h2>
    <div class="body">
      <p>The content of this listing item goes here.</p>
    </div>
    <div class="cta">
      <a href="">Call to action!</a>
    </div>
  </li>
  <li>
    <h2>Item Five</h2>
    <div class="body">
      <p>The content of this listing item goes here.</p>
    </div>
    <div class="cta">
      <a href="">Call to action!</a>
    </div>
  </li>
</ul>
```

```css
* {
  box-sizing: border-box;
}
img {
  max-width: 100%;
  display: block;
}
body {
  font:
    1.2em "Helvetica",
    "Arial",
    sans-serif;
}
a:link,
a:visited {
  text-decoration: none;
  color: #f08c00;
}

h2 {
  background-color: #f08c00;
  color: white;
  text-align: center;
  margin: 0;
  padding: 20px;
}
```

We create a grid with a flexible number of flexible columns. We want them to be at least 200 pixels wide and share any available remaining space equally – so we always get equal-width column tracks. We achieve this with the `minmax()` function in our `repeat` notation for track sizing.

```css
.listing {
  list-style: none;
  margin: 2em;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

When we add this CSS, the items will be laid out as a grid. If we make the window smaller or wider, the number of column tracks changes – without media queries adding breakpoints and without needing to redefine the grid.

We can tidy up the internals of the boxes using a touch of flexbox. We set the list item to `display: flex` and the `flex-direction` to `column`. We can then use an auto margin on the `.cta` to push this bar down to the bottom of the box.

```css
.listing li {
  border: 1px solid #ffe066;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.listing .cta {
  margin-block-start: auto;
  border-block-start: 1px solid #ffe066;
  padding: 10px;
  text-align: center;
}
.listing .body {
  padding: 10px;
}
```

This is one of the key <example-value> to use flexbox rather than CSS grid layout. If you're aligning or distributing content in a single dimension, that's a flexbox use case.

## Preventing gaps with the dense keyword

This is all looking fairly complete now. However, we sometimes have cards that contain far more content than the others. It might be nice to make those span two tracks, then they won't be so tall. We add a `wide` class on the larger item, and add a rule giving it a `grid-column-end` with a value of `span 2`. When this item is encountered, it will be assigned to two tracks. This means that, at some breakpoints, we'll get a gap in the grid – where there isn't enough space to lay out a two-track item.

We can make the grid backfill those gaps by setting `grid-auto-flow: dense` on the grid container. Take care when doing this as it can cause items to be taken out of their logical source order. You should only do this if your items do not have a set order. Additionally, be aware of the accessibility and re-ordering issues resulting from the tab order following the source and not your reordered display.

```html
<ul class="listing">
  <li>
    <h2>Item One</h2>
    <div class="body"><p>The content of this listing item goes here.</p></div>
    <div class="cta"><a href="">Call to action!</a></div>
  </li>
  <li>
    <h2>Item Two</h2>
    <div class="body"><p>The content of this listing item goes here.</p></div>
    <div class="cta"><a href="">Call to action!</a></div>
  </li>
  <li class="wide">
    <h2>Item Three</h2>
    <div class="body">
      <p>The content of this listing item goes here.</p>
      <p>This one has more text than the other items.</p>
      <p>Quite a lot more</p>
      <p>Perhaps we could do something different with it?</p>
    </div>
    <div class="cta"><a href="">Call to action!</a></div>
  </li>
  <li>
    <h2>Item Four</h2>
    <div class="body"><p>The content of this listing item goes here.</p></div>
    <div class="cta"><a href="">Call to action!</a></div>
  </li>
  <li>
    <h2>Item Five</h2>
    <div class="body"><p>The content of this listing item goes here.</p></div>
    <div class="cta"><a href="">Call to action!</a></div>
  </li>
</ul>
```

```css
* {
  box-sizing: border-box;
}
img {
  max-width: 100%;
  display: block;
}
body {
  font:
    1.2em "Helvetica",
    "Arial",
    sans-serif;
}
a:link,
a:visited {
  text-decoration: none;
  color: #f08c00;
}

h2 {
  background-color: #f08c00;
  color: white;
  text-align: center;
  margin: 0;
  padding: 20px;
}

.listing li {
  border: 1px solid #ffe066;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.listing .cta {
  margin-block-start: auto;
  border-block-start: 1px solid #ffe066;
  padding: 10px;
  text-align: center;
}
.listing .body {
  padding: 10px;
}
```

```css
.listing {
  list-style: none;
  margin: 2em;
  display: grid;
  gap: 20px;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.listing .wide {
  grid-column-end: span 2;
}
```

Using auto-placement with some rules applied to certain items is very useful and can help with content you can't control, such as CMS output, where you have repeated items and can use structural pseudo-classes to target them.

## Further exploration

CSS grid layout provides so many possibilities. The best way to learn to use grid layout is to continue to build examples like the ones we have covered here. Pick a layout from a responsive site you like and see if you can build it using grid. You can even take inspiration from magazines or other non-web sources.

- CSS grid layout
- CSS Layout: Grids
- CSS grid layout guide on CSS-Tricks (2021)
- Grid by example
- CSS grid website layout examples on quackit.com
