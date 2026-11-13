---
title: "pointer-events"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/pointer-events/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# pointer-events

The **`pointer-events`** attribute is a presentation attribute that allows defining whether or when an element may be the target of a mouse event.

> **Note:**
> As a presentation attribute, `pointer-events` also has a CSS property counterpart: `pointer-events`. When both are specified, the CSS property takes priority.

You can use this attribute with the following SVG elements:

- ``
- `<circle>`
- `<clipPath>`
- `<defs>`
- `<ellipse>`
- `<foreignObject>`
- ``
- `<image>`
- `<line>`
- `<marker>`
- `<mask>`
- ``
- `<pattern>`
- `<polygon>`
- `<polyline>`
- `<rect>`
- ``
- `<switch>`
- `<symbol>`
- `<text>`
- `<textPath>`
- `<tspan>`
- `<use>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 20 10" xmlns="http://www.w3.org/2000/svg">
  <!--
  The circle will always intercept the mouse event.
  To change the color of the rect underneath you have
  to click outside the circle
  -->
  <rect x="0" y="0" height="10" width="10" fill="black" />
  <circle cx="5" cy="5" r="4" fill="white" pointer-events="visiblePainted" />

  <!--
  The circle below will never catch a mouse event.
  The rect underneath will change color whether you
  are clicking on the circle or the rect itself
  -->
  <rect x="10" y="0" height="10" width="10" fill="black" />
  <circle cx="15" cy="5" r="4" fill="white" pointer-events="none" />
</svg>
```

```js
window.addEventListener("mouseup", (e) => {
  // Let's pick a random color between #000000 and #FFFFFF
  const color = Math.round(Math.random() * 0xffffff);

  // Let's format the color to fit CSS requirements
  const fill = `#${color.toString(16).padStart(6, "0")}`;

  // Let's apply our color in the
  // element we actually clicked on
  e.target.style.fill = fill;
});
```

## Usage notes

       | Value
       |
        `bounding-box` | `visiblePainted` |
        `visibleFill` | `visibleStroke` |
        `visible` | `painted` | `fill` |
        `stroke` | `all` | `none`

       | Default value
       | `visiblePainted`

       | Animatable
       | Yes

_For a detailed explanation of each possible value, have a look at the CSS `pointer-events` documentation._

## See also

- CSS `pointer-events` property
