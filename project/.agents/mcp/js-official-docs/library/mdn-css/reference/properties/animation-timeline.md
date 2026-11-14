---
title: "`animation-timeline` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/animation-timeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `animation-timeline` CSS property

The **`animation-timeline`** CSS property specifies the timeline used to control the progress of a CSS animation.

## Syntax

```css
/* Keyword values */
animation-timeline: none;
animation-timeline: auto;

/* Named timeline */
animation-timeline: --timeline_name;

/* Anonymous scroll progress timeline */
animation-timeline: scroll();
animation-timeline: scroll(x root);

/* Anonymous view progress timeline */
animation-timeline: view();
animation-timeline: view(inline);
animation-timeline: view(x 200px auto);

/* Multiple values */
animation-timeline: --progress-bar-timeline, --carousel-timeline;
animation-timeline: auto, view(20% 80%), none, scroll(inline nearest);

/* Global values */
animation-timeline: inherit;
animation-timeline: initial;
animation-timeline: revert;
animation-timeline: revert-layer;
animation-timeline: unset;
```

### Values

The `animation-timeline` property is specified as one or more comma-separated values, each of which can be one of the following:

- `none`
    The animation is not associated with a timeline, and no animation occurs.

- `auto`
    The animation's timeline is the document's default `DocumentTimeline`. This is the default value.

- `scroll()`
    Defines the root element, nearest scroller, or self as an anonymous scroll progress timeline, and optionally the scroll direction of the scroller.

- `view()`
    Defines the nearest ancestor scroll container as an anonymous view progress timeline, optionally overriding the default `baseline` axis direction and the `auto` start and ending insets.

- `<dashed-ident>`
    The name of a scroll-driven or view-progress timeline, as defined by the scroll container's `scroll-timeline-name` or `view-timeline-name` property (or the `scroll-timeline` or `view-timeline` shorthand property).

## Description

The default timeline for a CSS keyframe animation is the time-based `DocumentTimeline`. The `animation-timeline` property can be used to set a named or anonymous scroll progress or view progress timeline. Alternatively, it can be used to explicitly set the default time-based document timeline to control the progress of an element's animation or to have no timeline at all, in which case the element does not animate.

The following types of timelines can be set via `animation-timeline`:

- `DocumentTimeline`
    The default document timeline, which is progressed through by the passing of time since the document was first loaded in the browser. This is the timeline traditionally associated with CSS animations and is selected with a value of `auto`, or by not specifying an `animation-timeline` value at all, as this is the default value.
- Scroll progress timeline
    The animation is progressed through by scrolling a scrollable element, or _scroller_, horizontally or vertically. The element that provides the scroll progress timeline can be specified in two ways:
    - Named scroll progress timeline
        The scroller is explicitly named by setting the `scroll-timeline-name` property (or the `scroll-timeline` shorthand property) to a `dashed-ident`; that `<dashed-ident>` name is then set as the value of the `animation-timeline` property.
    - Anonymous scroll progress timeline
        The `animation-timeline` property of the element to animate is set to the `scroll()` function. The function's two optional parameters define the scroller providing the scroll progress timeline and the scroll axis to be used.
- View progress timeline
    A keyframe animation is progressed through based on the change in visibility of an element inside a scroller; this element is known as the _subject_. By default, the timeline is at `0%` when the element first becomes visible at one edge of the scroller, and is at `100%` when its end edge exits the scroller's opposite edge. A view progress timeline can be specified in two ways:
    - Named view progress timeline
        The subject is explicitly named by setting the `view-timeline-name` property (or the `view-timeline` shorthand property) to a `<dashed-ident>`. When you set the `animation-timeline` property of the element to animate to that `<dashed-ident>`, the subject's visibility controls the progression of the element's animation. Note that the element to animate does not have to be the same as the subject.
    - Anonymous view progress timeline
        The `animation-timeline` property of the element to animate is set to a `view()` function, causing it to be animated based on its visibility within the scrollport of its nearest parent scroller.
- No timeline
    All animation timelines can be removed by selecting a value of `none`. When `animation-timeline: none` is set, no animation will occur as there is no timeline to follow.

The `animation-timeline` property is included in the `animation` shorthand as a reset-only value. This means that including `animation` resets a previously-declared `animation-timeline` value to `auto`. As this component of the shorthand is reset-only, a specific value cannot be set via `animation`. When creating CSS scroll-driven animations, you need to declare `animation-timeline` after declaring any `animation` shorthand for it to take effect.

If you specify multiple comma-separated values, each `animation-timeline` value is applied to a single animation in the order in which the `animation-name` values appear. If the number of values in the `animation-timeline` declaration is greater than the number of `animation-name` values, the excess timeline values are ignored. If there are fewer `animation-timeline` values than `animation-name` values, the `animation-timeline` values are repeated, in order, until every `animation-name` has an associated timeline.

If two or more timelines share the same `<dashed-ident>` name and the same specificity, the one last declared within the cascade will be used. If no timeline is found that matches a name included within the `animation-timeline`, the `animation-name` associated with that value is not associated with a timeline.
