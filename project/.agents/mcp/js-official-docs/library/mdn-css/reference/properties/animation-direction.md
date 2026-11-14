---
title: "`animation-direction` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/animation-direction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `animation-direction` CSS property

The **`animation-direction`** CSS property sets whether an animation should play forward, backward, or alternate back and forth between playing the sequence forward and backward.

It is often convenient to use the shorthand property `animation` to set all animation properties at once.

```css
animation-direction: normal;
```

```css
animation-direction: reverse;
```

```css
animation-direction: alternate;
```

```css
animation-direction: alternate-reverse;
```

```html
<section class="flex-column" id="default-example">
  <div id="example-element"></div>
  <button id="play-pause">Play</button>
</section>
```

```css
#example-element {
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-name: slide;
  animation-play-state: paused;
  animation-timing-function: ease-in;
  background-color: #1766aa;
  border-radius: 50%;
  border: 5px solid #333333;
  color: white;
  height: 150px;
  margin: auto;
  margin-left: 0;
  width: 150px;
}

#example-element.running {
  animation-play-state: running;
}

#play-pause {
  font-size: 2rem;
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
const button = document.getElementById("play-pause");

button.addEventListener("click", () => {
  if (el.classList.contains("running")) {
    el.classList.remove("running");
    button.textContent = "Play";
  } else {
    el.classList.add("running");
    button.textContent = "Pause";
  }
});
```

## Syntax

```css
/* Single animation */
animation-direction: normal;
animation-direction: reverse;
animation-direction: alternate;
animation-direction: alternate-reverse;

/* Multiple animations */
animation-direction: normal, reverse;
animation-direction: alternate, reverse, normal;

/* Global values */
animation-direction: inherit;
animation-direction: initial;
animation-direction: revert;
animation-direction: revert-layer;
animation-direction: unset;
```

### Values

This property is specified as a comma-separated list of the following keyword values:

- `normal`
    The animation plays _forwards_ each cycle. In other words, each time the animation cycles, the animation will reset to the beginning state and start over again. This is the default value.
- `reverse`
    The animation plays _backwards_ each cycle. In other words, each time the animation cycles, the animation will reset to the end state and start over again. Animation steps are performed backwards, and easing functions are also reversed. For example, an `ease-in` easing function becomes `ease-out`.
- `alternate`
    The animation reverses direction each cycle, with the first iteration being played _forwards_. The count to determine if a cycle is even or odd starts at one.
- `alternate-reverse`
    The animation reverses direction each cycle, with the first iteration being played _backwards_. The count to determine if a cycle is even or odd starts at one.

> **Note:**
> When you specify multiple comma-separated values on an `animation-*` property, they are applied to the animations in the order in which the `animation-name`s appear. For situations where the number of animations and `animation-*` property values do not match, see Setting multiple animation property values.

> **Note:**
> When creating CSS scroll-driven animations, specifying an `animation-direction` works as expected, for example `reverse` causes the animation to run in reverse over the course of the timeline's progression. A value of `alternate` (combined with an `animation-iteration-count`) causes the animation to run forwards and backwards as the timeline is progressed.

## Examples

### Reversing the animation direction

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
  animation-direction: reverse;
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

See CSS animations for examples.

## See also

- Using CSS animations
- JavaScript `AnimationEvent` API
- Other related animation properties: `animation`, `animation-composition`, `animation-delay`, `animation-duration`, `animation-fill-mode`, `animation-iteration-count`, `animation-name`, `animation-play-state`, `animation-timeline`, `animation-timing-function`
