---
title: "HTMLTrackElement: readyState property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltrackelement/readystate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTrackElement: readyState property

The **`readyState`** read-only property of the `HTMLTrackElement` interface returns a number representing the `<track>` element's text track readiness state:

0. NONE: The text track not loaded state.
1. LOADING: The text track loading state.
2. LOADED: The text track loaded state.
3. ERROR: The text track failed to load state.

## Value

A number; `0`, `1`, `2`, or `3`.

## Example

```js
const trackElement = document.getElementById("exampleTrack");
console.log(trackElement.readyState); // 0, 1, 2, or 3
```

## See also

- `HTMLTrackElement`
- `HTMLMediaElement.readyState`
- `<track>`
