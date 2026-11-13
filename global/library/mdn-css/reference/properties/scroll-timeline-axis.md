---
title: "`scroll-timeline-axis` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/scroll-timeline-axis/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scroll-timeline-axis` CSS property

The **`scroll-timeline-axis`** CSS property is used to specify the scrollbar direction that will be used to provide the timeline for a scroll driven animation, which is progressed through by scrolling a scrollable element (_scroller_).

## Syntax

```css
/* Logical property values */
scroll-timeline-axis: block;
scroll-timeline-axis: inline;

/* Physical property values */
scroll-timeline-axis: y;
scroll-timeline-axis: x;

/* Global values */
scroll-timeline-axis: inherit;
scroll-timeline-axis: initial;
scroll-timeline-axis: revert;
scroll-timeline-axis: revert-layer;
scroll-timeline-axis: unset;
```

### Values

- `<axis>`
    An `axis` keyword value describing the direction, or axis, of the scrollport that controls the scroll-driven animation. The default value is `block`.

## Description

The `scroll-timeline-axis` property specifies which scrollbar will be used to provide the timeline for a scroll progress timeline animation. The value is the `<axis>` of the scrollbar. The `scroll-timeline` property is set on the scroller that will provide the timeline.

If the scroller element does not overflow its container in the axis dimension or if the overflow is hidden or clipped, no scroll progress timeline will be created.

The `scroll-timeline-axis` and `scroll-timeline-name` properties can also be set using the `scroll-timeline` shorthand property.

## Examples

### Defining the axis of the scroll progress timeline

In this example, a scroll progress timeline named `--my-scroller` is defined using the `scroll-timeline-name` property on the `:root` element (`<html>`). This timeline is then applied to the animation on the element with the `animation` class using `animation-timeline: --my-scroller`.

To demonstrate the effect of `scroll-timeline-axis`, a horizontal (non-default) scrollbar is used in this example to drive the animation.

#### HTML

The HTML for the example is shown below.

```html
<body>
  <div class="content"></div>
  <div class="box animation"></div>
</body>
```

#### CSS

The CSS for the container sets the `:root` as the source of a scroll progress timeline named `--my-scroller` using the `scroll-timeline-name` property.
The scroll axis is set using `scroll-timeline-axis: x;` which causes the _horizontal scrollbar_ position to determine the animation timeline. We also include `scroll-timeline-axis: horizontal;` for browsers that support the non-standard legacy `horizontal` and `vertical` values and not `x` and `y`.

The width of the `.content` element is set to a large value to make it overflow the `:root` element.

The `.animation` element has the animation applied to it using the `animation` shorthand, and the scroll timeline set using the `animation-timeline`.

```css
:root {
  scroll-timeline-name: --my-scroller;

  scroll-timeline-axis: x;
  scroll-timeline-axis: horizontal;
}

body {
  margin: 0;
  overflow-y: hidden;
}

.content {
  height: 100vh;
  width: 2000px;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: rebeccapurple;
  position: fixed;
  top: 25px;
  left: 25px;
}

.animation {
  animation: rotate-appear 1ms linear;
  animation-timeline: --my-scroller;
}

@keyframes rotate-appear {
  from {
    rotate: 0deg;
    top: 0%;
  }

  to {
    rotate: 720deg;
    top: 100%;
  }
}
```

```css
@layer no-support {
  @supports not (scroll-timeline-axis: block) {
    body::before {
      content: "Your browser doesn't support the `scroll-timeline-axis` property.";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

Scroll the horizontal bar at the bottom to see the square animate as you scroll.

## See also

- `animation-timeline`
- `scroll-timeline`
- `scroll-timeline-name`
- Scroll-driven animation timelines
- CSS scroll-driven animations module
