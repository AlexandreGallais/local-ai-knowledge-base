---
title: "`animation-play-state` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/animation-play-state/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `animation-play-state` CSS property

The **`animation-play-state`** CSS property sets whether an animation is running or paused.

Resuming a paused animation will start the animation from where it left off at the time it was paused, rather than starting over from the beginning of the animation sequence.

```css
animation-play-state: paused;
```

```css
animation-play-state: running;
```

```html
<section class="flex-column" id="default-example">
  <div class="animating" id="example-element"></div>
</section>
```

```css
#example-element {
  background-color: #1766aa;
  color: white;
  margin: auto;
  margin-left: 0;
  border: 5px solid #333333;
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.animating {
  animation-name: slide;
  animation-duration: 3s;
  animation-timing-function: ease-in;
  animation-iteration-count: infinite;
  animation-direction: alternate;
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

## Syntax

```css
/* Single animation */
animation-play-state: running;
animation-play-state: paused;

/* Multiple animations */
animation-play-state: paused, running, running;

/* Global values */
animation-play-state: inherit;
animation-play-state: initial;
animation-play-state: revert;
animation-play-state: revert-layer;
animation-play-state: unset;
```

### Values

This property is specified as a comma-separated list of the following keyword values:

- `running`
    The **animation** is currently **playing**.
- `paused`
    The **animation** is currently **paused**.

> **Note:**
> When you specify multiple comma-separated values on an `animation-*` property, they are applied to the animations in the order in which the `animation-name`s appear. For situations where the number of animations and `animation-*` property values do not match, see Setting multiple animation property values.

## Examples

### Pausing an animation

This animation is paused, but runs when you hover over it.

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
  animation-name: rotate;
  animation-duration: 0.7s;
  animation-iteration-count: infinite;
  animation-play-state: paused;
}

.box:hover {
  animation-play-state: running;
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

Hover over the rectangle to play the animation.

See CSS animations for examples.

## See also

- Using CSS animations
- JavaScript `AnimationEvent` API
- Other related animation properties: `animation`, `animation-composition`, `animation-delay`, `animation-direction`, `animation-duration`, `animation-fill-mode`, `animation-iteration-count`, `animation-name`, `animation-timeline`, `animation-timing-function`
