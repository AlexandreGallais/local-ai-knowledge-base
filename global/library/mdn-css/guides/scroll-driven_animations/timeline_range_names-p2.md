---
title: "Understanding timeline range names (part 2 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll-driven_animations/timeline_range_names/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Understanding timeline range names (part 2 of 3)

## Timeline range names

The `<timeline-range-name>` value type accepts six keywords: `cover`, `contain`, `entry`, `exit`, `entry-crossing`, and `exit-crossing`. Each of these represents a predefined _named timeline range_. A named timeline range is a named segment of an animation timeline. These keywords allow the developer to set the animation attachment range base that offsets are relative to. The start of the segment is represented as `0%` progress through the range; the end of the segment is represented as `100%` progress through the range. Where these points are depends on the named range used.

### Cover

The animation attachment range in the previous examples all "cover" the entire range. This range represents the full range of the view progress timeline. `0%` progress represents the point at which the start border edge of the subject aligns with the end edge of the scrollport, and `100%` progress represents the point where the subject's end border edge reaches the start edge of the scrollport. As we've seen, the size of the `cover` range is the sum of subject and scrollport dimensions in the scroll direction. In all the examples thus far, the height of the animation attachment range is the height of the container plus the height of the animated element.

The `cover` named timeline range is the default range. We could have explicitly set the `<timeline-range-name>` to achieve the same results:

```css
.animated_element {
  animation-range-start: cover;
  animation-range-end: cover;
}
```

```html
<div>
  <svg viewBox="-1 -1 462 1252" xmlns="http://www.w3.org/2000/svg">
    <rect class="small end" width="100" height="50" x="10" y="450" />
    <rect class="medium end" width="100" height="250" x="125" y="250" />
    <rect class="large end" width="100" height="500" x="240" y="0" />
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small start" width="100" height="50" x="10" y="750" />
    <rect class="medium start" width="100" height="250" x="125" y="750" />
    <rect class="large start" width="100" height="500" x="240" y="750" />
    <text y="625" x="5">cover</text>
    <text y="520" x="360">100%</text>
    <line x1="0" x2="350" y1="500" y2="500" />
    <line x1="0" x2="350" y1="750" y2="750" />
    <text y="760" x="360">0%</text>
  </svg>
</div>
```

The image demonstrates the animation timeline. The location of the element when it reaches the start of the animation attachment range's `0%` mark is shown as a yellow block. This represents the element position when the `from` keyframe is applied. The red block represents the location of the subject element relative to the scrollport when the `to` keyframe is applied. This is the position of the animated element when it reaches the end of the animation.

Depending on the size of the subject element and the chosen timeline range, the start and end positions may overlap. Areas of overlap (as seen in subsequent diagrams) will be represented by striped red and yellow areas.

### Contain

The `contain` named timeline range fully _contains_ the animation within the scrollport — the range starts when the animated element is 100% visible and ends when it ceases to be fully visible, if it can be fully visible.

The `contain` value represents the range during which the principal box is either fully contained by or fully covers its view progress visibility range within the scrollport, depending on whether the subject element is smaller (can be fully contained by) or larger than the scrollport.

- If the element is smaller than the scrollport in the scroll direction, `0%` occurs when the animated element's end border edge aligns with the end edge of the scrollport, and `100%` occurs when the animated element's start border edge aligns with the start edge of the scrollport. In other words, the `contain` value ranges from the point where the subject element is first completely contained by the scroll port (`0%`), to the point where it is no longer completely contained by the scroll port (`100%`).

- If the element is larger than the scrollport, the `0%` progress is when the animated element's start border edge reaches the start edge of the scrollport, and `100%` is when the end border edge aligns with the end edge. In other words, if the animation is larger than its container, the animated element is never fully visible as it is not "contained" within the scrollport. The animation starts when the start edge reaches the start edge of the scrollport, and ends when the animated element's end edge reaches the end edge of the container.

- If the animated element is the same size as its container, the animation still happens, but over `0px`, which is not visible to the user.

```css
.animated_element {
  animation-range: contain;
}
```

```css
body::before {
  content: "Contain";
}
```

In this example, the original height of the animated element is 20% of the height of the scrollport, and therefore can be completely contained within it. As a result, as explained earlier, the animation should start as soon as the element starts to enter the scrollport, and finish as soon as it begins to leave the scrollport.

If you check the `500px` radio button, the subject becomes twice as tall as the scrollport. The animation range begins when the subject element first completely covers the scroll port, with the `0%` occurring when the start edge reaches the start edge of the container. It ends when the element no longer completely covers the scrollport, with the `100%` occurring when the end edge crosses the container's end edge.

When the subject is the same size as the scroll container, as occurs when `250px` is selected, the animation still occurs, but over `0px`. As the `0%` and `100%` occur at the same time, the animation is instantaneous. The difference in styling is only perceivable because the properties defined in the `100%` keyframe state are applied after the animation ends. This is because the `animation-fill-mode` property is set to `forwards`. Otherwise, the middle-sized `250px` subject, being the same height as the scroll container, would appear not to animate at all.

```html
<div>
  <svg viewBox="-1 -1 462 1000" xmlns="http://www.w3.org/2000/svg">
    <rect class="small end" width="100" height="50" x="10" y="500" />
    <rect class="medium end" width="100" height="250" x="120" y="500" />
    <rect class="large end" width="100" height="500" x="230" y="500" />
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small start" width="100" height="50" x="10" y="700" />
    <rect class="medium start" width="100" height="250" x="120" y="500" />
    <rect class="large start" width="100" height="500" x="230" y="250" />
    <rect width="100" height="250" x="120" y="500" fill="url(#g)" />
    <rect width="100" height="250" x="230" y="500" fill="url(#g)" />
    <text y="460" x="10">contain</text>
    <text y="520" x="360">100%</text>
    <line x1="0" x2="350" y1="500" y2="500" />
    <line x1="0" x2="350" y1="750" y2="750" />
    <text y="760" x="360">0%</text>
  </svg>
</div>
```

```css
body div,
body svg {
  margin: -60px 0 -300px;
}
```

The animation occurs when the element is within the areas represented by the white of the container in the `50px` example and by the red/yellow areas in the `250px` and `500px` examples.

It may be helpful for some to compare and contrast the `cover` and `contain` values. We can use the shorthand `animation-range` property to set the `animation-range-start` and `animation-range-end` properties to the same `<animation-name-range>` value:

```css
#A {
  animation-range: contain;
}
#B {
  animation-range: cover;
}
```

```css
body::before {
  content: "contain vs cover";
}
#A,
#B {
  width: 140px;
}
#A::after {
  content: " ( contain )";
}
#B::after {
  content: " ( cover ) ";
}
```

Select different radio buttons and scroll the scrollport to compare the effects of the `cover` and `contain` values on animation timelines.

Let's look at the other `<timeline-range-name>` keyword values!

### Entry and exit

To make the entire animation happen only when the subject is in the process of entering or exiting the scrollport, use the `entry` or `exit` values, respectively. With these two values, the animation attachment range is based on the size of the animated element, not the size of the scrollport.

#### Entry

With `entry`, `0%` progress occurs the moment the animated element starts to enter the scrollport, when the subject's start edge crosses the scrollport's end edge.

The entire animation occurs as the subject comes into view, ending when it becomes completely visible or when it reaches the start edge; whichever occurs first. If the animated element is smaller than the scrollport, the animation attachment range is the size of the subject.

The position at `0%` progress is shown in yellow. The position at `100%` progress is displayed in red. When the animated element is larger than the scrollport, these two positions overlap, which is denoted by a striped background.

With `entry`, the animation attachment range is either the size of the animated element or the size of the container, whichever is smaller. If the subject is larger than the scrollport, the animation attachment range is the entire scrollport. With `entry`, the `100%` occurs when the subject's end edge crosses the end edge of the scrollport or, if the animated element is larger than the scrollport in the scroll direction, when the animated element's start edge reaches the start edge of the scrollport.

Setting `animation-range-start: entry` is the same as setting `animation-range-start: cover`.
Setting `animation-range-end: entry` is equivalent to setting `animation-range-end: contain`.

```html
<div>
  <svg viewBox="-60 400 530 980" xmlns="http://www.w3.org/2000/svg">
    <rect class="small end" width="100" height="50" x="10" y="700" />
    <rect class="medium end" width="100" height="250" x="120" y="500" />
    <rect class="large end" width="100" height="500" x="230" y="500" />
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small start" width="100" height="50" x="10" y="750" />
    <rect class="medium start" width="100" height="250" x="120" y="750" />
    <rect class="large start" width="100" height="500" x="230" y="750" />
    <rect width="100" height="250" x="230" y="750" fill="url(#g)" />
    <text y="460" x="10">entry</text>
    <text y="520" x="360">100%</text>
    <text y="690" x="-50">100%</text>
    <line x1="130" x2="350" y1="500" y2="500" />
    <line x1="-10" x2="120" y1="700" y2="700" />
    <line x1="0" x2="350" y1="750" y2="750" />
    <text y="760" x="360">0%</text>
  </svg>
</div>
```

#### Exit

The `exit` value is the inverse of `entry`.
With `exit`, the attachment range starts when the animated element's start edge crosses the scrollport's start edge.

```html
<div>
  <svg viewBox="-60 -1 530 800" xmlns="http://www.w3.org/2000/svg">
    <rect class="small end" width="100" height="50" x="10" y="450" />
    <rect class="medium end" width="100" height="250" x="120" y="250" />
    <rect class="large end" width="100" height="500" x="230" y="0" />
    <rect class="container" width="350" height="250" x="0" y="500" />
    <rect class="small start" width="100" height="50" x="10" y="501" />
    <rect class="medium start" width="100" height="250" x="120" y="500" />
    <rect class="large start" width="100" height="500" x="230" y="250" />
    <rect width="100" height="250" x="230" y="250" fill="url(#g)" />
    <text y="600" x="10">exit</text>
    <text y="520" x="370">100%</text>
    <line x1="-5" x2="365" y1="500" y2="500" />
    <line x1="-10" x2="140" y1="550" y2="550" />
    <line x1="110" x2="360" y1="750" y2="750" />
    <text y="760" x="370">0%</text>
    <text y="560" x="-60">0%</text>
  </svg>
</div>
```

```css
:root body div {
  margin: 0 0 -140px 0;
}
```

The `0%` progress occurs when the subject's start edge reaches the scrollport's start edge.
The `100%` progress occurs when the subject's end edge crosses the start edge.
Setting `animation-range-start: exit 0%` is equivalent to setting `animation-range-start: contain 100%`.
Setting `animation-range-end: exit 100%` is equivalent to `animation-range-end: cover 100%`.

#### Comparing entry and exit

It may help to take a look at `entry` and `exit` side-by-side to understand the effect the size of the subject has on the animation attachment range: with these two values, the animation attachment range is never larger than the container.

```css
#A {
  animation-range: entry;
}
#B {
  animation-range: exit;
}
```

```css
body::before {
  content: "Entry and exit";
}
#A,
#B {
  width: 140px;
}
#A::after {
  content: " ( entry )";
}
#B::after {
  content: " ( exit ) ";
}
```

Scroll the viewbox to see the range of the `entry` and `exit` values, then change the size of the subjects using the radio buttons and scroll again.

When the subjects are small enough to be fully contained within the scrollport, the animation attachment timeline is at the start (`entry`) or end (`exit`) of the scrollport and the size of the attachment range is limited to the size of the animated element in the scroll direction.

With `entry` and `exit`, the animation range is contained to the size of the scrollport, while the element is not.

If the subject element is the size of the scrollport or larger:

- In the case of `entry`, the animation ends when the element fully covers the scrollport in the scroll direction.
- In the case of `exit`, the animation doesn't begin until, the element fully covers the scrollport in the scroll direction.

This may not be the effect you want. If you want an entry animation to keep running until the entire element has finished entering the start edge of the scrollport, or if you want an exit animation to start as soon as the element starts to exit the end edge of the scrollport, you need to use `entry-crossing` and `exit-crossing`.
