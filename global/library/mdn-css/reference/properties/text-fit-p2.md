---
title: "`text-fit` CSS property (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/text-fit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `text-fit` CSS property (part 2 of 2)

## Examples

### Basic `text-fit` usage

This example demonstrates basic usage of `text-fit` to grow and shrink text nodes to fit their containers.

#### HTML

We include two text elements, an `<h1>` and an `<h2>`, nested inside a ``.

```html
<input
  type="range"
  min="0.4"
  max="1"
  value="1"
  step="0.01"
  aria-label="adjust the width of the page" />
```

```html
<div>
  <h1>My heading</h1>

  <h2>My subtitle: a bit longer, may need shrinking</h2>
</div>
```

```js
const divElem = document.querySelector("div");
const slider = document.querySelector("input");
let maxWidth;

function setMaxWidth() {
  maxWidth = document.documentElement.clientWidth;
}

function setWidth() {
  divElem.style.width = `${maxWidth * slider.value}px`;
}

slider.addEventListener("input", setWidth);
window.addEventListener("resize", () => {
  setMaxWidth();
  setWidth();
});

setMaxWidth();
setWidth();
```

We also include an `` element to enable adjusting the content width to emulate a changing viewport width. The range input, plus the JavaScript that powers it, have been hidden for brevity.

#### CSS

We give the container `` a `padding` value of `20px` to give the text some space.

```css
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  background-color: white;
}

div {
  margin: 0 auto;
  background-color: coral;
}

input {
  width: 99%;
}
```

```css
div {
  padding: 20px;
}
```

We give the `<h1>` a `text-fit` value of `grow`, so that it will grow to fill its container's available inline space. We give the longer `<h2>` a `white-space` value of `nowrap` so that ordinarily, it would all stay on a single line and overflow its container rather than wrapping, if it reaches the container edge. We then set `text-fit: shrink` on it so that, instead of overflowing, it will shrink to fit inside its container's available inline space.

```css
h1 {
  text-fit: grow;
}

h2 {
  white-space: nowrap;
  text-fit: shrink;
}
```

#### Result

Adjust the slider and note how the `<h1>` grows automatically so that it always fills the available space inside its parent ``. Also note how the `<h2>` shrinks so that it always fills the available space inside the `` at narrower widths; at wider widths where it fits inside the ``, it maintains its natural width.

Without `text-fit`, the `<h1>` wouldn't fill the available space, and the `<h2>` would overflow it at narrower widths.

### Setting scaling factor percentage limits

This example is very similar to the previous one, except that in this case we limit the amount that our headings can grow or shrink using `<percentage>` values.

The HTML and JavaScript are identical to the previous example.

#### CSS

We give the `<h1>` a `text-fit` value of `grow 300%`, so that it will grow to fill its container's available inline space, up to 300% of its natural `font-size`:

```css
h1 {
  text-fit: grow 300%;
}
```

We give the `<h2>` a `white-space` value of `nowrap` so that it will all stay on a single line and overflow its container rather than wrapping, when it touches the container edge. We then set `text-fit: shrink 80%` on it so that, instead of overflowing, it will shrink to fit inside its container's available inline space, down to `80%` of its natural `font-size`.

```css
h2 {
  white-space: nowrap;
  text-fit: shrink 80%;
}
```

One issue that presents itself at this point is that, when the ``'s `width` gets smaller than about `400px`, the `<h2>` will start to overflow its container. To avoid this, we want to set the text to wrap onto new lines normally at this point. To solve the problem, we first give the containing `` a `container-type` of `inline-size`, so that we can use container queries to selectively apply CSS depending on its width.

```css
div {
  padding: 20px;
}
```

```css
div {
  container-type: inline-size;
}
```

We then use a container query to change the `<h2>`'s `white-space` value to `wrap` when the ``'s `width` gets smaller than `400px`:

```css
@container (width < 400px) {
  h2 {
    white-space: wrap;
  }
}
```

#### Result

Adjust the slider. Note how the `<h1>` grows automatically so that it always fills the available space inside its parent ``, but only up to a certain width. Note how the `<h2>` shrinks so that it always fills the available space inside the `` at narrower widths. When the `` gets narrower than `400px`, the container query kicks in and we set `white-space: wrap`, meaning that the `<h2>` starts to wrap onto multiple lines.

### Demonstrating multi-line scaling behavior keywords

This example demonstrates the difference in effect between setting the `consistent`, `per-line`, and `per-line-all` keywords in the `text-fit` property values of different paragraphs.

#### HTML

The HTML features three `` elements containing the same filler text, each with different `id` values set on them:

```html
<div>
  <p id="consistent">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste vitae in id
    esse odit autem quisquam saepe repellendus.
  </p>

  <p id="per-line">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste vitae in id
    esse odit autem quisquam saepe repellendus.
  </p>

  <p id="per-line-all">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste vitae in id
    esse odit autem quisquam saepe repellendus.
  </p>
</div>
```

The HTML and JavaScript for the width adjustment slider are also included in this example.

#### CSS

We give each paragraph a `text-fit` value with the first keyword set to `grow`; the second keyword in each case is set to a different value — `consistent`, `per-line`, and `per-line-all`, respectively.

```css
#consistent {
  text-fit: grow consistent;
}

#per-line {
  text-fit: grow per-line;
}

#per-line-all {
  text-fit: grow per-line-all;
}
```

```css
* {
  box-sizing: border-box;
}

:root {
  overflow: hidden;
}

div {
  padding: 20px;
}

p {
  padding: 20px;
  background-color: rgb(0 0 0 / 0.2);
  position: relative;
  margin-bottom: 40px;
}

p::before {
  content: attr(id);
  background-color: black;
  color: white;
  padding: 5px 10px;
  position: absolute;
  top: -28px;
  left: 0px;
}
```

#### Result

Adjust the slider up and down the scale, taking careful note of the behavior of each paragraph. You should note that:

- The `consistent` paragraph's text lines always have the same `font-size` as one another throughout.
- The `per-line` paragraph's text lines vary in `font-size` somewhat, which becomes more noticeable at narrower widths. The last line's `font-size` is not scaled.
- The `per-line-all` paragraph's text lines vary in `font-size` somewhat, which includes the last line. This is very noticeable at widths that cause only one or two words to wrap onto the last line.

```css
@supports not (text-fit: grow) {
  body::before {
    content: "Your browser does not support text-fit.";
    background-color: wheat;
    text-align: center;
    padding: 1rem 0;

    z-index: 1;
    position: fixed;
    inset: 40% 0 auto;
  }
}
```

## See also

- CSS text module
