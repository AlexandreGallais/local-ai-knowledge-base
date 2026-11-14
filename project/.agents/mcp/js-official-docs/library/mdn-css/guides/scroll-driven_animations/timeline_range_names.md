---
title: "Understanding timeline range names (part 1 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll-driven_animations/timeline_range_names/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding timeline range names

By default, view progress timelines track elements across the entire scrollport. The animation timeline begins when the first pixel of the element's start edge crosses the scrollport's end edge, and ends when the element's end edge crosses the scrollport's start edge. You can change this default animation attachment range. For example, you can restrict the view progress timeline to begin only when the subject element has fully entered the scrollport.

This guide explains how to modify timeline range names, specifically examining the various timeline range names, their meanings, and how they are used.

Limiting the animation timeline to a specific portion of a named animation timeline range is discussed in the insetting scroll animations guide.

## View progress timeline primer

CSS animations are created by attaching `@keyframes` animations to an element using the `animation-name` property (or `animation` shorthand). The keyframes define the animation's behavior, while the `animation-timeline` determines when and how the element progresses through those keyframes.

By default, the animation's timeline is the document's default time-based `DocumentTimeline`. With CSS scroll-driven animations, the animation's timeline, or progress, is driven either by user scroll (scroll progress timelines) or element visibility (view progress timelines), instead of the passage of time.

With view progress timelines, keyframe progression is tied to how much of the subject element is visible within the scroller, and its position within the scroller. As the element enters the viewport, the timeline advances. If the user reverses the scrolling, the timeline reverses. In other words, as the element comes into or moves out of view, the timeline progresses or reverses, respectively. The animation only occurs when the subject is visible within its scrollport. If scrolling stops while the element is in view, the animation pauses.

### Default view progress timeline

By default, the view progress timeline's progression starts when the tracked subject's start edge intersects the scrollport at the end edge and ends when the subject's end edge exits the scrollport at the start edge. These are the subject and scrollport's top and bottom edges when scrolling vertically, and the left and right or right and left edges when scrolling horizontally, depending on the writing mode.

```html
<main>
  <article>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Scroll down ⇩</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <section class="one animated_element">
      <div>
        <i>Animated Element</i>
        <span></span>
      </div>
    </section>
    <section class="double">
      <div>
        <i id="A" class="animated_element">A</i>
        <i id="B" class="animated_element">B</i>
      </div>
    </section>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Scroll up ⇧</p>
  </article>
</main>
```

```html
<fieldset>
  <legend>Select the height of the animated element</legend>

  <label><input name="height" value="50" type="radio" checked /> 50px</label>
  <label><input name="height" value="250" type="radio" /> 250px</label>
  <label><input name="height" value="500" type="radio" /> 500px</label>
</fieldset>
```

```css
:root {
  --animElHeight: 50px;
  --animElHeightWord: "50px";
}
body:has(input[value="250"]:checked) {
  --animElHeight: 250px;
  --animElHeightWord: "250px";
}
body:has(input[value="500"]:checked) {
  --animElHeight: 500px;
  --animElHeightWord: "500px";
}
main {
  padding: 20px 0 0 20px;
  margin-bottom: 2em;
}
article {
  outline: 3px dashed;
  width: 500px;
  margin: auto;
  overflow: scroll;
  position: relative;
  height: 250px;
  box-sizing: content-box;
}

p {
  padding: 10px;
  margin: 10px;
}

section {
  --clr: yellow;
  --words: "Animation not started";
  position: relative;
  margin: 20px;
  text-align: center;
}
.one,
.double i {
  animation: showAnim step-end 1 forwards;
  animation-timeline: view();
}
i {
  background-color: hsl(from var(--clr) h s calc(l * 1.4));
  display: block;
  height: var(--animElHeight);
  line-height: var(--animElHeight);
}
span {
  background-color: hsl(from var(--clr) h s 90%);
  border: 5px solid hsl(from var(--clr) h s 20%);
  min-width: 250px;
  height: 30px;
  line-height: 30px;
}
span,
i {
  font-family: sans-serif;
  font-size: 1.5rem;
}
span::before {
  content: var(--words);
}
span {
  position: fixed;
  top: 10px;
  left: 10px;
  padding: 10px;
}
i::after {
  content: " ( " var(--animElHeightWord) " )";
}
label {
  padding-right: 2em;
}
legend {
  margin-top: 2em;
}

@keyframes showAnim {
  from {
    --clr: green;
    --words: "Currently animating";
  }
  to {
    --clr: red;
    --words: "Animation complete";
  }
}
body::before {
  display: block;
  text-align: center;
  font-family: sans-serif;
  font-size: 1.5rem;
}

@layer no-support {
  @supports not (animation-timeline: view()) {
    body::after {
      content: "Your browser doesn't support view progress scrolling.";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;

      position: absolute;
      inset: 0;
      bottom: auto;
    }
  }
}
```

```css
.double {
  display: none;
}
```

```css
.one {
  display: none;
}
.double div {
  display: flex;
  gap: 10px;
}
```

In the following example, try scrolling down. Note how the animation begins just as the top edge of the animated element aligns with the bottom edge of the scroll container and ends, reaching `100%` progress, when the bottom edge aligns with the top edge of the container, no matter how tall the animated element is.

The scroll container's writing mode and scroll direction determine the scroll container's start and end edges.

## The animation attachment range

By default, the element is animated the entire time any portion of the subject element is visible. This means the default **animation attachment range** is the sum of the height of the scroll container and the height of the subject element, with that extra height being at the scroll end edge.

In the previous example, the scroll container is `250px` tall, and the animated element is `50px` tall by default, which means the vertical animation attachment range is `300px` tall. When the subject is set to `250px`, the range becomes `500px`; when the element is set to `500px`, the animation attachment range size grows to `750px`.

The CSS scroll driven animations module provides mechanisms for defining different animation attachment ranges. The `animation-range-start` and `animation-range-end` properties, which can both be set using the `animation-range` shorthand, define the attachment range for the animation range's start edge and the end edge, along with any insets from either edge, respectively.

The animation-range properties accept the keyword `normal`, a `timeline-range-name`, a `length-percentage`, or both a `<timeline-range-name>` and the `<length-percentage>`. In this guide, we are covering the values for the `<timeline-range-name>` component of the value only.

The length-percentage values, such as `20%` or `100px`, inset the animation timeline from the named animation attachment ranges, by the set amount, with the value defaulting to `0`. This is covered in Understanding timeline insets.
