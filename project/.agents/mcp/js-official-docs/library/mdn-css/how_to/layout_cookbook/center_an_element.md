---
title: "Center an element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/how_to/layout_cookbook/center_an_element/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Center an element

In this recipe, you will see how to center one box inside another by using flexbox and grid, centering content both horizontally and vertically.

## Requirements

To place an item into the center of another box horizontally and vertically.

## Recipe

Click "Play" in the code blocks below to edit the example in the MDN Playground:

```html
<div class="container">
  <div class="item">I am centered!</div>
</div>
```

```css
.item {
  border: 2px solid rgb(95 97 110);
  border-radius: 0.5em;
  padding: 20px;
  width: 10em;
}

.container {
  border: 2px solid rgb(75 70 74);
  border-radius: 0.5em;
  font: 1.2em sans-serif;

  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

## Using flexbox

To center a box within another box, first turn the containing box into a flex container by setting its `display` property to `flex`. Then set `align-items` to `center` for vertical centering (on the block axis) and `justify-content` to `center` for horizontal centering (on the inline axis). And that's all it takes to center one box inside another!

### HTML

```html
<div class="container">
  <div class="item">I am centered!</div>
</div>
```

### CSS

```css
div {
  border: solid 3px;
  padding: 1em;
  max-width: 75%;
}

.item {
  border: 2px solid rgb(95 97 110);
  border-radius: 0.5em;
  padding: 20px;
  width: 10em;
}

.container {
  height: 8em;
  border: 2px solid rgb(75 70 74);
  border-radius: 0.5em;
  font: 1.2em sans-serif;

  display: flex;
  align-items: center;
  justify-content: center;
}
```

We set a height for the container to demonstrate that the inner item is indeed vertically centered within the container.

### Result

Instead of applying `align-items: center;` on the container, you can also vertically center the inner item by setting `align-self` to `center` on the inner item itself.

## Using grid

Another method you can use for centering one box inside another is to first make the containing box a grid container and then set its `place-items` property to `center` to center align its items on both the block and inline axes.

### HTML

```html
<div class="container">
  <div class="item">I am centered!</div>
</div>
```

### CSS

```css
div {
  border: solid 3px;
  padding: 1em;
  max-width: 75%;
}

.item {
  border: 2px solid rgb(95 97 110);
  border-radius: 0.5em;
  padding: 20px;
  width: 10em;
}

.container {
  height: 8em;
  border: 2px solid rgb(75 70 74);
  border-radius: 0.5em;
  font: 1.2em sans-serif;

  display: grid;
  place-items: center;
}
```

### Result

Instead of applying `place-items: center;` on the container, you can achieve the same centering by setting `place-content: center;` on the container or by applying either `place-self: center` or `margin: auto;` on the inner item itself.

## Resources on MDN

- Box alignment in flexbox
- CSS box alignment guide
