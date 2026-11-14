---
title: "`animation-fill-mode` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/animation-fill-mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `animation-fill-mode` CSS property

The **`animation-fill-mode`** CSS property sets how a CSS animation applies styles to its target before and after its execution.

It is often convenient to use the shorthand property `animation` to set all animation properties at once.

```css
animation-fill-mode: none;
animation-delay: 1s;
```

```css
animation-fill-mode: forwards;
animation-delay: 1s;
```

```css
animation-fill-mode: backwards;
animation-delay: 1s;
```

```css
animation-fill-mode: both;
animation-delay: 1s;
```

```html
<section class="flex-column" id="default-example">
  <div>Animation <span id="play-status"></span></div>
  <div id="example-element">Select a mode to start!</div>
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

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#play-status {
  font-weight: bold;
}

.animating {
  animation: slide 1s ease-in 1;
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
/* Single animation */
animation-fill-mode: none;
animation-fill-mode: forwards;
animation-fill-mode: backwards;
animation-fill-mode: both;

/* Multiple animations */
animation-fill-mode: none, backwards;
animation-fill-mode: both, forwards, none;

/* Global values */
animation-fill-mode: inherit;
animation-fill-mode: initial;
animation-fill-mode: revert;
animation-fill-mode: revert-layer;
animation-fill-mode: unset;
```

### Values

This property is specified as a comma-separated list of the following keyword values:

- `none`
    The animation will not apply any styles to the target when it's not executing. The element will instead be displayed using any other CSS rules applied to it. This is the default value.
- `forwards`
    The target will retain the computed values set by the last keyframe encountered during execution. The last keyframe depends on the value of `animation-direction` and `animation-iteration-count`:

    | `animation-direction` | `animation-iteration-count` | last keyframe encountered |
    | --------------------- | --------------------------- | ------------------------- |
    | `normal`              | even or odd                 | `100%` or `to`            |
    | `reverse`             | even or odd                 | `0%` or `from`            |
    | `alternate`           | even                        | `0%` or `from`            |
    | `alternate`           | odd                         | `100%` or `to`            |
    | `alternate-reverse`   | even                        | `100%` or `to`            |
    | `alternate-reverse`   | odd                         | `0%` or `from`            |

    Animated properties behave as if included in a set `will-change` property value. If a new stacking context was created during the animation, the target element retains the stacking context after the animation has finished.

- `backwards`
    The animation will apply the values defined in the first relevant keyframe as soon as it is applied to the target, and retain this during the `animation-delay` period. The first relevant keyframe depends on the value of `animation-direction`:

    | `animation-direction`            | first relevant keyframe |
    | -------------------------------- | ----------------------- |
    | `normal` or `alternate`          | `0%` or `from`          |
    | `reverse` or `alternate-reverse` | `100%` or `to`          |

- `both`
    The animation will follow the rules for both forwards and backwards, thus extending the animation properties in both directions.

> **Note:**
> When you specify multiple comma-separated values on an `animation-*` property, they are applied to the animations in the order in which the `animation-name`s appear. For situations where the number of animations and `animation-*` property values do not match, see Setting multiple animation property values.

> **Note:**
> `animation-fill-mode` has the same effect when creating CSS scroll-driven animations as it does for regular time-based animations.

## Examples

### Setting fill mode

You can see the effect of `animation-fill-mode` in the following example. It demonstrates how you can make the animation remain in its final state rather than reverting to the original state (which is the default).

#### HTML

```html
<p>Move your mouse over the gray box!</p>
<div class="demo">
  <div class="grows-and-stays">This grows and stays big.</div>
  <div class="grows">This just grows.</div>
</div>
```

#### CSS

```css
.demo {
  border-top: 100px solid #cccccc;
  height: 300px;
}

@keyframes grow {
  0% {
    font-size: 0;
  }
  100% {
    font-size: 40px;
  }
}

.demo:hover .grows {
  animation-name: grow;
  animation-duration: 3s;
}

.demo:hover .grows-and-stays {
  animation-name: grow;
  animation-duration: 3s;
  animation-fill-mode: forwards;
}
```

#### Result

See CSS animations for more examples.

## See also

- Using CSS animations
- JavaScript `AnimationEvent` API
- Other related animation properties: `animation`, `animation-composition`, `animation-delay`, `animation-direction`, `animation-duration`, `animation-iteration-count`, `animation-name`, `animation-play-state`, `animation-timeline`, `animation-timing-function`
