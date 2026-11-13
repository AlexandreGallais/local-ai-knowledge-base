---
title: "HTMLTrackElement: srclang property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltrackelement/srclang/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTrackElement: srclang property

The **`srclang`** property of the `HTMLTrackElement` interface reflects the value of
the `<track>` element's `srclang` attribute or the empty string if not defined.

The `srclang` attribute is a BCP 47 language tag indicating the language of the text track's data.

## Value

A string.

## Example

```js
const trackElement = document.getElementById("exampleTrack");
console.log(`Track's language: ${trackElement.srclang}`);
trackElement.srclang = "en-US";
```

## See also

- `HTMLTrackElement`
- `<track>`
