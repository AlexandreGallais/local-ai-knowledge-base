---
title: "HTMLVideoElement: resize event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlvideoelement/resize_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLVideoElement: resize event

The **`resize`** event of the `HTMLVideoElement` interface fires when one or both of the `videoWidth` and `videoHeight` properties have just been updated.

This event is not cancelable but may bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("resize", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onresize = (event) => { }
```

## Event type

A generic `Event`.

## Examples

```html
<video id="media" src="https://example.com/video.mp4"></video>
```

```js
const el = document.getElementById("media");
el.addEventListener("resize", () => {
  console.log("The size of the video element has changed!");
});
```

## See also

- `HTMLVideoElement.videoHeight`
- `HTMLVideoElement.videoWidth`
