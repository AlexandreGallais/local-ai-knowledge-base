---
title: "ScrollTimeline"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/scrolltimeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ScrollTimeline

The **`ScrollTimeline`** interface of the `Web Animations API` represents a scroll progress timeline (see CSS scroll-driven animations for more details).

Pass a `ScrollTimeline` instance to the `Animation()` constructor or the `animate()` method to specify it as the timeline that will control the progress of the animation.

## Constructor

- `ScrollTimeline()`
    Creates a new `ScrollTimeline` object instance.

## Instance properties

_This interface also inherits the properties of its parent, `AnimationTimeline`._

- `source` (read-only)
    Returns a reference to the scrollable element (_scroller_) whose scroll position is driving the progress of the timeline and therefore the animation.
- `axis` (read-only)
    Returns an enumerated value representing the scroll axis that is driving the progress of the timeline.

## Instance methods

_This interface inherits the methods of its parent, `AnimationTimeline`._

## Examples

### Displaying the source and axis of a scroll progress timeline

In this example, we animate an element with a `class` of `box` along a view progress timeline — it animates across the screen as the document scrolls. We output the `source` element and scroll `axis` to an `output` element in the top-right corner.

#### HTML

The HTML for the example is shown below.

```html
<div class="content"></div>
<div class="box"></div>
<div class="output"></div>
```

#### CSS

The CSS for the example looks like this:

```css
.content {
  height: 2000px;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: rebeccapurple;
  position: fixed;
  top: 20px;
  left: 0%;
}

.output {
  font-family: "Helvetica", "Arial", sans-serif;
  position: fixed;
  top: 5px;
  right: 5px;
}
```

#### JavaScript

In the JavaScript, we grab references to the `box` and `output` ``s, then create a new `ScrollTimeline`, specifying that the element that will drive the scroll timeline progress is the document (`<html>`) element, and the scroll axis is the `block` axis. We then animate the `box` element with the Web Animations API. Last of all, we display the source element and axis in the `output` element.

```js
const box = document.querySelector(".box");
const output = document.querySelector(".output");

const timeline = new ScrollTimeline({
  source: document.documentElement,
  axis: "block",
});

box.animate(
  {
    rotate: ["0deg", "720deg"],
    left: ["0%", "100%"],
  },
  {
    timeline,
  },
);

output.textContent = `Timeline source element: ${timeline.source.nodeName}. Timeline scroll axis: ${timeline.axis}`;
```

#### Result

Scroll to see the box being animated.

## See also

- Web Animations API
- CSS scroll-driven animations
- `AnimationTimeline`, `ViewTimeline`
