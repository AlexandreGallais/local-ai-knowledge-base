---
title: "FontFaceSetLoadEvent: FontFaceSetLoadEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfacesetloadevent/fontfacesetloadevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSetLoadEvent: FontFaceSetLoadEvent() constructor

The **`FontFaceSetLoadEvent()`** constructor creates a new
`FontFaceSetLoadEvent` object which is fired whenever a
`FontFaceSet` loads.

## Syntax

```js
new FontFaceSetLoadEvent(type)
new FontFaceSetLoadEvent(type, options)
```

### Parameters

- `type`
    A string with the name of the event.
    It is case-sensitive and browsers always set it to `loading`, `loadingdone`, or `loadingerror`.
- `options` (optional)
    An object that, _in addition of the properties defined in `Event()`_, can have the following properties:
    - `fontfaces` (optional)
        An array of `FontFace` instances. It defaults to the empty array.

### Return value

A new `FontFaceSetLoadEvent` object.
