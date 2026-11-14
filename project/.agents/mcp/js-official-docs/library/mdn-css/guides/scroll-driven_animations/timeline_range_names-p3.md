---
title: "Understanding timeline range names (part 3 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll-driven_animations/timeline_range_names/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding timeline range names (part 3 of 3)

### Entry- and exit-crossing

If the subject element is smaller than the scrollport, and you want the full animation to occur as it enters or exits the scrollport, you can happily use `entry` or `exit`, respectively.

When the subject is larger than the scrollport, the animation doesn't run the full course of the element entering or exiting the scrollport. The `entry` value sets the `100%` progress to be when the element's start edge reaches the start-edge of the scrollport, before the element has fully entered the scrollport. With `exit`, the `0%` progress occurs when the element's end-edge reaches the scroll container's end edge, when part of the subject has already exited the scrollport. With both these values, the animation attachment range is smaller than the subject. If this isn't the effect you want, the `*-crossing` values may be the solution you seek.

#### Entry-crossing

The `entry-crossing` value represents the range during which the animated element crosses the end edge of the scrollport, with `0%` progress occurring when the element's start edge aligns with the end edge the scrollport and `100%` progress occurring when the element's end edge reaches the end edge of the scrollport, meaning it has finished fully scrolling into the scrollport.

It may be helpful to compare the two values in a live example.

```css
#A {
  animation-range: entry;
}
#B {
  animation-range: entry-crossing;
}
```

```css
body::before {
  content: "entry vs. entry-crossing";
}
#A::after {
  content: " ( entry )";
}
#B::after {
  content: " ( entry-crossing ) ";
}
```

Select the different height values, then scroll to compare `entry` with `entry-crossing` for each size.

Note how the effects are similar, except for when the `500px` is selected and the animated element is taller than the container.
The `entry-crossing` range produces the same results as `entry` when the element is equal to or smaller than the scrollport, but when the element is larger than the scrollport, the `100%` occurs later, occurring only when the end edge has entered the view port.
The animation attachment range is the size of the subject, and not clamped to the size of the scrollport.

```html
<div>
  <svg viewBox="-60 -1 530 1252" xmlns="http://www.w3.org/2000/svg">
    <rect class="small end" width="100" height="50" x="10" y="700" />
    <rect class="medium end" width="100" height="250" x="120" y="500" />
    <rect class="large end" width="100" height="500" x="230" y="500" />
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small start" width="100" height="50" x="10" y="750" />
    <rect class="medium start" width="100" height="250" x="120" y="750" />
    <rect class="large start" width="100" height="500" x="230" y="750" />
    <rect
      class="orange"
      width="100"
      height="250"
      x="230"
      y="750"
      fill="url(#g)" />
    <text y="460" x="10">entry</text>
    <text y="520" x="360">100%</text>
    <text y="690" x="-50">100%</text>
    <line x1="130" x2="350" y1="500" y2="500" />
    <line x1="-10" x2="120" y1="700" y2="700" />
    <line x1="0" x2="350" y1="750" y2="750" />
    <text y="760" x="360">0%</text>
  </svg>

  <svg viewBox="-60 -1 530 1252" xmlns="http://www.w3.org/2000/svg">
    <rect class="small end" width="100" height="50" x="10" y="700" />
    <rect class="medium end" width="100" height="250" x="120" y="500" />
    <rect class="large end" width="100" height="500" x="230" y="250" />
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small start" width="100" height="50" x="10" y="750" />
    <rect class="medium start" width="100" height="250" x="120" y="750" />
    <rect class="large start" width="100" height="500" x="230" y="750" />
    <text y="200" x="0">entry-crossing</text>
    <text y="260" x="330">100%</text>
    <text y="490" x="80">100%</text>
    <text y="690" x="-50">100%</text>
    <line x1="225" x2="345" y1="250" y2="250" />
    <line x1="0" x2="230" y1="500" y2="500" />
    <line x1="-10" x2="120" y1="700" y2="700" />
    <line x1="0" x2="350" y1="750" y2="750" />
    <text y="760" x="360">0%</text>
  </svg>
</div>
```

```css
:root body div {
  margin: -70px 0 -100px;
}
```

#### Exit-crossing

The `exit-crossing` value represents the range during which the animated element crosses the start edge of the scrollport, with `0%` progress occurring when the element's start edge aligns with the start edge the scrollport and `100%` progress occurring when the element's end edge reaches the start edge of the scrollport.

With `exit-crossing`, the animation starts as soon as the subject covers the scrollport (with `exit`, the animation doesn't start until the end edge of the subject enters into view). In both cases, the animation continues until the subject fully exits the scrollport's start edge.

```css
#A {
  animation-range: exit;
}
#B {
  animation-range: exit-crossing;
}
```

```css
body::before {
  content: "exit vs. exit-crossing";
}
#A::after {
  content: " ( exit )";
}
#B::after {
  content: " ( exit-crossing ) ";
}
```

The `exit-crossing` produces the same results as `exit` when the element is equal to or smaller than the scrollport, but when the element is larger than the scrollport, the `0%` occurs earlier, occurring as soon as the element's start edge reaches the scrollport's start edge, rather than waiting until the element's end edge enters the scrollport.

Like with `entry-crossing`, the animation attachment range is the size of the subject, and not clamped to the size of the scrollport.

```html
<div>
  <svg viewBox="-60 -1 530 1052" xmlns="http://www.w3.org/2000/svg">
    <rect class="small end" width="100" height="50" x="10" y="450" />
    <rect class="medium end" width="100" height="250" x="120" y="250" />
    <rect class="large end" width="100" height="500" x="230" y="0" />
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small start" width="100" height="50" x="10" y="501" />
    <rect class="medium start" width="100" height="250" x="120" y="500" />
    <rect class="large start" width="100" height="500" x="230" y="250" />
    <rect width="100" height="250" x="230" y="250" fill="url(#g)" />
    <text y="800" x="-10">exit</text>
    <text y="520" x="370">100%</text>
    <line x1="-5" x2="365" y1="500" y2="500" />
    <line x1="-10" x2="140" y1="550" y2="550" />
    <line x1="110" x2="360" y1="750" y2="750" />
    <text y="760" x="370">0%</text>
    <text y="560" x="-60">0%</text>
  </svg>
  <svg viewBox="-60 -1 530 1052" xmlns="http://www.w3.org/2000/svg">
    <rect class="small end" width="100" height="50" x="10" y="450" />
    <rect class="medium end" width="100" height="250" x="120" y="250" />
    <rect class="large end" width="100" height="500" x="230" y="0" />
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small start" width="100" height="50" x="10" y="501" />
    <rect class="medium start" width="100" height="250" x="120" y="500" />
    <rect class="large start" width="100" height="500" x="230" y="500" />
    <text y="800" x="-10">exit-crossing</text>
    <text y="520" x="370">100%</text>
    <line x1="-5" x2="365" y1="500" y2="500" />
    <line x1="-10" x2="140" y1="550" y2="550" />
    <line x1="110" x2="360" y1="750" y2="750" />
    <text y="760" x="370">0%</text>
    <text y="560" x="-60">0%</text>
  </svg>
</div>
```

```css
:root body div {
  margin-bottom: -300px;
}
```

```html
<svg id="gradient">
  <defs>
    <linearGradient
      id="g"
      x1="0"
      y1="0"
      x2="20"
      y2="20"
      spreadMethod="repeat"
      gradientUnits="userSpaceOnUse">
      <stop offset="50%" stop-color="red" />
      <stop offset="50%" stop-color="yellow" />
    </linearGradient>
  </defs>
</svg>
```

```css
body::before {
  display: block;
  text-align: center;
  font-family: sans-serif;
  font-size: 1.5rem;
}
div {
  display: flex;
  gap: 20px;
}
svg {
  width: 260px;
}
#gradient {
  height: 1px;
  position: absolute;
  width: 1px;
}
rect {
  stroke: black;
  stroke-width: 3;
}
.start {
  fill: yellow;
}
.end {
  fill: red;
}
.container {
  fill: none;
}
text {
  font: 40px monospace;
  fill: black;
}
line {
  stroke: black;
  stroke-width: 8;
  stroke-dasharray: 10;
}
```

### Other progress values

In this guide, we have mentioned `0%` and `100%` progress points. The animation-range values aren't limited to these to progress points. You can inset any of the named animation ranges by a set amount or a percentage of the full animation attachment range. This is discussed in the insets guide.

## See also

- `timeline-range-name` data type
- Keyframe selectors
- Scroll-driven animation timelines
- Understanding timeline insets
- Scroll-driven animation module
- CSS animations module
- Web Animations API
