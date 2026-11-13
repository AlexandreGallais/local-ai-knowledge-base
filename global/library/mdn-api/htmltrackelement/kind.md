---
title: "HTMLTrackElement: kind property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltrackelement/kind/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTrackElement: kind property

The **`kind`** property of the `HTMLTrackElement` interface represents the type of track, or how the text track is meant to be used. It reflects the `<track>` element's enumerated `kind` attribute.

If no `kind` is set, `subtitles` is used. If the attribute is not set to one of the valid enumerated values, it is invalid and `metadata` is used. Other valid values include `captions`, `descriptions`, and `chapters`.

## Value

A string; lowercase `captions`, `descriptions`, `chapters`, `subtitles` or `metadata`.

## Example

Given the following:

```html
<track src="track.vtt" id="exampleTrack" />
```

We get the following results:

```js
const trackElement = document.getElementById("exampleTrack");
// missing value
console.log(trackElement.kind); // "subtitles"
trackElement.kind = "INVALID";
// invalid value
console.log(trackElement.kind); // "metadata"
trackElement.kind = "CAPTIONS";
// valid value
console.log(trackElement.kind); // "captions"
```

## See also

- `HTMLTrackElement.track`
- `HTMLTrackElement.label`
