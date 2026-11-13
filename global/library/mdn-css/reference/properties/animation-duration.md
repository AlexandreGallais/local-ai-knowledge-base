---
title: "`animation-duration` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/animation-duration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `animation-duration` CSS property

The **`animation-duration`** CSS property sets the length of time that an animation takes to complete one cycle.

It is often convenient to use the shorthand property `animation` to set all animation properties at once.

```css
animation-duration: 750ms;
```

```css
animation-duration: 3s;
```

```css
animation-duration: 0s;
```

```html
<section class="flex-column" id="default-example">
  <div class="animating" id="example-element"></div>
  <button id="play-pause">Play</button>
</section>
```

```css
#example-element {
  animation-direction: alternate;
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
animation-duration: auto; /* Default */
animation-duration: 6s;
animation-duration: 120ms;

/* Multiple animations */
animation-duration: 1.64s, 15.22s;
animation-duration: 10s, 35s, 230ms;

/* Global values */
animation-duration: inherit;
animation-duration: initial;
animation-duration: revert;
animation-duration: revert-layer;
animation-duration: unset;
```

### Values

This property is specified as a comma-separated list of the following values:

- `auto`
    For time-based animations, `auto` is equivalent to a value of `0s` (see below). For CSS scroll-driven animations, `auto` fills the entire timeline with the animation.

- `<time>`
    The time that an animation takes to complete one cycle. This may be specified in either seconds (`s`) or milliseconds (`ms`). The value must be positive or zero and the unit is required.

    If no value is provided, the default value of `0s` is used, in which case the animation still executes (the `animationStart` and `animationEnd` events are fired). Whether or not the animation will be visible when the duration is `0s` will depend on the value of `animation-fill-mode`, as explained below:
    - If `animation-fill-mode` is set to `backwards` or `both`, the first frame of the animation as defined by `animation-direction` will be displayed during `animation-delay` countdown.
    - If `animation-fill-mode` is set to `forwards` or `both`, the last frame of the animation will be displayed, as defined by `animation-direction`, after the `animation-delay` expires.
    - If `animation-fill-mode` is set to `none`, the animation will have no visible effect.

> **Note:**
> Negative values are invalid, causing the declaration to be ignored. Some early, prefixed, implementations may consider them as identical to `0s`.

> **Note:**
> When you specify multiple comma-separated values on an `animation-*` property, they are applied to the animations in the order in which the `animation-name`s appear. For situations where the number of animations and `animation-*` property values do not match, see Setting multiple animation property values.

> **Note:**
> When creating CSS scroll-driven animations, specifying an `animation-duration` value in seconds or milliseconds doesn't really make sense. In tests, it seemed to have no effect on scroll progress timeline animations, while on view progress timeline animations it seemed to push the animation to happen nearer the end of the timeline. However, Firefox requires an `animation-duration` to be set for it to successfully apply the animation. You are therefore advised to set `animation-duration` to `1ms` so that animations will work in Firefox, but the effect is not altered too much by it.

## Examples

### Setting animation duration

This animation has an animation-duration of 0.7 seconds.

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

See CSS animations for more examples.

## See also

- Using CSS animations
- JavaScript `AnimationEvent` API
- Other related animation properties: `animation`, `animation-composition`, `animation-delay`, `animation-direction`, `animation-fill-mode`, `animation-iteration-count`, `animation-name`, `animation-play-state`, `animation-timeline`, `animation-timing-function`
