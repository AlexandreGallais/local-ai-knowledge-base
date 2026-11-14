---
title: "CSS scroll-driven animations"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll-driven_animations/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS scroll-driven animations

The **CSS scroll-driven animations** module provides functionality that builds on the CSS animations module and Web Animations API. It allows you to animate property values along a scroll-based timeline rather than the default time-based document timeline. This means that you can animate an element by scrolling the element, its scroll container, or its root element, rather than just by the passing of time.

## Scroll-driven animations in action

You can define the scroller that controls the animation either by naming the animation or with the `scroll()` or `view()` functions.

```html
<main>
  <div></div>
</main>
```

```css
main {
  scroll-timeline: --main-timeline;
}

div {
  animation: background-animation linear;
  animation-timeline: scroll(nearest inline);
}

div::after {
  animation: shape-animation linear;
  animation-timeline: --main-timeline;
}
```

```css
@layer animations {
  @keyframes background-animation {
    0% {
      background-color: palegoldenrod;
    }
    100% {
      background-color: magenta;
    }
  }
  @keyframes shape-animation {
    0% {
      left: 0;
      top: 0;
      background-color: black;
    }
    50% {
      top: calc(100% - var(--elSize));
      left: calc(50% - var(--elSize));
      background-color: red;
    }
    100% {
      left: calc(100vw - var(--elSize));
      top: 0;
      rotate: 1800deg;
      background-color: white;
    }
  }
}

@layer page-setup {
  :root {
    --elSize: 50px;
  }
  main {
    height: 90vh;
    overflow: scroll;
    border: 1px solid;
    margin: 5vh auto;
  }
  div {
    height: 400vh;
    width: 400vw;
  }
  div::after {
    content: "";
    border: 1px solid red;
    height: var(--elSize);
    width: var(--elSize);
    position: absolute;
    border-radius: 20px;
    corner-shape: superellipse(-4);
  }
}

@layer no-support {
  @supports not (scroll-timeline: --main-timeline) {
    body::before {
      content: "Your browser doesn't support scroll-driven animations.";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

Scroll the element in the inline direction to see its background color change. Scroll it vertically to see the generated content move, spin, and change colors.

## Reference

### Properties

- `animation-range` shorthand
  - `animation-range-end`
  - `animation-range-start`
- `scroll-timeline` shorthand
  - `scroll-timeline-axis`
  - `scroll-timeline-name`
- `timeline-scope`
- `view-timeline` shorthand
  - `view-timeline-axis`
  - `view-timeline-inset`
  - `view-timeline-name`

### Data types and values

- `axis`
- `timeline-range-name`

### Functions

- `scroll()`
- `view()`

### Interfaces

- `ScrollTimeline`
- `ViewTimeline`

## Guides

- Scroll-driven animation timelines
    Scroll-driven animation timelines and creating scroll-driven animations.
- Timeline range names
    The `timeline-range-name` data type: Understanding the various timeline range names.
- Using CSS scroll-triggered animations
    Creating scroll-triggered animations.
- Insetting view progress timelines
    Insetting the animation attachment ranges of scroll-driven animations.

## Related concepts

- CSS animations module
  - `animation-timeline`
  - `@keyframes` at-rule
  - `<keyframe-selector>`
- CSS animation triggers module
  - `animation-trigger`
  - `timeline-trigger` shorthand
  - `timeline-trigger-activation-range` shorthand
    - `timeline-trigger-activation-range-end`
    - `timeline-trigger-activation-range-start`
  - `timeline-trigger-active-range` shorthand
    - `timeline-trigger-active-range-end`
    - `timeline-trigger-active-range-start`
  - `timeline-trigger-name`
  - `timeline-trigger-source`
  - `trigger-scope`
- CSS overflow module
  - Scroll container
  - Scrollport
- Web Animations API
  - `Element.animate()`
  - `Animation`
  - `AnimationTimeline`
  - `DocumentTimeline`
  - `KeyframeEffect`

## See also

- Animate elements on scroll with scroll-driven animations via developer.chrome.com (2023)
