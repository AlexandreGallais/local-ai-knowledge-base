---
title: "Scroll-driven animation timelines (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll-driven_animations/timelines/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Scroll-driven animation timelines (part 2 of 2)

## View progress timelines

You can also progress an animation based on the change in visibility of an element inside a scroller — this is done via _view progress timelines_. Instead of tracking the scroll offset of a scroll container, view progress timelines track the relative position of an element, called the _subject_, within a scrollport. The progression of an animation's keyframes is based on the _visibility_ of the subject inside the scroller. Unlike scroll progress timelines, with view progress timelines, you can't specify the scroller — the subject's visibility is always tracked within its nearest ancestor scroller.

A view progress timeline animation only occurs when the element is visible within its scrollport. Timeline progress starts at `0%` when the tracked subject starts intersecting the scrollport at the block or inline end edge. The `100%` occurs when the subject exits the scrollport at the block or inline start edge.

Because the `100%` is generally reached when the element leaves the viewport, you likely want to set the final effect of your animation in a keyframe block that occurs well before the end of the animation. You can set your completed effect within the `20%`, `50%`, or `80%` keyframe block rather than using the `to` or `100%` keyframe to ensure the element finishes animating while still in view.

With view progress timelines, you can adjust the view progress visibility range.
Use `view-timeline-inset`, part of the `view-timeline` shorthand, to adjust when the subject is considered to be in view. The default value is `auto`. The effect of any non-`auto` inset value is as if you moved the edges of the scroll port: a positive inset value creates an inward adjustment, and a negative value creates an outward adjustment.

Similar to scroll progress timelines, the view progress timeline can be named or anonymous.

### Named view progress timeline

A _named view progress timeline_ is one where the subject is explicitly named using the `view-timeline-name` property, a component of the `view-timeline` shorthand. The `<dashed-ident>` name is then linked to the element to animate by specifying it as the value of that element's `animation-timeline` property.

With named view progress timelines, the element to animate does not have to be the same as the subject. In other words, the element controlling the timeline doesn't have to be the same as the element being animated. This means you can animate one element based on another element's movement within its scrollable container.

Here we use the `view-timeline-name` property to name an element, identifying the element itself as the source of a view progress timeline. We then set that name as the value of the `animation-timeline` property.

```css
.item {
  animation: action 1ms linear;

  view-timeline-name: --a-name;
  animation-timeline: --a-name;
}
```

We applied the animation **before** the animation timeline, as the `animation` resets the `animation-timeline` to `auto`.

The animation is slightly different from the previous examples in that the spinning effect starts at `20%` and ends at `80%` of the way through the animation; this means the element will not be actively spinning when it first comes into view and will stop spinning before it is completely out of view.

```css
@keyframes action {
  0%,
  20% {
    rotate: 45deg;
  }
  80%,
  100% {
    rotate: 720deg;
  }
}
```

```css
.scroller {
  width: 400px;
  height: 200px;
  line-height: 2;
  overflow: scroll;
  border: 1px solid;
  background-color: palegoldenrod;
}
.item {
  --size: 50px;
  height: var(--size);
  width: var(--size);
  background-color: magenta;
  border: 1px solid;
  left: calc(50% - (var(--size) / 2));
  top: calc(50% - (var(--size) / 2));
}
```

```html
<main class="scroller">
  <p>Scroll down to view the animation</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <div class="item"></div>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>&nbsp;</p>
  <p>Scroll up to view the animation</p>
</main>
```

Scroll the element into view. Note that the element animates through the `@keyframes` animation as it moves through the visible area of its ancestor scroller.

### Anonymous view progress timeline: the `view()` function

Alternatively, a `view()` function can be set as the value of the `animation-timeline` property to specify that an element's animation timeline is an _anonymous view progress timeline_. This causes the element to be animated based on its position inside its nearest parent scroller.

The `view()` function creates a view timeline. You attach the timeline to the element you want to animate using the `animation-timeline` property. The function creates a view timeline for each element matched by the selector.

In this example, we again define the `animation` before the `animation-timeline`, so the timeline is not reset. We then include an argument-less `view()` function. We don't specify a scroller, as, by definition, the subject's visibility is tracked by its nearest ancestor scroller.

```css
.item {
  animation: action 1ms linear;
  animation-timeline: view();
}
```

### Parameters of the `view()` function

The `view()` function takes up to three optional values as arguments:

- Zero or one `<axis>` parameters. If set, this specifies the scroll axis along which the animation progresses.
- Either the keyword `auto` or zero, one, or two `length-percentage` inset values. If set, these values specify offsets for the scrollport start and/or end.

Declaring `view()` is equivalent to `view(block auto)`, which defines `block` as the axis of the parent element that supplies the timeline and the `scroll-padding`, which generally defaults to `0`, as the insets within the visible area at which the animation starts and ends.

The function sets the values of the `view-timeline-axis` and `view-timeline-inset` properties.

The `view-timeline-inset` arguments specify insets (if positive) or outsets (if negative) that adjust the start and end of the scrollport. They are used to determine the scroll positions at which the element is considered "in view", which determines the length of the animation timeline. In other words, instead of starting at the start edge and ending at the end edge of the scrollport, the animation occurs at the start and end of the inset-adjusted view.

Unlike the scroll timeline's `scroll()` function, there is no `<scroller>` argument in the `view()` function, as the view timeline always tracks the subject within its nearest ancestor scroll container.

In this example, as we are using inset values, we can use the `from` and `to` keyframe selectors.

```css
@keyframes action {
  from {
    rotate: 45deg;
  }
  to {
    rotate: 720deg;
  }
}

.item {
  animation: action 1ms linear;
  animation-timeline: view(block 20% 20%);
}
```

## Accessibility concerns

As with all animations and transitions, always take any user's `prefers-reduced-motion` preference into account.

### Removing an animation's timeline

Setting `animation-timeline: none` disassociates the element from all animation timelines, including the default time-based document timeline, meaning the element will not animate. While some animations may be necessary, you can remove animations based on the user's `prefers-reduced-motion` setting with:

```css
@media (prefers-reduced-motion: reduce) {
  .optionalAnimations {
    animation-timeline: none;
  }
}
```

Because the `animation` shorthand sets the `animation-timeline` to `auto`, use a selector with enough specificity to ensure your `animation-timeline` isn't overridden by your `animation` shorthand declarations.

## See also

- Understanding timeline range names
- Scroll-driven animations module
- CSS animations module
- Web Animations API
