---
title: "Scroll-driven animation timelines (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll-driven_animations/timelines/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Scroll-driven animation timelines

A common UI pattern involves elements that animate as the user scrolls vertically or horizontally across a page. These _scroll-driven animations_ occur in direct response to page scrolling or an overflowing scroll container within a page.

The properties defined in the CSS scroll-driven animations module expand upon CSS animations by enabling animating property values defined in `@keyframes` animations in response to user interaction.

This guide provides an overview of using CSS to create scroll-driven animation timelines and animations.

## What is scroll-driven animation?

The CSS scroll-driven animations module defines properties that enable CSS keyframe animations to be linked to scrolling.

### Timeline progression

Animations can be set to progress along a _scroll-based timeline_ instead of the default time-based document timeline, without needing JavaScript. CSS enables us to define which animation timeline to use, including animating elements by scrolling a scrollable element rather than by the passing of time.

### Performance benefits

CSS scroll-driven animations are performant. JavaScript scroll-driven animations require `scroll` event listeners and `IntersectionObserver` objects on the main thread to track elements across the scrollport. Any time you rely on the main thread to render effects with JavaScript, you run the risk of blocking the main thread, which can lead to an unresponsive page and a bad user experience, or jank.

## Foundations

Scroll-driven animations build upon CSS animations and the Web Animations API. Before creating scroll-driven animations, you must have an understanding of CSS `@keyframes` animations. See the using CSS animations guide to learn more.

In CSS, animations are created by attaching keyframe animations to an element using the `animation-name` property (or `animation` shorthand). By default, animations run on the default document timeline, moving from the `from` keyframe to the `to` keyframe as time passes by, with the animation lasting as long as the time defined by the `animation-duration` property value. When set to run on the default document timeline, animations play through to completion unless prevented from doing so, for example, by having the `animation-play-state` set to `paused` or by removing the `animation-name` from the element.

Scroll-driven animations are CSS animations that are not run on the default DocumentTimeline. Instead, they run on a scroll-progress or view-progress timeline, which is driven by the scrolling of an element's contents. There's a direct link between the user's scrolling action and the animation's progress along the `@keyframe` keyframes. As the user scrolls up, down, left, or right, the animation moves forward or backward through the keyframe progression. When scrolling is paused, the animation pauses, as if `animation-play-state` were set to `pause`.

## Animation timelines

The `animation-timeline` property, defined in the CSS animations module, is used to set the timeline used for the animation.

The CSS scroll-driven animations module defines features for setting the `animation-timeline` as a scroll-progress or view-progress timeline. You can explicitly name an element as a timeline controller using the `scroll-timeline-*` and `view-timeline-*` properties, then set that name as the `animation-timeline` of a descendant element. You can also define _anonymous scroll progress timelines_ and _anonymous view progress timelines_ using the `scroll()` and `view()` functions.

Alternatively, the `animation-timeline` property can be used to explicitly state that the default document timeline be used or to specify that the animation doesn't have a timeline, and therefore shouldn't occur at all.

### Regular CSS animations: default document timeline

Setting `animation-timeline` explicitly to `auto`, or omitting the property and allowing it to default to `auto`, sets the timeline to be the default document timeline. When set to this default value, the animation's progress is determined by the `animation-duration`, the `animation-delay`, and how much time has passed since the animation was associated with the element via the `animation-name` property. The time-based document timeline is the timeline traditionally associated with CSS animations.

```css
:checked ~ .container > .item {
  animation-name: action;
  animation-duration: 3s;
  animation-delay: 500ms;
  animation-timeline: auto;
}
```

We create a rotation keyframe animation called `action`:

```css
@keyframes action {
  from {
    rotate: 45deg;
  }
  to {
    rotate: 765deg;
  }
}
```

```html
<input type="checkbox" id="i" />
<label for="i">
  Check to apply the animation. Uncheck to remove the animation
</label>
<div class="container">
  <span class="item"></span>
</div>
```

```css
div {
  width: 400px;
  height: 100px;
  border: 1px solid;
  background-color: palegoldenrod;
  position: relative;
}
span {
  --size: 50px;
  height: var(--size);
  width: var(--size);
  background-color: magenta;
  border: 1px solid;
  position: absolute;
  left: calc(50% - (var(--size) / 2));
  top: calc(50% - (var(--size) / 2));
}
```

When the checkbox is checked, the `action` animation is applied to the element. When unchecked, the animation is not applied to the ``.

Try checking the checkbox. Nothing will happen during the half-second animation delay. Then, once the animation starts, the box will jump to a 45-degree rotation, and then it will take 3 seconds to rotate an additional 720 degrees, or two additional full rotations. After a total of three and a half seconds, the animation concludes, and the `` will return to its default non-rotated state.

> **Note:**
> The `animation-timeline` is reset to the default `auto` value by the `animation` shorthand property, but cannot be set using the shorthand. Therefore, when creating scroll-driven animations, always declare the `animation-timeline` after any `animation` shorthand declarations to achieve the desired effect.

## Scroll progress timelines

With _scroll progress timeline_, the timeline progresses based on the scrolling of the scrollable element (_scroller_) from top to bottom (or left to right) and back again. By default, the position in the scroll range is converted into a percentage of progress — `0%` at the start and `100%` at the end.

To create a scroll progress timeline, the `animation-timeline` value must reference the scroller, which can be named or anonymous.

### Named scroll progress timelines

A _named scroll progress timeline_ is one where the scroller is explicitly named using the `scroll-timeline-name` property (or the `scroll-timeline` shorthand). The name is a `dashed-ident`. The scroller is linked to the element to be animated by specifying its `scroll-timeline-name` as the value of that element's `animation-timeline` property.

Our HTML includes three elements: the `item`, which we will animate; its `container`, which we will scroll; and the scroller. The `container` needs to be large enough to overflow its `scroller` parent: If there is no scrolling, there will be no scroll timeline.

```html
<main class="scroller">
  <div class="container">
    <span class="item"></span>
  </div>
</main>
```

We provide some basic styles. The important ones include setting a height on the container that is taller than the scroller, and then setting the overflow to allow scrolling:

```css
.scroller {
  width: 400px;
  height: 100px;
  overflow: scroll;
}
.container {
  height: 200px;
}
```

Setting an `animation-timeline` on the animated element that matches the `scroll-timeline-name` of an ancestor element is what creates the named scroll progress timeline. We also have to include an animation, which we do by setting the value of the `animation-name` component of the `animation` shorthand to the `custom-ident` name of our keyframe animation:

```css
.scroller {
  scroll-timeline-name: --rotate;
}
.item {
  animation: action 1ms linear;
  animation-timeline: --rotate;
}
```

```css
main {
  border: 1px solid;
  background-color: palegoldenrod;
}
div {
  position: relative;
}
span {
  --size: 50px;
  height: var(--size);
  width: var(--size);
  background-color: magenta;
  border: 1px solid;
  position: absolute;
  left: calc(50% - (var(--size) / 2));
  top: calc(50% - (var(--size) / 2));
}
```

In this case, we don't have a checkbox, as the `action` animation progression is controlled by the scrolling of the overflowing scroller, which, unlike time, does not expire.

Before any scrolling occurs, the container's position is at the top of the scroller, and the animation is at the 0% keyframe. Try scrolling down. As you scroll, the animation progresses through the timeline, rotating an additional 720 degrees. When you can no longer scroll, the animation's progression is at the 100%, or `to`, keyframe. The animated item doesn't return to its default rotation unless the scroller is scrolled back up to the top.

#### Animation duration

You may have noticed that the `animation-duration` component of the `animation` shorthand was set to `1ms`. When creating CSS scroll-driven animations, specifying an `animation-duration` value does not affect the duration of the animation, and shouldn't be necessary. However, durations can affect non-linear view progress animation timelines, and Firefox requires a non-zero `animation-duration` to apply an animation to an element. For these reasons, it is common practice to set `animation-duration` to `1ms`.

Setting `animation-duration: 1ms` ensures that the animation works in Firefox, the animation effect is consistent across all browsers, and the animation is hidden if a browser doesn't support view progress animation timelines. If the browser supports keyframe animations, the animation will not be visible to the user. However, the animation still happens, and animation events are fired.

### Anonymous scroll progress timelines

You don't have to name your scroll progress timeline. Instead, you can associate an _anonymous scroll progress timeline_ with the animation. In this case, the `animation-timeline` of the element to animate is set to a `scroll()` function. The function selects the scroller that provides the scroll progress timeline and the scroll axis to use based on the optional arguments you pass to it. One parameter is a `<scroller>` keyword defining the relationship of the scroller element to the current element (`nearest`, `root`, or `self`). The other is the scrollbar `<axis>` value (`block`, `inline`, `y`, or `x`).

This example uses all the same CSS as the previous example, except for the `animation-timeline`, which we set to a `scroll()` function. We are also overriding the size of the container to change the direction of the scroll:

```css
.item {
  animation: action 1ms linear;
  animation-timeline: scroll(nearest inline);
}
.container {
  inline-size: 800px;
  block-size: 100%;
}
```

We set an `inline-size` on the container so that it overflows in the inline direction, and set the `block-size` to `100%` so it no longer overflows in the block direction. Try scrolling in the inline direction.
