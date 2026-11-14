---
title: "Using anchored container queries (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/anchor_positioning/anchored_container_queries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using anchored container queries (part 2 of 2)

## Multiple fallbacks example

This example shows multiple position-try fallbacks and anchored container queries in action, and also addresses the problem of what to do if you want to use anchored container queries to set styles on the anchor-positioned element itself, rather than its descendants, using an extra wrapper element. The example also includes some JavaScript that allows you to move the anchor element around the screen using the mouse or the keyboard to check out the different fallbacks.

The HTML for this example includes two `` elements to represent the anchor and infobox. The `anchor` `` includes a `tabindex` attribute to make it keyboard-focusable, while the `infobox` `` includes an extra wrapper `` to apply the infobox styles to, so we can style it via `@container` at-rules.

```html
<div class="anchor" tabindex="0">⚓︎</div>

<div class="infobox">
  <div>Infobox</div>
</div>
```

We start off our styles by specifying the `anchor` `` as an anchor element, again by giving it an `anchor-name` of `--my-anchor`. We also absolutely position it so that we can move it around by setting different inset property values on it via JavaScript.

```css
* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  height: 100%;
}

body {
  height: inherit;
}

p {
  font-size: 1.4em;
  line-height: 1.5;
}

.anchor {
  font-size: 2em;
  color: white;
  text-shadow: 1px 1px 1px black;
  background-color: blue;
  width: fit-content;
  padding: 5px 10px;
}

@supports not (container-type: anchored) {
  body::before {
    content: "Your browser does not support anchored container queries.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

```css
.anchor {
  anchor-name: --my-anchor;
  position: absolute;
}
```

Next, we position our infobox relative to our anchor by absolutely positioning it and giving it a `position-anchor` value of `--my-anchor`. This time we position it at the top-left of the anchor with a `position-area` value of `top left`. We then set three `position-try-fallbacks` — `flip-block`, `flip-inline`, and `flip-block flip-inline` — this causes the infobox to flip its position along its block axis, inline axis, or both, to stay on-screen when the anchor gets near to the different edges of the viewport.

Finally, we turn the infobox into an anchored query container by setting `container-type: anchored`.

```css
.infobox {
  position: absolute;
  position-anchor: --my-anchor;
  position-area: top left;
  position-try-fallbacks:
    flip-block,
    flip-inline,
    flip-block flip-inline;
  container-type: anchored;
}
```

At this point, we will show you the basic <example-value> styles set on the infobox, to illustrate the fact that, in this case, we are setting these styles on the wrapper `` inside the infobox rather than the infobox itself. As mentioned earlier, we are doing this so we can manipulate these styles via anchored container queries. This wouldn't be possible if they were set directly on the infobox, as it is the anchored query container.

Most notably, here we are setting a `border-radius` value that creates a rounded corner on every corner of the infobox except for the bottom-right corner. Since the infobox is positioned to the top-left of the anchor, this corner acts as an arrow, pointing at the anchor.

```css
.infobox div {
  color: white;
  background-color: black;
  font-size: 1.4em;
  padding: 10px;
  margin: 1px;

  border-radius: 10px 10px 0 10px;
}
```

Finally, we define an anchored container query for each position-try fallback that may be applied to the infobox using `@container` at-rules. In each case, we alter the rounded corners applied to the infobox wrapper `` so that the nearest corner to the anchor is always not rounded.

```css
@container anchored(fallback: flip-block) {
  .infobox div {
    border-radius: 10px 0 10px 10px;
  }
}

@container anchored(fallback: flip-inline) {
  .infobox div {
    border-radius: 10px 10px 10px 0;
  }
}

@container anchored(fallback: flip-block flip-inline) {
  .infobox div {
    border-radius: 0 10px 10px 10px;
  }
}
```

> **Note:**
> Again, we've hidden most of the basic <example-value> for brevity, as well as the JavaScript that provides the movement controls (this isn't relevant to what we are trying to demonstrate here). To see the full code, open the example in the MDN Playground by pressing the "Play" button on one of the code blocks or the live rendering.

```js
const anchorDiv = document.querySelector(".anchor");

let xPos = 250;
let yPos = 120;

function setPos() {
  const maxX = document.body.clientWidth - anchorDiv.clientWidth - 25;
  const maxY = document.body.clientHeight - anchorDiv.clientHeight - 25;

  if (xPos < 25) {
    xPos = 25;
  }

  if (xPos > maxX) {
    xPos = maxX;
  }

  if (yPos < 25) {
    yPos = 25;
  }

  if (yPos > maxY) {
    yPos = maxY;
  }

  anchorDiv.style.left = `${xPos}px`;
  anchorDiv.style.top = `${yPos}px`;
}

setPos();

document.body.addEventListener("keydown", (e) => {
  if (e.key === "w") {
    yPos -= 25;
  } else if (e.key === "d") {
    xPos += 25;
  } else if (e.key === "s") {
    yPos += 25;
  } else if (e.key === "a") {
    xPos -= 25;
  }

  setPos();
});

document.body.addEventListener("click", (e) => {
  xPos = e.clientX;
  yPos = e.clientY;

  setPos();
});
```

This example renders like so:

Try moving the anchor element around the viewport by:

- Clicking the mouse (or tapping the screen if you're on a touchscreen device) in the position you want to move the anchor to.
- Using the `W`, `A`, `S`, and `D` keys to move the anchor up, left, down, and right, respectively.

When you move the anchor element near the edges of the screen, note how the infobox moves to different positions around it to stay on-screen, and also how the `border-radius` set on the infobox changes so that the non-rounded corner is always pointing at the anchor. Moving the anchor into the different corners is guaranteed to show you the different effects.

## See also

- CSS container queries
- Using container size and style queries
- Using container scroll-state queries
- CSS anchor positioning module
- Learn: CSS positioning
