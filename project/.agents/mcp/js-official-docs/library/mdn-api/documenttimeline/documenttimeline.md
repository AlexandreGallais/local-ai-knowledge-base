---
title: "DocumentTimeline: DocumentTimeline() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documenttimeline/documenttimeline/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentTimeline: DocumentTimeline() constructor

The **`DocumentTimeline()`** constructor of the Web Animations API creates a new instance of the `DocumentTimeline` object associated with the active document of the current browsing context.

## Syntax

```js
new DocumentTimeline(options)
```

### Parameters

- `options` (optional)
    An object specifying options for the new timeline. The following properties are available:
    - `originTime` (optional)
        A `number` that specifies the zero time for the `DocumentTimeline`
        as a number of milliseconds relative to `Performance.timeOrigin`.
        Defaults to `0`.

## Examples

### Origin time

A `DocumentTimeline` with an `originTime` of zero counts time
starting from `Performance.timeOrigin`. This is the same behavior
as `Document.timeline`.

```js
const timeline = new DocumentTimeline();
console.log(timeline.currentTime === document.timeline.currentTime); // true
```

Setting a non-zero `originTime` will offset the `DocumentTimeline`
from `Document.timeline` by that amount:

```js
const offsetTimeline = new DocumentTimeline({ originTime: 500 });
console.log(document.timeline.currentTime - offsetTimeline.currentTime); // 500
```

A `DocumentTimeline` relative to the current moment can be constructed with:

```js
const nowTimeline = new DocumentTimeline({
  originTime: document.timeline.currentTime,
});
console.log(nowTimeline.currentTime); // 0
```

## See also

- Web Animations API
- `AnimationTimeline`
- `DocumentTimeline`
