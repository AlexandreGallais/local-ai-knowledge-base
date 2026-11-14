---
title: "HTMLTrackElement: src property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltrackelement/src/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTrackElement: src property

The **`src`** property of the `HTMLTrackElement` interface reflects the value of
the `<track>` element's `src` attribute, which
indicates the URL of the text track's data.

## Value

A string containing the URL of the text track data.

## Example

```js
const trackElement = document.getElementById("exampleTrack");
console.log(`Track's URL: ${trackElement.src}`);
trackElement.src = "newTrack.vtt";
```

## See also

- `HTMLTrackElement`
- `<track>`
