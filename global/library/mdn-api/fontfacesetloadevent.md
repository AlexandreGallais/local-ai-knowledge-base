---
title: "FontFaceSetLoadEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/fontfacesetloadevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# FontFaceSetLoadEvent

The **`FontFaceSetLoadEvent`** interface of the CSS Font Loading API represents events fired at a `FontFaceSet` after it starts loading font faces.

Events are fired when font loading starts (`loading`), loading completes (`loadingdone`) or there is an error loading one of the fonts (`loadingerror`).

## Constructor

- `FontFaceSetLoadEvent()`
    Creates a new `FontFaceSetLoadEvent` object.

## Instance properties

_Also inherits properties from its parent `Event`_.

- `FontFaceSetLoadEvent.fontfaces` (read-only)
    Returns an array of `FontFace` instances.
    Depending on the event, the array will contain font faces that are loading (`loading`), have successfully loaded (`loadingdone`), or have failed to load (`loadingerror`).

## Instance methods

_Inherits methods from its parent, `Event`_.

## See also

- `Document.fonts`
- `WorkerGlobalScope.fonts`
