---
title: "`animation-iteration-count` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/animation-iteration-count/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `animation-iteration-count` CSS property

The **`animation-iteration-count`** CSS property sets the number of times an animation sequence should be played before stopping.

It is often convenient to use the shorthand property `animation` to set all animation properties at once.

```css
animation-iteration-count: 0;
```

```css
animation-iteration-count: 2;
```

```css
animation-iteration-count: 1.5;
```

```html
<section class="flex-column" id="default-example">
  <div>Animation <span id="play-status"></span></div>
  <div id="example-element">Select a count to start!</div>
</section>
```

```css
#example-element {
  align-items: center;
  background-color: #1766aa;
  border-radius: 50%;
  border: 5px solid #333333;
  color: white;
  display: flex;
  flex-direction: column;
  height: 150px;
  justify-content: center;
  margin: auto;
  margin-left: 0;
  width: 150px;
}

#play-status {
  font-weight: bold;
}

.animating {
  animation-name: slide;
  animation-duration: 3s;
  animation-timing-function: ease-in;
}

@keyframes slide {
  from {
    background-color: orange;
    color: black;
    margin-left: 0;
  }
  to {
    background-color: orange;
    color: black;
    margin-left: 80%;
  }
}
```

```js
const el = document.getElementById("example-element");
const status = document.getElementById("play-status");

function update() {
  status.textContent = "delaying";
  el.className = "";
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      el.className = "animating";
    });
  });
}

el.addEventListener("animationstart", () => {
  status.textContent = "playing";
});

el.addEventListener("animationend", () => {
  status.textContent = "finished";
});

const observer = new MutationObserver(() => {
  update();
});

observer.observe(el, {
  attributes: true,
  attributeFilter: ["style"],
});

update();
```

## Syntax

```css
/* Keyword value */
animation-iteration-count: infinite;

/* <number> values */
animation-iteration-count: 3;
animation-iteration-count: 2.4;

/* Multiple values */
animation-iteration-count: 2, 0, infinite;

/* Global values */
animation-iteration-count: inherit;
animation-iteration-count: initial;
animation-iteration-count: revert;
animation-iteration-count: revert-layer;
animation-iteration-count: unset;
```

### Values

This property is specified as one or more comma-separated values:

- `infinite`
    The animation will repeat forever.
- `<number>`
    The number of times the animation will repeat; this is `1` by default. You may specify non-integer values to play part of an animation cycle: for example, `0.5` will play half of the animation cycle. Negative values are invalid.

> **Note:**
> When you specify multiple comma-separated values on an `animation-*` property, they are applied to the animations in the order in which the `animation-name`s appear. For situations where the number of animations and `animation-*` property values do not match, see Setting multiple animation property values.

> **Note:**
> When creating CSS scroll-driven animations, specifying an `animation-iteration-count` causes the animation to repeat that number of times over the course of the timeline's progression. If an `animation-iteration-count` is not provided, the animation will only occur once. `infinite` is a valid value for scroll-driven animations, but it results in an animation that doesn't work.

## Examples

### Setting iteration count

This animation will run 10 times.

#### HTML

```html
<div class="box"></div>
```

#### CSS

```css
.box {
  background-color: rebeccapurple;
  border-radius: 10px;
  width: 100px;
  height: 100px;
}

.box:hover {
  animation-name: rotate;
  animation-duration: 0.7s;
  animation-iteration-count: 10;
}

@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

#### Result

Hover over the rectangle to start the animation.

See CSS animations for examples.

## See also

- Using CSS animations
- JavaScript `AnimationEvent` API
- Other related animation properties: `animation`, `animation-composition`, `animation-delay`, `animation-direction`, `animation-duration`, `animation-fill-mode`, `animation-name`, `animation-play-state`, `animation-timeline`, `animation-timing-function`
