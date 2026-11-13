---
title: "MediaTrackConstraints: logicalSurface property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/mediatrackconstraints/logicalsurface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# MediaTrackConstraints: logicalSurface property

The `MediaTrackConstraints` dictionary's **`logicalSurface`** property is a `ConstrainDOMString` describing the requested or mandatory constraints placed upon the value of the `logicalSurface` constrainable property.

This is used to specify whether or
not `getDisplayMedia()` should allow the
user to choose display surfaces which are not necessarily fully visible on the screen,
such as occluded windows or the complete content of windows which are large enough to
require scrolling to see their entire contents.

If needed, you can determine whether or not this constraint is supported by checking
the value of `logicalSurface` as returned by
a call to `MediaDevices.getSupportedConstraints()`. However, typically this
is unnecessary since browsers will ignore any constraints they're unfamiliar with.

## Value

A `ConstrainBoolean` which is `true` if logical surfaces should be permitted among the selections available to the user.

See how constraints are defined.

## Usage notes

You can check the setting selected by the user agent after the display media has been
created by `getDisplayMedia()` by calling
`getSettings()` on the display media's
video `MediaStreamTrack`, then checking the value of the
`logicalSurface` property.

For example, if your app needs to know if the selected display surface is a logical
one:

```js
let isLogicalSurface = displayStream
  .getVideoTracks()[0]
  .getSettings().logicalSurface;
```

Following this code, `isLogicalSurface` is `true` if the display
surface contained in the stream is a logical surface; that is, one which may not be
entirely onscreen, or may even be entirely offscreen.

## See also

- Screen Capture API
- Using the Screen Capture API
- Capabilities, constraints, and settings
- `MediaTrackConstraints`
- `MediaDevices.getSupportedConstraints()`
