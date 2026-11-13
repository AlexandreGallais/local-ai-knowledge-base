---
title: "`anchor()` CSS function (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/anchor/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `anchor()` CSS function (part 2 of 2)

## Examples

### Common usage

In this example, the `anchor()` function is used to set the height of an anchor-positioned element to the height of its anchor by setting the bottom and top edges to the bottom and top edges of the anchor. The `anchor()` function within a `calc()` function is then used to offset the anchor-positioned element from its anchor.

#### HTML

We include a `` element, which we'll set as our anchor, and a `` element that we will position relative to that anchor:

```html
<div class="anchor">⚓︎</div>

<p class="positionedElement">This is a positioned element.</p>
```

#### CSS

We set the anchor element's `anchor-name` value as the value of the positioned element's `position-anchor` property to associate the elements, then set three inset properties on the anchor-positioned element. The first two position the element's top edge flush with the top edge of the anchor and the bottom edge flush with the bottom edge of the anchor. In the third inset property, the `anchor()` function is used within a `calc()` function to position the element's left edge `10px` to the right edge of the anchor.

```css
.anchor {
  anchor-name: --infobox;
  background: palegoldenrod;
  font-size: 3em;
  width: fit-content;
  border: 1px solid goldenrod;
}

.positionedElement {
  position: absolute;
  position-anchor: --infobox;
  margin: 0;
  top: anchor(top);
  left: calc(anchor(right) + 10px);
  bottom: anchor(bottom);
  background-color: olive;
  border: 1px solid darkolivegreen;
}
```

#### Results

### Comparison of different anchor-side values

This example shows an element positioned relative to an anchor via its `top` and `left` properties, which are defined using `anchor()` functions. It also includes two drop-down menus that allow you to vary the `<anchor-side>` values inside those `anchor()` functions, so you can see what effect they have.

#### HTML

We specify two `` elements, one with a class of `anchor` and one with a class of `infobox`. These are intended to be the anchor element and the positioned element we will associate with it, respectively.

We also include some filler text around the two `` elements to make the `<body>` taller so that it will scroll. This example also includes two `<select>` elements to create the drop-down menus enabling the selection of different `<anchor-side>` values to place the positioned element with. We've hidden the filler text and the `<select>` elements for brevity.

```html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
```

```html
<div class="anchor">⚓︎</div>

<div class="infobox">
  <p>This is an information box.</p>
</div>
```

```html
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
  <div>
    <label for="top-anchor-side">
      Choose a vertical <code>anchor()</code> value:
    </label>
    <select id="top-anchor-side" name="top-anchor-side">
      <option value="top">top: anchor(top)</option>
      <option value="bottom" selected>top: anchor(bottom)</option>
      <option value="start">top: anchor(start)</option>
      <option value="end">top: anchor(end)</option>
      <option value="center">top: anchor(center)</option>
      <option value="0%">top: anchor(0%)</option>
      <option value="25%">top: anchor(25%)</option>
      <option value="50%">top: anchor(50%)</option>
      <option value="75%">top: anchor(75%)</option>
      <option value="100%">top: anchor(100%)</option>
    </select>
  </div>
  <div>
    <label for="left-anchor-side">
      Choose a horizontal <code>anchor()</code> value:
    </label>
    <select id="left-anchor-side" name="left-anchor-side">
      <option value="left">left: anchor(left)</option>
      <option value="right" selected>left: anchor(right)</option>
      <option value="self-start">left: anchor(self-start)</option>
      <option value="self-end">left: anchor(self-end)</option>
      <option value="center">left: anchor(center)</option>
      <option value="0%">left: anchor(0%)</option>
      <option value="25%">left: anchor(25%)</option>
      <option value="50%">left: anchor(50%)</option>
      <option value="75%">left: anchor(75%)</option>
      <option value="100%">left: anchor(100%)</option>
    </select>
  </div>
</form>
```

#### CSS

We declare the `anchor` `` as an anchor element by setting an anchor name on it via the `anchor-name` property. We then associate it with the positioned element by setting the same value for its `position-anchor` property. `top: anchor(--my-anchor bottom)` positions the infobox's top edge flush to the bottom edge of its anchor, while `left: anchor(right)` positions the infobox's left edge flush to the right edge of its anchor. This provides an initial position that will be overwritten when different values are selected from the drop-down menus.

```css
.anchor {
  font-size: 2rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  border-radius: 10px;
  border: 1px solid black;
  padding: 3px;
}

body {
  width: 80%;
  margin: 0 auto;
}

form {
  background: white;
  border: 1px solid black;
  padding: 5px;
  position: fixed;
  top: 0;
  right: 2px;
}

select {
  display: block;
  margin-top: 5px;
}

form div:last-child {
  margin-top: 10px;
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
.anchor {
  anchor-name: --my-anchor;
}

.infobox {
  position: fixed;
  position-anchor: --my-anchor;
  top: anchor(--my-anchor bottom);
  left: anchor(right);
}
```

#### JavaScript

We listen for the `change` event that occurs when a new `<anchor-side>` value is selected, and set the selected value as the `<anchor-side>` in the `anchor()` function within the infobox's relevant inset property (`top` or `left`) value.

```js
const infobox = document.querySelector(".infobox");
const topSelect = document.querySelector("#top-anchor-side");
const leftSelect = document.querySelector("#left-anchor-side");

topSelect.addEventListener("change", (e) => {
  const anchorSide = e.target.value;
  infobox.style.top = `anchor(--my-anchor ${anchorSide})`;
});

leftSelect.addEventListener("change", (e) => {
  const anchorSide = e.target.value;
  infobox.style.left = `anchor(${anchorSide})`;
});
```

#### Result

Select different values from the drop-down menus to see how they affect the positioning of the infobox.

### Element positioned relative to multiple anchors

This example positions an element relative to two different anchors, which are used to set the position of the top-left and bottom-right corners of the anchor-positioned element. The anchors can be moved via keyboard controls or dragged, resizing the positioned element.

#### HTML

We specify three `` elements in total. The first two have a class of `anchor` and will be defined as anchors; each one has an individual `id` that will be used to provide them with different positioning information. The last `` has a class of `infobox` and will be defined as the positioned element. We include the `tabindex` attribute to enable them to receive keyboard focus.

```html
<div id="anchor1" class="anchor" tabindex="0">⚓︎1</div>

<div id="anchor2" class="anchor" tabindex="0">⚓︎2</div>

<div class="infobox">
  <p>This is an information box.</p>
</div>
```

#### CSS

```css
body {
  width: 150vw;
  height: 150vh;
}

.anchor {
  font-size: 1rem;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: hsl(240 100% 75%);
  width: fit-content;
  border-radius: 10px;
  border: 1px solid black;
  padding: 3px;
  &:focus {
    background-color: hsl(60 100% 75%);
  }
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

The anchors are each given a different `anchor-name` value, a `position` value of `absolute`, and different inset values to position the anchors in a rectangular formation.

```css
.anchor {
  position: absolute;
}

#anchor1 {
  anchor-name: --my-anchor1;
  top: 50px;
  left: 100px;
}

#anchor2 {
  anchor-name: --my-anchor2;
  top: 200px;
  left: 350px;
}
```

The anchor-positioned element, with its `position` set to `fixed`, is associated with one anchor via its `position-anchor` property. It is positioned relative to two anchors by including two different `<anchor-name>` values with the `anchor()` functions set on its inset properties. In this case, we used `percentage` values for the `<anchor-side>` parameter, specifying the distance from the start of the axis of the inset property on which the function is set.

```css
.infobox {
  position-anchor: --my-anchor1;
  position: fixed;
  top: anchor(--my-anchor1 100%);
  left: anchor(--my-anchor1 100%);
  bottom: anchor(--my-anchor2 0%);
  right: anchor(--my-anchor2 0%);
}
```

```js
// grab all the anchors and make each one draggable
const anchors = document.querySelectorAll(".anchor");
anchors.forEach((anchor) => makeDraggable(anchor));

function makeDraggable(elem) {
  let pos1, pos2, pos3, pos4;

  elem.onmousedown = dragMouseDown;
  elem.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "d":
        elem.style.left = `${elem.offsetLeft + 5}px`;
        break;
      case "a":
        elem.style.left = `${elem.offsetLeft - 5}px`;
        break;
      case "w":
        elem.style.top = `${elem.offsetTop - 5}px`;
        break;
      case "s":
        elem.style.top = `${elem.offsetTop + 5}px`;
        break;
    }
    e.preventDefault();
  });

  function elementMove(e) {
    console.dir(e);
    // calculate the new cursor position:
    pos1 = pos3 - e.offsetLeft;
    pos2 = pos4 - e.offsetTop;
    pos3 = e.offsetLeft;
    pos4 = e.offsetTop;
    // set the element's new position:
    elem.style.top = `${elem.offsetTop - pos2}px`;
    elem.style.left = `${elem.offsetLeft - pos1}px`;
  }

  function dragMouseDown(e) {
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the mouse moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elem.style.top = `${elem.offsetTop - pos2}px`;
    elem.style.left = `${elem.offsetLeft - pos1}px`;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
```

#### Result

The positioned element is positioned relative to both anchor elements. Drag them with the mouse or tab to them and use the `W`, `A`, `S`, and `D` keys to move them up, down, left, and right. See how this changes their position, and as a consequence, the area of the positioned element. Scroll to see how the positions of all the elements are maintained.

> **Note:**
> This example is a proof-of-concept and not intended to be used in production code. Among its shortcomings, the example breaks if you try to move the anchors past each other horizontally or vertically.

## See also

- `position-anchor`
- `position-area`
- `anchor-size()` function
- Using CSS anchor positioning guide
- Fallback options and conditional hiding for overflow guide
- CSS anchor positioning module
