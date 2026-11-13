---
title: "HTMLTrackElement: default property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltrackelement/default/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTrackElement: default property

The **`default`** property of the `HTMLTrackElement` interface represents whether the track will be enabled if the user's preferences do not indicate that another track would be more appropriate. It reflects the `<track>` element's boolean `default` attribute, returning `true` if present and `false` otherwise.

## Value

A Boolean.

## Example

```js
const trackElement = document.getElementById("exampleTrack");
console.log(trackElement.default);
trackElement.default = true;
```

## See also

- `HTMLTrackElement.kind`
- `HTMLTrackElement.label`
