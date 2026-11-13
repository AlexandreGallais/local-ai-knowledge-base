---
title: "HTMLMediaElement: abort event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/abort_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: abort event

The **`abort`** event is fired when media resource loading is stopped before completion, but not as the result of an error.
This is usually achieved by removing the `src` attribute or setting it to the empty string (`""`), then calling `load()`.

This event is not cancelable and does not bubble.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("abort", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onabort = (event) => { }
```

## Event type

A generic `Event`.

## Examples

### Abort loading a media resource

The following example demonstrates how to abort a video.
When you press the button it starts loading a video resource.
After a short timeout it aborts the load by removing the `src` attribute and calling the `load()` method.
If the video resource is still loading when `load()` is called, the `abort` event fires.

#### HTML

```html
<video controls width="250"></video>

<button id="loadAndAbort">Load and abort video</button>

<pre id="log"></pre>
```

#### CSS

```css
video,
button,
pre {
  display: block;
  margin-block: 1rem;
}
```

#### JavaScript

```js
const video = document.querySelector("video");
const loadAndAbortButton = document.querySelector("#loadAndAbort");
const log = document.querySelector("#log");

video.addEventListener("abort", () => {
  log.textContent += "Video loading aborted\n";
});

loadAndAbortButton.addEventListener("click", () => {
  log.textContent = "Loading video...\n";

  video.src = `/shared-assets/videos/flower.webm?nocache=${Date.now()}`;
  video.load();

  setTimeout(() => {
    video.removeAttribute("src");
    video.load();
  }, 50);
});
```

#### Result

## See also

- `HTMLAudioElement`
- `HTMLVideoElement`
- `<audio>`
- ``
