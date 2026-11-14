---
title: "Element: animate() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/animate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: animate() method

The `Element` interface's **`animate()`** method
is a shortcut method which creates a new `Animation`, applies it to the
element, then plays the animation. It returns the created `Animation`
object instance.

> **Note:**
> Elements can have multiple animations applied to them. You can get a list of the
> animations that affect an element by calling `Element.getAnimations()`.

## Syntax

```js
animate(keyframes, options)
```

### Parameters

- `keyframes`
    Either an array of keyframe objects, **or** a keyframe object whose
    properties are arrays of values to iterate over. See Keyframe Formats for more details.
- `options`
    Either an **integer representing the animation's duration** (in
    milliseconds), **or** an Object containing one or more timing properties described in the `KeyframeEffect()` options parameter and/or the following options:
    - `id` (optional)
        A property unique to `animate()`: A string with which to reference the animation.
    - `rangeEnd` (optional)
        Specifies the end of an animation's attachment range along its timeline, i.e., where along the timeline an animation will end. The JavaScript equivalent of the CSS `animation-range-end` property. `rangeEnd` can take several different value types, as follows:
        - A string that can be `normal` (meaning no change to the animation's attachment range), a CSS `length-percentage` representing an offset, a `<timeline-range-name>`, or a `<timeline-range-name>` with a `<length-percentage>` following it. For example: `"normal"`, `"entry"`, or `"cover 100%"`.

          See `animation-range` for a detailed description of the available values. Also check out the View Timeline Ranges Visualizer, which shows exactly what the different values mean in an easy visual format.

        - An object containing `rangeName` (a string) and `offset` (a `CSSNumericValue`) properties representing a `<timeline-range-name>` and `<length-percentage>`, as described in the previous bullet. For example: `{ rangeName: "entry", offset: CSS.percent("100") }`.
        - A `CSSNumericValue` representing an offset, for example: `CSS.percent("100")`.

    - `rangeStart` (optional)
        Specifies the start of an animation's attachment range along its timeline, i.e., where along the timeline an animation will start. The JavaScript equivalent of the CSS `animation-range-start` property. `rangeStart` can take the same value types as `rangeEnd`.
    - `timeline` (optional)
        A property unique to `animate()`: The `AnimationTimeline` to associate with the animation. Defaults to `Document.timeline`. The JavaScript equivalent of the CSS `animation-timeline` property.

### Return value

Returns an `Animation`.

## Examples

### Rotating and scaling

In this example we use the `animate()` method to rotate and scale an element.

#### HTML

```html
<div class="newspaper">Spinning newspaper<br />causes dizziness</div>
```

#### CSS

```css
html,
body {
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
}

.newspaper {
  padding: 0.5rem;
  text-transform: uppercase;
  text-align: center;
  background-color: white;
  cursor: pointer;
}
```

#### JavaScript

```js
const newspaperSpinning = [
  { transform: "rotate(0) scale(1)" },
  { transform: "rotate(360deg) scale(0)" },
];

const newspaperTiming = {
  duration: 2000,
  iterations: 1,
};

const newspaper = document.querySelector(".newspaper");

newspaper.addEventListener("click", () => {
  newspaper.animate(newspaperSpinning, newspaperTiming);
});
```

#### Result

### Down the Rabbit Hole demo

In the demo Down the Rabbit Hole (with the Web Animation API), we use the convenient
`animate()` method to immediately create and play an animation on the
`#tunnel` element to make it flow upwards, infinitely. Notice the array of
objects passed as keyframes and also the timing options block.

```js
document.getElementById("tunnel").animate(
  [
    // keyframes
    { transform: "translateY(0px)" },
    { transform: "translateY(-300px)" },
  ],
  {
    // timing options
    duration: 1000,
    iterations: Infinity,
  },
);
```

### Implicit to/from keyframes

The browser can infer the start or end state of an animation by using the current state. By default, if a single keyframe is provided, it's treated as the end state, and the start state is inferred from the element's current computed style. However, you can specify the `offset` to indicate where the provided keyframe should be placed in the animation timeline.

```html
<div>
  <img
    id="logo"
    src="/shared-assets/images/examples/firefox-logo.svg"
    alt="Firefox logo" />
</div>
<button id="run">Animate - use current as start</button>
<button id="run2">Animate - use current as end</button>
<button id="run3">Animate - use current as both ends</button>
```

```css
div {
  width: 100%;
}

#logo {
  width: 200px;
  height: 200px;
}
```

```js
const logo = document.getElementById("logo");
document.getElementById("run").addEventListener("click", () => {
  logo.animate({ transform: "translateX(300px)" }, 1000);
});
document.getElementById("run2").addEventListener("click", () => {
  logo.animate({ transform: "translateX(300px)", offset: 0 }, 1000);
});
document.getElementById("run3").addEventListener("click", () => {
  logo.animate({ transform: "translateX(300px)", offset: 0.5 }, 1000);
});
```

We specified a single frame in the timeline, and the start and/or end states can be filled in to create a complete animation.

### timeline, rangeStart, and rangeEnd

Typical usage of the `timeline`, `rangeStart`, and `rangeEnd` properties might look like this:

```js
const img = document.querySelector("img");

const timeline = new ViewTimeline({
  subject: img,
  axis: "block",
});

img.animate(
  {
    opacity: [0, 1],
    transform: ["scaleX(0)", "scaleX(1)"],
  },
  {
    fill: "both",
    duration: 1,
    timeline,
    rangeStart: "cover 0%",
    rangeEnd: "cover 100%",
  },
);
```

## See also

- `Animation`
- `Element.getAnimations()`
- `animation-range-end`, `animation-range-start`, `animation-timeline`
- CSS scroll-driven animations
- Web Animations API
