---
title: "Understanding timeline insets (part 1 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll-driven_animations/timeline_insets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding timeline insets

By default, view progress timelines track elements across the entire animation attachment range. The `0%` progress point is at the start of the range, while the `100%` progress point is at the end. The animation attachment range can be changed by setting a timeline range name, and the location of the `0%` and `100%` progress points along the range can be adjusted by setting length or percentage-based inset values.

This guide explains how to limit the animation timeline to a specific portion of the animation timeline range using length or percentage inset values.

## Animation timelines: a primer

CSS animations are created by defining named `@keyframes` animations, which specify an animation's behavior, and then attaching the keyframe animation to an element using the animation's name.

The element's animation timeline, defined by the `animation-timeline` property, determines how and when the element progresses through those keyframes. By default, the timeline is time-based, using the document's default time-based `DocumentTimeline`.

The CSS scroll-driven animation module defines scroll progress and view progress timelines, which are methods for animating property values along a scroll-based timeline rather than the default time-based document timeline. In this article, we'll only discuss view progress timelines, as scroll progress timelines are not relevant to timeline insets.

### View progress timelines

With view progress timelines, the animation's timeline, or progress, is driven by element visibility instead of the passage of time, with keyframe progression tied to the subject element position and visibility within the scroll container. The animation advances and reverses as the element advances or reverses through the scrollport. The animation only occurs when at least part of the element is visible within its scrollport, pausing when scrolling pauses.

```css
.animated_element {
  animation-name: nameOfAnimation;
  animation-timeline: view();
}
```

Setting an `animation-name` applies the animation to the selected element.

> **Note:**
> The `animation-timeline` property should always come after any `animation` shorthand declarations. While the shorthand property can't be used to set the `animation-timeline` property, it does reset the timeline to the default time-based document timeline.

> **Note:**
> In all the examples, the scroll container is `250px` tall and we are using the default values for `animation-iteration-count` (`1`), `animation-delay` (`0s`), and `animation-direction` (`normal`). We set the `animation-timing-function` to `step-end` and the `animation-fill-mode` is to `forward` to make the it more apparent when the animation iteration has not yet started, when it is active, and when it is complete. See the Using CSS animations guide to learn more.

As you scroll up, the animation progresses. As you scroll down, the animation reverses.

In this example, whenever any part of the subject element is visible in the scrollport, the animation occurs. By default, view progress animations begin just as the top edge of the subject element aligns with the bottom edge of the scroll container and end, reaching `100%` progress, when the end edge aligns with the start edge of the container, no matter the size of the subject element. By default, the animation is applied when any part of the subject is visible within the scrollport.

### Animation attachment ranges

In a view progress timeline, when no animation range properties are defined, the `<timeline-range-name>` is `normal`, which defaults to `cover`. The animation is applied whenever any portion of the subject element is visible, meaning the default **animation attachment range** is the sum of the height of the scroll container and the height of the subject element, with that extra height being at the scroll end edge. In our example, as the scroll container is `250px` tall, and the subject is `50px`, `250px`, or `500px` tall, with the vertical animation attachment range being `300px`, `500px`, or `750px` respectively.

The `0%` progression occurs when the subject element's start edge intersects the scrollport at the end edge, reaching `100%` progress when the subject's end edge exits via the scrollport's start edge. These are the subject and scrollport's top and bottom edges when scrolling vertically, and the left and right or right and left edges when scrolling horizontally, depending on the writing mode.

The following diagram illustrates the position of the subject at the `0%` and `100%` progress points for the three subject sizes:

```html
<div>
  <svg viewBox="-1 -1 462 1252" xmlns="http://www.w3.org/2000/svg">
    <title>Default view progress timeline</title>
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small end" width="100" height="50" x="10" y="450" />
    <rect class="medium end" width="100" height="250" x="125" y="250" />
    <rect class="large end" width="100" height="500" x="240" y="0" />
    <rect class="small start" width="100" height="50" x="10" y="750" />
    <rect class="medium start" width="100" height="250" x="125" y="750" />
    <rect class="large start" width="100" height="500" x="240" y="750" />
    <text y="520" x="360">100%</text>
    <line x1="0" x2="350" y1="500" y2="500" />
    <line x1="0" x2="350" y1="750" y2="750" />
    <text y="760" x="360">0%</text>
  </svg>
</div>
```

The yellow subject elements represents the position of the element when the `from` keyframe is applied, which is the animation range's `0%` progress mark. The red represents the location of the animated element relative to the scrollport when the `to` keyframe is applied, which is the end of the animation, or the `100%` progress mark. The gray represents the scrollport.

By default, the element animates while it is "in view", but this default definition of "in view" may not fit your needs. Fortunately, we can control which edges define the edges of the animation attachment range and then offset the start and end of that range with the animation range properties.

### Animation range properties

The `animation-range` properties enable specifying a named timeline range, such as `contain` or `exit-crossing`, which changes the range used from the default `cover` range. You can also include a `length-percentage` value, which insets the attachment range from the start of the range. Percentages are relative to the named or default timeline range.

Named timeline ranges define the portions of a `ViewTimeline` that define an animation's range, specifying the start and end of the animations's attachment range.

The `animation-range` property is a shorthand property, defining the `animation-range-start` and `animation-range-end` properties. The `animation-range-start` defines the position of the subject element when the animation starts. The `animation-range-end` defines the position of the subject element when the animation ends.

See the timeline range names guide to learn about the different named timeline ranges. This guide focuses on how the `length-percentage` inset values work.
