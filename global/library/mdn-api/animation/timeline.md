---
title: "Animation: timeline property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animation/timeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Animation: timeline property

The **`Animation.timeline`** property of the `Animation` interface returns or sets the `timeline` associated with this animation. A timeline is a source of time values for synchronization purposes, and is an `AnimationTimeline`-based object. By default, the animation's timeline and the `Document`'s timeline are the same.

## Value

A `timeline object` to use as the timing source for the animation, or `null` to use the default, which is the `Document`'s timeline.

## Examples

Here we set the animation's timeline to be the same as the document's timeline (this is the default timeline for all animations, by the way):

```js
animation.timeline = document.timeline;
```

## See also

- Web Animations API
- `Animation`
- `AnimationTimeline` the parent object all timelines inherit from.
- `DocumentTimeline` the only kind of timeline object available at this time.
- `Document.timeline` is the default timeline all animations are assigned.
