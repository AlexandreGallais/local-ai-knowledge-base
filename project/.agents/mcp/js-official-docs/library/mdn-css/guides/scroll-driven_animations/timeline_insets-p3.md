---
title: "Understanding timeline insets (part 3 of 4)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll-driven_animations/timeline_insets/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding timeline insets (part 3 of 4)

## Setting insets using percentages

Like length values, percentage values define offsets from the _start_ of the animation attachment range. The percentage offsets are relative to the timeline range dimension, not relative to the scrollport. For this reason, percentage values are not as intuitive as length values for most people (realizing length values weren't that intuitive either).

Here, we use `animation-range-start` and `animation-range-end` to inset the animation timeline. While we are using the same properties, we set `<percentage>` values instead of `<length>` values:

```css
.animated_element {
  animation-range-start: 20%;
  animation-range-end: 60%;
}
```

```css
i {
  background-image: linear-gradient(
    to bottom,
    transparent calc(20% - 1px),
    #33333333 calc(20% - 1px) calc(20% + 1px),
    transparent calc(20% + 1px) calc(60% - 1px),
    #33333333 calc(60% - 1px) calc(60% + 1px),
    transparent calc(60% + 1px)
  );
}
article {
  --total: calc(var(--animElHeight) + 250px);
  background-image:
    linear-gradient(
      to top,
      transparent 0 calc(var(--total) * 0.2 - 1px),
      green calc(var(--total) * 0.2 - 1px) calc((var(--total) * 0.2) + 1px),
      transparent calc(var(--total) * 0.2 + 1px)
    ),
    linear-gradient(
      to top,
      transparent 0 calc(var(--total) * 0.6 - 1px),
      red calc(var(--total) * 0.6 - 1px) calc((var(--total) * 0.6) + 1px),
      transparent calc(var(--total) * 0.6 + 1px)
    ),
    linear-gradient(
      to top,
      transparent 0 calc(var(--containerHeight) * 0.2 - 0.5px),
      #33333333 calc(var(--containerHeight) * 0.2 - 0.5px)
        calc(var(--containerHeight) * 0.2 + 0.5px),
      transparent calc(var(--containerHeight) * 0.2 + 0.5px)
        calc(var(--containerHeight) * 0.6 - 0.5px),
      #33333333 calc(var(--containerHeight) * 0.6 - 0.5px)
        calc(var(--containerHeight) * 0.6 + 0.5px),
      transparent 0 calc(var(--containerHeight) * 0.6 + 0.5px)
    );
  background-attachment: local, local, fixed;
}
```

This defines the active interval to begin `20%` into the default attachment range and end `60%` through that same range. The default `normal` animation attachment range, which behaves as `cover`, is the height of the scroll container plus the height of the subject element, meaning the range will differ based on which radio button is selected.

For illustrative purposes, there are two dark lines crossing the container at the `20%` and `60%` points of the full animation range. The animation starts when the block-start edge reaches the `20%` point, which is the bottom green line. The animation ends when the start block edge is 60% of the way through the normal range, which is the top red line.

Only when the element is `50px` tall is the top of the subject still in the scrollport when the end of the animation is reached; there are no top red lines when `250px` or `500px` are selected, as the end of the animation range is outside of the scrollport.

Based on the height of our subjects, the `20%` mark is either `60px`, `100px`, or `150px` from the end edge of the scrollport (marked by the green line, which is always in the scrollport), and the `60%` mark is `180px`, `300px`, or `450px` from the same point (marked with a red line, but only visible for the `50px` subject).

For illustrative purposes, there are two light gray lines crossing the container `20%` and `60%` of the way through the scrollport, which are `50px` and `150px` from the bottom of the scrollport, respectively. As the `animation-range-*` percentages are relative to the timeline range, not the scrollport, these lines only show how the percentages **don't** align. We've also included two horizontal light gray lines going across each subject at their own `20%` and `60%` marks. These lines align with the scrollport's light gray lines when each subjects animation starts and ends.

The following image demonstrates where the subject elements are located when the animation starts (the `0%` keyframe) and ends (the `100% keyframe`).
This image includes the insets from the animation timeline in the previous demonstration and the timeline without insets for comparison.

```html
<div>
  <svg viewBox="-1 -1 482 1252" xmlns="http://www.w3.org/2000/svg">
    <title>Default view progress timeline with insets</title>
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small end" width="100" height="50" x="10" y="571" />
    <rect class="medium end" width="100" height="250" x="120" y="450" />
    <rect class="large end" width="100" height="500" x="230" y="300" />
    <rect class="small start" width="100" height="50" x="10" y="689" />
    <rect class="medium start" width="100" height="250" x="120" y="649" />
    <rect class="large start" width="100" height="500" x="230" y="600" />
    <rect width="96" height="48" x="122" y="602" fill="url(#g)" />
    <rect width="96" height="198" x="232" y="527" fill="url(#g)" />
    <text y="610" x="385">60%</text>
    <line x1="0" x2="385" y1="600" y2="600" />
    <line x1="0" x2="385" y1="700" y2="700" />
    <text y="710" x="385">20%</text>
  </svg>
  <svg viewBox="-1 -1 482 1252" xmlns="http://www.w3.org/2000/svg">
    <title>Default view progress timeline</title>
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small end" width="100" height="50" x="10" y="450" />
    <rect class="medium end" width="100" height="250" x="125" y="250" />
    <rect class="large end" width="100" height="500" x="240" y="0" />
    <rect class="small start" width="100" height="50" x="10" y="750" />
    <rect class="medium start" width="100" height="250" x="125" y="750" />
    <rect class="large start" width="100" height="500" x="240" y="750" />
    <text y="520" x="385">100%</text>
    <line x1="0" x2="385" y1="500" y2="500" />
    <line x1="0" x2="385" y1="750" y2="750" />
    <text y="760" x="390">0%</text>
  </svg>
</div>
```

As before, the yellow represents the position of the element when the `from` keyframe is applied, the red represents the location when the `to` keyframe is applied, and the gray represents the scrollport. The striped areas are where the red and yellow element representations overlap. For illustrative purposes, we've added dashed black horizontal lines `20%` and `60%` way through the scrollport, starting from the bottom.

The animation only begins when the element reaches the `20%` mark along the animation attachment range. This point is `60px`, `100px`, or `150px` from the bottom edge of the scroll port, depending on the size of the element. The location of the subject element at this point, representing the position of the element when the `from` or `0%` keyframe is applied, is shown in yellow.

The red represents the location of the animated element relative to the scrollport when the `to` or `100%` keyframe is applied, which is the end of the animation. This point is either `180px`, `300px`, or `450px` from the bottom edge of the scrollport, depending on the subject size. The animation occurs when the element is between the `to` and the `from` positions.

You may have noticed something interesting about the dashed horizontal lines: when the animation starts, the line that is `20%` from the end edge of the viewport is `20%` from the _top_ of the subject element and the line that is `60%` from the end edge of the viewport is `60%` from the _top_ of the subject element when the animation ends. This is what was illustrated by the very light gray lines in the live demo for this example.

### Subject size matters

As we saw when we set insets with lengths, the size of the subject can make a difference. When setting animation ranges, percentage values are relative to the size of animation attachment range, not the scrollport. For most named ranges, the size of the attachment range depends partially on the subject size. As percentages are based on the size of the range, the named range impacts the resolved size of the insets. Depending on the name, the start position may also change, impacting the location of the range and therefore the location of progress points.

In this example, we define an active range that is `40%` of the size of the subject:

```css
.animated_element {
  animation-range-start: exit-crossing -20%;
  animation-range-end: exit-crossing 20%;
}
```

```css
article {
  background-image: none;
}
body .animated_element {
  align-self: start;
}
```

The animation lasts `40%` of the animation-attachment range. As you scroll, note how the larger the subject, the longer the range. With exit-crossing, the animation range is not cropped; it is the size of the subject even if the subject is larger than the viewport, with the range abutting the start edge of the scrollport, and extending off the end edge if the subject is larger than the scrollport.

With the `-20%` and `20%` insets, the `50px` subject's will animation over `20px`: the animation starts when the subject's end is `-10px` from range start, or `60px` from exiting the screen, and ends when the subject's end is `40px` from exiting the screen. The middle subject will animate over `100px`: the animation starts when the subject end is `-50px` from range start, which is `50px` off of the scrollport's end edge, and ends when the subject's end is `50px` into the scrollport. The large subject animates over `200px`, starting when the bottom is `600px` from the container's start edge, with only `150px` in view, and ends when the bottom is 400px from that start edge, when `100px` have scrolled off the start edge.
