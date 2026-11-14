---
title: "`scroll-timeline` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/scroll-timeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `scroll-timeline` CSS property

The **`scroll-timeline`** CSS shorthand property is used to define a named scroll progress timeline, which is progressed through by scrolling a scrollable element (_scroller_) between top and bottom (or left and right).

## Constituent properties

This property is a shorthand for the following CSS properties, in order:

- `scroll-timeline-name`
- `scroll-timeline-axis`

## Syntax

```css
/* One value */
scroll-timeline: none;
scroll-timeline: --custom_name_for_timeline;

/* Two values */
scroll-timeline: --custom_name_for_timeline block;
scroll-timeline: --custom_name_for_timeline x;
scroll-timeline: none inline;
scroll-timeline: none y;

/* Global values */
scroll-timeline: inherit;
scroll-timeline: initial;
scroll-timeline: revert;
scroll-timeline: revert-layer;
scroll-timeline: unset;
```

### Values

- `<scroll-timeline-name>`
    A `dashed-ident` or the keyword `none`.

- `<scroll-timeline-axis>`
    An `axis` keyword. The default value is `block`.

## Description

The `scroll-timeline` shorthand property can be applied to a container element to set both the `scroll-timeline-name` and `scroll-timeline-axis` properties. It is set on the scroller that will provide the timeline. If the container has no overflow to scroll or if the overflow is hidden or clipped, no timeline will be created.

The value for the `scroll-timeline-name`, if not set to `none`, must be a `dashed-ident`, which means it must start with `--`. This helps avoid name clashes with standard CSS keywords. The name can then be used as the value of an element's `animation-timeline` property to define the scrolling container element that will define its animation timeline, driving the animation progress as it scrolls.

The optional scroll `axis` value defines the `scroll-timeline-axis`, which defaults to `block` if omitted. If both a name and axis are specified, the order must be the `<scroll-timeline-name>` value followed by the `<axis>` value. If the `<axis>` is listed first, the declaration is invalid and will be ignored.

## Examples

### Creating a named scroll progress timeline animation

In this example, a scroll timeline named `--square-timeline` is defined using the `scroll-timeline-name` property on the `#container` element.
The timeline name is then applied to the animation on the `#square` element using `animation-timeline: --square-timeline`.

#### HTML

We include a container with two child `` elements.

```html
<div id="container">
  <div id="square"></div>
  <div id="stretcher"></div>
</div>
```

#### CSS

We set the container to `300px` tall to make it scroll vertically.

Using the `scroll-timeline` property, we define the container as the source of a scroll timeline named `--square-timeline`, explicitly setting the default vertical scrollbar as the timeline controller.

```css
#container {
  height: 300px;
  overflow-y: scroll;

  scroll-timeline: --square-timeline y;
  /* Firefox supports the non-standard vertical/horizontal syntax */
  scroll-timeline: --square-timeline vertical;

  position: relative;
}
```

We provide basic <example-value> for the square. We apply the `rotateAnimation` using the `animation-name` property. By default, this would use the time-based document timeline. By setting the `animation-timeline` property to the `--square-timeline` timeline named above, we set the square to rotate according to the scroll-based timeline, which progresses as the container scrolls.

```css
#square {
  background-color: deeppink;
  width: 100px;
  height: 100px;
  position: absolute;
  bottom: 0;

  animation: rotateAnimation 1ms linear;
  animation-timeline: --square-timeline;
}
```

We ensure the container overflows by defining a stretcher that is wider than its parent.
Without content that overflows the container, there would be no scrollbar, and hence no scroll timeline. We also define a CSS keyframe animation that rotates the elements on which it is applied by one full rotation.

```css
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

```css
@layer no-support {
  @supports not (scroll-timeline: --square-timeline) {
    body::before {
      content: "Your browser doesn't support the `scroll-timeline` property.";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

#### Result

Scroll the vertical bar to see the square animate as you scroll.

The square animates as you scroll. When using `scroll-timeline`, the duration of the animation depends on how fast you scroll, not the value of the `animation-duration` property.

## See also

- `animation-timeline`
- `scroll-timeline-axis`
- `scroll-timeline-name`
- Guide: Scroll-driven animation timelines
- CSS scroll-driven animations module
- CSS animations module
