---
title: "HTMLMediaElement: preload property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlmediaelement/preload/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLMediaElement: preload property

The **`preload`** property of the `HTMLMediaElement` interface is a string that provides a hint to the browser about what the author thinks will lead to the best user experience.

It reflects the `preload` attribute of the `<audio>` element and the `` element.

## Value

A string. Possible values are as follows:

- `none`
    Indicates that the media should not be preloaded.
- `metadata`
    Indicates that only media metadata (e.g., length) is fetched.
- `auto`
    Indicates that the whole media file can be downloaded, even if the user is not expected to use it.
- _empty string_
    A synonym of the `auto` value.

## Examples

```html
<video
  id="el"
  controls
  src="https://example.com/media.mp4"
  poster="https://example.com/media.jpg"
  width="800"
  height="600"
  preload="metadata">
  Sorry, your browser doesn't support embedded videos, but don't worry, you can
  <a href="https://example.com/media.mp4" download="media.mp4">download it</a>
  and watch it with your favorite video player!
</video>
```

```js
const el = document.getElementById("el");
console.log(el.preload); // Output: "metadata"
```
