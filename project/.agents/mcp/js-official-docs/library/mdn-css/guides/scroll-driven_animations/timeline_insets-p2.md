---
title: "Understanding timeline insets (part 2 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll-driven_animations/timeline_insets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding timeline insets (part 2 of 4)

## Setting insets using lengths

The `animation-range-start` and `animation-range-end` properties each accept a named animation range, a `length-percentage` offset value, or both. Any length or percentage offset is measured from the _start_ of the animation attachment range.

When a `length` is set, the offset is fairly intuitive.
Here we use the `animation-range-start` and `animation-range-end` properties to inset the animation timeline. This defines a subsection of the element's full animation attachment range as the active interval, with the `<length>` values specifying distances from the start of the default `normal` animation attachment range.

```css
.animated_element {
  animation-range-start: 1em;
  animation-range-end: 125px;
}
```

The start and end of the animation range are `1em` and `125px` from the start of the animation attachment range, respectively. Because the timeline range default is `normal`, which resolves to `cover`, the start of the animation attachment range is the block end edge of the container.

```css
:root {
  --start: 1em;
  --end: 125px;
}

article {
  background-image: linear-gradient(
    to top,
    transparent calc(var(--start) - 1px),
    #cccccc calc(var(--start) - 1px) calc(var(--start) + 1px),
    transparent calc(var(--start) + 1px) calc(var(--end) - 1px),
    #cccccc calc(var(--end) - 1px) calc(var(--end) + 1px),
    transparent calc(var(--end) + 1px)
  );
}
```

We've added lines `1em` and `125px` from the block end edge of the scroll container. The animation starts when the block start edge of the subject element reaches the `1em` line and ends when it reaches the `125px` line.

In this case, as the animation attachment range resolves to `cover` for both the start and end inset values, the location of the insets is fairly straightforward.

### Effect of named ranges on length offsets

The offset distance is always from the start of the associated animation range. In this example, we set the `animation-range-start` to be `50px` from the start of the default `normal` range and set the `animation-range-end` to be `100px` from the start of the explicitly set `entry` range:

```css
.animated_element {
  animation-range-start: 50px;
  animation-range-end: entry 100px;
}
```

```html
<main>
  <article>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <p>Scroll down ⇩</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    <section class="triple">
      <div>
        <i id="A" class="animated_element">50px</i>
        <i id="B" class="animated_element">250px</i>
        <i id="C" class="animated_element">500px</i>
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

As the start edge of both the `normal` and `entry` ranges is the container's end edge, the animation begins when the subject start edge is `50px` from the bottom of the scrollport and ends, reaching `100%` progress, when the subject start edge is `100px` from the bottom of the scrollport, irrespective of the subject size. While the size of the `entry` range is different for the three different subject sizes, in this case, the size of the underlying range didn't matter.

### Length offsets with varying ranges

The size of range matters when the range doesn't start at the element's end edge, as is the case with `exit` and `exit-crossing`, or if the offset is a percentage value. This fact, and the fact that you can mix and match animation range names, make view progress timeline offsets a bit more complicated to understand than non-offsetted timeline range names.

For example, when setting `exit` as the timeline range name, the subject size matters as it determines the location of the range's end edge.

```css
.animated_element {
  animation-range-start: entry 60px;
  animation-range-end: exit 75px;
}
```

With both `entry` and `exit`, the range is the size of the subject, with the size clamped to the size of the scrollport. This means that the height of the `entry` and `exit` ranges are the height of the box in both the `50px` and `250px` examples, while in the `500px` example, the range is clamped to the height of the scrollport, which is `250px` tall.

We added a few lines to facilitate the explanations that follow: the bottom blue line is `60px` from the end edge of the scrollport, and the top red line is `75px` from that same edge. These are where the animation range start and end respectively.

This example demonstrates several important features, which we'll explain in greater detail, including:

- Offsets are measured from their respective named ranges
- Offsets can occur beyond the edges of the scrollport
- Ranges may be clamped if the subject is larger than the scrollport

#### Measured from the start edge of the range

As the offset position is always relative to the start of the declaration's animation range, the start of the animation for all three elements occurs when the elements start edge crosses the point that is `60px` from the start of the `entry` range.

The `animation-range-end` value defines the position where the animation. The `exit 75px` value basically means "when `75px` of the subject has exited the start edge of the scrollport." This varies for each subject. For the `50px` subject, this only occurs `25px` after it has left the scrollport; when the element is not visible. The animation range end for both the `250px` and `500px` subjects occurs when their bottom end edge intersects the top blue line; 75 pixels from the end edge of the scrollport. Why are their end offsets the same? Because of clamping! The maximum size of the named animation range is clamped to the size of the scrollport. The `exit` range for both subjects is the same, so the range end offsets are the same.

#### Beyond the scrollport edges

For our `50px` tall subject, the `exit` range is 50px tall abutting the start edge of the scroll port. Setting `animation-range-end: exit 75px` for any element less than `75px` tall means the end of the range is outside the scrollport, as the point `75px` from the start of the `exit` range is past the start edge of the scrollport. In our example, the end of the animation range for the `50px` subject occurs when the subject's start edge is `75px` past the scrollport's start edge. The animation ends, reaching the `to` keyframe and the `animationend` event, only when (and if) the element is scrolled `25px` out of view.

The animation ends even if the animation range end is outside of the scrollport, as long as there is room to scroll to that point. Had we set `animation-range-end: exit 250px`, the animation would have ended when the end edge of the medium and tall subjects exited the scrollport at the container's start edge.

With the end set to `exit 250px`, the small subject's animation might not end, as there might not be `450px` of content after the subject for the user to scroll to before the end point is reached.

#### Effects of clamping

With our `250px` tall container, when the subject is `250px` or `500px` tall, the `exit` range is the size of the container, with the start being the scroll container's end edge. With a `75px` offset, the end of the animation occurs when the end edge of the subject is `75px` from the end edge of the scroll container (denoted by the top red line).

As the offset position is always relative to the start of the named or default animation range, in our example, clamping impacts the large subject's `animation-range-end`. We set the end of the range to `exit 75px` which is `75px` from the start edge of the `exit` range. When the subject is the same size as the scrollport (our `250px` subject) or larger (our `500px` subject), the animation range end is `75px` from the end edge of the scrollport, which is `75px` from the start of the scrollport-clamped `exit` range.

```css
article {
  background-image: linear-gradient(
    to top,
    transparent 59.5px,
    blue 59.5px 60.5px,
    transparent 60.5px 74.5px,
    red 74.5px 75.5px,
    transparent 75.5px /* 174.5px,
    green 174.5px 154.5px,
    transparent 175.5px*/
  );
}
.animated_element {
  align-self: flex-end;
}
```

```css
@layer setup {
  #A {
    height: 50px;
  }
  #B {
    height: 250px;
  }
  #C {
    height: 500px;
  }
  div {
    display: flex;
    gap: 1em;
  }
  main {
    padding: 20px 0 0 20px;
    margin-bottom: 2em;
  }
  article {
    outline: 3px dashed;
    width: 475px;
    margin: auto;
    overflow: scroll;
    position: relative;
    height: 250px;
    box-sizing: content-box;
    background-image: linear-gradient(
      to top,
      transparent 49.5px,
      #666666 49.5px 50.5px,
      transparent 50.5px 99.5px,
      #666666 99.5px 100.5px,
      transparent 100.5px
    );
    background-origin: content-box;
  }

  p {
    padding: 10px;
    margin: 10px;
  }

  .animated_element {
    --clr: yellow;
    background-color: hsl(from var(--clr) h s calc(l * 1.4));
    display: block;
    animation: showAnim step-end 1 forwards;
    animation-timeline: view();
    flex: 1 0 auto;
  }

  i {
    font-family: sans-serif;
    font-size: 1.5rem;
  }

  @keyframes showAnim {
    from {
      --clr: green;
    }
    to {
      --clr: red;
    }
  }
  @layer no-support {
    @supports not (animation-timeline: view()) {
      body::before {
        content: "Your browser doesn't support view progress scrolling.";
        background-color: wheat;
        display: block;
        text-align: center;
      }
    }
  }
}
```

### Negative lengths

Up to this point, all the offsets have been greater than zero. It's important to note that negative lengths are valid. A negative offset on the `animation-range-start` makes the range longer while a negative offset on the `animation-range-end` makes the range shorter.

Let's compare the negative insets compared to the `0` values:

```css
#A {
  animation-range-start: contain -25px;
  animation-range-end: exit -25px;
}
#B {
  animation-range-start: contain 0;
  animation-range-end: exit 0;
}
```

The first animation range is offset by `25px` toward the container end edge.

```css
fieldset.double {
  display: none;
}
#A::after {
  content: " (-25px)";
}
#B::after {
  content: " (0)";
}
```
