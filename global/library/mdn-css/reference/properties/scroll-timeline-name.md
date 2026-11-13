---
title: "`scroll-timeline-name` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/scroll-timeline-name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scroll-timeline-name` CSS property

The **`scroll-timeline-name`** CSS property is used to define the name of a named scroll progress timeline.

## Syntax

```css
/* Keyword value */
scroll-timeline-name: none;

/* Named timeline */
scroll-timeline-name: --custom_name_for_timeline;

/* Global values */
scroll-timeline-name: inherit;
scroll-timeline-name: initial;
scroll-timeline-name: revert;
scroll-timeline-name: revert-layer;
scroll-timeline-name: unset;
```

### Values

This property is specified as one of the following values:

- `none`
    The timeline has no name.
- `<dashed-ident>`
    An arbitrary custom identifier defining a name for a scroll progress timeline, which can then be referenced in an `animation-timeline` property.

## Description

The `scroll-timeline-name` property is used to define the name of a _named scroll progress timeline_, which is progressed through by scrolling a scrollable element (_scroller_) between top and bottom (or left and right).

Set the `scroll-timeline-name` property on the scroller that provides the timeline. The name is then referenced in an `animation-timeline` declaration to indicate the container's element that is used to drive the progress of the animation through the scrolling action.

If the element does not overflow its container in the axis dimension or if the overflow is hidden or clipped, no timeline will be created.

The `scroll-timeline-name`, along with the `scroll-timeline-axis` property, can also be set using the `scroll-timeline` shorthand.

## Examples

### Creating a named scroll progress timeline animation

In this example, a scroll timeline named `--square-timeline` is defined using the `scroll-timeline-name` property on the element with the ID `container`.
This is then applied to the animation on the `#square` element using `animation-timeline: --square-timeline`.

#### HTML

The HTML for the example is shown below.

```html
<div id="container">
  <div id="square"></div>
  <div id="stretcher"></div>
</div>
```

#### CSS

The CSS for the container sets it as the source of a scroll timeline named `--square-timeline` using the `scroll-timeline-name` property. No scrollbar axis is defined here because the vertical axis will be used by default.

The height of the container is set to `300px`, and the container is also set to create a vertical scrollbar if it overflows (the CSS `height` rule on the `stretcher` element below does make the content overflow its container).

```css
#container {
  height: 300px;
  overflow-y: scroll;
  scroll-timeline-name: --square-timeline;
  position: relative;
}
```

The CSS below defines a square that rotates according to the timeline provided by the `animation-timeline` property, which is set to the `--square-timeline` timeline named above.

```css
#square {
  background-color: deeppink;
  width: 100px;
  height: 100px;
  margin-top: 100px;
  animation-name: rotateAnimation;
  animation-duration: 1ms; /* Firefox requires this to apply the animation */
  animation-timeline: --square-timeline;
  position: absolute;
  bottom: 0;
}

#stretcher {
  height: 600px;
  background: #dedede;
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

The `stretcher` CSS rule sets the block height to `600px`, which creates content that overflows the container element, thereby creating scroll bars.
Without this element, the content would not overflow the container, there would be no scrollbar, and hence no scroll timeline to associate with the animation timeline.

#### Result

Scroll the vertical bar to see the square animate as you scroll.

## See also

- `animation-timeline`
- `scroll-timeline`, `scroll-timeline-axis`
- `timeline-scope`
- Scroll-driven animation timelines
- CSS scroll-driven animations
