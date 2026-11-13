---
title: "HTMLTrackElement: label property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltrackelement/label/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTrackElement: label property

The **`label`** property of the `HTMLTrackElement` represents the user-readable title displayed when listing subtitle, caption, and audio descriptions for a track. It reflects the `<track>` element's `label` attribute.

## Value

A string.

## Example

```js
const trackElement = document.getElementById("exampleTrack");
console.log(`Track's label: ${trackElement.label}`);
trackElement.label = "Updated label";
```

## See also

- `HTMLTrackElement.track`
- `HTMLTrackElement.kind`
