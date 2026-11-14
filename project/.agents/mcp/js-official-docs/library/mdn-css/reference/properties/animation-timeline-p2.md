---
title: "`animation-timeline` CSS property (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/animation-timeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `animation-timeline` CSS property (part 2 of 2)

## Examples

### Basic usage

This example demonstrates basic usage of the `animation-timeline` property, along with the `none`, `auto`, and default (`auto`) values.

#### HTML

We have an `` with three `` children. Each `` has a unique `id` and a `` child.

```html
<article>
  <section id="none">
    <div></div>
  </section>
  <section id="auto">
    <div></div>
  </section>
  <section id="default">
    <div></div>
  </section>
</article>
```

#### CSS

We use flexible box layout to set the three sections side-by-side. We use generated content to display the `id`. We style all elements the same, applying the `rotate` `@keyframes` animation that rotates the element by 1 full turn. Using the `animation` shorthand, we declare infinite, 2-second, linearly progressing iterations of the `rotate` animation, alternating the direction of each animation.

```css
article {
  display: flex;
  gap: 10px;
  text-align: center;
}
section {
  background-color: beige;
  padding: 20px;
}
section::after {
  content: attr(id);
  display: block;
}
div {
  height: 100px;
  width: 100px;
  background-color: magenta;
  animation: rotate 2s infinite alternate linear;
}
@keyframes rotate {
  to {
    rotate: 1turn;
  }
}
```

The only difference is the `animation-timeline` declaration (or lack thereof in the case of `default`) for each ``.

```css
#none div {
  animation-timeline: none;
}
#auto div {
  animation-timeline: auto;
}
```

```css
@layer no-support {
  @supports not (animation-timeline: none) {
    body::before {
      content: "Your browser doesn't support the `animation-timeline` property";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

Because the `animation-timeline` property is included in the `animation` shorthand as a reset-only value, the `animation-timeline` must come after the `animation` shorthand, or be applied with greater specificity than the `animation` shorthand, to be applied.

#### Results

Note that declaring a value of `auto` has the same effect as allowing the `animation-timeline` to default to that value, and that `none` removes all timelines from the element, so no animation in the `none` case.

### Setting a named scroll progress timeline

In this example, the animation timeline is set to a horizontal scroll progress timeline.

#### HTML

Our container includes three stretcher elements which will be wide enough to ensure our container is a scroll container. The middle one contains a shape that we will animate.

```html
<div id="container">
  <div class="stretcher"></div>
  <div class="stretcher">
    <div id="shape"></div>
  </div>
  <div class="stretcher"></div>
</div>
```

#### CSS

We define the container as a flex container, setting a `width` on the container that is half the width of it's combined flex children. Adding an `overflow-x` value of `scroll` sets it to have a horizontal scrollbar.

Our scroll progress timeline, defined using the `scroll-timeline-name` and `scroll-timeline-axis` properties, is named `--square-timeline`. This timeline is applied to our `#shape` element using `animation-timeline: --square-timeline`.

```css
#container {
  display: flex;
  width: 300px;
  border: 1px solid;

  overflow-x: scroll;
  scroll-timeline-axis: inline;
  scroll-timeline-name: --square-timeline;
}

.stretcher {
  flex: 0 0 200px;
}
```

The CSS below defines a square that rotates in alternate directions according to the timeline provided by the `animation-timeline` property, which is set to the `--square-timeline` timeline named above. The animation is set two occur twice, in alternating directions, as it passes through the viewport. We added notched corners to make the animation effect more apparent.

```css
#shape {
  background-color: deeppink;
  width: 100px;
  height: 100px;
  border-radius: 25px;
  corner-shape: notch;

  animation: rotateAnimation 1ms linear 2 alternate;
  animation-timeline: --square-timeline;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

```css
@layer no-support {
  @supports not (animation-timeline: --square-timeline) {
    body::before {
      content: "Your browser doesn't support named animation timelines.";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

Scroll to see the element being animated.

### Setting an anonymous scroll progress timeline

This example expands on the previous one, applying an anonymous scroll progress timeline using the `scroll()` function.

#### CSS

We include all the CSS from the previous example, only setting the `animation-timeline` property to override the previous example's value. The timeline is provided by the `scroll(inline nearest)` value, which selects the scrollbar in the inline direction of the nearest ancestor element that has scrollbars. This is the vertical scrollbar of the `#container` element, as the `.stretcher` elements don't have overflowing content and therefore aren't scroll containers.

```css
#shape {
  animation-timeline: scroll(inline nearest);
}
```

```css
@layer no-support {
  @supports not (animation-timeline: scroll()) {
    body::before {
      content: "Your browser doesn't support the scroll() function.";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

Scroll to see the square element being animated.

### Setting a named view progress timeline

In this example, we demonstrate how to create and apply a named view progress timeline. Two elements will be animated, with different elements serving as the scroller.

#### HTML

```html
<main class="scroller">
  <div class="container">
    <h1>Directions</h1>
    <h2>Lincoln Memorial to Martin Luther King, Jr. Memorial</h2>
    <ol>
      <li>Head south on Lincoln Memorial Circle</li>
      <li>Turn right toward Independence Ave</li>
      <li>Turn left onto Independence Ave</li>
      <li>Turn right onto West Basin Dr</li>
      <li>Look up when you reach 64 Independence Ave!</li>
    </ol>
    <section>
```

Our HTML includes a lot of text in a container within a scroller, which we've hidden for brevity. In the middle of the wall of text, we include two `` elements that we will animate based on the visibility of the element itself in the first case and based on the visibility of its parent in the second case:

```html
<div class="animated-element self">SELF</div>
<div class="animated-element parent">PARENT</div>
```

```html
</section>
<h2>Martin Luther King, Jr. Memorial to Lincoln Memorial</h2>
<ol>
  <li>Head north toward Independence Ave SW</li
  ><li>Turn left onto Independence Ave</li
  ><li>Turn right toward the Korean War Veterans Memorial</li
  ><li>Take a photo of the memorial as you walk past it.</li
  ><li>Head north on Lincoln Memorial Circle</li
  ><li>Look up. You can't miss it!</li>
</ol>
  </div>
</main>
```

#### CSS

We create a keyframe animation that changes the opacity and scale of the element, and apply it to both animated elements:

```css
@keyframes animation-effect {
  0% {
    opacity: 0;
    scale: 0;
  }
  100% {
    opacity: 1;
    scale: 1;
  }
}

.animated-element {
  animation: animation-effect 1ms linear;
}
```

The `self` element is explicitly named as the scroller for itself by setting the `view-timeline-name` property to a `<dashed-ident>` and also setting that `<dashed-ident>` name as the value of the `animation-timeline` property. In the `parent` case, we set the `container` as the scroller for the animated element:

```css
.self {
  view-timeline-name: --self-scroller-element;
  animation-timeline: --self-scroller-element;
}
.container {
  view-timeline-name: --parent-scroller-element;
}
.parent {
  animation-timeline: --parent-scroller-element;
}
```

Additional CSS declarations were hidden for brevity.

```css
@layer setup {
  section {
    display: flex;
    gap: 10px;
  }
  main {
    width: 400px;
    padding: 1em;
    height: 300px;
    overflow: scroll;
    border: 1px solid;
    background-color: beige;
    font-family: sans-serif;
  }

  li {
    margin-bottom: 0.75lh;
  }

  .animated-element {
    height: 200px;
    width: calc(100% - 2em);
    margin: auto;
    background-color: forestgreen;
    background-image:
      repeating-linear-gradient(37deg, transparent 0 52px, beige 52px 57px),
      repeating-linear-gradient(94deg, transparent 0 52px, beige 52px 57px);
    border: 1px solid;
    font-size: 3em;
    place-content: center;
  }
}
```

#### Result

Scroll the container to see both elements animate.

Note how the visibility of the `self` element controls its own animation. In this case, the element is at the `0%` keyframe when the top edge enters the viewport, or visible part of the scrollport, and only reaches the `100%` keyframe when the bottom edge exits the viewport.

The `parent` element only becomes visible when that parent is visible, meaning that when it comes into view, it is already about `25%` of the way through the animation. It is only about `75%` through its animation when it exits the top of the viewport.

## See also

- `animation`, `animation-composition`, `animation-delay`, `animation-direction`, `animation-duration`, `animation-fill-mode`, `animation-iteration-count`, `animation-name`, `animation-play-state`, `animation-timing-function`
- `scroll-timeline-name`, `scroll-timeline-axis`, `scroll-timeline`
- `view-timeline-name`, `view-timeline-axis`, `view-timeline`, `view-timeline-inset`
- `AnimationTimeline`
- Guide: Using CSS animations
- CSS animations module
- CSS scroll-driven animations module
