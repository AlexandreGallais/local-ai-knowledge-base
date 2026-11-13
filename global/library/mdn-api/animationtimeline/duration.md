---
title: "AnimationTimeline: duration property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/animationtimeline/duration/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# AnimationTimeline: duration property

The **`duration`** read-only property of the Web Animations API's `AnimationTimeline` interface returns the maximum value for this timeline or `null`.

Note that the derived interfaces `ViewTimeline` and `ScrollTimeline` always return a duration of 100%, while `DocumentTimeline` has no duration, and returns `null`.

## Value

A number representing the timeline's duration (the maximum value for this timeline) or `null`.

## Examples

### View timeline duration

The `ViewTimeline` always returns a duration of 100% as a `CSSUnitValue`.

```js
const subject = document.querySelector(".subject");
const timeline = new ViewTimeline({
  subject,
  axis: "block",
});

timeline.duration; // CSSUnitValue { value: 100, unit: "percent" }
```

### Scroll timeline duration

The `ScrollTimeline` always returns a duration of 100% as a `CSSUnitValue`.

```js
const timeline = new ScrollTimeline({
  source: document.documentElement,
  axis: "block",
});

timeline.duration; // CSSUnitValue { value: 100, unit: "percent" }
```

### Document timeline duration

The `DocumentTimeline` has no duration.

```js
document.timeline.duration; // null
```

## See also

- Web Animations API
- `AnimationTimeline`
- `DocumentTimeline` inherits this property
- `ScrollTimeline` inherits this property
- `ViewTimeline` inherits this property
